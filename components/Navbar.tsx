"use client";
import { PortfolioData } from "@/types/portfolio";
import { useEffect, useState } from "react";


export default function Navbar({ data }: { data: PortfolioData }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-14 sm:h-16 z-50 flex items-center justify-between px-6 lg:px-14 border-b transition-all duration-300 ease-in-out ${
        scrolled ? "bg-background/90 backdrop-blur-md border-line" : "bg-transparent border-transparent"
      }`}
    >
      <a href="/" className="flex items-center gap-2.5 text-inherit no-underline">
        <img src={data.images.avatar} className="w-8 h-8 object-contain" />
      </a>
      <nav>
        <ul className="flex gap-4 md:gap-8 list-none">
          {data.nav.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className="text-[11px] tracking-[0.16em] uppercase text-ink py-1.5 relative group transition-colors"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-full h-px bg-accent scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}