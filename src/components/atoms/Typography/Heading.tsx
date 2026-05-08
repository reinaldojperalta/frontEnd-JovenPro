// ============================================================================
// HEADING — Átomo de título semántico
// ============================================================================
// REFACTOR V3:
// - Eliminado span wrapper redundante para variant="gradient".
//   El CVA headingVariants ya incluye bg-clip-text text-transparent en la
//   variante gradient. El span interno duplicaba estas clases y carecía de
//   background-image propio, lo que podía renderizar texto invisible.
// - Tipos importados desde .variants.ts (derivados del CVA).
// - Zero inline classes.
// ============================================================================

import React, { forwardRef } from "react";
import {
    headingVariants,
    type HeadingLevel,
    type HeadingVariant,
    type HeadingTracking,
    type HeadingTransform,
} from "./Typography.variants";
import { cn } from "@/lib/utils";

export interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement> {
    /** Nivel semántico (h1-h6) */
    level?: HeadingLevel;
    /** Variante visual */
    variant?: HeadingVariant;
    /** Aplicar estilo itálico */
    italic?: boolean;
    /** Espaciado entre letras */
    tracking?: HeadingTracking;
    /** Transformación de texto */
    transform?: HeadingTransform;
    /** Forzar elemento diferente al level */
    as?: HeadingLevel;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    (
        {
            level = "h2",
            variant = "default",
            italic = false,
            tracking = "tighter",
            transform = "normal",
            as,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const Component = (as || level) as React.ElementType;

        return (
            <Component
                ref={ref as any}
                className={cn(
                    headingVariants({
                        level,
                        variant,
                        italic,
                        tracking,
                        transform,
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

Heading.displayName = "Heading";

export { Heading };