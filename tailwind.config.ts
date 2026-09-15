import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#141210",        // near-black charcoal, base text/bg
        parchment: "#F7F2E9",  // warm ivory background
        brass: "#B08D4F",      // muted gold/brass accent
        brassLight: "#D8BC85",
        wine: "#6E2A2E",       // deep burgundy accent
        stone: "#A79C86",      // muted taupe for secondary text
        line: "#E4DCC9",       // hairline border on light bg
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        soft: "0 12px 30px -12px rgba(20,18,16,0.25)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
