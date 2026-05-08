// components/molecules/Nav/Nav.variants.ts

import { cva } from "class-variance-authority";

/**
 * VARIANTES DE NAV - Sistema Modular
 */

export const navVariants = cva(
    "flex items-center",
    {
        variants: {
            // Dirección del layout
            direction: {
                horizontal: "flex-row gap-8",
                vertical: "flex-col gap-4",
            },

            // Alineación
            align: {
                start: "justify-start",
                center: "justify-center",
                end: "justify-end",
                between: "justify-between",
            },

            // Tamaño de los items
            size: {
                sm: "gap-4",
                md: "gap-8",
                lg: "gap-12",
            },

            // Variante visual
            variant: {
                default: "",
                pills: "gap-2", // Items con fondo tipo pills
                underlined: "gap-8", // Con línea inferior activa
                minimal: "gap-6", // Sin decoración
            },
        },
        defaultVariants: {
            direction: "horizontal",
            align: "center",
            size: "md",
            variant: "default",
        },
    }
);

export const navItemVariants = cva(
    "font-bold transition-all cursor-pointer relative",
    {
        variants: {
            // Estado del item
            isActive: {
                true: "text-primary",
                false: "text-foreground hover:text-primary",
            },

            // Tamaño de fuente
            size: {
                xs: "text-[10px]",
                sm: "text-xs",
                md: "text-sm",
                lg: "text-base",
            },

            // Variante visual del item
            variant: {
                default: "",
                pill: "px-4 py-2 rounded-clay hover:bg-surface-container hover:shadow-clay-sm",
                underlined: "pb-2 border-b-2 border-transparent hover:border-primary/30",
                minimal: "hover:underline underline-offset-4",
            },

            // Peso de fuente
            weight: {
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
                black: "font-black",
            },

            // Transformación de texto
            transform: {
                none: "",
                uppercase: "uppercase tracking-widest",
                capitalize: "capitalize",
            },
        },
        defaultVariants: {
            isActive: false,
            size: "md",
            variant: "default",
            weight: "bold",
            transform: "none",
        },
    }
);

export const navIndicatorVariants = cva(
    "absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all",
    {
        variants: {
            variant: {
                default: "opacity-100",
                animated: "scale-x-0 group-hover:scale-x-100 origin-left",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

// Tipos exportados
export type NavDirection = "horizontal" | "vertical";
export type NavAlign = "start" | "center" | "end" | "between";
export type NavSize = "sm" | "md" | "lg";
export type NavVariant = "default" | "pills" | "underlined" | "minimal";
export type NavItemVariant = "default" | "pill" | "underlined" | "minimal";
export type NavItemWeight = "normal" | "medium" | "semibold" | "bold" | "black";
export type NavItemTransform = "none" | "uppercase" | "capitalize";