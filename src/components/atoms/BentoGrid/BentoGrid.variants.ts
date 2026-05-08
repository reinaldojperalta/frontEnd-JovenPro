// ============================================================================
// BENTO GRID VARIANTS — Layout tokens para grid masonry/bento
// ============================================================================
// REFACTOR V3:
// - Corregidos tokens de aspect-ratio fantasmas:
//   • "aspect-bento-square"  → "aspect-bento-small"  (1/1)
//   • "aspect-bento-portrait" → "aspect-bento-vertical" (3/4)
//   Estos tokens no existían en tailwind.config.ts y rompían el build silenciosamente.
// - bg-surface, shadow-clay, rounded-clay: validados contra paleta V3.
// ============================================================================

import { cva } from "class-variance-authority";

/** Número de columnas del grid (responsive por defecto) */
export type BentoGridCols = 1 | 2 | 3 | 4;

/** Variantes del contenedor grid */
export const bentoGridVariants = cva(
    "grid w-full gap-4 md:gap-6",
    {
        variants: {
            cols: {
                1: "grid-cols-1",
                2: "grid-cols-1 md:grid-cols-2",
                3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            },
        },
        defaultVariants: {
            cols: 3,
        },
    }
);

/** Cuántas columnas ocupa un item (responsive) */
export type BentoItemSpan = 1 | 2 | 3 | "full";

/** Ratio de aspecto del item. Mapea a tokens definidos en tailwind.config.ts */
export type BentoItemRatio = "large" | "small" | "vertical" | "auto";

/** Variantes de cada celda del bento */
export const bentoItemVariants = cva(
    "relative overflow-hidden rounded-clay bg-surface shadow-clay transition-all duration-500 ease-smooth hover:shadow-clay-active",
    {
        variants: {
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
                large: "aspect-bento-large",      // 4/3 — Hero cards
                small: "aspect-bento-small",        // 1/1 — Cuadrados (reemplaza "square")
                vertical: "aspect-bento-vertical",  // 3/4 — Portrait cards (reemplaza "portrait")
                auto: "aspect-auto h-full",         // Sin forzar ratio, fill disponible
            },
        },
        defaultVariants: {
            colSpan: 1,
            rowSpan: 1,
            ratio: "auto",
        },
    }
);