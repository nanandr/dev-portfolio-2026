"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioData } from "@/types/portfolio";

gsap.registerPlugin(ScrollTrigger);

function JourneyRow({ j, i }: { j: any, i: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Set Initial States
      gsap.set(overlayRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(yearRef.current, { color: "var(--ink)" });

      // 2. Create directional ScrollTrigger
      ScrollTrigger.create({
        trigger: rowRef.current,
        start: "top 55%",
        end: "bottom 45%",
        
        // SCROLLING DOWN INTO CENTER
        onEnter: () => {
          gsap.to(yearRef.current, { color: "var(--accent)", duration: 0.6, ease: "power2.out", overwrite: true });
          gsap.to(overlayRef.current, { clipPath: "inset(100% 0% 0% 0%)", duration: 0.7, ease: "power2.inOut", overwrite: true });
        },
        
        // SCROLLING DOWN PAST CENTER
        onLeave: () => {
          gsap.to(yearRef.current, { color: "var(--ink)", duration: 0.6, ease: "power2.out", overwrite: true });
          gsap.fromTo(overlayRef.current, 
            { clipPath: "inset(0% 0% 100% 0%)" }, 
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.inOut", overwrite: true }
          );
        },
        
        // SCROLLING UP BACK INTO CENTER
        onEnterBack: () => {
          gsap.to(yearRef.current, { color: "var(--accent)", duration: 0.6, ease: "power2.out", overwrite: true });
          gsap.to(overlayRef.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power2.inOut", overwrite: true });
        },
        
        // SCROLLING UP PAST CENTER
        onLeaveBack: () => {
          gsap.to(yearRef.current, { color: "var(--ink)", duration: 0.6, ease: "power2.out", overwrite: true });
          gsap.fromTo(overlayRef.current, 
            { clipPath: "inset(100% 0% 0% 0%)" }, 
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.inOut", overwrite: true }
          );
        }
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-line items-stretch group" 
      {...(i < 2 ? { "data-reveal": true } : {})}
    >
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start py-8 md:py-12 pr-4 md:pr-10 text-ink">
        <div 
          ref={yearRef} 
          className="font-[IBM_Plex_Mono] text-2xl md:text-4xl font-bold tracking-tight w-25 lg:w-39 shrink-0 transition-colors"
        >
          {j.year}
        </div>
        <div className="flex flex-col gap-6">
          {j.roles.map((r: any, idx: number) => (
            <div key={idx} className="flex flex-col gap-1.5 transition-opacity duration-300">
              <div className="font-semibold text-[1.05rem]">
                <span>{r.title}</span> <span className="text-muted font-normal">@ {r.org}</span>
              </div>
              <div className="text-body text-[0.9rem] max-w-[42ch]">{r.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-full min-h-[250px] relative overflow-hidden bg-background">
        <img
          src={j.image} 
          alt={`Experience in ${j.year}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-white/50 backdrop-grayscale z-10 pointer-events-none" 
        />
      </div>
    </div>
  );
}

export default function About({ data }: { data: PortfolioData }) {
  const [showAll, setShowAll] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current && contentRef.current.scrollHeight > 520) {
        setNeedsExpansion(true);
      } else {
        setNeedsExpansion(false);
      }
    };

    const timer = setTimeout(checkHeight, 150);
    window.addEventListener("resize", checkHeight);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkHeight);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 750); 
    return () => clearTimeout(timer);
  }, [showAll]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        portraitImgRef.current,
        { filter: "blur(24px)", opacity: 0.6 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, portraitRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-20 lg:py-28 px-6 lg:px-14 w-full">
      <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-muted before:content-[''] before:w-6 before:h-px before:bg-accent" data-reveal>
        {data.about.label}
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-10 lg:gap-16 items-start mt-10">
        <div className="text-ink flex-1">
          <h2 className="font-[IBM_Plex_Mono] font-bold tracking-tight leading-none text-4xl md:text-6xl mt-4 mb-6" data-reveal>
            {data.about.title}
          </h2>
          {data.about.body.map((p, i) => (
            <p key={i} className="max-w-[54ch] text-body mb-4 text-base md:text-lg leading-relaxed" data-reveal dangerouslySetInnerHTML={{ __html: p }} />
          ))}

          {/* Social Links Buttons */}
          <div className="flex flex-wrap gap-4 mt-8" data-reveal>
            {data.socials.map((s, i) => (
              <a 
                key={i} 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="border border-line text-ink px-4 py-2 text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors hover:bg-ink hover:text-background hover:border-ink flex items-center gap-1.5"
              >
                {s.label} <span className="font-normal text-[10px]">↗</span>
              </a>
            ))}
          </div>
        </div>
        
        <figure ref={portraitRef} className="bg-gray p-3 w-full md:w-auto shrink-0 overflow-hidden" data-reveal>
          <img 
            ref={portraitImgRef}
            src={data.images.portrait} 
            alt="Portrait" 
            className="w-full md:max-w-xs aspect-3/4 object-cover"
          />
          <figcaption className="flex justify-between gap-3 pt-2.5 text-[10.5px] tracking-[0.12em] uppercase text-muted">
            <span>{data.about.portraitCaption[0]}</span>
            <span>{data.about.portraitCaption[1]}</span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-20 lg:mt-32 relative">
        <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-muted before:content-[''] before:w-6 before:h-px before:bg-accent" data-reveal>
          {data.about.journeyTitle}
        </div>
        
        <div 
          ref={contentRef}
          className={`mt-8 border-t border-line relative overflow-hidden transition-[max-height] duration-700 ease-in-out ${
            !showAll && needsExpansion ? "max-h-130" : "max-h-[8000px]"
          }`}
        >
          {data.about.journey.map((j, i) => (
            <JourneyRow 
              key={i} 
              j={j} 
              i={i} 
            />
          ))}

          {!showAll && needsExpansion && (
            <>
              <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-background to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <button 
                  onClick={() => setShowAll(true)}
                  className="border border-ink bg-background text-ink px-7 py-3 text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors hover:bg-ink hover:text-background cursor-pointer shadow-md"
                >
                  See all
                </button>
              </div>
            </>
          )}
        </div>

        {showAll && needsExpansion && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={() => {
                setShowAll(false);
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[11px] tracking-[0.16em] uppercase text-muted border-b border-transparent hover:border-muted transition-colors pb-1 cursor-pointer"
            >
              Show less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}