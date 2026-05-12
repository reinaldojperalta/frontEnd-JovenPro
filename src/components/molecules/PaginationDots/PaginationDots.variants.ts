// ============================================================================
// PAGINATION DOTS VARIANTS — Molécula de paginación por puntos
// ============================================================================
// REFACTOR V3:
// - Nuevos CVA exportados para eliminar inline del .tsx:
//   • paginationDotWrapperVariants: "relative flex items-center justify-center"
//   • paginationDotTooltipVariants: tooltip de preview con posicionamiento,
//     colores, tipografía y animación
//   • paginationDotTooltipArrowVariants: flecha del tooltip
// - paginationDotVariants base: agregado "relative" (antes inline en button).
// - Tokens validados:
//   • bg-foreground, text-background: existen en paleta V3
//   • bg-surface-variant, hover:bg-border: existen
//   • animate-fade-in: definido en tailwind.config.ts
// - text-[10px]: patrón recurrente en el proyecto (Badge sm, Text overline).
//   Se mantiene como utilitario arbitrario aceptado para tamaños menores a xs.
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

export const paginationDotsContainerVariants = cva(
    "flex items-center justify-center gap-2",
    {
        variants: {
            size: {
                compact: "gap-3",
                standard: "gap-2",
            },
        },
        defaultVariants: {
            size: "standard",
        },
    }
);

export const paginationDotVariants = cva(
    "relative rounded-full transition-all duration-300 ease-smooth cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    {
        variants: {
            active: {
                true: "bg-primary",
                false: "bg-muted-foreground/50 hover:bg-primary-dim",
            },
            size: {
                compact: "h-3 w-3",
                standard: "h-2",
            },
        },
        compoundVariants: [
            { active: true, size: "compact", class: "w-8" },
            { active: true, size: "standard", class: "w-6" },
            { active: false, size: "compact", class: "w-3" },
            { active: false, size: "standard", class: "w-2" },
        ],
        defaultVariants: {
            active: false,
            size: "standard",
        },
    }
);

/** Wrapper de cada dot (contiene tooltip + button). */
export const paginationDotWrapperVariants = cva(
    "relative flex items-center justify-center"
);

/** Tooltip de preview al hacer hover. */
export const paginationDotTooltipVariants = cva(
    "absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg bg-foreground text-background text-[10px] font-bold whitespace-nowrap shadow-xl pointer-events-none animate-fade-in"
);

/** Flecha del tooltip (triángulo CSS via rotate). */
export const paginationDotTooltipArrowVariants = cva(
    "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"
);

// Tipos derivados del CVA — sincronización automática
export type PaginationDotsSize = NonNullable<
    Parameters<typeof paginationDotsContainerVariants>[0]
>["size"];