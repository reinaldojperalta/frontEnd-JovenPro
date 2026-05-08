// ============================================================================
// SKELETON VARIANTS — Átomos de estado de carga
// ============================================================================
// REFACTOR V3:
// - Archivo unificado para SkeletonBlock y SkeletonCircle (ambos átomos de
//   carga con lógica similar, reduce overhead de archivos).
// - SkeletonBlock: corregido bug donde "animate-pulse" vivía en el base del
//   CVA, haciendo que animation="none" fuera un no-op (el base siempre gana).
//   Ahora "animate-pulse" vive solo en la variante animation.pulse.
// - Tokens validados contra paleta V3:
//   • bg-surface-variant: existe (#E2E8F0)
//   • bg-foreground/10: utilitario Tailwind válido para modo oscuro
//   • rounded-clay: existe
// - ALERTA: "animate-shimmer" no está definido en tailwind.config.ts visible.
//   Si no existe en el proyecto, esta variante es un token fantasma.
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

// ============================================
// SKELETON BLOCK (rectángulo)
// ============================================

export const skeletonBlockVariants = cva("rounded", {
    variants: {
        variant: {
            default: "bg-surface-variant",
            muted: "bg-surface-variant/50",
            dark: "bg-foreground/10",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
            clay: "rounded-clay",
        },
        animation: {
            pulse: "animate-pulse",
            shimmer:
                "animate-shimmer bg-gradient-to-r from-surface-variant via-surface to-surface-variant bg-[length:200%_100%]",
            none: "",
        },
    },
    defaultVariants: {
        variant: "default",
        radius: "md",
        animation: "pulse",
    },
});

// ============================================
// SKELETON CIRCLE (círculo)
// ============================================

export const skeletonCircleVariants = cva(
    "animate-pulse rounded-full",
    {
        variants: {
            variant: {
                default: "bg-surface-variant",
                muted: "bg-surface-variant/50",
            },
            size: {
                xs: "w-6 h-6",
                sm: "w-8 h-8",
                md: "w-12 h-12",
                lg: "w-16 h-16",
                xl: "w-20 h-20",
                giant: "w-24 h-24",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

// Tipos derivados del CVA — sincronización automática
export type SkeletonBlockVariant = NonNullable<
    Parameters<typeof skeletonBlockVariants>[0]
>["variant"];
export type SkeletonBlockRadius = NonNullable<
    Parameters<typeof skeletonBlockVariants>[0]
>["radius"];
export type SkeletonBlockAnimation = NonNullable<
    Parameters<typeof skeletonBlockVariants>[0]
>["animation"];
export type SkeletonCircleVariant = NonNullable<
    Parameters<typeof skeletonCircleVariants>[0]
>["variant"];
export type SkeletonCircleSize = NonNullable<
    Parameters<typeof skeletonCircleVariants>[0]
>["size"];