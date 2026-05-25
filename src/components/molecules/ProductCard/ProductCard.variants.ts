/**
 * PRODUCT CARD VARIANTS
 * Final refinements for Family-based architecture (Material Design vs Glass Thumbnail)
 */

import { cva } from "class-variance-authority";

export const productCardVariants = cva(
    "relative overflow-hidden group cursor-pointer transition-all duration-500 ease-smooth",
    {
        variants: {
            variant: {
                "card-full": "h-full flex flex-col rounded-clay bg-muted-light shadow-clay",
                "card-min": "h-full flex flex-col rounded-clay bg-muted-light shadow-clay",
                "card-preview-max": "relative rounded-clay bg-surface shadow-clay h-full",
                "card-preview": "relative rounded-clay bg-surface shadow-clay h-full",
                "history-slot": "relative rounded-clay-sm bg-surface shadow-clay-sm grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 h-full",
                "editorial": "flex-shrink-0 w-[calc(100vw-48px)] md:w-[240px] bg-white transition-transform duration-300 ease-smooth hover:-translate-y-1 h-full flex flex-col",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

// --- Header (Used by card-min) ---
export const productCardHeaderVariants = cva("flex items-center gap-3 px-4 pt-4 pb-2 flex-shrink-0");

// --- Media/Image Wrappers ---
export const productCardMediaVariants = cva("relative overflow-hidden", {
    variants: {
        variant: {
            "card-full": "flex-1 min-h-0",
            "card-min": "flex-1 min-h-0",
            "card-preview-max": "aspect-square",
            "card-preview": "aspect-square",
            "history-slot": "aspect-square",
        },
    },
    defaultVariants: {
        variant: "card-preview",
    },
});

export const productCardFullMediaVariants = cva("relative flex-1 min-h-0 overflow-hidden");
export const productCardMinMediaVariants = cva("relative flex-1 min-h-0 overflow-hidden");


// --- Common Sub-components ---
export const productCardEmprendedorBadgeVariants = cva("absolute z-30 top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full");
export const productCardEmprendedorNameVariants = cva("text-xs font-semibold text-foreground");
export const productCardDiscountBadgeVariants = cva("absolute z-30 top-4 left-4");
export const productCardDiscountBadgeInnerVariants = cva("px-4 py-2 text-xs rounded-clay");
export const productCardVerifiedBadgeVariants = cva("text-primary text-xs");

// --- Familia A — Material Design (card-full, card-min) ---
export const productCardFullContentVariants = cva("px-5 pt-4 pb-5 flex-shrink-0 space-y-1");
export const productCardFullTitleVariants = cva("font-headline font-bold text-foreground text-lg md:text-3xl md:tracking-tight leading-tight truncate");
export const productCardFullDescriptionVariants = cva("hidden md:block md:[display:-webkit-box] line-clamp-3 md:text-base md:text-foreground/80 md:leading-relaxed");
export const productCardFullFooterRowVariants = cva("flex items-center justify-between gap-2 pt-2");
export const productCardFullLinkVariants = cva("inline-flex items-center gap-1 font-body text-xs md:text-sm font-bold uppercase tracking-widest text-primary hover:text-primary-dim transition-all duration-300 group-hover:gap-2");
export const productCardFullPriceRowVariants = cva("flex items-baseline gap-2 flex-wrap");
export const productCardFullPriceVariants = cva("font-headline font-bold text-foreground text-xl md:text-3xl");
export const productCardFullOldPriceVariants = cva("font-body text-sm md:text-base line-through text-muted-foreground");

export const productCardMinHeaderInfoVariants = cva("flex-1 min-w-0");
export const productCardMinTitleVariants = cva("font-headline font-bold text-foreground text-sm leading-tight truncate");
export const productCardMinEmprendedorNameVariants = cva("truncate");
export const productCardMinContentVariants = cva("px-4 pt-2 pb-1 flex-shrink-0");
export const productCardMinDescriptionVariants = cva("line-clamp-1");
export const productCardMinFooterVariants = cva("px-4 pb-4 flex-shrink-0");
export const productCardMinPriceVariants = cva("font-headline font-bold text-foreground text-base text-right");

// --- Familia B — Thumbnail (preview-max, preview, history) ---
export const productCardThumbnailGlassVariants = cva("absolute inset-x-0 bottom-0 bg-white/40 md:bg-white/70 backdrop-blur-xl border-t border-white/50 md:border-white/60 px-3 py-2.5 shadow-lg shadow-black/5");
export const productCardThumbnailTitleVariants = cva("font-headline font-bold text-secondary md:text-foreground md:font-black leading-tight truncate");
export const productCardThumbnailPriceVariants = cva("font-headline font-bold text-secondary");

// --- Familia C — Editorial ---
export const productCardEditorialMediaVariants = cva("relative w-full aspect-square bg-surface flex items-center justify-center overflow-hidden");
export const productCardEditorialContentVariants = cva("p-4 flex flex-col flex-grow");
export const productCardEditorialTitleVariants = cva("text-sm font-headline font-bold text-secondary mb-1 leading-snug line-clamp-2");
export const productCardEditorialEmprendedorRowVariants = cva("flex items-center gap-2 mb-2");
export const productCardEditorialEmprendedorVariants = cva("text-xs font-body text-muted-foreground truncate");
export const productCardEditorialPriceRowVariants = cva("flex items-baseline gap-2 mt-auto");
export const productCardEditorialPriceVariants = cva("text-sm font-headline font-bold text-primary");
export const productCardEditorialOldPriceVariants = cva("text-xs font-body text-muted-foreground line-through");
export const productCardEditorialBadgeVariants = cva("absolute top-2 left-2 z-10");

// Common Utilities
export const productCardImageVariants = cva("w-full h-full object-cover transition-transform duration-700 group-hover:scale-105");

// --- Legacy Aliases and Missing Variants for Compatibility ---
export const productCardLinkVariants = productCardFullLinkVariants;
export const productCardLinkIconVariants = cva("w-3 h-3");
export const productCardCornerIconVariants = cva("absolute bottom-4 right-4 z-30");
export const productCardCornerIconInnerVariants = cva("w-5 h-5 text-white");

export type ProductCardVariant = NonNullable<Parameters<typeof productCardVariants>[0]>["variant"];