// components/molecules/ProductInfo/ProductInfo.variants.ts

import { cva } from "class-variance-authority";

/**
 * VARIANTES DE PRODUCTINFO - Sistema Modular
 */

export const productInfoVariants = cva(
    "flex flex-col",
    {
        variants: {
            // Layout general
            layout: {
                default: "space-y-2",
                compact: "space-y-1",
                relaxed: "space-y-3",
                minimal: "gap-0",
            },

            // Alineación del contenido
            align: {
                left: "items-start text-left",
                center: "items-center text-center",
                right: "items-end text-right",
            },

            // Dirección del precio (arriba o abajo)
            pricePosition: {
                top: "flex-col-reverse",
                bottom: "flex-col",
                inline: "flex-row items-baseline gap-4",
            },

            // Mostrar/ocultar elementos
            showBrand: {
                true: "",
                false: "",
            },
            showName: {
                true: "",
                false: "",
            },
            showPrice: {
                true: "",
                false: "",
            },
            showDescription: {
                true: "",
                false: "",
            },
        },

        defaultVariants: {
            layout: "default",
            align: "left",
            pricePosition: "bottom",
            showBrand: true,
            showName: true,
            showPrice: true,
            showDescription: false,
        },
    }
);

export const brandVariants = cva(
    "uppercase tracking-[0.2em]",
    {
        variants: {
            size: {
                xs: "text-[10px]",
                sm: "text-xs",
                md: "text-sm",
            },
            variant: {
                default: "text-primary",
                muted: "text-on-surface-variant",
                inverted: "text-white/80",
            },
        },
        defaultVariants: {
            size: "xs",
            variant: "default",
        },
    }
);

export const nameVariants = cva(
    "font-extrabold transition-colors",
    {
        variants: {
            size: {
                sm: "text-lg",
                md: "text-xl",
                lg: "text-2xl",
            },
            variant: {
                default: "text-foreground hover:text-primary",
                muted: "text-on-surface-variant",
                inverted: "text-white",
            },
            lineClamp: {
                true: "line-clamp-1",
                false: "",
            },
        },
        defaultVariants: {
            size: "md",
            variant: "default",
            lineClamp: true,
        },
    }
);

export const descriptionVariants = cva(
    "text-on-surface-variant",
    {
        variants: {
            size: {
                sm: "text-sm",
                md: "text-base",
            },
            lineClamp: {
                none: "",
                2: "line-clamp-2",
                3: "line-clamp-3",
            },
        },
        defaultVariants: {
            size: "sm",
            lineClamp: 2,
        },
    }
);

// Tipos exportados
export type ProductInfoLayout = "default" | "compact" | "relaxed" | "minimal";
export type ProductInfoAlign = "left" | "center" | "right";
export type ProductInfoPricePosition = "top" | "bottom" | "inline";
export type ProductInfoBrandSize = "xs" | "sm" | "md";
export type ProductInfoBrandVariant = "default" | "muted" | "inverted";
export type ProductInfoNameSize = "sm" | "md" | "lg";
export type ProductInfoNameVariant = "default" | "muted" | "inverted";