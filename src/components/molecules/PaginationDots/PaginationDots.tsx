// src/components/molecules/PaginationDots/PaginationDots.tsx

"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
    paginationDotsContainerVariants,
    paginationDotVariants,
    type PaginationDotsSize,
} from "./PaginationDots.variants";

export interface PaginationDotsProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /** Tamaño de la paginación: 3 dots o 7 dots */
    size?: PaginationDotsSize;
    /** Offset actual (0 = centro siempre resaltado) */
    currentOffset: number;
    /** Callback con el offset relativo seleccionado */
    onOffsetChange: (offset: number) => void;
    /** Total de items (para aria-labels) */
    total: number;
    /** Índice actual del hero (para aria-labels) */
    currentIndex: number;
    /** Preview labels por offset: { -1: "Producto #3", 0: "Producto #4", ... } */
    previewLabels?: Record<number, string>;
}

export const PaginationDots = forwardRef<HTMLDivElement, PaginationDotsProps>(
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
        // Array de offsets relativos al hero
        const offsets =
            size === "compact"
                ? [-1, 0, 1]
                : [-3, -2, -1, 0, 1, 2, 3];

        const [hoveredOffset, setHoveredOffset] = useState<number | null>(null);

        return (
            <div
                ref={ref}
                className={cn(paginationDotsContainerVariants({ size }), className)}
                role="tablist"
                aria-label="Paginación de productos"
                {...props}
            >
                {offsets.map((offset) => {
                    const isActive = offset === currentOffset;
                    const targetIndex = ((currentIndex + offset) % total + total) % total;
                    const preview = previewLabels?.[offset];

                    return (
                        <div
                            key={offset}
                            className="relative flex items-center justify-center"
                        >
                            {/* Tooltip de preview en hover */}
                            {hoveredOffset === offset && preview && (
                                <div className={cn(
                                    "absolute -top-12 left-1/2 -translate-x-1/2 z-50",
                                    "px-3 py-1.5 rounded-lg bg-foreground text-background",
                                    "text-[10px] font-bold whitespace-nowrap shadow-xl",
                                    "pointer-events-none animate-fade-in"
                                )}>
                                    {preview}
                                    {/* Flechita del tooltip */}
                                    <div className={cn(
                                        "absolute -bottom-1 left-1/2 -translate-x-1/2",
                                        "w-2 h-2 bg-foreground rotate-45"
                                    )} />
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
                                    paginationDotVariants({ active: isActive, size }),
                                    "relative"
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