// ============================================================================
// STAR RATING — Átomo de calificación visual
// ============================================================================
// REFACTOR V3:
// - Archivo .variants.ts creado (no existía).
// - Zero inline classes:
//   • "flex items-center gap-0.5" → starRatingVariants
//   • "fill-current" + tamaños + colores → starIconVariants
// - Lógica de renderizado (i < value) se mantiene; es pura JS, no CSS.
// ============================================================================

import React from "react";
import { Star } from "lucide-react";
import { starRatingVariants, starIconVariants, type StarRatingSize } from "./StarRating.variants";
import { cn } from "@/lib/utils";

export interface StarRatingProps {
    /** Valor actual del rating (1-5) */
    value: number;
    /** Máximo de estrellas */
    max?: number;
    /** Tamaño de las estrellas */
    size?: StarRatingSize;
    /** Clases adicionales para el wrapper */
    className?: string;
}

export function StarRating({
    value,
    max = 5,
    size = "sm",
    className,
}: StarRatingProps) {
    return (
        <div
            className={cn(starRatingVariants(), className)}
            aria-label={`Calificación: ${value} de ${max}`}
            role="img"
        >
            {Array.from({ length: max }).map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        starIconVariants({
                            size,
                            state: i < value ? "filled" : "empty",
                        })
                    )}
                />
            ))}
        </div>
    );
}