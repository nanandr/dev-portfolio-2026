"use client";

import { useState } from "react";
import siteData from "@/data/portfolio.json";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleCopy = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(siteData.meta.email);
    // Capture exactly where the user clicked relative to the viewport
    setMousePos({ x: e.clientX, y: e.clientY });
    setCopied(true);
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative z-50 bg-background border-t border-line pt-24 lg:pt-36 pb-20 px-6 lg:px-14">
      <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-muted before:content-[''] before:w-6 before:h-px before:bg-accent" data-reveal>
        {siteData.contact.label}
      </div>
      
      <p className="mt-6 text-sm text-muted" data-reveal>{siteData.contact.kicker}</p>
      
      <button 
        onClick={handleCopy} 
        className="flex items-center gap-6 md:gap-10 mt-10 md:mt-16 w-max max-w-full group cursor-pointer text-left appearance-none bg-transparent border-none p-0" 
        data-reveal
      >
        <span className="font-[IBM_Plex_Mono] font-bold tracking-tight leading-none uppercase text-5xl md:text-7xl lg:text-8xl text-ink transition-colors group-hover:text-accent">
          {siteData.contact.title}
        </span>
        <span className="text-4xl md:text-6xl text-ink leading-none transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:text-accent">
          <ArrowRight className="w-[1em] h-[1em]" />
        </span>
      </button>
      
      <p className="mt-8 text-sm text-muted">
        <button 
          onClick={handleCopy} 
          className="text-ink hover:underline cursor-pointer appearance-none bg-transparent border-none p-0"
        >
          {/* @ts-ignore */}
          {siteData.meta.email_display || siteData.meta.email}
        </button>
      </p>

      {/* 
        Instant Toast Notification
      */}
      <div 
        className={`fixed bg-ink text-background px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase font-semibold z-100 border border-ink pointer-events-none ${
          copied ? "block" : "hidden"
        }`}
        style={{
          left: `${mousePos.x + 16}px`,
          top: `${mousePos.y + 16}px`,
        }}
      >
        Email copied to clipboard
      </div>
    </section>
  );
}