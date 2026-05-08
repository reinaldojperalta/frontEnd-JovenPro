// components/molecules/CTAGroup/CTAGroup.variants.ts

import { cva } from "class-variance-authority";

/**
 * VARIANTES DE CTAGROUP - Sistema Modular
 */

export const ctaGroupVariants = cva(
    "flex w-full p-5",
    {
        variants: {
            // Dirección del layout
            direction: {
                horizontal: "flex-row",
                vertical: "flex-col",
            },

            // Alineación
            align: {
                start: "justify-start",
                center: "justify-center",
                end: "justify-end",
                between: "justify-between",
                around: "justify-around",
            },

            // Espaciado entre botones
            gap: {
                none: "gap-0",
                xs: "gap-2",
                sm: "gap-4",
                md: "gap-6",
                lg: "gap-8",
            },

            // Alineación vertical (cuando direction=horizontal)
            verticalAlign: {
                start: "items-start",
                center: "items-center",
                end: "items-end",
                stretch: "items-stretch",
            },

            // Responsive: apilar en móvil
            responsive: {
                true: "flex-col sm:flex-row",
                false: "",
            },

            // Full width en móvil
            fullWidthMobile: {
                true: "[&>button]:w-full sm:[&>button]:w-auto",
                false: "",
            },
        },

        defaultVariants: {
            direction: "horizontal",
            align: "start",
            gap: "sm",
            verticalAlign: "center",
            responsive: true,
            fullWidthMobile: true,
        },
    }
);

// Tipos exportados
export type CTAGroupDirection = "horizontal" | "vertical";
export type CTAGroupAlign = "start" | "center" | "end" | "between" | "around";
export type CTAGroupGap = "none" | "xs" | "sm" | "md" | "lg";
export type CTAGroupVerticalAlign = "start" | "center" | "end" | "stretch";