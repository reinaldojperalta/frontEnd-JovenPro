// ============================================================================
// NEWS SECTION VARIANTS — Organismo de sección de noticias
// ============================================================================
// REFACTOR V3:
// - Grid CSS custom 6×6 via globals.css (layout puro)
// - NewsCard como molécula base
// - Zero Inline Policy
// ============================================================================

import { cva } from "class-variance-authority";

export const newsSectionVariants = cva("py-24 md:py-32 bg-surface-container-low");

export const newsSectionHeaderVariants = cva("mb-12 md:mb-16");

export const newsSectionTitleVariants = cva("mb-4");
export const newsSectionSubtitleVariants = cva("");

/** Wrapper del grid desktop (usa .news-grid-container de globals.css) */
export const newsSectionGridVariants = cva("news-grid-container hidden md:grid");

/** Estilos visuales del slot (colores, bordes, hover) */
export const newsSectionSlotVariants = cva("news-slot", {
    variants: {
        position: {
            featured: "",
            "preview-1": "",
            "preview-2": "",
            "preview-3": "",
        },
    },
    defaultVariants: {
        position: "featured",
    },
});

/** Paginación */
export const newsSectionPaginationVariants = cva(
    "flex justify-center mt-10 hidden md:flex"
);

/** Mobile */
export const newsSectionMobileScrollVariants = cva(
    "md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 hide-scrollbar"
);

export const newsSectionMobileItemVariants = cva(
    "snap-center shrink-0 w-[80vw] max-w-xs"
);

export const newsSectionMobileCardVariants = cva(
    "group cursor-pointer rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-col"
);

export const newsSectionMobileMediaVariants = cva(
    "h-56 overflow-hidden relative"
);

export const newsSectionMobileContentVariants = cva("p-6");