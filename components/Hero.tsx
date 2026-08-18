import { useRef, useEffect, useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import logoFrames from "@/components/ascii/logo";

export default function Hero({ data }: { data: PortfolioData }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const frames = logoFrames();

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

  return (
    <section id="hero" className="min-h-svh flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-white font-mono text-ink">
      
      {/* Application Window */}
      <div className="w-full max-w-5xl border border-line bg-bone flex flex-col shadow-sm">
        
        {/* Titlebar */}
        <div className="flex items-center justify-center px-4 py-2.5 border-b border-line bg-gray text-xs text-muted select-none">
          <span className="font-semibold tracking-wider">
            {data.meta.handle}
          </span>
        </div>

        {/* Terminal Content Area */}
        <div className="p-6 md:p-10 flex flex-col items-center justify-center overflow-x-auto min-h-[450px] bg-white">
          <pre className="whitespace-pre text-left text-[7px] sm:text-[9px] md:text-[11px] lg:text-[13px] leading-[1.05] text-ink">
            {frames[currentFrame] || frames[0]}
          </pre>
        </div>

      </div>

    </section>
  );
}
