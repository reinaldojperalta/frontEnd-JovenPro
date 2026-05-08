// components/molecules/Card/Card.variants.ts

import { cva } from "class-variance-authority";

/**
 * VARIANTES DE CARD - Sistema Modular
 */

export const cardVariants = cva(
    // Estilos base
    "relative overflow-hidden transition-all duration-300",
    {
        variants: {
            // Variante visual principal
            variant: {
                // Surface: fondo surface estándar
                surface: "bg-surface shadow-clay hover:shadow-clay-sm",

                // Surface-container: fondo más marcado
                "surface-container": "bg-surface-container shadow-clay hover:shadow-clay-sm",

                // Clay: con sombra clay activa siempre
                clay: "bg-surface shadow-clay-active",

                // Outline: solo borde
                outline: "bg-transparent border-2 border-surface-variant hover:border-primary/30",

                // Ghost: sin fondo ni sombra
                ghost: "bg-transparent shadow-none hover:bg-surface-container/50",

                // Elevated: sombra más pronunciada
                elevated: "bg-surface shadow-xl hover:shadow-2xl",
            },

            // Radio de borde
            radius: {
                none: "rounded-none",
                sm: "rounded-lg",
                md: "rounded-xl",
                lg: "rounded-2xl",
                clay: "rounded-clay",
                full: "rounded-3xl",
            },

            // Padding interno
            padding: {
                none: "p-0",
                xs: "p-3",
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
                xl: "p-12",
            },

            // Interactividad
            interactive: {
                true: "cursor-pointer hover:-translate-y-1",
                false: "",
            },

            // Estado de loading
            isLoading: {
                true: "animate-pulse bg-surface-variant",
                false: "",
            },

            // Ancho
            width: {
                auto: "w-auto",
                full: "w-full",
                fit: "w-fit",
            },
        },

        defaultVariants: {
            variant: "surface",
            radius: "clay",
            padding: "md",
            interactive: true,
            isLoading: false,
            width: "full",
        },
    }
);

// Variantes para secciones internas de la card
export const cardHeaderVariants = cva(
    "flex items-start justify-between gap-4",
    {
        variants: {
            padding: {
                none: "",
                xs: "p-3",
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
                xl: "p-12",
            },
            border: {
                true: "border-b border-surface-variant",
                false: "",
            },
        },
        defaultVariants: {
            padding: "none",
            border: false,
        },
    }
);

export const cardContentVariants = cva(
    "flex-1",
    {
        variants: {
            padding: {
                none: "p-0",
                xs: "p-3",
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
                xl: "p-12",
            },
        },
        defaultVariants: {
            padding: "none",
        },
    }
);

export const cardFooterVariants = cva(
    "flex items-center justify-between gap-4",
    {
        variants: {
            padding: {
                none: "",
                xs: "p-3",
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
                xl: "p-12",
            },
            border: {
                true: "border-t border-surface-variant",
                false: "",
            },
            align: {
                start: "justify-start",
                center: "justify-center",
                end: "justify-end",
                between: "justify-between",
            },
        },
        defaultVariants: {
            padding: "none",
            border: false,
            align: "between",
        },
    }
);

export const cardMediaVariants = cva(
    "relative overflow-hidden",
    {
        variants: {
            aspectRatio: {
                auto: "",
                square: "aspect-square",
                video: "aspect-video",
                portrait: "aspect-[3/4]",
                wide: "aspect-[16/9]",
                banner: "aspect-[21/9]",
            },
            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                clay: "rounded-clay",
                full: "rounded-full",
            },
        },
        defaultVariants: {
            aspectRatio: "square",
            radius: "none",
        },
    }
);

// Tipos exportados
export type CardVariant = "surface" | "surface-container" | "clay" | "outline" | "ghost" | "elevated";
export type CardRadius = "none" | "sm" | "md" | "lg" | "clay" | "full";
export type CardPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type CardWidth = "auto" | "full" | "fit";
export type CardMediaAspectRatio = "auto" | "square" | "video" | "portrait" | "wide" | "banner";
export type CardFooterAlign = "start" | "center" | "end" | "between";