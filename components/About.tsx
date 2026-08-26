"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioData } from "@/types/portfolio";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ─── MAIN ABOUT COMPONENT ──────────────────────────────────────────────────
export default function About({ data }: { data: PortfolioData }) {
  const [showJourney, setShowJourney] = useState(false);
  
  const portraitRef = useRef<HTMLElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const journeyContentRef = useRef<HTMLDivElement>(null);
  const journeyRowsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggleJourney = () => {
    const nextState = !showJourney;
    setShowJourney(nextState);

    if (nextState) {
      // Animate journey section reveal & row stagger top to bottom
      setTimeout(() => {
        if (journeyContentRef.current) {
          gsap.fromTo(
            journeyContentRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }
        if (journeyRowsRef.current.length > 0) {
          gsap.fromTo(
            journeyRowsRef.current.filter(Boolean),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
              clearProps: "all",
              onComplete: () => ScrollTrigger.refresh()
            }
          );
        }
      }, 50);
    } else {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  };

  // Portrait Animations
  useEffect(() => {
    if (portraitRef.current && portraitImgRef.current) {
      let ctx = gsap.context(() => {
        // 1. Reveal Animation (Image only)
        gsap.fromTo(
          portraitImgRef.current,
          { filter: "blur(12px)", opacity: 0 },
          {
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all" 
          }
        );

        // 2. Parallax Scroll Animation (Whole window moves)
        gsap.fromTo(
          portraitRef.current,
          { yPercent: 15 },
          {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top bottom", 
              end: "bottom top",   
              scrub: 1,            
            },
          }
        );
      }, portraitRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="about" className="py-20 lg:py-28 px-6 lg:px-14 w-full flex flex-col bg-background">
      <div className="flex items-center gap-2.5 text-[11px] pb-8 tracking-[0.18em] uppercase text-[var(--muted)] before:content-[''] before:w-6 before:h-[1px] before:bg-[var(--accent)]" data-reveal>
        {data.about.label}
      </div>
      
      {/* About Me Content */}
      <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-20 items-start">
        
        <div className="text-ink flex-1 w-full">
          <h2 className="font-[IBM_Plex_Mono] font-bold tracking-tight leading-none text-4xl md:text-5xl lg:text-6xl mb-8">
            {data.about.title}
          </h2>
          <div className="flex flex-col gap-5">
            {data.about.body.map((p, i) => (
              <p key={i} className="max-w-[56ch] text-body text-base md:text-[1.1rem] leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>

          {/* Social Links Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            {data.socials.map((s, i) => (
              <a 
                key={i} 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="border border-line text-ink px-5 py-2.5 text-[10px] tracking-[0.18em] uppercase font-semibold transition-colors hover:bg-ink active:scale-95 hover:text-background flex items-center gap-2"
              >
                {s.label} <span className="font-normal text-[10px]">↗</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Minimal Window Application Style Portrait */}
        <figure ref={portraitRef} className="border border-line w-full md:w-[320px] shrink-0 flex flex-col bg-bone relative">
          {/* Minimal Top Title Bar */}
          <div className="h-8 border-b border-line flex items-center justify-center">
            <span className="text-[9px] tracking-[0.2em] uppercase text-muted font-medium">
              {data.about.portraitCaption[0] || 'PORTRAIT.JPG'}
            </span>
          </div>
          
          {/* Image Container without scaling */}
          <div className="relative overflow-hidden w-full bg-line">
            <img 
              ref={portraitImgRef}
              src={data.images.portrait} 
              alt="Portrait" 
              className="w-full aspect-[4/5] object-cover block"
            />
          </div>

          {/* Minimal Bottom Status Bar */}
          {data.about.portraitCaption[1] && (
            <div className="h-8 border-t border-line flex items-center justify-between px-4 bg-bone">
              <span className="text-[9px] tracking-[0.15em] uppercase text-muted">Status</span>
              <span className="text-[9px] tracking-[0.15em] uppercase text-ink">
                {data.about.portraitCaption[1]}
              </span>
            </div>
          )}
        </figure>
        
      </div>

      {/* Journey Section Revealed Under About Me with GSAP Stagger */}
      <div 
        ref={journeyContentRef} 
        className={`transition-all duration-300 ${showJourney ? "block mt-14 lg:mt-20" : "hidden"}`}
      >
        <div className="flex flex-col border-t border-line w-full">
          {data.about.journey.map((j, i) => (
            <div 
              key={i}
              ref={(el) => { journeyRowsRef.current[i] = el; }}
              className="group grid grid-cols-1 md:grid-cols-[120px_1fr_250px] lg:grid-cols-[150px_1fr_320px] gap-6 lg:gap-10 border-b border-line items-stretch w-full transition-colors"
            >
              <div className="font-[IBM_Plex_Mono] pt-8 lg:py-8 text-2xl md:text-3xl font-bold tracking-tight text-ink transition-colors duration-300 mt-0 md:mt-1">
                {j.year}
              </div>
              
              <div className="flex flex-col gap-8 w-full lg:py-8 pr-0 md:pr-6">
                {j.roles.map((r: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-2 items-start">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-lg text-ink">{r.title}</h3>
                      <span className="text-[11px] tracking-[0.12em] uppercase text-muted font-medium">
                        {r.org}
                      </span>
                    </div>
                    <div className="text-body text-[0.95rem] leading-relaxed w-full">
                      {r.note}
                    </div>
                  </div>
                ))}
              </div>

              {/* {j.image && (
                <div className="w-full h-[200px] md:h-full min-h-[160px] relative overflow-hidden border border-line bg-bone mt-4 md:mt-0">
                  <img
                    src={j.image}
                    alt={`Experience in ${j.year}`}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  />
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>

      {/* Journey Reveal Button in the middle (moves down to under the section) */}
      <div className="flex justify-center mt-16 lg:mt-20" data-reveal>
        <button
          onClick={handleToggleJourney}
          className="border border-line text-ink px-6 py-3 text-[11px] tracking-[0.18em] uppercase font-semibold transition-colors hover:bg-ink active:scale-95 hover:text-background flex items-center gap-2 cursor-pointer"
        >
          <span>{showJourney ? "Hide" : (data.about.journeyTitle || "Journey So Far")}</span>
          <span className="transition-transform duration-300 font-normal">
            {showJourney ? "↑" : "↓"}
          </span>
        </button>
      </div>
    </section>
  );
}
