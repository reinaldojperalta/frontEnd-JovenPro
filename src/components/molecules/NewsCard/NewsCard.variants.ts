// ============================================================================
// NEWS CARD VARIANTS — Molécula de tarjeta de noticia
// ============================================================================

import { cva } from "class-variance-authority";

/** Variantes de la tarjeta de noticia */
export const newsCardVariants = cva(
    "group cursor-pointer rounded-2xl overflow-hidden bg-white border border-border/30 transition-all duration-500 ease-smooth hover:shadow-clay-active",
    {
        variants: {
            variant: {
                featured: "flex flex-col h-full",
                preview: "flex flex-row h-full",
                ghost: "flex flex-col h-full pointer-events-none",
            },
        },
        defaultVariants: {
            variant: "featured",
        },
    }
);

/** Contenedor de la imagen */
export const newsCardMediaVariants = cva("relative overflow-hidden", {
    variants: {
        variant: {
            featured: "relative h-72 sm:h-96 flex-shrink-0",
            preview: "relative w-2/5 flex-shrink-0",
            ghost: "hidden",
        },
    },
    defaultVariants: {
        variant: "featured",
    },
});

/** Imagen con hover scale */
export const newsCardImageVariants = cva(
    "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
);

/** Posición del badge de categoría */
export const newsCardBadgePositionVariants = cva("absolute top-4 left-4 z-10");

/** Contenido textual */
export const newsCardContentVariants = cva("flex flex-col", {
    variants: {
        variant: {
            featured: "p-8 flex-1 justify-between",
            preview: "w-3/5 p-6 justify-center",
            ghost: "hidden",
        },
    },
    defaultVariants: {
        variant: "featured",
    },
});

/** Fila de metadata (fecha + tiempo) */
export const newsCardMetaVariants = cva(
    "flex items-center gap-3 mb-3 text-sm text-muted-foreground"
);

/** Item individual de metadata */
export const newsCardMetaItemVariants = cva("flex items-center gap-1");

/** Separador punto */
export const newsCardMetaDotVariants = cva("w-1 h-1 rounded-full bg-border");

/** Título */
export const newsCardTitleVariants = cva(
    "font-headline font-bold text-secondary group-hover:text-primary transition-colors",
    {
        variants: {
            variant: {
                featured: "text-2xl mb-3",
                preview: "text-base leading-tight mb-2",
                ghost: "hidden",
            },
        },
        defaultVariants: {
            variant: "featured",
        },
    }
);

/** Excerpt / descripción */
export const newsCardExcerptVariants = cva(
    "font-body text-muted-foreground leading-relaxed",
    {
        variants: {
            variant: {
                featured: "text-sm",
                preview: "text-xs line-clamp-2",
                ghost: "hidden",
            },
        },
        defaultVariants: {
            variant: "featured",
        },
    }
);

/** Link "Leer artículo" / "Leer más" */
export const newsCardLinkVariants = cva(
    "inline-flex items-center gap-1 font-body font-semibold text-secondary group-hover:text-primary group-hover:gap-2 transition-all",
    {
        variants: {
            variant: {
                featured: "mt-6 text-xs uppercase tracking-wider",
                preview: "mt-3 text-xs hover:underline",
                ghost: "hidden",
            },
        },
        defaultVariants: {
            variant: "featured",
        },
    }
);

/** Icono del link */
export const newsCardLinkIconVariants = cva("w-4 h-4");

/** Badge de categoría (preview) */
export const newsCardCategoryBadgeVariants = cva("mb-2 w-max");

// --- GHOST CARD VARIANTS ---
export const newsCardGhostMediaVariants = cva("relative overflow-hidden", {
    variants: {
        variant: {
            featured: "h-72 sm:h-96 flex-shrink-0",
            preview: "w-2/5 flex-shrink-0",
        },
    },
    defaultVariants: {
        variant: "featured",
    },
});

export const newsCardGhostContentVariants = cva("flex flex-col justify-center", {
    variants: {
        variant: {
            featured: "p-8 flex-1",
            preview: "w-3/5 p-6",
        },
    },
    defaultVariants: {
        variant: "featured",
    },
});

export const newsCardGhostLineVariants = cva("h-4 skeleton-pulse skeleton-block rounded-sm");
export const newsCardGhostLineShortVariants = cva("h-4 w-2/3 skeleton-pulse skeleton-block rounded-sm");

// Tipos
export type NewsCardVariant = "featured" | "preview" | "ghost";