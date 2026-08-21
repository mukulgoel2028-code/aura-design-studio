export default function Marquee() {
  const manifestoItems = [
    "SPACE • HARMONY • LIGHT • MATERIALITY",
    "“Simplicity is about subtracting the obvious and adding the meaningful.”",
    "BESPOKE ARCHITECTURE & TIMELESS CRAFT",
    "“Architecture is the learned game, correct and magnificent, of forms assembled in the light.”",
    "HONED STONE • PATINATED BRONZE • SMOKED OAK • TACTILE LINEN",
  ];

  return (
    <section
      id="marquee"
      className="w-full bg-deep-warm py-8 md:py-10 overflow-hidden text-cream border-y border-white/10"
    >
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap">
          {[...manifestoItems, ...manifestoItems].map((item, idx) => (
            <div key={idx} className="inline-flex items-center space-x-8 px-4">
              <span className="font-display text-xl md:text-3xl tracking-wide text-cream/90 font-normal">
                {item}
              </span>
              <span className="text-gold text-xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
