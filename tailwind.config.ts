import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

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
        300: "#EEF4FF",
        400: "#D5E3FF",
        500: "#C9DAFF",
        600: "#72AAFF",
      },
      white: "#FFFFFF",
      kakao: "#FEDC00",
      "sign-in": "#f9fafd",
    },
    fontSize: {
      // Display
      "display-32-semibold": [
        "32px",
        { lineHeight: "42px", fontWeight: "600" },
      ],
      // Heading
      "heading-24-semibold": [
        "24px",
        { lineHeight: "34px", fontWeight: "600" },
      ],
      "heading-22-semibold": [
        "22px",
        { lineHeight: "30px", fontWeight: "600" },
      ],
      "heading-20-semibold": [
        "20px",
        { lineHeight: "28px", fontWeight: "600" },
      ],
      // SubTitle
      "subtitle-18-bold": ["18px", { lineHeight: "24px", fontWeight: "700" }],
      "subtitle-18-semibold": [
        "18px",
        { lineHeight: "26px", fontWeight: "600" },
      ],
      "subtitle-18-medium": ["18px", { lineHeight: "26px", fontWeight: "500" }],
      "subtitle-16-semibold": [
        "16px",
        { lineHeight: "22px", fontWeight: "600" },
      ],
      // Body
      "body-16-bold": ["16px", { lineHeight: "24px", fontWeight: "700" }],
      "body-16-regular": ["16px", { lineHeight: "22px", fontWeight: "400" }],
      "body-14-regular": ["14px", { lineHeight: "25px", fontWeight: "400" }],
      "body-14-medium": ["14px", { lineHeight: "20px", fontWeight: "500" }],
      "body-14-semibold": ["14px", { lineHeight: "20px", fontWeight: "600" }],
      "body-13-semibold": ["13px", { lineHeight: "18px", fontWeight: "600" }],
      // Caption
      "caption-12-medium": ["12px", { lineHeight: "20px", fontWeight: "500" }],
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
      screens: {
        mobile: "390px",
        desktop: "1024px",
        "ipad-pro": { min: "1024px", max: "1366px" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(168deg, #4F76C5 -17.08%, #D7ECFF 95.84%)",
        "gradient-secondary":
          "linear-gradient(168deg, #1A90E0 -17.08%, #5ECBFF 95.84%)",
        "gradient-card": "linear-gradient(168deg, #F5F8FF 40%, #CCDCFF 100%)",
        "gradient-recommendation":
          "linear-gradient(168deg, #141214 -17.08%, #2F3E60 95.84% )",
        "gradient-summary-card":
          "linear-gradient(168deg, #F5F8FF 90%, #CCDCFF 100%)",
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
      transitionProperty: {
        spacing: "margin, padding",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addUtilities }: PluginAPI) => {
      const newUtilities = {
        ".perspective-1000px": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
