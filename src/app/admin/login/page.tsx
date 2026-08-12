import Link from "next/link";
import Image from "next/image";
import ClientAuthView from "@/components/ClientAuthView";

import { isAdminConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login — VXNUS",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <div className="admin-login-mark" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Image src="/logo.svg" alt="" width={24} height={24} style={{ display: 'block', height: '1em', width: 'auto' }} />
        <span>VXNUS</span>
        <span>ADMIN / 01</span>
      </div>
      <section>
        <p className="admin-eyebrow">Private workspace</p>
        <h1>Keep the work moving.</h1>
        <p className="admin-login-copy">Draft, review, and publish the studio’s article and work.</p>
        {isAdminConfigured() ? (
          <ClientAuthView />
        ) : (
          <p className="admin-form-error" role="alert">
            Admin authentication is not configured. Add `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` to the environment.
          </p>
        )}
        <Link className="admin-back-link" href="/">← Return to public site</Link>
      </section>
    </main>
  );
}

