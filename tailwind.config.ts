import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    colors: {
      redead: "#780000",
      littleRed: "#C1121F",
      dirtyWhite: "#FDF0D5",
      blueMarinho: "#003049",
      babyBlue: "#669BBC",
    },
  },
  plugins: [],
} satisfies Config;
