import { cva } from "class-variance-authority";

export const mosaicSectionVariants = cva("w-full");
export const mosaicContainerVariants = cva("max-w-[1280px] mx-auto px-4 md:px-12");

export const mosaicHeaderVariants = cva(
    "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4 md:mb-5"
);
export const mosaicHeaderLeftVariants = cva("flex flex-col gap-1.5");
export const mosaicOverlineVariants = cva(
    "text-xs font-headline font-semibold tracking-[0.12em] uppercase text-primary"
);
export const mosaicTitleVariants = cva(
    "text-xl md:text-[28px] font-headline font-bold leading-tight text-secondary"
);
export const mosaicLinkVariants = cva(
    "text-sm font-body font-medium text-secondary inline-flex items-center gap-1.5 transition-all duration-200 hover:gap-3 shrink-0"
);

export const mosaicTabsNavVariants = cva("relative flex items-center gap-2 mb-3 md:mb-4");
export const mosaicTabsScrollVariants = cva(
    "flex gap-2 overflow-x-auto scrollbar-none flex-1 scroll-smooth py-1 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
);

export const mosaicTabVariants = cva(
    "flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 flex-shrink-0 cursor-pointer border-2 rounded-clay-sm transition-all duration-200",
    {
        variants: {
            active: {
                true: "bg-secondary border-secondary text-white [&_svg]:text-white",
                false: "bg-transparent border-secondary text-secondary hover:bg-secondary/5",
            },
        },
        defaultVariants: { active: false },
    }
);

export const mosaicTabIconVariants = cva("w-[18px] h-[18px] shrink-0");
export const mosaicTabNameVariants = cva("text-xs md:text-sm font-headline font-semibold whitespace-nowrap");
export const mosaicTabCountVariants = cva(
    "hidden md:inline text-xs font-body font-medium ml-0.5 opacity-80"
);

export const mosaicTabsArrowVariants = cva(
    "w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-secondary bg-transparent text-secondary flex items-center justify-center cursor-pointer flex-shrink-0 transition-all duration-200 hover:bg-secondary hover:text-white"
);

export const mosaicChipsScrollVariants = cva(
    "flex gap-2 md:gap-2.5 overflow-x-auto scrollbar-none pb-4 md:pb-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
);

export const mosaicChipVariants = cva(
    "relative flex items-center gap-2.5 px-3 md:px-[18px] py-2 md:py-2.5 min-w-[160px] md:min-w-[160px] h-[52px] md:h-14 flex-shrink-0 cursor-pointer overflow-hidden border-0 rounded-clay-sm transition-all duration-[250ms]",
    {
        variants: {
            active: {
                true: "-translate-y-px",
                false: "",
            },
        },
        defaultVariants: { active: false },
    }
);

/** Liquid glass overlay */
export const mosaicChipGlassVariants = cva(
    "absolute inset-0 transition-all duration-[250ms] z-[1] backdrop-blur-[12px] saturate-[160%] [-webkit-backdrop-filter:blur(12px)_saturate(160%)]",
    {
        variants: {
            active: {
                true: "bg-[rgba(41,128,185,0.25)]",
                false: "bg-white/35 group-hover:bg-white/[0.55]",
            },
        },
        defaultVariants: { active: false },
    }
);

export const mosaicChipReflectionVariants = cva(
    "absolute inset-0 z-[2] pointer-events-none bg-gradient-to-br from-white/50 via-white/10 to-transparent"
);

export const mosaicChipAvatarVariants = cva(
    "relative z-[3] w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/60"
);

export const mosaicChipAvatarInnerVariants = cva(
    "w-full h-full border-0"
);

export const mosaicChipNameVariants = cva(
    "relative z-[3] text-xs md:text-sm font-headline font-bold whitespace-nowrap text-secondary [text-shadow:0_1px_3px_rgba(255,255,255,0.8)]"
);

export const mosaicGridVariants = cva(
    [
        "grid gap-3 md:gap-5 h-auto md:h-[520px]",
        "grid-cols-1 grid-rows-[auto_auto_auto] md:grid-cols-2 md:grid-rows-2",
        "[grid-template-areas:'mini1'_'mini2'_'featured']",
        "md:[grid-template-areas:'mini1_featured'_'mini2_featured']",
    ].join(" ")
);

export const mosaicGridHighlightVariants = cva(
    "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-clay transition-shadow duration-300"
);

export const mosaicFeaturedVariants = cva(
    "[grid-area:featured] flex flex-col relative overflow-hidden rounded-clay bg-secondary min-h-[380px] md:min-h-0"
);

export const mosaicFeaturedImageVariants = cva(
    "relative flex-1 flex items-center justify-center p-6 md:p-8 overflow-hidden group"
);

export const mosaicFeaturedImgVariants = cva(
    "object-cover transition-transform duration-500 group-hover:scale-[1.03]"
);

export const mosaicFeaturedInfoVariants = cva("p-5 md:p-7 flex flex-col gap-2");
export const mosaicFeaturedBadgeVariants = cva(
    "inline-flex items-center px-2.5 py-1 text-xs font-headline font-semibold tracking-[0.05em] uppercase w-fit rounded-clay-sm bg-primary/20 text-primary"
);
export const mosaicFeaturedNameVariants = cva("text-lg md:text-[22px] font-headline font-bold leading-snug text-white");
export const mosaicFeaturedMetaVariants = cva("text-sm font-body text-white/80");
export const mosaicFeaturedCtaVariants = cva(
    "inline-flex items-center gap-2 mt-1.5 text-sm font-body font-semibold text-primary transition-all duration-200 hover:gap-3"
);

/* ============================================
   MINI GLASS CARDS — Horizontal con glass panel
   ============================================ */

export const mosaicMiniGlassVariants = cva(
    "relative overflow-hidden rounded-clay cursor-pointer group flex",
    {
        variants: {
            area: {
                emprendedor: "[grid-area:mini1]",
                tienda: "[grid-area:mini2]",
            },
        },
        defaultVariants: { area: "emprendedor" },
    }
);

/** Capa 1 — Imagen de fondo (absolute, inset: 0) */
export const mosaicMiniGlassImageVariants = cva(
    "absolute inset-0 object-cover transition-transform duration-500 ease-smooth group-hover:scale-105 z-0"
);

/** Capa 2 — Gradiente direccional (oscurece derecha → transparente izquierda) */
export const mosaicMiniGlassGradientVariants = cva(
    "absolute inset-0 z-[1] pointer-events-none"
);

/** Spacer que empuja el panel al extremo derecho */
export const mosaicMiniGlassSpacerVariants = cva(
    "flex-1 min-w-0 z-[2]"
);

/** Panel Glass — flujo normal, empujado a la derecha */
export const mosaicMiniGlassPanelVariants = cva(
    "relative z-[2] w-[65%] h-full flex flex-col justify-center px-5 md:px-6 py-4 md:py-5 backdrop-blur-[16px] saturate-[140%] [-webkit-backdrop-filter:blur(16px)_saturate(140%)] bg-white/[0.08] border-l border-white/[0.15]"
);

/** Etiqueta superior (uppercase, acento) */
export const mosaicMiniGlassLabelVariants = cva(
    "text-[10px] md:text-xs font-headline font-semibold uppercase tracking-[0.12em] text-primary mb-1.5 md:mb-2"
);

/** Nombre principal (blanco puro, peso medio) */
export const mosaicMiniGlassTitleVariants = cva(
    "text-sm md:text-base font-headline font-semibold text-white leading-snug mb-1 overflow-hidden text-ellipsis line-clamp-2"
);

/** Subtítulo (blanco a baja opacidad) */
export const mosaicMiniGlassSubtitleVariants = cva(
    "text-xs md:text-sm font-body text-white/60 leading-relaxed overflow-hidden text-ellipsis line-clamp-2"
);

/** Mobile chip width: 2.3 visibles */
export const mosaicChipMobileWidthVariants = cva(
    "min-w-0 w-[calc((100vw-80px)/2.3)] md:w-auto md:min-w-[160px]"
);