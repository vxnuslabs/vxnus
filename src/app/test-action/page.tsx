import { saveArticle } from "@/app/admin/actions";

export default async function TestPage() {
  try {
    const formData = new FormData();
    formData.append("rawContent", `---
articleId: VR-TEST
slug: test
title: Test
summary: Test
author: Kur
readingTimeMinutes: 5
---
Body`);
    
    // Call the server action directly
    await saveArticle(undefined, formData);
    return <div>Action called successfully</div>;
  } catch (error: any) {
    return <div>Error caught: {error.message || String(error)}</div>;
  }
}
