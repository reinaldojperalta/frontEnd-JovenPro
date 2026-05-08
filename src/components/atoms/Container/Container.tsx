// ============================================================================
// CONTAINER — Átomo de layout estructural
// ============================================================================
// REFACTOR V3:
// - Zero inline classes: todo el CSS vive en Container.variants.ts.
// - Tipos importados desde .variants.ts (derivados del CVA).
// - Prop "paddingY" default sincronizada con CVA: "none".
// - No se tocan colores aquí; el tema se controla via tokens de Tailwind.
// ============================================================================

import React, { forwardRef } from "react";
import {
    containerVariants,
    type ContainerSize,
    type ContainerPadding,
    type ContainerPaddingY,
    type ContainerVariant,
    type ContainerAlign,
    type ContainerMinHeight,
    type ContainerRadius,
} from "./Container.variants";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Ancho máximo del container */
    size?: ContainerSize;
    /** Padding horizontal */
    padding?: ContainerPadding;
    /** Padding vertical (sección completa) */
    paddingY?: ContainerPaddingY;
    /** Variante visual de fondo */
    variant?: ContainerVariant;
    /** Alineación del container */
    align?: ContainerAlign;
    /** Altura mínima */
    minHeight?: ContainerMinHeight;
    /** Radio de borde (para containers flotantes/cards) */
    radius?: ContainerRadius;
    /** Usar flexbox */
    flex?: boolean;
    /** Centrar contenido (items-center justify-center) */
    centered?: boolean;
    /** Como elemento semántico */
    as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav" | "aside";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            size = "lg",
            padding = "md",
            paddingY = "none",
            variant = "transparent",
            align = "center",
            minHeight = "none",
            radius = "none",
            flex = false,
            centered = false,
            as: Component = "div",
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <Component
                ref={ref}
                className={cn(
                    containerVariants({
                        size,
                        padding,
                        paddingY,
                        variant,
                        align,
                        minHeight,
                        radius,
                        flex,
                        centered,
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

Container.displayName = "Container";

export { Container };