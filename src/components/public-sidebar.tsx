"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "HOME" },
  { href: "/article", label: "ARTICLE" },
  { href: "/open-source", label: "OPEN SOURCE" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/about", label: "ABOUT" },
];

export function PublicSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        className="mobile-sidebar-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
      </button>

      {isOpen && (
        <div className="mobile-sidebar-backdrop" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`public-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-top">
        <Link className="sidebar-wordmark" href="/" aria-label="VXNUS home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
    </>
  );
}
