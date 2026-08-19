import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminWorkEditor } from "@/components/admin-work-editor";
import { getAdminWorkEntry } from "@/lib/admin-content";

export const metadata = { title: "Edit work — VXNUS", robots: { index: false, follow: false } };

type EditWorkPageProps = { params: Promise<{ id: string }> };

export default async function EditWorkPage({ params }: EditWorkPageProps) {
  const { id } = await params;
  const work = await getAdminWorkEntry(Number(id));
  if (!work) notFound();

  return (
    <main className="admin-main admin-editor-page">
      <Link className="admin-back-link" href="/admin/content">← Content archive</Link>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Workspace / Work / {work.slug}</p>
          <h1>Edit work.</h1>
        </div>
        <Link className="admin-public-link" href={`/${work.type === "open_source" ? "open-source" : "projects"}/${work.slug}`}>View public work ↗</Link>
      </div>
      <AdminWorkEditor work={work} />
    </main>
  );
}
