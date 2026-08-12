"use client";

import { useActionState, useState } from "react";
import Link from "next/link";

import { saveArticle } from "@/app/admin/actions";
import type { AdminArticleArticle } from "@/lib/admin-content";

export function AdminArticleEditor({ article }: { article?: AdminArticleArticle }) {
  const [state, action, pending] = useActionState(saveArticle, undefined);
  const [promptTopic, setPromptTopic] = useState("");

  const aiPrompt = `Write a detailed article about ${promptTopic || "[INSERT TOPIC HERE]"}. 
Please output the response exactly in the following Markdown format with a YAML frontmatter block at the top containing the metadata.
Do NOT wrap the output in markdown codeblocks (no \`\`\`).

---
articleId: "VR-"
slug: "a-readable-url-slug"
title: "The title of the article"
subtitle: "A precise second line or leave empty"
summary: "One clear sentence for archives and search results"
author: "Kur Zagin"
readingTimeMinutes: 8
topics:
  - "Topic 1"
  - "Topic 2"
coverImageUrl: ""
coverImageAlt: ""
---

## Introduction
Start writing...`;

  const defaultContent = article ? `---
articleId: ${JSON.stringify(article.articleId)}
slug: ${JSON.stringify(article.slug)}
title: ${JSON.stringify(article.title)}
subtitle: ${JSON.stringify(article.subtitle ?? "")}
summary: ${JSON.stringify(article.summary)}
author: ${JSON.stringify(article.author)}
readingTimeMinutes: ${article.readingTimeMinutes}
topics:
${article.topics.map((t) => `  - ${JSON.stringify(t.name)}`).join("\n")}
coverImageUrl: ${JSON.stringify(article.coverImageUrl ?? "")}
coverImageAlt: ${JSON.stringify(article.coverImageAlt ?? "")}
---

${article.body}` : `---
articleId: "VR-"
slug: ""
title: ""
subtitle: ""
summary: ""
author: "Kur Zagin"
readingTimeMinutes: 8
topics:
  - ""
coverImageUrl: ""
coverImageAlt: ""
---

## Introduction

`;

  return (
    <div className="admin-editor-wrapper">
      <div className="admin-prompt-generator" style={{ marginBottom: "2rem", padding: "1.5rem", background: "var(--background-muted, #f3f4f6)", borderRadius: "8px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>AI Prompt Generator</h3>
        <label>
          Topic for AI
          <input 
            type="text" 
            value={promptTopic} 
            onChange={(e) => setPromptTopic(e.target.value)} 
            placeholder="e.g. Next.js App Router performance" 
            style={{ marginBottom: "1rem" }}
          />
        </label>
        <div style={{ position: "relative" }}>
          <textarea 
            readOnly 
            value={aiPrompt} 
            style={{ height: "150px", fontFamily: "monospace", fontSize: "0.875rem", marginBottom: "0.5rem" }} 
          />
          <button 
            type="button" 
            className="admin-outline-link"
            style={{ position: "absolute", top: "10px", right: "10px", padding: "0.25rem 0.75rem", fontSize: "0.875rem" }}
            onClick={() => {
              navigator.clipboard.writeText(aiPrompt);
              alert("Prompt copied to clipboard!");
            }}
          >
            Copy Prompt
          </button>
        </div>
      </div>

      <form className="admin-editor" action={action}>
        {article && <input type="hidden" name="id" value={article.id} />}
        <div className="admin-editor-topline">
          <p className="admin-eyebrow">{article ? `Edit / ${article.articleId}` : "New article"}</p>
          <span className={`admin-status admin-status-${article ? article.status || "draft" : "draft"}`}>
            {article ? (article.status === "published" ? "Published" : article.status === "archived" ? "Archived" : "Draft") : "Draft"}
          </span>
        </div>

        <label>
          Content (Markdown with YAML Frontmatter)
          <span className="admin-help">Paste the full AI output here. Must include valid frontmatter.</span>
          <textarea 
            className="admin-body-input" 
            name="rawContent" 
            defaultValue={defaultContent} 
            required 
            style={{ height: '600px', fontFamily: 'monospace' }} 
          />
        </label>

        {state?.error && <p className="admin-form-error" role="alert">{state.error}</p>}
        <div className="admin-editor-actions">
          <button type="submit" disabled={pending}>{pending ? "Saving…" : "Save draft"}</button>
          {article && <Link className="admin-outline-link" href={`/admin/article/${article.id}/preview`}>Preview</Link>}
          <span>Publishing actions become available after the database connection is verified.</span>
        </div>
      </form>
    </div>
  );
}
