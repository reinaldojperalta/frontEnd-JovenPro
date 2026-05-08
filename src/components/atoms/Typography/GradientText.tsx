// ============================================================================
// GRADIENT TEXT — Átomo de texto con gradiente
// ============================================================================
// REFACTOR V3:
// - Eliminada construcción de strings CSS dinámicos:
//   ANTES: `bg-gradient-${direction} ${colors.join(" ")} bg-clip-text text-transparent`
//   AHORA: gradientTextVariants con direcciones y colores predefinidos como
//   variantes CVA. Tailwind JIT puede purgar clases estáticas; no strings.
// - Props `colors` (string[]) eliminadas. Reemplazadas por `from` y `to`
//   con valores tipados de la paleta V3.
// - Tipos importados desde Typography.variants.ts.
// - Zero inline classes.
// ============================================================================

import React from "react";
import {
    gradientTextVariants,
    type GradientTextDirection,
    type GradientTextFrom,
    type GradientTextTo,
} from "./Typography.variants";
import { cn } from "@/lib/utils";

export interface GradientTextProps {
    children: React.ReactNode;
    /** Dirección del gradiente */
    direction?: GradientTextDirection;
    /** Color de inicio del gradiente */
    from?: GradientTextFrom;
    /** Color de fin del gradiente */
    to?: GradientTextTo;
    /** Clases adicionales */
    className?: string;
    /** Elemento a renderizar */
    as?: "span" | "h1" | "h2" | "h3" | "p" | "strong";
}

const GradientText: React.FC<GradientTextProps> = ({
    children,
    direction = "to-r",
    from = "primary-dim",
    to = "primary",
    className,
    as: Component = "span",
}) => {
    return (
        <Component
            className={cn(
                gradientTextVariants({ direction, from, to }),
                className
            )}
        >
            {children}
        </Component>
    );
};

export { GradientText };