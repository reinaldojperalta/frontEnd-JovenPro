// ============================================================================
// PRICE VARIANTS — Átomo de presentación monetaria
// ============================================================================
// REFACTOR V3:
// - Colores hardcodeados migrados a tokens semánticos:
//   • "text-red-500" (sale) → "text-accent-strong" (coral de marca, no error)
//   • "text-green-600" (success) → "text-success"
//   • "text-on-surface-variant" (oldPrice default) → "text-muted" (token fantasma)
//   • "text-foreground/40" (oldPrice muted) → "text-muted"
//   • "text-foreground/30" (oldPrice subtle) → "text-border"
//   • "bg-red-500" (discount default) → "bg-danger"
//   • "bg-red-100" (discount subtle) → "bg-danger-subtle"
//   • "text-red-600" (discount subtle) → "text-danger"
//   • "border-red-500" (discount outline) → "border-danger"
// - Nuevos CVA exportados para eliminar inline del .tsx:
//   • priceContainerVariants: layout (stack/inline) + align
//   • priceSymbolVariants: símbolo de moneda
//   • priceCodeVariants: código de moneda (USD, COP)
//   • discountBadgeWrapperVariants: wrapper del badge de descuento
// - Tipos derivados del CVA. PriceSize ahora incluye "2xl" que existía en el CVA
//   pero faltaba en el type hardcodeado.
// - shadow-lg en discount badge: utilitario Tailwind core (no token custom).
//   Mantenido por énfasis visual mayor que shadow-clay.
// ============================================================================

import { cva } from "class-variance-authority";

// ============================================
// PRECIO PRINCIPAL
// ============================================

export const priceVariants = cva(
    "font-black tracking-tight tabular-nums",
    {
        variants: {
            variant: {
                default: "text-foreground",
                primary: "text-primary",
                secondary: "text-secondary",
                inverted: "text-white",
                sale: "text-accent-strong",
                success: "text-success",
            },
            size: {
                xs: "text-sm",
                sm: "text-lg",
                md: "text-xl",
                lg: "text-2xl",
                xl: "text-3xl",
                "2xl": "text-5xl",
            },
            weight: {
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
                black: "font-black",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            weight: "black",
        },
    }
);

// ============================================
// CONTENEDOR (layout + alineación)
// ============================================

export const priceContainerVariants = cva("inline-flex", {
    variants: {
        layout: {
            stack: "flex-col",
            inline: "flex-row items-baseline flex-wrap",
        },
        align: {
            left: "",
            center: "items-center",
            right: "items-end",
        },
    },
    defaultVariants: {
        layout: "stack",
        align: "left",
    },
});

// ============================================
// SÍMBOLO DE MONEDA
// ============================================

export const priceSymbolVariants = cva("opacity-80 mr-0.5");

// ============================================
// CÓDIGO DE MONEDA (USD, COP)
// ============================================

export const priceCodeVariants = cva("text-xs ml-1 opacity-60");

// ============================================
// PRECIO ANTIGUO (tachado)
// ============================================

export const oldPriceVariants = cva(
    "font-bold line-through opacity-50 tabular-nums",
    {
        variants: {
            variant: {
                default: "text-muted",
                muted: "text-muted",
                subtle: "text-border",
            },
            size: {
                xs: "text-xs",
                sm: "text-xs",
                md: "text-sm",
                lg: "text-base",
                xl: "text-lg",
            },
            position: {
                above: "block mb-1",
                beside: "inline mr-2",
                below: "block mt-1",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "sm",
            position: "above",
        },
    }
);

// ============================================
// BADGE DE DESCUENTO (% OFF)
// ============================================

export const discountBadgeVariants = cva(
    "inline-flex items-center font-black uppercase rounded-full",
    {
        variants: {
            variant: {
                default: "bg-danger text-white shadow-lg shadow-danger/30",
                subtle: "bg-danger-subtle text-danger",
                outline: "border-2 border-danger text-danger",
            },
            size: {
                sm: "px-2 py-0.5 text-[10px]",
                md: "px-3 py-1 text-xs",
                lg: "px-4 py-1.5 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "sm",
        },
    }
);

/** Wrapper del badge de descuento. Antes inline "ml-2 align-middle". */
export const discountBadgeWrapperVariants = cva("ml-2 align-middle");

// Tipos derivados del CVA — sincronización automática
export type PriceVariant = NonNullable<
    Parameters<typeof priceVariants>[0]
>["variant"];
export type PriceSize = NonNullable<
    Parameters<typeof priceVariants>[0]
>["size"];
export type PriceWeight = NonNullable<
    Parameters<typeof priceVariants>[0]
>["weight"];
export type OldPriceVariant = NonNullable<
    Parameters<typeof oldPriceVariants>[0]
>["variant"];
export type OldPricePosition = NonNullable<
    Parameters<typeof oldPriceVariants>[0]
>["position"];
export type DiscountVariant = NonNullable<
    Parameters<typeof discountBadgeVariants>[0]
>["variant"];