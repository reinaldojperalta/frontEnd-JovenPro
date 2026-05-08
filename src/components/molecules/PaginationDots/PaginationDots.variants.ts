// src/components/molecules/PaginationDots/PaginationDots.variants.ts

import { cva } from "class-variance-authority";

/**
 * VARIANTES DE PAGINATIONDOTS
 * 
 * - compact: 3 dots (offset -1, 0, +1)
 * - standard: 7 dots (offset -3, 0, +3)
 */

export const paginationDotsContainerVariants = cva(
    "flex items-center justify-center gap-2",
    {
        variants: {
            size: {
                compact: "gap-3",
                standard: "gap-2",
            },
        },
        defaultVariants: {
            size: "standard",
        },
    }
);

export const paginationDotVariants = cva(
    "rounded-full transition-all duration-300 ease-smooth cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    {
        variants: {
            active: {
                true: "bg-primary",
                false: "bg-surface-variant hover:bg-border",
            },
            size: {
                compact: "h-3 w-3",
                standard: "h-2",
            },
        },
        compoundVariants: [
            {
                active: true,
                size: "compact",
                class: "w-8",
            },
            {
                active: true,
                size: "standard",
                class: "w-6",
            },
            {
                active: false,
                size: "compact",
                class: "w-3",
            },
            {
                active: false,
                size: "standard",
                class: "w-2",
            },
        ],
        defaultVariants: {
            active: false,
            size: "standard",
        },
    }
);

// Tipos exportados
export type PaginationDotsSize = "compact" | "standard";