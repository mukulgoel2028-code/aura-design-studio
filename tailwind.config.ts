import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        cream: "#FAF7F2",
        "off-white": "#F5F0E8",
        charcoal: "#1A1A1A",
        "deep-warm": "#2D2B27",
        gold: "#C9A96E",
        sage: "#8FA68B",
        "text-muted": "#7A7570",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
