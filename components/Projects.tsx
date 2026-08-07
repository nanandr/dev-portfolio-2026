import siteData from "@/data/portfolio.json";
import { SquareArrowOutUpRight } from "lucide-react";

export default function Projects() {
  const listLength = siteData.projects.list.length;

  return (
    <section id="projects" className="py-24">
      <div className="px-6 lg:px-14 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-50 bg-background">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-muted before:content-[''] before:w-6 before:h-px before:bg-accent" data-reveal>
            {siteData.projects.label}
          </div>
          <h2 className="font-[IBM_Plex_Mono] font-bold tracking-tight leading-none text-4xl md:text-6xl mt-4 text-ink" data-reveal>
            {siteData.projects.title}
          </h2>
        </div>
        <div className="text-[11px] tracking-[0.16em] uppercase text-muted whitespace-nowrap pb-2">
          {siteData.projects.hint}
        </div>
      </div>

      {/* STACK CONTAINER */}
      <div className="relative">
        
        {/* Regular Project Cards */}
        {siteData.projects.list.map((p, idx) => (
          <article
            key={idx}
            className={`sticky bg-[var(--card-bg)] text-[var(--card-ink)] border-t border-[var(--card-ink)] t-${p.theme}`}
            style={{ 
              zIndex: idx + 10,
              // Offset uses rems to match Tailwind sizing (4rem = h-16 nav, 3.5rem = h-14 bar)
              top: `calc(4rem + ${idx} * 3.5rem)`,
              paddingBottom: `calc((${listLength} - ${idx}) * 3.5rem)`
            }}
            data-reveal
          >
            <div className="h-14 flex items-center gap-4 px-6 lg:px-14 border-b border-[var(--card-line)]">
              <span className="text-[11px] tracking-[0.14em] text-[var(--card-mut)]">0{idx + 1}</span>
              <h3 className="font-semibold tracking-wide uppercase text-sm md:text-base">{p.name}</h3>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-4 transition-colors hover:bg-[var(--card-ink)] hover:text-[var(--card-bg)] group">
                <SquareArrowOutUpRight size={12}/>
              </a>
            </div>
            <div className="flex flex-wrap-reverse md:flex-nowrap md:gap-8 lg:gap-20 items-center px-6 lg:px-14 h-[calc(78svh-7.5rem)] overflow-hidden">
              <div className="w-full md:flex-1">
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

              <div className="w-full md:flex-1 overflow-hidden group self-center">
                <img
                  src={p.image}
                  alt={`${p.name} — visual`}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </article>
        ))}

        {/* SEE ALL "CARD" */}
        <article
          className="sticky bg-background text-ink border-t border-ink"
          style={{ 
            zIndex: listLength + 10,
            top: `calc(4rem + ${listLength} * 3.5rem)`,
            paddingBottom: '0px'
          }}
          data-reveal
        >
          <div className="h-14 flex items-center gap-4 px-6 lg:px-14 border-b border-line">
            <span className="text-[11px] tracking-[0.14em] text-muted">
              0{listLength + 1}
            </span>
            <h3 className="font-semibold tracking-wide uppercase text-sm md:text-base">
              {siteData.projects.seeAll.label}
            </h3>
            <a href={siteData.projects.seeAll.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-4 transition-colors hover:bg-ink hover:text-background group">
              <SquareArrowOutUpRight size={12}/>
            </a>
          </div>
          {/* Matches the body height of the standard cards to ensure the visual mask covers them during scroll */}
          <div className="h-[calc(78svh-7.5rem)] w-full bg-background" aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}