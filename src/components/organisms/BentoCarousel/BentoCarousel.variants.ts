// ============================================================================
// BENTO CAROUSEL VARIANTS — Organismo de carousel bento
// ============================================================================
// REFACTOR V4: Grid 16×9 para BentoCarousel
// - BENTO_SLOTS usa position (BentoItemPosition) en vez de gridClass
// - Eliminados CVA obsoletos: slot, controls, arrow, footer
// - bentoPlaceholderVariants se mantiene para slots vacíos
// ============================================================================

import { cva } from "class-variance-authority";
import type { BentoItemPosition } from "@/components/atoms/BentoGrid/BentoGrid.variants";

/* ============================================================
 * HEADER (legacy — ahora textos viven en el grid)
 * ============================================================ */
export const bentoCarouselHeaderVariants = cva(
    "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
);

export const bentoCarouselOverlineVariants = cva(
    "uppercase tracking-[0.2em] text-primary mb-3"
);

/* ============================================================
 * GRID WRAPPER (legacy — ahora BentoGrid layout="carousel")
 * ============================================================ */
export const bentoCarouselGridWrapperVariants = cva("");

/* ============================================================
 * PLACEHOLDER (slot vacío)
 * ============================================================ */
export const bentoPlaceholderVariants = cva(
    "rounded-clay border-2 border-dashed border-surface-variant bg-surface-container/30",
    {
        variants: {
            isHistory: {
                true: "grayscale opacity-50",
                false: "",
            },
        },
        defaultVariants: {
            isHistory: false,
        },
    }
);

/* ============================================================
 * INFO LABEL (Producto X de Y — opcional, debajo del grid)
 * ============================================================ */
export const bentoCarouselInfoVariants = cva(
    "flex justify-center mt-4"
);

export const bentoCarouselLabelVariants = cva(
    "uppercase tracking-[0.15em] font-semibold text-muted-foreground text-xs"
);

/* ============================================================
 * CONSTANTES DE ANIMACIÓN
 * ============================================================ */
export const BENTO_SPRING = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
};

export interface BentoDirectionAnimations {
    enter: { x?: number; y?: number; scale?: number; opacity?: number };
    exit: { x?: number; y?: number; scale?: number; opacity?: number };
}

export const BENTO_DIRECTIONS = {
    next: {
        main: {
            enter: { x: 80, scale: 0.9, opacity: 0 },
            exit: { x: -40, scale: 0.85, opacity: 0 },
        },
        history: {
            enter: { y: -30, scale: 0.9, opacity: 0 },
            exit: { y: 30, scale: 0.85, opacity: 0 },
        },
    },
    prev: {
        main: {
            enter: { x: -80, scale: 0.9, opacity: 0 },
            exit: { x: 40, scale: 0.85, opacity: 0 },
        },
        history: {
            enter: { y: 30, scale: 0.9, opacity: 0 },
            exit: { y: -30, scale: 0.85, opacity: 0 },
        },
    },
};

export type BentoSlotVariant =
    | "card-full"
    | "card-min"
    | "card-preview-max"
    | "card-preview"
    | "history-slot";

export interface BentoSlotConfig {
    id: string;
    position: BentoItemPosition;
    variant: BentoSlotVariant;
    offset: number;
    delay: number;
    interactive: boolean;
}

export const BENTO_SLOTS: BentoSlotConfig[] = [
    { id: "history-1", position: "history-1", variant: "history-slot", offset: -1, delay: 0.18, interactive: true },
    { id: "history-2", position: "history-2", variant: "history-slot", offset: -2, delay: 0.30, interactive: true },
    { id: "history-3", position: "history-3", variant: "history-slot", offset: -3, delay: 0.38, interactive: true },
    { id: "history-4", position: "history-4", variant: "history-slot", offset: -4, delay: 0.42, interactive: true },
    { id: "hero", position: "hero", variant: "card-full", offset: 0, delay: 0, interactive: true },
    { id: "next", position: "next", variant: "card-min", offset: 1, delay: 0.18, interactive: true },
    { id: "preview-max", position: "preview-max", variant: "card-preview-max", offset: 2, delay: 0.30, interactive: true },
    { id: "preview-1", position: "preview-1", variant: "card-preview", offset: 3, delay: 0.38, interactive: true },
    { id: "preview-2", position: "preview-2", variant: "card-preview", offset: 4, delay: 0.42, interactive: true },
];