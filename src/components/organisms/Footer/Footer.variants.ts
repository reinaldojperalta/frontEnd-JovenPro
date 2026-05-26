// ============================================================================
// FOOTER VARIANTS — Organismo de pie de página
// ============================================================================

import { cva } from "class-variance-authority";

export const footerVariants = cva("border-t border-border/20");

export const footerInnerVariants = cva(
    "py-12 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6"
);

export const footerBrandVariants = cva("text-center md:text-left");

export const footerLogoVariants = cva(
    "font-headline text-xl font-bold text-primary block mb-1"
);

export const footerCopyrightVariants = cva(
    "font-body text-xs text-foreground/40"
);

export const footerNavVariants = cva(
    "flex flex-wrap justify-center gap-6"
);

export const footerNavItemVariants = cva(
    "font-body text-xs text-foreground/60 hover:text-primary uppercase tracking-wider transition-colors"
);

export const footerSocialsVariants = cva("flex gap-3");

// ============================================================================
// TEAM CAROUSEL VARIANTS
// ============================================================================

export const footerTeamSectionVariants = cva("py-10 border-t border-border/10");

export const footerTeamTitleVariants = cva(
    "font-headline text-xl md:text-2xl font-bold text-foreground text-center mb-5"
);

export const footerTeamCarouselWrapperVariants = cva(
    "w-full"
);

export const footerTeamTrackVariants = cva(
    "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 max-w-[1536px] mx-auto justify-center px-4"
);

export const footerTeamCardVariants = cva(
    "rounded-lg overflow-hidden bg-surface shadow-sm"
);

export const footerTeamImageVariants = cva(
    "w-full aspect-[3/4] object-cover bg-surface-variant"
);

export const footerTeamInfoVariants = cva("px-2 py-2 text-center");

export const footerTeamNameVariants = cva(
    "font-headline text-xs md:text-sm font-bold text-foreground block leading-tight truncate"
);

export const footerTeamRoleVariants = cva(
    "font-body text-[10px] md:text-xs text-muted-foreground block leading-tight truncate"
);

// ============================================================================
// ENTREPRENEURS STRIP VARIANTS
// ============================================================================

export const footerEntrepreneursSectionVariants = cva(
    "py-8 border-t border-border/10 bg-surface/50"
);

export const footerEntrepreneursTitleVariants = cva(
    "font-headline text-2xl md:text-3xl font-bold text-foreground text-center mb-6"
);

export const footerEntrepreneursSubtitleVariants = cva(
    "font-body text-base md:text-lg text-muted-foreground text-center mt-6 max-w-3xl mx-auto"
);

export const footerEntrepreneursGridVariants = cva(
    "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
);

export const footerEntrepreneurCardVariants = cva(
    "relative overflow-hidden group"
);

export const footerEntrepreneurImageVariants = cva(
    "w-full h-auto block transition-transform duration-500 group-hover:scale-105"
);

export const footerEntrepreneurOverlayVariants = cva(
    "absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
);

export const footerEntrepreneurNameVariants = cva(
    "font-headline text-sm font-bold text-white"
);

export const footerEntrepreneurBusinessVariants = cva(
    "font-body text-xs text-white/80 mt-0.5"
);