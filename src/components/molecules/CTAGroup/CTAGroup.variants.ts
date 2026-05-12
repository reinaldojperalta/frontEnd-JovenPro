// ============================================================================
// CTA GROUP VARIANTS — Molécula de agrupación de botones de acción
// ============================================================================
// REFACTOR V3:
// - Agregada dimensión "reverseOnMobile" para eliminar inline condicional
//   "flex-col-reverse sm:flex-row" del .tsx.
// - fullWidthMobile: selector hijo [&>button] ya cubre el ancho responsive.
//   No necesita replicarse en cada Button individual.
// - Tipos derivados del CVA.
// - Tokens validados: todas las clases son utilitarios Tailwind core (flex,
//   gap, justify, items). Sin tokens custom.
// ============================================================================

import { cva } from "class-variance-authority";

export const ctaGroupVariants = cva("flex w-full p-5", {
    variants: {
        direction: {
            horizontal: "flex-row",
            vertical: "flex-col",
        },
        align: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
        },
        gap: {
            none: "gap-0",
            xs: "gap-2",
            sm: "gap-4",
            md: "gap-6",
            lg: "gap-8",
        },
        verticalAlign: {
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
        },
        responsive: {
            true: "flex-col sm:flex-row",
            false: "",
        },
        fullWidthMobile: {
            true: "[&>button]:w-full sm:[&>button]:w-auto",
            false: "",
        },
        reverseOnMobile: {
            true: "flex-col-reverse sm:flex-row",
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
        reverseOnMobile: false,
    },
});

// Tipos derivados del CVA — sincronización automática
export type CTAGroupDirection = NonNullable<
    Parameters<typeof ctaGroupVariants>[0]
>["direction"];
export type CTAGroupAlign = NonNullable<
    Parameters<typeof ctaGroupVariants>[0]
>["align"];
export type CTAGroupGap = NonNullable<
    Parameters<typeof ctaGroupVariants>[0]
>["gap"];
export type CTAGroupVerticalAlign = NonNullable<
    Parameters<typeof ctaGroupVariants>[0]
>["verticalAlign"];