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

export const NEWS_SPRING = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
};

export const NEWS_DIRECTIONS = {
    up: {
        enter: { y: 60, opacity: 0 },
        exit: { y: -60, opacity: 0 },
    },
    down: {
        enter: { y: -60, opacity: 0 },
        exit: { y: 60, opacity: 0 },
    },
};

export type NewsSlotVariant = "featured" | "preview-1" | "preview-2" | "preview-3";

export type NewsSlotKind = "news" | "allies";

export interface NewsSlotConfig {
    id: string;
    variant: NewsSlotVariant;
    /** Índice en la página de noticias; ignorado si kind === "allies" */
    offset: number;
    delay: number;
    gridClass: string;
    kind?: NewsSlotKind;
}

export const NEWS_SLOTS: NewsSlotConfig[] = [
    { id: "featured", variant: "featured", offset: 0, delay: 0, gridClass: "news-slot-featured", kind: "news" },
    { id: "preview-1", variant: "preview-1", offset: 1, delay: 0.1, gridClass: "news-slot-preview-1", kind: "news" },
    { id: "preview-2", variant: "preview-2", offset: 2, delay: 0.15, gridClass: "news-slot-preview-2", kind: "news" },
    { id: "preview-3", variant: "preview-3", offset: -1, delay: 0, gridClass: "news-slot-preview-3", kind: "allies" },
];

/** Noticias rotativas por página (sin el slot estático de alianzas) */
export const NEWS_ITEMS_PER_PAGE = 3;