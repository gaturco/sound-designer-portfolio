import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./client/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E1F22",
        secondary: "#4A4B4E",
        cream: "#EBE7D9",
        orange: "#7EA69D",
        brown: "#7EA69D",
        accent: "#7EA69D",
      },
    },
  },
  plugins: [],
};

export default config;
