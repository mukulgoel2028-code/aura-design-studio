export default function Footer() {
  const keywordString =
    "Interior Design  ·  Space Planning  ·  Luxury Homes  ·  Commercial Design  ·  Home Styling  ·  3D Visualization  ·  Mumbai  ·  India  ·";
  const marqueeItems = [keywordString, keywordString, keywordString, keywordString];

  const studioLinks = [
    { name: "About", href: "#process" },
    { name: "Awards", href: "#trust-bar" },
    { name: "Journal", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ];

  const serviceLinks = [
    { name: "Residential", href: "#services" },
    { name: "Commercial", href: "#services" },
    { name: "Furniture", href: "#services" },
    { name: "3D Visualization", href: "#services" },
    { name: "Consultation", href: "#cta" },
  ];

  const connectLinks = [
    { name: "Contact Us", href: "#cta" },
    { name: "Instagram", href: "#instagram" },
    { name: "Pinterest", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "WhatsApp", href: "#" },
  ];

  return (
    <footer
      id="footer"
      className="w-full bg-[#111111] text-white pt-20 relative overflow-hidden"
    >
      {/* Top Branding & Links Block */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-16 flex flex-col lg:flex-row justify-between gap-12">
        {/* Left Brand Column */}
        <div className="lg:max-w-xs">
          <span className="font-display text-2xl text-white font-normal uppercase mb-2 block">
            STUDIO NAME
          </span>
          <p className="font-body text-[13px] text-text-muted">
            Crafting spaces since 2009
          </p>
        </div>

        {/* Right Link Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16">
          {/* Column 1: Studio */}
          <div>
            <span className="font-body text-[11px] text-gold tracking-[0.16em] uppercase mb-4 font-medium block">
              Studio
            </span>
            <ul className="space-y-1">
              {studioLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <span className="font-body text-[11px] text-gold tracking-[0.16em] uppercase mb-4 font-medium block">
              Services
            </span>
            <ul className="space-y-1">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <span className="font-body text-[11px] text-gold tracking-[0.16em] uppercase mb-4 font-medium block">
              Connect
            </span>
            <ul className="space-y-1">
              {connectLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scrolling Keyword Strip */}
      <div className="w-full border-t border-white/10 py-3 overflow-hidden bg-[#111111]">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {marqueeItems.map((item, idx) => (
            <span
              key={idx}
              className="font-body text-xs text-text-muted/80 whitespace-nowrap px-4 select-none"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 py-6 px-6 lg:px-12 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-text-muted text-center sm:text-left">
        <p>© 2026 Studio Name. All rights reserved.</p>
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <a
            href="#"
            className="hover:text-white/80 transition-colors duration-200 cursor-pointer"
          >
            Privacy Policy
          </a>
          <span>/</span>
          <a
            href="#"
            className="hover:text-white/80 transition-colors duration-200 cursor-pointer"
          >
            Terms
          </a>
          <span>/</span>
          <a
            href="#"
            className="hover:text-white/80 transition-colors duration-200 cursor-pointer"
          >
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
