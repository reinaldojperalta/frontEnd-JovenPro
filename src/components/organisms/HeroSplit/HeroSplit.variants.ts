import { cva } from "class-variance-authority";

/* ============================================================
 * HeroSplit.variants.ts
 * Zero Inline Policy — todas las clases vía CVA
 * ============================================================ */


/** Divisor vertical centrado (desktop only) */
export const heroSplitDividerVariants = cva(
    "hidden md:block absolute left-1/2 top-0 bottom-0 w-px  z-10"
);

/** Wrapper del logo flotante centrado */
export const heroSplitLogoWrapperVariants = cva(
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
);

/** Contenedor con efecto glass para el logo */
export const heroSplitLogoContainerVariants = cva(
    "p-6 md:p-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center transition-all duration-700 ease-smooth hover:bg-white/20 hover:scale-110"
);

/** Imagen del logo (cuando se pasa logoSrc) */
export const heroSplitLogoImageVariants = cva(
    "h-24 md:h-32 w-auto object-contain drop-shadow-2xl"
);

/** Contenedor motion.div de cada lado */
export const heroSplitSideVariants = cva(
    "relative flex-1 min-h-[50vh] md:min-h-screen cursor-pointer group overflow-hidden"
);

/** Wrapper absoluto que contiene img + overlays */
export const heroSplitImageContainerVariants = cva(
    "absolute inset-0"
);

/** Imagen de fondo con filtros artísticos y hover */
export const heroSplitImageVariants = cva(
    "h-full w-full object-cover transition-all duration-500 ease-smooth group-hover:scale-105",
    {
        variants: {
            filter: {
                default:
                    "grayscale brightness-100 contrast-100 saturate-0 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100",
            },
        },
        defaultVariants: {
            filter: "default",
        },
    }
);

/** Overlay de gradiente primario (dirección left/right) */
export const heroSplitGradientOverlayVariants = cva(
    "absolute inset-0",
    {
        variants: {
            direction: {
                left: "bg-gradient-to-l from-surface/90 via-primary/20 to-transparent",
                right: "bg-gradient-to-r from-secondary/90 via-primary/20 to-transparent",
            },
        },
        defaultVariants: {
            direction: "left",
        },
    }
);

/** Overlay oscuro con transición en hover */
export const heroSplitDarkOverlayVariants = cva(
    "absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"
);

/** Contenedor del texto (título, subtítulo, CTA) */
export const heroSplitContentVariants = cva(
    "absolute bottom-10 z-20",
    {
        variants: {
            align: {
                left: "left-10 text-left",
                right: "right-10 text-right",
            },
        },
        defaultVariants: {
            align: "left",
        },
    }
);

/** Título principal de cada lado */
export const heroSplitTitleVariants = cva(
    "font-headline text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-3"
);

/** Subtítulo / descripción */
export const heroSplitSubtitleVariants = cva(
    "font-body text-white/90 text-lg mb-6 max-w-sm",
    {
        variants: {
            align: {
                left: "",
                right: "ml-auto",
            },
        },
        defaultVariants: {
            align: "left",
        },
    }
);

/** Wrapper del CTA (span con icono) */
export const heroSplitCTAVariants = cva(
    "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white group-hover:gap-3 transition-all duration-300"
);

/** Icono de flecha dentro del CTA */
export const heroSplitArrowVariants = cva(
    "w-4 h-4 transition-transform duration-300",
    {
        variants: {
            direction: {
                // Si el diseño es "left", la flecha mira a la derecha (normal)
                // y se mueve hacia la derecha en hover.
                left: "rotate-0 group-hover:translate-x-1",

                // Si el diseño es "right", la flecha mira a la izquierda (rotada)
                // y se mueve hacia la izquierda en hover.
                right: "rotate-180 group-hover:-translate-x-1",
            },
        },
        defaultVariants: {
            direction: "left",
        },
    }
);

/* ---------------- Tipos exportados ---------------- */
export type HeroSplitGradientDirection = "left" | "right";
export type HeroSplitContentAlign = "left" | "right";
