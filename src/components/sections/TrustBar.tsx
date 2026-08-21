export default function TrustBar() {
  const publicationBadges = [
    "ELLE DECOR",
    "ARCHITECTURAL DIGEST",
    "ID AWARDS 2024",
    "DESIGN WEEK",
    "DESIGNLINES",
    "BETTER HOMES",
    "FHM DESIGN",
    "DEZEEN",
    "WALLPAPER*",
  ];

  return (
    <section
      id="trust-bar"
      className="w-full bg-cream border-y border-gold/25 py-4 min-h-[110px] flex flex-col justify-center overflow-hidden relative"
    >
      {/* Small Centered Label */}
      <span className="font-body text-[10px] tracking-[0.2em] text-text-muted uppercase text-center mb-3 font-medium">
        AS RECOGNISED BY
      </span>

      {/* Infinite Marquee Row */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        {/* Motion Track */}
        <div className="animate-marquee-25 flex items-center space-x-6 whitespace-nowrap pr-6 hover:[animation-play-state:paused]">
          {[...publicationBadges, ...publicationBadges].map((name, idx) => (
            <span
              key={`${name}-${idx}`}
              className="font-body text-xs uppercase tracking-wider text-charcoal/70 border border-charcoal/15 bg-white/50 px-3 py-1.5 rounded select-none whitespace-nowrap opacity-80 hover:opacity-100 hover:border-gold transition-all duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
