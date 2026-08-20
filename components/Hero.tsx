"use client";

import { useRef, useEffect, useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import logoFrames from "@/components/ascii/logo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero({ data }: { data: PortfolioData }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const frames = logoFrames();

  // ASCII Animation Effect
  useEffect(() => {
    if (frames.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
    }, 400);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [frames.length]);

  // GSAP Animations
  useEffect(() => {
    // Scroll Animation Context (safely cleans up for React 18 Strict Mode)
    const ctx = gsap.context(() => {
      // 1. Scale up on scroll
      gsap.to(windowRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert(); // Cleanup GSAP instances
  }, []);

  // Mouse move flat translation effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!windowRef.current) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate mouse position relative to the center of the screen (-1 to 1)
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    // Translate the window by a max of 20 pixels
    gsap.to(windowRef.current, {
      x: xPos * 20,
      y: yPos * 20,
      duration: 1,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    // Reset position when mouse leaves
    if (!windowRef.current) return;
    gsap.to(windowRef.current, {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-svh flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 font-mono text-ink overflow-hidden"
    >
      {/* Application Window (Glassmorphism) */}
      <div
        ref={windowRef}
        className="w-full max-w-5xl flex flex-col shadow-2xl overflow-hidden border border-white/30 bg-background/20 backdrop-blur-xl"
      >
        {/* Titlebar */}
        <div className="flex items-center justify-center px-4 py-2.5 border-b border-white/20 bg-background/30 text-xs text-ink/70 select-none">
          <span className="font-semibold tracking-wider drop-shadow-sm">
            {data.meta.handle}
          </span>
        </div>

        {/* Terminal Content Area */}
        <div className="p-6 md:p-10 flex flex-col items-center justify-center overflow-x-auto min-h-[450px] bg-background/10">
          <pre className="whitespace-pre text-left text-[7px] sm:text-[9px] md:text-[11px] lg:text-[13px] leading-[1.05] text-ink drop-shadow-sm">
            {frames[currentFrame] || frames[0]}
          </pre>
        </div>
      </div>
    </section>
  );
}