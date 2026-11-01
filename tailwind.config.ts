import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        leaf: "#28533B",
        leafDark: "#183A29",
        cream: "#F4E8CE",
        parchment: "#FAF7F0",
        gold: "#B58A43",
        maroon: "#9B3F32",
      },
      fontFamily: {
        display: ["Playfair Display Variable", "Noto Sans Telugu", "Georgia", "serif"],
        sans: ["DM Sans Variable", "Noto Sans Telugu", "Arial", "sans-serif"],
        telugu: ["Noto Sans Telugu", "sans-serif"],
      },
      letterSpacing: {
        invitation: "0.22em",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(33, 41, 32, 0.14)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        sway: "sway 7s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
