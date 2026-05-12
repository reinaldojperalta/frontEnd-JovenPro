// ============================================================================
// VIDEOS SECTION VARIANTS
// ============================================================================

import { cva } from "class-variance-authority";


export const videosSectionGridVariants = cva(
    "grid grid-cols-1 md:grid-cols-2 gap-8"
);

export const videosSectionItemVariants = cva("");

export const videosSectionCardVariants = cva("group cursor-pointer");

export const videosSectionMediaVariants = cva(
    "relative aspect-video rounded-2xl overflow-hidden bg-black mb-4"
);

export const videosSectionThumbnailVariants = cva(
    "w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity"
);

export const videosSectionPlayOverlayVariants = cva(
    "absolute inset-0 flex items-center justify-center"
);

export const videosSectionPlayButtonVariants = cva(
    "w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform"
);

export const videosSectionPlayIconVariants = cva(
    "w-6 h-6 text-white fill-white ml-1"
);

export const videosSectionTitleVariants = cva(
    "font-headline text-lg font-semibold text-secondary"
);

export const videosSectionMobileScrollVariants = cva(
    "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 hide-scrollbar"
);

export const videosSectionMobileItemVariants = cva(
    "snap-center shrink-0 w-[85vw] max-w-sm"
);

export const videosSectionMobileThumbnailVariants = cva(
    "w-full h-full object-cover opacity-80"
);

export const videosSectionMobilePlayButtonVariants = cva(
    "w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40"
);