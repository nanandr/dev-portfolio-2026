"use client";
import { PortfolioData } from "@/types/portfolio";
import { useEffect, useState } from "react";


export default function Footer({ data }: { data: PortfolioData }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: data.meta.timezone
    });
    
    setTime(fmt.format(new Date()));
    const interval = setInterval(() => setTime(fmt.format(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray border-t border-line px-6 lg:px-14 pt-8 pb-10 flex flex-wrap gap-y-4 gap-x-9 items-center justify-between text-xs text-muted relative z-50">
      <div>
        © {new Date().getFullYear()} · {data.meta.location} · <span>{time}</span> WIB
      </div>
      <div className="flex flex-wrap gap-5">
        {data.socials.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex gap-1 text-inherit no-underline text-[10.5px] tracking-[0.16em] uppercase transition-colors hover:text-accent">
            {s.label} ↗
          </a>
        ))}
      </div>
    </footer>
  );
}