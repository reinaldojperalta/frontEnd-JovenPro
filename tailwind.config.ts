// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
          light: "rgba(241, 245, 249, 0.61)",
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
        // ============================================
        // Tokens de texto sobre superficies (Material Design "on-*")
        // ============================================
        "on-surface": "#1E293B",          // texto sobre bg-surface (#F1F5F9) — slate-800, contraste 12.5:1
        "on-surface-variant": "#64748B",  // texto secundario/muted sobre surface — slate-500, contraste 4.7:1
        // Nota: border-surface-variant NO es ghost token —
        // se genera automáticamente desde surface.variant (#E2E8F0)
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
        'bento-square': '1/1',       // BentoItem ratio:square — cuadrado genérico
        'bento-portrait': '2/3',     // BentoItem ratio:portrait — retrato (más alto que ancho)
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