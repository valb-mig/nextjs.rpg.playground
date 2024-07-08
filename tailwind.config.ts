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
        primary: '#007AFF',
        danger: '#FF0000',
        warning: '#FFA500',
        info: '#007AFF',
        background: {
          default: '#0A0C10',
        },
        shade: {
          '1': '#44535E',
          '2': '#32414D',
          '3': '#232F3A',
          '4': '#151A23',
          '5': '#0A0C10',
          'ghost': '#161B24',
        },
        foreground: {
          '1': '#F4F8F9',
          '2': '#E0E3E4',
          '3': '#BEC6CA',
          '4': '#98A6AD',
        },
      },
    },
  },
  plugins: [],
};
export default config;
