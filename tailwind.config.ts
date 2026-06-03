import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#4ECDC4",
          "teal-dark": "#3ab5ac",
          "teal-light": "#7edad5",
          dark: "#1a1a1a",
          "dark-card": "#252525",
          "dark-card-2": "#2e2e2e",
          "dark-section": "#1c1c1c",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "marble-dark":
          "radial-gradient(ellipse at 15% 40%, rgba(255,255,255,0.04) 0%, transparent 45%), radial-gradient(ellipse at 85% 20%, rgba(255,255,255,0.03) 0%, transparent 35%), radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.025) 0%, transparent 40%), radial-gradient(ellipse at 70% 60%, rgba(80,80,80,0.15) 0%, transparent 50%)",
        "gradient-teal": "linear-gradient(135deg, #0d4f4f 0%, #0a3a3a 50%, #051e1e 100%)",
        "gradient-hero": "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      screens: {
        xs: "375px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
    },
  },
  plugins: [],
};

export default config;
