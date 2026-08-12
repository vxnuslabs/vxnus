import Link from "next/link";
import { type ElementType, ReactNode } from "react";

type ArticleBlock =
  | { type: "heading"; text: string; id: string; level: 2 | 3 | 4 | 5 | 6 }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string; alt: string; source?: string };

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function normalizeImageUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "www.startpage.com" && parsed.pathname === "/av/proxy-image") {
      return parsed.searchParams.get("piurl") ?? url;
    }
  } catch {
    // Keep malformed URLs unchanged so the browser can handle the failure visibly.
  }

  return url;
}

export function parseArticleBody(body: string, title?: string): ArticleBlock[] {
  const lines = body.split(/\r?\n/);
  const blocks: ArticleBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length > 0) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const documentTitleMatch = /^#\s+(.+?)(?:\s+#+)?$/.exec(trimmed);
    if (documentTitleMatch && title && documentTitleMatch[1].trim() === title.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = /^(#{2,6})\s+(.+?)(?:\s+#+)?$/.exec(trimmed);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const text = headingMatch[2].trim();
      const level = headingMatch[1].length as 2 | 3 | 4 | 5 | 6;
      blocks.push({ type: "heading", text, id: slugifyHeading(text), level });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      list.push(trimmed.slice(2).trim());
      continue;
    }

    if (trimmed.startsWith("![") && trimmed.includes("](") && trimmed.endsWith(")")) {
      flushParagraph();
      flushList();
      const closingBracket = trimmed.indexOf("]");
      const alt = trimmed.slice(2, closingBracket);
      const urlAndTitle = trimmed.slice(closingBracket + 2, -1);
      
      let url = urlAndTitle;
      let source: string | undefined = undefined;
      
      const spaceIndex = urlAndTitle.indexOf(" ");
      if (spaceIndex !== -1) {
        url = urlAndTitle.slice(0, spaceIndex);
        const titlePart = urlAndTitle.slice(spaceIndex + 1).trim();
        if (titlePart.startsWith('"') && titlePart.endsWith('"')) {
          source = titlePart.slice(1, -1);
        }
      }
      
      blocks.push({ type: "image", url: normalizeImageUrl(url), alt, source });
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export function renderInline(text: string): ReactNode[] {
  const regex = /(!\[.+?\]\(.+?\)|\*\*.+?\*\*|\*.+?\*|`.+?`|\[.+?\]\(.+?\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;
    
    if (part.startsWith("![") && part.includes("](") && part.endsWith(")")) {
      const closingBracket = part.indexOf("]");
      const alt = part.slice(2, closingBracket);
      const urlAndTitle = part.slice(closingBracket + 2, -1);
      
      let url = urlAndTitle;
      const spaceIndex = urlAndTitle.indexOf(" ");
      if (spaceIndex !== -1) {
        url = urlAndTitle.slice(0, spaceIndex);
      }
      
      // eslint-disable-next-line @next/next/no-img-element
      return <img key={i} src={normalizeImageUrl(url)} alt={alt} loading="lazy" style={{ maxWidth: "100%", height: "auto", display: "inline-block", verticalAlign: "middle" }} />;
    }
    
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const closingBracket = part.indexOf("]");
      const linkText = part.slice(1, closingBracket);
      const url = part.slice(closingBracket + 2, -1);
      if (url.startsWith("http")) {
        return <a key={i} href={url} target="_blank" rel="noopener noreferrer">{linkText}</a>;
      }
      return <Link key={i} href={url}>{linkText}</Link>;
    }
    
    return <span key={i}>{part}</span>;
  });
}

export function ArticleBody({ body, title }: { body: string; title?: string }) {
  return (
    <div className="article-body">
      {parseArticleBody(body, title).map((block, index) => {
        if (block.type === "heading") {
          const Heading = `h${block.level}` as ElementType;
          return (
            <Heading id={block.id} key={`${block.id}-${index}`}>
              {renderInline(block.text)}
            </Heading>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={`list-${index}`}>
              {block.items.map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        
        if (block.type === "image") {
          return (
            <figure key={`image-${index}`} style={{ margin: "2.5rem 0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="article-body-image" src={block.url} alt={block.alt} loading="lazy" />
              {(block.alt || block.source) && (
                <figcaption style={{ marginTop: "0.8rem", color: "var(--muted)", fontSize: "0.85rem", fontStyle: "italic", textAlign: "center" }}>
                  {block.alt}
                  {block.source && (
                    <span style={{ display: "block", marginTop: "0.4rem", fontSize: "0.75rem", fontStyle: "normal" }}>
                      Source: {block.source.startsWith("http") ? (
                        <a href={block.source} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                          {(() => {
                            try { return new URL(block.source).hostname; }
                            catch { return block.source; }
                          })()}
                        </a>
                      ) : block.source}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          );
        }

        return <p key={`paragraph-${index}`}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}
