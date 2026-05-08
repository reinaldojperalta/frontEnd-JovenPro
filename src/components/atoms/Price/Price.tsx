// ============================================================================
// PRICE — Átomo de presentación monetaria
// ============================================================================
// REFACTOR V3:
// - Zero inline classes:
//   • Layout (flex-col/flex-row + align) → priceContainerVariants
//   • Símbolo de moneda → priceSymbolVariants
//   • Código de moneda → priceCodeVariants
//   • Wrapper badge descuento → discountBadgeWrapperVariants
// - "text-red-500" (sale) eliminado del CVA. Ahora "text-accent-strong".
// - Tipos importados desde .variants.ts (derivados del CVA).
// - Lógica de formateo y cálculo de descuento se mantiene; es pura función,
//   no CSS.
// ============================================================================

import React, { forwardRef } from "react";
import {
    priceVariants,
    priceContainerVariants,
    priceSymbolVariants,
    priceCodeVariants,
    oldPriceVariants,
    discountBadgeVariants,
    discountBadgeWrapperVariants,
    type PriceVariant,
    type PriceSize,
    type PriceWeight,
    type OldPriceVariant,
    type OldPricePosition,
    type DiscountVariant,
} from "./Price.variants";
import { cn } from "@/lib/utils";

// ============================================
// CONFIGURACIÓN DE MONEDA
// ============================================

interface CurrencyConfig {
    code: string;
    symbol: string;
    locale: string;
    decimals: number;
}

const defaultCurrency: CurrencyConfig = {
    code: "COP",
    symbol: "$",
    locale: "es-CO",
    decimals: 0,
};

// ============================================
// INTERFAZ DEL PRICE
// ============================================

export interface PriceProps
    extends React.HTMLAttributes<HTMLSpanElement> {
    value: number;
    oldValue?: number;
    currency?: Partial<CurrencyConfig>;
    variant?: PriceVariant;
    size?: PriceSize;
    weight?: PriceWeight;
    showSymbol?: boolean;
    showCode?: boolean;
    oldPricePosition?: OldPricePosition;
    oldPriceVariant?: OldPriceVariant;
    showDiscountBadge?: boolean;
    discountVariant?: DiscountVariant;
    discountText?: string;
    align?: "left" | "center" | "right";
    layout?: "stack" | "inline";
}

// ============================================
// UTILIDADES
// ============================================

const formatPrice = (value: number, config: CurrencyConfig): string => {
    const formatter = new Intl.NumberFormat(config.locale, {
        style: "decimal",
        minimumFractionDigits: config.decimals,
        maximumFractionDigits: config.decimals,
    });
    return formatter.format(value);
};

const calculateDiscount = (oldValue: number, currentValue: number): number => {
    if (oldValue <= 0 || currentValue >= oldValue) return 0;
    return Math.round(((oldValue - currentValue) / oldValue) * 100);
};

// ============================================
// COMPONENTE PRICE
// ============================================

const Price = forwardRef<HTMLSpanElement, PriceProps>(
    (
        {
            value,
            oldValue,
            currency: currencyProp,
            variant = "default",
            size = "md",
            weight = "black",
            showSymbol = true,
            showCode = false,
            oldPricePosition = "above",
            oldPriceVariant = "default",
            showDiscountBadge = false,
            discountVariant = "default",
            discountText,
            align = "left",
            layout = "stack",
            className,
            ...props
        },
        ref
    ) => {
        const currency: CurrencyConfig = { ...defaultCurrency, ...currencyProp };
        const discount = oldValue ? calculateDiscount(oldValue, value) : 0;
        const hasDiscount = discount > 0;
        const badgeText = discountText || `-${discount}% OFF`;

        const effectiveVariant =
            hasDiscount && variant === "default" ? "sale" : variant;
        const effectiveOldSize =
            size === "xs" ? "xs" : size === "sm" ? "sm" : size === "md" ? "sm" : size === "lg" ? "md" : "lg";

        const formattedPrice = formatPrice(value, currency);
        const formattedOldPrice = oldValue ? formatPrice(oldValue, currency) : null;
        const isStack = layout === "stack";

        const renderOldPrice = () => {
            if (!oldValue) return null;
            return (
                <span
                    className={cn(
                        oldPriceVariants({
                            variant: oldPriceVariant,
                            size: effectiveOldSize,
                            position: layout === "inline" ? "beside" : oldPricePosition,
                        })
                    )}
                >
                    {showSymbol && currency.symbol}
                    {formattedOldPrice}
                </span>
            );
        };

        const renderDiscountBadge = () => {
            if (!showDiscountBadge || !hasDiscount) return null;
            return (
                <span
                    className={cn(
                        discountBadgeVariants({ variant: discountVariant, size: "sm" }),
                        discountBadgeWrapperVariants()
                    )}
                >
                    {badgeText}
                </span>
            );
        };

        return (
            <span
                ref={ref}
                className={cn(
                    priceContainerVariants({ layout, align }),
                    className
                )}
                {...props}
            >
                {isStack && oldPricePosition === "above" && renderOldPrice()}
                {!isStack && oldPricePosition === "beside" && renderOldPrice()}

                <span
                    className={cn(
                        priceVariants({
                            variant: effectiveVariant,
                            size,
                            weight,
                        })
                    )}
                >
                    {showSymbol && (
                        <span className={cn(priceSymbolVariants())}>{currency.symbol}</span>
                    )}
                    {formattedPrice}
                    {showCode && (
                        <span className={cn(priceCodeVariants())}>{currency.code}</span>
                    )}
                    {renderDiscountBadge()}
                </span>

                {isStack && oldPricePosition === "below" && renderOldPrice()}
            </span>
        );
    }
);

Price.displayName = "Price";

export { Price };