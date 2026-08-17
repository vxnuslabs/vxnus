"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GithubIcon } from "./github-icon";

export function PublicNav() {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="public-header-utility">
      <div className="time-display">UTC+7 {time}</div>
      <div className="header-note">TECHNOLOGY / IMAGINATION / UNIVERSE</div>
      <Link href="/" className="mobile-brand" style={{ textDecoration: 'none', color: 'inherit' }}>VXNUS</Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a 
          href="https://github.com/vxnuslabs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="utility-github-link"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            color: 'var(--muted)', 
            textDecoration: 'none', 
            transition: 'color 0.2s' 
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--foreground)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
          aria-label="GitHub: vxnuslabs"
        >
          <GithubIcon size={14} />
          <span>vxnuslabs</span>
        </a>
        <div className="stay-curious">STAY CURIOUS</div>
      </div>
    </header>
  );
}

