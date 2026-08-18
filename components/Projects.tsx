"use client";

import { useEffect, useRef, useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { SquareArrowOutUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects({ data }: { data: PortfolioData }) {
  const listLength = data.projects.list.length;
  const containerRef = useRef<HTMLElement>(null);
  
  // Track which card is currently actively focused
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Grab all sticky cards (Projects + See All)
      const allCards = gsap.utils.toArray<HTMLElement>(".sticky-card");
      
      // Calculate viewport height for dynamic triggering
      const vh = window.innerHeight;

      allCards.forEach((card, idx) => {
        // 1. Parallax logic (Only for actual projects, ignoring "See All")
        const fg = card.querySelector(".parallax-fg");
        if (fg) {
          gsap.fromTo(
            fg,
            { yPercent: 20 },
            {
              yPercent: -20,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom", 
                end: "bottom top",   
                scrub: 1,            
              },
            }
          );
        }

        // 2. Active State tracking for the titles
        // Base offset for the sticky stack: 4rem (64px) for nav + idx * 3.5rem (56px) for stacked headers
        const stickyOffset = 64 + idx * 56; 
        
        // We set the focus trigger to fire when the top of the card is roughly 45% 
        // down the viewport, plus its specific stacked sticky offset. 
        // This ensures a different, progressively lower offset for each stacked project.
        const focusTriggerPoint = stickyOffset + (vh * 0.45);
        
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${focusTriggerPoint}`, 
          onEnter: () => setActiveIndex(idx),
          onLeaveBack: () => setActiveIndex(Math.max(0, idx - 1)),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-24" ref={containerRef}>
      <div className="px-6 lg:px-14 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-50 bg-background">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-muted before:content-[''] before:w-6 before:h-px before:bg-accent" data-reveal>
            {data.projects.label}
          </div>
          <h2 className="font-[IBM_Plex_Mono] font-bold tracking-tight leading-none text-4xl md:text-6xl mt-4 text-ink" data-reveal>
            {data.projects.title}
          </h2>
        </div>
        <div className="text-[11px] tracking-[0.16em] uppercase text-muted whitespace-nowrap pb-2">
          {data.projects.hint}
        </div>
      </div>

      {/* STACK CONTAINER */}
      <div className="relative">
        
        {/* Regular Project Cards */}
        {data.projects.list.map((p, idx) => (
          <article
            key={idx}
            className={`sticky-card sticky bg-[var(--card-bg)] text-[var(--card-ink)] border-t border-[var(--card-ink)] t-${p.theme}`}
            style={{ 
              zIndex: idx + 10,
              top: `calc(4rem + ${idx} * 3.5rem)`,
              paddingBottom: `calc((${listLength} - ${idx}) * 3.5rem)`
            }}
            data-reveal
          >
            {/* Card Header */}
            <div className="h-14 flex items-center gap-4 px-6 lg:px-14 border-b border-[var(--card-line)]">
              <span className={`text-[11px] tracking-[0.14em] text-[var(--card-mut)] transition-opacity duration-300 ${activeIndex === idx ? "opacity-100" : "opacity-40"}`}>
                0{idx + 1}
              </span>
              <h3 className={`font-semibold tracking-wide uppercase text-sm md:text-base transition-opacity duration-300 ${activeIndex === idx ? "opacity-100" : "opacity-40"}`}>
                {p.name}
              </h3>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-4 transition-colors hover:bg-[var(--card-ink)] hover:text-[var(--card-bg)] group ml-auto md:ml-0">
                <SquareArrowOutUpRight size={12}/>
              </a>
            </div>
            
            {/* Card Body */}
            <div className="flex flex-col md:flex-row items-stretch h-[calc(78svh-7.5rem)] overflow-hidden w-full">
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center bg-[var(--card-bg)]">
                
                {/* Static Blurred Background Bleeding to Edges */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 blur-sm opacity-60 pointer-events-none"
                  style={{ backgroundImage: `url(${p.image})` }}
                  aria-hidden="true"
                />
                
                {/* Parallax Foreground Image */}
                <img
                  src={p.image}
                  alt={`${p.name} — visual`}
                  loading="lazy"
                  className="parallax-fg relative z-10 w-[75%] h-[75%] object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* Text Side */}
              <div className="w-full md:w-1/2 flex flex-col justify-center px-6 lg:pl-14 lg:pr-10 py-8 z-10 bg-[var(--card-bg)]">
                <div className="flex gap-3 items-center mb-5 text-[11.5px] tracking-[0.14em] uppercase text-[var(--card-mut)]">
                  <span>{p.year}</span><span>·</span><span>{p.type}</span>
                </div>

                <p className="font-medium leading-relaxed tracking-tight text-lg lg:text-xl max-w-[38ch]">
                  {p.description}
                </p>

                <p className="text-[var(--card-mut)] text-sm mt-3.5 max-w-[46ch]">
                  {p.note}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {p.tags.map((t, i) => (
                    <span
                      key={i}
                      className="border border-[var(--card-line)] py-1 px-3 text-[10px] tracking-[0.12em] uppercase text-[var(--card-mut)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* SEE ALL "CARD" */}
        <article
          className="sticky-card sticky bg-background text-ink border-t border-ink"
          style={{ 
            zIndex: listLength + 10,
            top: `calc(4rem + ${listLength} * 3.5rem)`,
            paddingBottom: '0px'
          }}
          data-reveal
        >
          <div className="h-14 flex items-center gap-4 px-6 lg:px-14 border-b border-line">
            {/* View All Text is always 100% opacity now */}
            <span className="text-[11px] tracking-[0.14em] text-muted opacity-100 transition-opacity duration-300">
              0{listLength + 1}
            </span>
            <h3 className="font-semibold tracking-wide uppercase text-sm md:text-base opacity-100 transition-opacity duration-300">
              {data.projects.seeAll.label}
            </h3>
            <a href={data.projects.seeAll.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-4 transition-colors hover:bg-ink hover:text-background group ml-auto md:ml-0">
              <SquareArrowOutUpRight size={12}/>
            </a>
          </div>
          <div className="h-[calc(78svh-7.5rem)] w-full bg-background" aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}