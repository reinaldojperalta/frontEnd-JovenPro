// ============================================================================
// TEXT — Átomo de cuerpo tipográfico
// ============================================================================
// REFACTOR V3:
// - Tipos importados desde .variants.ts (derivados del CVA).
//   FontWeight renombrado a TextWeight para evitar colisión con tipos globales.
// - LineClamp mantiene type manual (limitación de CVA con keys numéricas).
// - Zero inline classes.
// ============================================================================

import React, { forwardRef } from "react";
import {
    textVariants,
    type TextSize,
    type TextVariant,
    type TextWeight,
    type TextAlign,
    type TextTransform,
    type TextLineClamp,
} from "./Typography.variants";
import { cn } from "@/lib/utils";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    /** Tamaño del texto */
    size?: TextSize;
    /** Variante de estilo/propósito */
    variant?: TextVariant;
    /** Peso de fuente */
    weight?: TextWeight;
    /** Alineación */
    align?: TextAlign;
    /** Transformación de texto */
    transform?: TextTransform;
    /** Truncar en una línea */
    truncate?: boolean;
    /** Limitar líneas (multiline ellipsis) */
    lineClamp?: TextLineClamp;
    /** Renderizar como elemento diferente */
    as?: "p" | "span" | "div" | "label" | "small" | "strong" | "em";
}

const Text = forwardRef<HTMLElement, TextProps>(
    (
        {
            size = "base",
            variant = "default",
            weight = "medium",
            align = "left",
            transform = "normal",
            truncate = false,
            lineClamp = "none",
            as = "p",
            className,
            children,
            ...props
        },
        ref
    ) => {
        const Component = as;

        return (
            <Component
                ref={ref as any}
                className={cn(
                    textVariants({
                        size,
                        variant,
                        weight,
                        align,
                        transform,
                        truncate,
                        lineClamp,
                    }),
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Text.displayName = "Text";

export { Text };