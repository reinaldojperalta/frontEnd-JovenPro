// src/components/organisms/BentoCarousel/BentoCarousel.variants.ts

import { cva } from "class-variance-authority";

export type BentoSlotVariant =
    | "card-full"
    | "card-min"
    | "card-preview-max"
    | "card-preview"
    | "history-slot";

export interface BentoSlotConfig {
    id: string;
    gridClass: string;
    variant: BentoSlotVariant;
    offset: number;
    delay: number;
    interactive: boolean;
}

export const BENTO_SPRING = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
};

// ============================================
// ANIMACIONES POR DIRECCIÓN
// ============================================

export interface BentoDirectionAnimations {
    enter: { x?: number; y?: number; scale?: number; opacity?: number };
    exit: { x?: number; y?: number; scale?: number; opacity?: number };
}

export const BENTO_DIRECTIONS = {
    next: {
        // Slots principales: entran desde derecha, salen hacia izquierda
        main: {
            enter: { x: 80, scale: 0.9, opacity: 0 },
            exit: { x: -40, scale: 0.85, opacity: 0 },
        },
        // History: entran desde arriba, salen hacia arriba
        history: {
            enter: { y: -30, scale: 0.9, opacity: 0 },
            exit: { y: 30, scale: 0.85, opacity: 0 },
        },
    },
    prev: {
        // Slots principales: entran desde izquierda, salen hacia derecha
        main: {
            enter: { x: -80, scale: 0.9, opacity: 0 },
            exit: { x: 40, scale: 0.85, opacity: 0 },
        },
        // History: entran desde abajo, salen hacia abajo
        history: {
            enter: { y: 30, scale: 0.9, opacity: 0 },
            exit: { y: -30, scale: 0.85, opacity: 0 },
        },
    },
};

export const BENTO_SLOTS: BentoSlotConfig[] = [
    // History (4 slots)
    { id: "history-1", gridClass: "bento-slot-history-1", variant: "history-slot", offset: -1, delay: 0.18, interactive: true },
    { id: "history-2", gridClass: "bento-slot-history-2", variant: "history-slot", offset: -2, delay: 0.30, interactive: true },
    { id: "history-3", gridClass: "bento-slot-history-3", variant: "history-slot", offset: -3, delay: 0.38, interactive: true },
    { id: "history-4", gridClass: "bento-slot-history-4", variant: "history-slot", offset: -4, delay: 0.42, interactive: true },
    // Main slots
    { id: "hero", gridClass: "bento-slot-hero", variant: "card-full", offset: 0, delay: 0, interactive: true },
    { id: "min", gridClass: "bento-slot-next", variant: "card-min", offset: 1, delay: 0.18, interactive: true },
    { id: "preview-max", gridClass: "bento-slot-prev-max", variant: "card-preview-max", offset: 2, delay: 0.30, interactive: true },
    { id: "preview-1", gridClass: "bento-slot-prev-1", variant: "card-preview", offset: 3, delay: 0.38, interactive: true },
    { id: "preview-2", gridClass: "bento-slot-prev-2", variant: "card-preview", offset: 4, delay: 0.42, interactive: true },
];

export const bentoPlaceholderVariants = {
    base: "bento-slot bg-surface-container/30 rounded-clay border-2 border-dashed border-surface-variant",
    history: "grayscale opacity-50",
};