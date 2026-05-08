// ============================================================================
// SKELETON BLOCK — Átomo de carga (rectángulo)
// ============================================================================
// REFACTOR V3:
// - CVA extraído a Skeleton.variants.ts (archivo compartido con SkeletonCircle).
// - Zero inline classes: todo el CSS vive en el CVA.
// - Bug corregido: animation="none" ahora funciona correctamente porque
//   "animate-pulse" ya no está hardcodeado en el base del CVA.
// ============================================================================

import React, { forwardRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { skeletonBlockVariants } from "./Skeleton.variants";
import { cn } from "@/lib/utils";

export interface SkeletonBlockProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonBlockVariants> { }

const SkeletonBlock = forwardRef<HTMLDivElement, SkeletonBlockProps>(
    ({ className, variant, radius, animation, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    skeletonBlockVariants({ variant, radius, animation }),
                    className
                )}
                {...props}
            />
        );
    }
);

SkeletonBlock.displayName = "SkeletonBlock";

export { SkeletonBlock };