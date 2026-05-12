// ============================================================================
// BENTO GRID — Container + Item (ÁTOMO de layout)
// ============================================================================
// Sistema unificado de distribución bento.
// BentoGrid define el layout del grid (standard | carousel | news).
// BentoItem define la posición del slot dentro del grid.
// Ambos son átomos puros: sin lógica de negocio, sin estado, sin color semántico.
// ============================================================================

import React from "react";
import { cn } from "@/lib/utils";
import {
    bentoGridVariants,
    bentoItemVariants,
    type BentoGridLayout,
    type BentoGridCols,
    type BentoItemPosition,
    type BentoItemSpan,
    type BentoItemRowSpan,
    type BentoItemRatio,
    type BentoItemType,
} from "./BentoGrid.variants";

/* ============================================================
 * BENTO GRID (Container)
 * ============================================================ */

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Layout del grid: standard (genérico), carousel (16×9), news (3 cols) */
    layout?: BentoGridLayout;
    /** Columnas para layout=standard (responsive). Ignorado en carousel/news. */
    cols?: BentoGridCols;
}

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
    ({ className, layout, cols, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(bentoGridVariants({ layout, cols }), className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

BentoGrid.displayName = "BentoGrid";

/* ============================================================
 * BENTO ITEM (Slot)
 * ============================================================ */

export interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Posición nombrada dentro de un layout (carousel | news) */
    position?: BentoItemPosition;
    /** Tipo de slot: producto (fondo+shadow), texto (transparente), control (transparente) */
    type?: BentoItemType;
    /** Columnas que ocupa (modo genérico, cuando no hay position) */
    colSpan?: BentoItemSpan;
    /** Filas que ocupa (modo genérico) */
    rowSpan?: BentoItemRowSpan;
    /** Ratio de aspecto forzado (modo genérico) */
    ratio?: BentoItemRatio;
    /** Estado de historial inactivo (carousel) */
    isHistory?: boolean;
}

export const BentoItem = React.forwardRef<HTMLDivElement, BentoItemProps>(
    (
        {
            className,
            position,
            type,
            colSpan,
            rowSpan,
            ratio,
            isHistory,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    bentoItemVariants({
                        position,
                        type,
                        colSpan,
                        rowSpan,
                        ratio,
                        isHistory,
                    }),
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

BentoItem.displayName = "BentoItem";