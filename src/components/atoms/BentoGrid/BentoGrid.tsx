// ============================================================================
// BENTO GRID — Container + Item (molécula de layout)
// ============================================================================
// REFACTOR V3:
// - Zero inline classes: TODO el CSS vive en BentoGrid.variants.ts.
// - No se tocan colores aquí; el tema se controla via tokens de Tailwind.
// - BentoItem delega ratio/colSpan/rowSpan al CVA del archivo .variants.ts.
// ============================================================================

import React from "react";
import { cn } from "@/lib/utils";
import {
    bentoGridVariants,
    bentoItemVariants,
    type BentoGridCols,
    type BentoItemSpan,
    type BentoItemRatio,
} from "./BentoGrid.variants";

// ==========================================
// BENTO GRID (Container)
// ==========================================

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Número de columnas del grid (responsive por defecto) */
    cols?: BentoGridCols;
}

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
    ({ className, cols, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(bentoGridVariants({ cols }), className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

BentoGrid.displayName = "BentoGrid";

// ==========================================
// BENTO ITEM (Child)
// ==========================================

export interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Columnas que ocupa el item (responsive) */
    colSpan?: BentoItemSpan;
    /** Filas que ocupa el item */
    rowSpan?: 1 | 2 | 3;
    /** Ratio de aspecto forzado */
    ratio?: BentoItemRatio;
}

export const BentoItem = React.forwardRef<HTMLDivElement, BentoItemProps>(
    ({ className, colSpan, rowSpan, ratio, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(bentoItemVariants({ colSpan, rowSpan, ratio }), className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

BentoItem.displayName = "BentoItem";