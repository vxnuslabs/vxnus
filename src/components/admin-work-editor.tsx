"use client";

import { useActionState, useState } from "react";

import { saveWorkEntry } from "@/app/admin/actions";
import type { AdminWorkEntry } from "@/lib/admin-content";

export function AdminWorkEditor({ work }: { work?: AdminWorkEntry }) {
  const [state, action, pending] = useActionState(saveWorkEntry, undefined);
  const [promptTopic, setPromptTopic] = useState("");

  const aiPrompt = `Write a brief case study/entry for my studio work about ${promptTopic || "[INSERT TOPIC/PROJECT HERE]"}. 
Please output the response exactly in the following Markdown format with a YAML frontmatter block at the top containing the metadata.
Do NOT wrap the output in markdown codeblocks (no \`\`\`).

---
type: "project"
slug: "a-readable-work-slug"
title: "The name of the work"
summary: "One clear sentence for the archive"
externalUrl: "https://..."
repositoryUrl: "https://github.com/..."
---

Write what it is, what was tested, and what was learned...`;

  const defaultContent = work 
    ? `---
type: "${work.type}"
slug: "${work.slug}"
title: "${work.title.replace(/"/g, '\\"')}"
summary: "${work.summary.replace(/"/g, '\\"')}"
externalUrl: "${work.externalUrl || ""}"
repositoryUrl: "${work.repositoryUrl || ""}"
---

${work.body}
`
    : `---
type: "project"
slug: ""
title: ""
summary: ""
externalUrl: ""
repositoryUrl: ""
---

Write what it is, what was tested, and what was learned...
`;

  return (
    <div className="admin-editor-wrapper">
      <div className="admin-prompt-generator" style={{ marginBottom: "2rem", padding: "1.5rem", background: "var(--background-muted, #f3f4f6)", borderRadius: "8px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>AI Prompt Generator</h3>
        <label>
          Project Topic
          <input 
            type="text" 
            value={promptTopic} 
            onChange={(e) => setPromptTopic(e.target.value)} 
            placeholder="e.g. AI Content Generation App" 
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
        {work && <input type="hidden" name="id" value={work.id} />}
        <div className="admin-editor-topline">
          <p className="admin-eyebrow">{work ? `Studio work / ${work.slug}` : "New studio work"}</p>
          <span className={`admin-status admin-status-${work?.status || "draft"}`}>{work?.status || "draft"}</span>
        </div>
        
        <label>
          Content (Markdown with YAML Frontmatter)
          <span className="admin-help">Paste the full AI output here. Must include valid frontmatter. Types: open_source, project.</span>
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
        </div>
      </form>
    </div>
  );
}

