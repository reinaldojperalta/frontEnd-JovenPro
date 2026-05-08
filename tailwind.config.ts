// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#00AEEF",
          dim: "#0284C7",
          subtle: "#E0F2FE",
        },
        secondary: {
          DEFAULT: "#2D2B52",
          light: "#3E3C66",
        },
        accent: {
          DEFAULT: "#FF6B6B",
          vibrant: "#F97056",
          strong: "#E85D5D",
          subtle: "#FFE5E5",
        },
        surface: {
          DEFAULT: "#F1F5F9",
          container: "#F8FAFC",
          "container-low": "#FFFFFF",
          variant: "#E2E8F0",
        },
        border: {
          DEFAULT: "#CBD5E1",
          subtle: "#E2E8F0",
        },
        muted: {
          DEFAULT: "#E2E8F0",
          foreground: "#64748B",
        },
        success: {
          DEFAULT: "#22C55E",
          subtle: "#DCFCE7",
        },
        danger: {
          DEFAULT: "#EF4444",
          subtle: "#FEE2E2",
        },
        warning: {
          DEFAULT: "#F59E0B",
          subtle: "#FEF3C7",
        },
      },
      fontFamily: {
        body: ["var(--font-Inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        headline: ["var(--font-montserrat)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        'clay': '1rem',
        'clay-sm': '0.75rem',
        'clay-lg': '1.5rem',
      },
      boxShadow: {
        'clay': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'clay-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'clay-active': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      },
      // ============================================
      // 👇 NUEVOS TOKENS V3 — BENTO CAROUSEL
      // ============================================
      aspectRatio: {
        'bento-large': '4/3',      // CardFull (Hero) — 4 cols × 4 rows lógicas
        'bento-vertical': '3/4',     // CardMin (Vertical) — 2 cols × 4 rows
        'bento-horizontal': '16/9',  // CardPreviewMax — 3 cols × 2 rows
        'bento-small': '1/1',        // CardPreview — 2 cols × 2 rows
        'bento-history': '1/1',      // HistorySlot — 1×1
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fadein 0.3s ease-in',
      }
    },
  },
  plugins: [],
};

export default config;