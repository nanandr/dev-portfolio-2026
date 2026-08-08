"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-svh flex flex-col pt-16 pb-6 px-6 lg:px-14 bg-background">
      {/* Center Content */}
      <div className="m-auto flex flex-col items-center gap-6">        
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-6xl md:text-8xl font-bold font-[IBM_Plex_Mono] tracking-tight text-ink leading-none">
            404
          </h1>
          
          {/* Typing Effect Container */}
          <div className="flex items-center text-[12px] md:text-[14px] tracking-[0.14em] uppercase text-muted mt-2 font-medium">
            <span>I can't find the page you're looking for</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-wrap justify-between gap-y-2.5 gap-x-6 border-t border-line pt-3.5 w-full text-[11.5px] tracking-[0.14em] uppercase text-muted">        
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:text-ink transition-colors cursor-pointer group"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Return Home
        </Link>
      </div>
    </section>
  );
}