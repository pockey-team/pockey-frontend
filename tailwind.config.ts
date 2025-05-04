import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      alert: {
        500: "#D91B45",
      },
      gray: {
        100: "#F9FAFD",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#202228",
        800: "#141214",
        900: "#030507",
      },
      primary: {
        500: "#C9DAFF",
      },
      white: "#FFFFFF",
    },
    fontSize: {
      display: ["32px", { lineHeight: "36px", fontWeight: "600" }],
      h1: ["24px", { lineHeight: "32px", fontWeight: "600" }],
      h2: ["20px", { lineHeight: "28px", fontWeight: "600" }],
      "subtitle-1": ["18px", { lineHeight: "24px", fontWeight: "700" }],
      "subtitle-2": ["18px", { lineHeight: "24px", fontWeight: "600" }],
      "subtitle-3": ["18px", { lineHeight: "24px", fontWeight: "500" }],
      "body-1": ["16px", { lineHeight: "24px", fontWeight: "700" }],
      "body-2": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      "body-3": ["14px", { lineHeight: "20px", fontWeight: "600" }],
      caption: ["12px", { lineHeight: "16px", fontWeight: "500" }],
    },
    screens: {
      mobile: "390px",
      desktop: "1024px",
    },
    spacing: {
      "0px": "0px",
      "2px": "2px",
      "4px": "4px",
      "8px": "8px",
      "12px": "12px",
      "16px": "16px",
      "20px": "20px",
      "24px": "24px",
      "32px": "32px",
      "40px": "40px",
      "48px": "48px",
      "52px": "52px",
      "56px": "56px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(168deg, #4F76C5 -17.08%, #D7ECFF 95.84%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
