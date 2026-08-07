import { PortfolioData } from "@/types/portfolio";


export default function Stack({ data }: { data: PortfolioData }) {
  return (
    <section id="stack" className="relative z-50 bg-[var(--bg)] py-[14vh] px-[var(--pad)]">
      <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-[var(--muted)] before:content-[''] before:w-6 before:h-[1px] before:bg-[var(--accent)]" data-reveal>
        {data.stack.label}
      </div>
      <h2 className="font-[IBM_Plex_Mono] font-bold tracking-tight leading-none text-[clamp(2.3rem,5.6vw,4.6rem)] mt-[18px]" data-reveal>
        {data.stack.title}
      </h2>
      <div className="flex flex-wrap gap-[clamp(22px,3vw,42px)] mt-[clamp(36px,7vh,70px)]">
        {data.stack.items.map((s, i) => (
          <div key={i} className="grid justify-items-center gap-2.5 w-[96px] group cursor-default" data-reveal>
            <div className="w-[88px] h-[88px] border border-[var(--ink)] grid place-items-center font-bold text-[1.05rem] tracking-tight transition-all duration-300 group-hover:bg-[var(--ink)] group-hover:text-[var(--gray)] group-hover:-translate-y-1.5">
              {s.abbr}
            </div>
            <div className="text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] text-center">{s.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}