"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navigation = [
  { href: "/", label: "HOME" },
  { href: "/article", label: "ARTICLE" },
  { href: "/open-source", label: "OPEN SOURCE" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/about", label: "ABOUT" },
];

export function PublicSidebar() {
  const pathname = usePathname();

  return (
    <aside className="public-sidebar">
      <div className="sidebar-top">
        <Link className="sidebar-wordmark" href="/" aria-label="VXNUS home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Image src="/logo.svg" alt="" width={24} height={24} style={{ display: 'block', height: '1em', width: 'auto', filter: 'invert(1)' }} />
          VXNUS
        </Link>
        <div className="sidebar-graphic">
          <div className="crosshair"></div>
        </div>
      </div>
      
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={isActive ? "active" : ""}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="copyright">
          <div>© VXNUS STUDIO</div>
          <div>ALL RIGHTS RESERVED</div>
        </div>
      </div>


    </aside>
  );
}
