"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";

export default function Stack({ data }: { data: PortfolioData }) {
  // Track position, size, and the index of the hovered element to sync text transitions
  const [hoverState, setHoverState] = useState({
    opacity: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    index: null as number | null,
  });

  return (
    <section id="stack" className="relative z-50 bg-[var(--bg)] py-[10vh] px-[var(--pad)]">
      
      {/* Header retained exactly as requested */}
      <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-[var(--muted)] before:content-[''] before:w-6 before:h-[1px] before:bg-[var(--accent)]" data-reveal>
        {data.stack.label}
      </div>
      <h2 className="font-sans font-bold tracking-tight leading-none text-[clamp(1.8rem,5.2vw,2.8rem)] mt-[18px]" data-reveal>
        {data.stack.title}
      </h2>

      {/* Grid Container */}
      <div 
        className="relative flex flex-wrap mt-[clamp(36px,7vh,70px)] pt-[1px] pl-[1px]" 
        data-reveal
        onMouseLeave={() => setHoverState((prev) => ({ ...prev, opacity: 0, index: null }))}
      >
        {/* Moving Hover Background (Black Square) */}
        {/* We use var(--ink) or black for the background based on your theme */}
        <div
          className="absolute z-0 bg-[#111111] transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: hoverState.left,
            top: hoverState.top,
            width: hoverState.width,
            height: hoverState.height,
            opacity: hoverState.opacity,
          }}
        />

        {data.stack.items.map((s, i) => {
          const isActive = hoverState.index === i;
          
          return (
            <div 
              key={i} 
              onMouseEnter={(e) => {
                setHoverState({
                  opacity: 1,
                  left: e.currentTarget.offsetLeft,
                  top: e.currentTarget.offsetTop,
                  width: e.currentTarget.offsetWidth,
                  height: e.currentTarget.offsetHeight,
                  index: i,
                });
              }}
              // Bigger boxes (140px) with z-10 to stay above the moving square
              className="group relative z-10 w-[140px] h-[140px] border border-[var(--muted)] -ml-[1px] -mt-[1px] flex items-center justify-center overflow-hidden bg-transparent cursor-default"
            >
              {/* Text color transition matches the 300ms speed of the moving box */}
              <div 
                className={`text-xl font-bold tracking-tight transition-colors duration-300 ease-out ${
                  isActive ? "text-white" : "text-[var(--muted)]"
                }`}
              >
                {s.abbr}
              </div>
            </div>
          );
        })}

        {/* Dynamic wrapping text: Fills remaining space, aligns to bottom right */}
        <div className="flex-grow min-w-[240px] flex items-end justify-end self-stretch p-4 text-[var(--muted)] text-sm sm:text-base font-medium tracking-tight mt-4 sm:mt-0">
          <span className="translate-y-2">... and eager to learn more.</span>
        </div>

      </div>
    </section>
  );
}