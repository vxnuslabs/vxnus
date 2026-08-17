import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "./github-icon";
import { site } from "@/lib/site";

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link href="/about">About the studio</Link>
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-github-link"
            aria-label="GitHub repository: vxnuslabs"
          >
            <GithubIcon size={14} />
            <span>{site.github.name}</span>
          </a>
        </div>
      </div>
      <p className="footer-copyright">© VXNUS Studio</p>
    </footer>
  );
}


