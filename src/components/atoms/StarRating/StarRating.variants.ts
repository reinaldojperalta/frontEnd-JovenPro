// ============================================================================
// STAR RATING VARIANTS — Átomo de calificación visual
// ============================================================================
// REFACTOR V3:
// - Archivo creado (no existía). Extrae todo el CSS inline del .tsx.
// - starRatingVariants: contenedor flex del componente.
// - starIconVariants: cada icono Star de lucide-react, con size + state.
//   • state "filled" → text-secondary (navy marca)
//   • state "empty" → text-surface-variant (gris sutil)
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

/** Contenedor del rating (wrapper flex) */
export const starRatingVariants = cva("flex items-center gap-0.5");

/** Icono individual de estrella */
export const starIconVariants = cva("fill-current", {
    variants: {
        size: {
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6",
        },
        state: {
            filled: "text-secondary",
            empty: "text-surface-variant",
        },
    },
    defaultVariants: {
        size: "sm",
        state: "empty",
    },
});

// Tipos derivados del CVA — sincronización automática
export type StarRatingSize = NonNullable<
    Parameters<typeof starIconVariants>[0]
>["size"];