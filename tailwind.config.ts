import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: '#307629',
        gray1: '#A1A298',
        gray2: '#B7BEB8',
        black: '#24221D',
        white: '#F6F7F5',
      },
    },
  },
  plugins: [],
};
export default config;
