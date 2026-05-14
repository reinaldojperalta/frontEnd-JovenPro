// ============================================================================
// BENTO GRID & ITEM VARIANTS — Sistema de layout unificado
// ============================================================================
// REFACTOR V4: Grid 16×9 para BentoCarousel
// - Layout carousel: usa clases CSS puras desde globals.css (bento-grid-v4)
// - Posiciones nombradas mapeadas a bento-slot-{position}
// - Nueva dimensión "type" para diferenciar producto / texto / control
// ============================================================================

import { cva } from "class-variance-authority";

/* ============================================================
 * BENTO GRID (Container)
 * ============================================================ */

export type BentoGridLayout = "standard" | "carousel" | "news";

export const bentoGridVariants = cva("grid w-full", {
    variants: {
        layout: {
            standard: "gap-4 md:gap-6",
            carousel: "bento-grid-v4",
            news: "grid-cols-1 md:grid-cols-3 gap-6",
        },
        cols: {
            1: "grid-cols-1",
            2: "grid-cols-1 md:grid-cols-2",
            3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            none: "",
        },
    },
    defaultVariants: {
        layout: "standard",
        cols: "none",
    },
});

/* ============================================================
 * BENTO ITEM (Slot)
 * ============================================================ */

export type BentoItemPosition =
    // Carousel V4 — 16×9 grid
    | "subtitle2"
    | "subtitle"
    | "history-1"
    | "history-2"
    | "history-3"
    | "history-4"
    | "hero"
    | "title"
    | "next"
    | "dots"
    | "catalogo"
    | "preview-2"
    | "preview-1"
    | "preview-max"
    // Legacy standard/news
    | "featured"
    | "compact";

export type BentoItemType = "product" | "text" | "control";
export type BentoItemBackground =
    | "transparent"
    | "surface"
    | "glass"
    | "primary"
    | "secondary"
    | "accent"
    | "surface-container"
    | "surface-container-low";

export type BentoItemSpan = 1 | 2 | 3 | "full";
export type BentoItemRowSpan = 1 | 2 | 3;
export type BentoItemRatio = "large" | "small" | "vertical" | "auto" | "square" | "portrait";

export const bentoItemVariants = cva(
    "relative overflow-hidden rounded-clay transition-all duration-500 ease-smooth min-h-0 min-w-0",
    {
        variants: {
            position: {
                // ── Carousel V4: 16×9 grid ──
                "subtitle2": "bento-slot-subtitle2",
                "subtitle": "bento-slot-subtitle",
                "history-1": "bento-slot-history-1",
                "history-2": "bento-slot-history-2",
                "history-3": "bento-slot-history-3",
                "history-4": "bento-slot-history-4",
                "hero": "bento-slot-hero",
                "title": "bento-slot-title",
                "next": "bento-slot-next",
                "dots": "bento-slot-dots",
                "catalogo": "bento-slot-catalogo",
                "preview-2": "bento-slot-preview-2",
                "preview-1": "bento-slot-preview-1",
                "preview-max": "bento-slot-preview-max",
                // ── Legacy standard/news ──
                "featured": "col-span-1 md:col-span-2 row-span-2",
                "compact": "col-span-1",
            },
            type: {
                product: "bg-transparent shadow-clay",
                text: "bg-surface shadow-clay flex items-center justify-center text-center",
                control: "bg-primary/5 shadow-clay z-30 !overflow-visible w-full h-full flex items-center justify-center",
            },
            colSpan: {
                1: "col-span-1",
                2: "col-span-1 md:col-span-2",
                3: "col-span-1 md:col-span-3",
                full: "col-span-1 md:col-span-full",
            },
            rowSpan: {
                1: "row-span-1",
                2: "row-span-2",
                3: "row-span-3",
            },
            ratio: {
                large: "aspect-bento-large",
                small: "aspect-bento-small",
                vertical: "aspect-bento-vertical",
                square: "aspect-bento-square",
                portrait: "aspect-bento-portrait",
                auto: "aspect-auto h-full",
            },
            isHistory: {
                true: "grayscale opacity-50 transition-all duration-300 cursor-pointer hover:grayscale-0 hover:opacity-100",
                false: "",
            },
            background: {
                transparent: "bg-transparent",
                surface: "bg-surface shadow-clay",
                glass: "bg-white/40 backdrop-blur-xl border border-white/50",
                primary: "bg-primary",
                secondary: "bg-secondary/10",
                accent: "bg-accent/10",
                "surface-container": "bg-surface-container",
                "surface-container-low": "bg-surface-container-low",
            },
        },
        defaultVariants: {
            position: undefined,
            type: "product",
            background: "transparent",
            ratio: "auto",
            isHistory: false,
        },
    }
);

/* ============================================================
 * Tipos exportados
 * ============================================================ */

export type BentoGridCols = 1 | 2 | 3 | 4;