// ============================================================================
// LOGO — Átomo de identidad de marca
// ============================================================================
// REFACTOR V3:
// - Zero inline classes: todo el CSS vive en Logo.variants.ts.
// - No se tocan colores aquí; el tema se controla via tokens de Tailwind.
// - Tipos importados desde .variants.ts (derivados del CVA).
// - "highlightText" (default "PRO") se estiliza via selector [&>span] en el CVA.
// ============================================================================

import React, { forwardRef } from "react";
import {
    logoVariants,
    type LogoVariant,
    type LogoSize,
} from "./Logo.variants";
import { cn } from "@/lib/utils";

export interface LogoProps
    extends React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement> {
    /** Variante visual */
    variant?: LogoVariant;
    /** Tamaño del logo */
    size?: LogoSize;
    /** Hacer clickeable (renderiza como <a>) */
    href?: string;
    /** Texto principal (default: JOVEN) */
    text?: string;
    /** Texto destacado (default: PRO) */
    highlightText?: string;
    /** Posición del highlight */
    highlightPosition?: "start" | "end";
    /** Separador entre textos */
    separator?: string;
    /** Es clickeable/interactivo */
    interactive?: boolean;
    /** Callback al clickear */
    onClick?: () => void;
}

const Logo = forwardRef<HTMLAnchorElement | HTMLSpanElement, LogoProps>(
    (
        {
            variant = "default",
            size = "md",
            href,
            text = "JOVEN",
            highlightText = "PRO",
            highlightPosition = "end",
            separator = "",
            interactive = true,
            onClick,
            className,
            ...props
        },
        ref
    ) => {
        const content = (
            <>
                {highlightPosition === "start" && <span>{highlightText}</span>}
                {highlightPosition === "start" && separator}
                {text}
                {highlightPosition === "end" && separator}
                {highlightPosition === "end" && <span>{highlightText}</span>}
            </>
        );

        const classes = cn(
            logoVariants({ variant, size, interactive }),
            className
        );

        if (href) {
            return (
                <a
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={href}
                    className={classes}
                    onClick={onClick}
                    {...props}
                >
                    {content}
                </a>
            );
        }

        return (
            <span
                ref={ref as React.Ref<HTMLSpanElement>}
                className={classes}
                onClick={onClick}
                {...props}
            >
                {content}
            </span>
        );
    }
);

Logo.displayName = "Logo";

export { Logo };