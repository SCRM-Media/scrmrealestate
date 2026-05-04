import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "re-blue": "#1C3A5E",
        "re-ivory": "#F8F6F1",
        "re-ink": "#1A1A1A",
        "re-stone": "#8A8680",
        "re-stone-light": "#E8E5DF",
        "re-blue-accent": "#3B6FAA",
        "re-blue-light": "#EDF2F8",
        "re-gold-thin": "#C4A96C",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
