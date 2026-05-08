// ============================================================================
// SKELETON CIRCLE — Átomo de carga (círculo)
// ============================================================================
// REFACTOR V3:
// - CVA extraído a Skeleton.variants.ts (archivo compartido con SkeletonBlock).
// - Zero inline classes: todo el CSS vive en el CVA.
// ============================================================================

import React, { forwardRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { skeletonCircleVariants } from "./Skeleton.variants";
import { cn } from "@/lib/utils";

export interface SkeletonCircleProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonCircleVariants> { }

const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonCircleProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    skeletonCircleVariants({ variant, size }),
                    className
                )}
                {...props}
            />
        );
    }
);

SkeletonCircle.displayName = "SkeletonCircle";

export { SkeletonCircle };