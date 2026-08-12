import Link from "next/link";
import Image from "next/image";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div>
        <p className="footer-mark" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Image src="/logo.svg" alt="" width={24} height={24} style={{ display: 'block', height: '1em', width: 'auto' }} />
          VXNUS
        </p>
        <p>Technology Creative Studio.</p>
      </div>
      <div className="footer-meta">
        <span>Article is the beginning of better products.</span>
        <Link href="/about">About the studio</Link>
      </div>
      <p className="footer-copyright">© VXNUS Studio</p>
    </footer>
  );
}

