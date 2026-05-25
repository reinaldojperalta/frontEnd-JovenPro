import { cva } from "class-variance-authority";

export const storeCardVariants = cva(
    "relative overflow-hidden group cursor-pointer transition-all duration-500 ease-smooth",
    {
        variants: {
            variant: {
                "card-full": "h-full flex flex-col rounded-clay bg-muted-light shadow-clay",
                "card-min": "h-full flex flex-col rounded-clay bg-muted-light shadow-clay",
                "card-preview-max": "relative rounded-clay bg-surface shadow-clay h-full",
                "card-preview": "relative rounded-clay bg-surface shadow-clay h-full",
                "history-slot": "relative rounded-clay-sm bg-surface shadow-clay-sm grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 h-full",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

// --- Header (Used by card-min) ---
export const storeCardHeaderVariants = cva("flex items-center gap-3 px-4 pt-4 pb-2 flex-shrink-0");

// --- Media/Image Wrappers ---
export const storeCardFullMediaVariants = cva("relative flex-1 min-h-0 overflow-hidden");
export const storeCardMinMediaVariants = cva("relative flex-1 min-h-0 overflow-hidden");

// --- Common Sub-components ---
export const storeCardEmprendedorBadgeVariants = cva("absolute z-30 top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full");
export const storeCardEmprendedorNameVariants = cva("text-xs font-semibold text-foreground");
export const storeCardVerifiedBadgeVariants = cva("text-primary text-xs");
export const storeCardBadgeVariants = cva("absolute z-30 top-4 left-4");

// --- Familia A — Material Design (card-full, card-min) ---
export const storeCardFullContentVariants = cva("px-5 pt-4 pb-5 flex-shrink-0 space-y-1");
export const storeCardFullTitleVariants = cva("font-headline font-bold text-foreground text-lg md:text-3xl md:tracking-tight leading-tight truncate");
export const storeCardFullDescriptionVariants = cva("hidden md:block md:[display:-webkit-box] line-clamp-3 md:text-base md:text-foreground/80 md:leading-relaxed");
export const storeCardFullFooterRowVariants = cva("flex items-center justify-between gap-2 pt-2");
export const storeCardFullLinkVariants = cva("inline-flex items-center gap-1 font-body text-xs md:text-sm font-bold uppercase tracking-widest text-primary hover:text-primary-dim transition-all duration-300 group-hover:gap-2");
export const storeCardFullLocationRowVariants = cva("flex items-center gap-1 text-muted-foreground");
export const storeCardFullLocationVariants = cva("font-body text-sm font-medium text-muted-foreground");

export const storeCardMinHeaderInfoVariants = cva("flex-1 min-w-0");
export const storeCardMinTitleVariants = cva("font-headline font-bold text-foreground text-sm leading-tight truncate");
export const storeCardMinEmprendedorNameVariants = cva("truncate");
export const storeCardMinContentVariants = cva("px-4 pt-2 pb-1 flex-shrink-0");
export const storeCardMinDescriptionVariants = cva("line-clamp-1");
export const storeCardMinFooterVariants = cva("px-4 pb-4 flex-shrink-0 flex items-center justify-between");
export const storeCardMinLocationRowVariants = cva("flex items-center gap-1 text-muted-foreground ml-auto");
export const storeCardMinLocationVariants = cva("font-body text-xs font-medium text-muted-foreground truncate");

// --- Familia B — Thumbnail (preview-max, preview, history) ---
export const storeCardThumbnailGlassVariants = cva("absolute inset-x-0 bottom-0 bg-white/40 md:bg-white/70 backdrop-blur-xl border-t border-white/50 md:border-white/60 px-3 py-2.5 shadow-lg shadow-black/5 flex justify-between items-center");
export const storeCardThumbnailTitleVariants = cva("font-headline font-bold text-secondary md:text-foreground md:font-black leading-tight truncate");
export const storeCardThumbnailLocationVariants = cva("font-headline text-xs font-bold text-secondary truncate ml-2 max-w-[40%]");

// Common Utilities
export const storeCardImageVariants = cva("w-full h-full object-cover transition-transform duration-700 group-hover:scale-105");

export type StoreCardVariant = NonNullable<
    Parameters<typeof storeCardVariants>[0]
>["variant"];