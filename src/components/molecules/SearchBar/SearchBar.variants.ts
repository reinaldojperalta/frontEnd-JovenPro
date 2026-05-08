// components/molecules/SearchBar/SearchBar.variants.ts

import { cva } from "class-variance-authority";

/**
 * VARIANTES DE SEARCHBAR - Sistema Modular
 */

export const searchBarVariants = cva(
    "relative w-full",
    {
        variants: {
            // Variantes de tamaño
            size: {
                sm: "max-w-[300px]",
                md: "max-w-[400px]",
                lg: "max-w-[600px]",
                full: "max-w-none",
            },

            // Estado del dropdown
            isOpen: {
                true: "",
                false: "",
            },
        },
        defaultVariants: {
            size: "md",
            isOpen: false,
        },
    }
);

export const suggestionsVariants = cva(
    "absolute top-full left-0 right-0 mt-3 bg-white shadow-2xl rounded-2xl overflow-hidden border border-black/5 z-[60]",
    {
        variants: {
            variant: {
                default: "bg-white",
                clay: "bg-surface shadow-clay-lg rounded-clay border-surface-variant",
            },
            animation: {
                fade: "animate-in fade-in slide-in-from-top-2 duration-200",
                none: "",
            },
        },
        defaultVariants: {
            variant: "clay",
            animation: "fade",
        },
    }
);

export const suggestionItemVariants = cva(
    "flex items-center justify-between p-4 transition-colors cursor-pointer",
    {
        variants: {
            variant: {
                default: "hover:bg-primary/5",
                clay: "hover:bg-surface-container rounded-xl mx-2 my-1",
            },
            isHighlighted: {
                true: "bg-primary/10",
                false: "",
            },
        },
        defaultVariants: {
            variant: "clay",
            isHighlighted: false,
        },
    }
);

// Tipos exportados
export type SearchBarSize = "sm" | "md" | "lg" | "full";
export type SuggestionsVariant = "default" | "clay";