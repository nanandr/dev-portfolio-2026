"use client";

import { useState } from "react";

import { ArrowRight } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

export default function Contact({ data }: { data: PortfolioData }) {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleCopy = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(data.meta.email);
    // Capture exactly where the user clicked relative to the viewport
    setMousePos({ x: e.clientX, y: e.clientY });
    setCopied(true);
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative z-50 bg-background border-t border-line pt-24 lg:pt-36 pb-20 px-6 lg:px-14">
      <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-muted before:content-[''] before:w-6 before:h-px before:bg-accent" data-reveal>
        {data.contact.label}
      </div>
      
      <p className="mt-6 text-sm text-muted" data-reveal>{data.contact.kicker}</p>
      
      <button 
        onClick={handleCopy} 
        className="flex items-center gap-6 md:gap-10 mt-10 md:mt-16 w-max max-w-full group cursor-pointer text-left appearance-none bg-transparent border-none p-0" 
      >
        <span className="font-[IBM_Plex_Mono] font-bold tracking-tight leading-none uppercase text-5xl md:text-7xl lg:text-8xl text-ink transition-colors group-hover:text-accent">
          {data.contact.title}
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
          {data.meta.email_display || data.meta.email}
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