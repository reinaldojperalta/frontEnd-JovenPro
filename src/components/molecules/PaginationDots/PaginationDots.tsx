// ============================================================================
// PAGINATION DOTS — Molécula de paginación por puntos
// ============================================================================
// REFACTOR V3:
// - Zero inline classes:
//   • "relative flex items-center justify-center" → paginationDotWrapperVariants
//   • Tooltip completo (posicionamiento, colores, tipografía, animación)
//     → paginationDotTooltipVariants
//   • Flecha del tooltip → paginationDotTooltipArrowVariants
//   • "relative" del button → agregado al base de paginationDotVariants
// - Tokens validados: bg-foreground, text-background, bg-surface-variant,
//   hover:bg-border, animate-fade-in. Todos existen en paleta V3.
// - Tipos importados desde .variants.ts (derivados del CVA).
// ============================================================================

"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
    paginationDotsContainerVariants,
    paginationDotVariants,
    paginationDotWrapperVariants,
    paginationDotTooltipVariants,
    paginationDotTooltipArrowVariants,
    type PaginationDotsSize,
} from "./PaginationDots.variants";

export interface PaginationDotsProps
    extends React.HTMLAttributes<HTMLDivElement> {
    size?: PaginationDotsSize;
    currentOffset: number;
    onOffsetChange: (offset: number) => void;
    total: number;
    currentIndex: number;
    previewLabels?: Record<number, string>;
}

export const PaginationDots = forwardRef<
    HTMLDivElement,
    PaginationDotsProps
>(
    (
        {
            size = "standard",
            currentOffset,
            onOffsetChange,
            total,
            currentIndex,
            previewLabels,
            className,
            ...props
        },
        ref
    ) => {
        const offsets =
            size === "compact" ? [-1, 0, 1] : [-3, -2, -1, 0, 1, 2, 3];

        const [hoveredOffset, setHoveredOffset] = useState<number | null>(null);

        return (
            <div
                ref={ref}
                className={cn(
                    paginationDotsContainerVariants({ size }),
                    className
                )}
                role="tablist"
                aria-label="Paginación de productos"
                {...props}
            >
                {offsets.map((offset) => {
                    const isActive = offset === currentOffset;
                    const targetIndex =
                        ((currentIndex + offset) % total + total) % total;
                    const preview = previewLabels?.[offset];

                    return (
                        <div
                            key={offset}
                            className={cn(paginationDotWrapperVariants())}
                        >
                            {hoveredOffset === offset && preview && (
                                <div className={cn(paginationDotTooltipVariants())}>
                                    {preview}
                                    <div
                                        className={cn(
                                            paginationDotTooltipArrowVariants()
                                        )}
                                    />
                                </div>
                            )}

                            <button
                                role="tab"
                                aria-selected={isActive}
                                aria-label={`Producto ${targetIndex + 1} de ${total}`}
                                onClick={() => onOffsetChange(offset)}
                                onMouseEnter={() => setHoveredOffset(offset)}
                                onMouseLeave={() => setHoveredOffset(null)}
                                className={cn(
                                    paginationDotVariants({
                                        active: isActive,
                                        size,
                                    })
                                )}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
);

PaginationDots.displayName = "PaginationDots";