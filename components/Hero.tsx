
import { PortfolioData } from "@/types/portfolio";
import { ArrowDown } from "lucide-react";

export default function Hero({ data }: { data: PortfolioData }) {
  return (
    <section id="hero" className="min-h-svh flex flex-col pt-16 pb-6 px-6 lg:px-14">
      <div className="flex justify-end pt-8 w-full">
        <span className="flex items-center gap-2 text-[10.5px] tracking-[0.14em] uppercase text-muted">
          <i className="w-2 h-2 bg-accent animate-pulse"></i>
          {data.meta.availability}
        </span>
      </div>

      <div className="m-auto flex flex-col items-center gap-4" data-reveal>
        <img src={data.images.avatar} alt="avatar icon" className="w-24 h-24 object-contain grayscale active:scale-90" />
        <span className="text-[18px] font-medium font-[IBM_Plex_Mono] tracking-tight text-ink">{data.meta.handle}</span>
      </div>

      <div className="flex flex-wrap justify-between gap-y-2.5 gap-x-6 border-t border-line pt-3.5 w-full text-[11.5px] tracking-[0.14em] uppercase text-muted">
        <span>{data.hero.role}</span>
        <span className="flex items-center gap-2 animate-pulse">Scroll <ArrowDown size={12}/></span>
      </div>
    </section>
  );
}