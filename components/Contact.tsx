"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PortfolioData } from "@/types/portfolio";
import arrowFrames from "@/components/ascii/arrow";
import letsChatFrames from "@/components/ascii/lets-chat";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ data }: { data: PortfolioData }) {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [chatFrame, setChatFrame] = useState(0);
  
  const arrowIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatIntervalRef = useRef<NodeJS.Timeout | null>(null); // New ref for the chat animation
  const contactRef = useRef<HTMLElement>(null);
  const frames = arrowFrames();
  const chatFrames = letsChatFrames();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Reusable function to play/replay the chat animation
  const playChatAnimation = useCallback(() => {
    if (chatFrames.length === 0) return;

    // Clear existing interval if the user clicks while it's already running
    if (chatIntervalRef.current) {
      clearInterval(chatIntervalRef.current);
    }

    setChatFrame(0); // Reset to the first frame
    let currentStep = 0;
    const totalSteps = chatFrames.length - 1;

    chatIntervalRef.current = setInterval(() => {
      currentStep++;
      setChatFrame(currentStep);
      if (currentStep >= totalSteps) {
        if (chatIntervalRef.current) clearInterval(chatIntervalRef.current);
        chatIntervalRef.current = null;
      }
    }, 500);
  }, [chatFrames.length]);

  // Cleanup chat interval on unmount
  useEffect(() => {
    return () => {
      if (chatIntervalRef.current) clearInterval(chatIntervalRef.current);
    };
  }, []);

  // ASCII Arrow Animation Effect (infinite loop)
  useEffect(() => {
    if (frames.length === 0) return;

    arrowIntervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
    }, 350);

    return () => {
      if (arrowIntervalRef.current) {
        clearInterval(arrowIntervalRef.current);
      }
    };
  }, [frames.length]);

  // GSAP ScrollTrigger for Let's Chat ASCII animation (runs once natively)
  useEffect(() => {
    if (!contactRef.current || chatFrames.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          playChatAnimation();
        },
      });
    }, contactRef);

    return () => ctx.revert();
  }, [chatFrames.length, playChatAnimation]);

  const handleCopy = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(data.meta.email);
    setMousePos({ x: e.clientX, y: e.clientY });
    setCopied(true);
    
    // Trigger the animation replay on click
    playChatAnimation();
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="relative z-50 bg-background pt-28 lg:pt-36 pb-28 px-6 lg:px-14 overflow-hidden"
    >
      <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-muted before:content-[''] before:w-6 before:h-px before:bg-accent" data-reveal>
        {data.contact.label}
      </div>
      
      <p className="mt-6 text-sm text-muted font-mono" data-reveal>{data.contact.kicker}</p>
      
      <button 
        onClick={handleCopy} 
        className="flex flex-col lg:flex-row lg:items-center gap-6 md:gap-12 mt-10 md:mt-16 w-max max-w-full group cursor-pointer text-left appearance-none bg-transparent border-none p-0" 
        data-reveal
      >
        {/* LET'S CHAT ASCII art */}
        <pre className="whitespace-pre text-left text-[5px] sm:text-[7px] md:text-[9.5px] lg:text-[11px] leading-[1.02] font-mono text-ink group-hover:text-accent transition-colors">
          {chatFrames[chatFrame] || chatFrames[chatFrames.length - 1]}
        </pre>
        
        {/* ASCII Arrow Container */}
        <div className="flex items-center justify-center p-2 transition-transform duration-500 ease-out group-hover:translate-x-6">
          <pre className="whitespace-pre text-left text-[9px] sm:text-[11px] md:text-[13px] leading-[1.05] font-mono font-bold text-ink group-hover:text-accent transition-colors">
            {frames[currentFrame] || frames[0]}
          </pre>
        </div>
      </button>
      
      <p className="mt-8 text-sm text-muted font-mono" data-reveal>
        <button 
          onClick={handleCopy} 
          className="text-ink hover:underline cursor-pointer appearance-none bg-transparent border-none p-0"
        >
          {data.meta.email_display || data.meta.email}
        </button>
      </p>

      {/* Instant Toast Notification */}
      <div 
        className={`fixed bg-ink text-background px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase font-mono font-semibold z-[100] border border-ink pointer-events-none ${
          copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        style={{
          left: `${Math.min(mousePos.x + 16, windowDimensions.width - 220)}px`,
          top: `${Math.min(mousePos.y + 16, windowDimensions.height - 60)}px`,
        }}
      >
        Email copied to clipboard
      </div>
    </section>
  );
}