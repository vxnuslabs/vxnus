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
        style={{ display: isOpen ? 'none' : 'flex' }}
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
        <a 
          href="https://github.com/vxnuslabs" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#777', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 500 }}
          onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
          onMouseOut={(e) => e.currentTarget.style.color = '#777'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GITHUB
        </a>
        <div className="copyright">
          <div>© VXNUS STUDIO</div>
          <div>ALL RIGHTS RESERVED</div>
        </div>
      </div>


    </aside>
    </>
  );
}
