"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
      <div className="stay-curious">STAY CURIOUS</div>
    </header>
  );
}

