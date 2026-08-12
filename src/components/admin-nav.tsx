"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AdminNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/admin/login");
  };

  return (
    <header className="admin-header">
      <div>
        <Link className="admin-wordmark" href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Image src="/logo.svg" alt="" width={24} height={24} style={{ display: 'block', height: '1em', width: 'auto' }} />
          VXNUS / ADMIN
        </Link>
        <p>Editorial workspace</p>
      </div>
      <nav aria-label="Admin navigation">
        <Link href="/admin">Overview</Link>
        <Link href="/admin/content">Content</Link>
        <Link href="/admin/article/new">New article</Link>
        <Link href="/admin/work/new">New work</Link>
      </nav>
      <button className="admin-text-button" type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </header>
  );
}
