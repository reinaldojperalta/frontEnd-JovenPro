// components/atoms/Typography/HeadingSkeleton.tsx

import { headingVariants, type HeadingLevel, type HeadingVariant } from "./Typography.variants";
import { cn } from "@/lib/utils";

export interface HeadingSkeletonProps {
    level?: HeadingLevel;
    variant?: HeadingVariant;
    italic?: boolean;
    tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
    transform?: "uppercase" | "lowercase" | "capitalize" | "normal";
    className?: string;
}

export function HeadingSkeleton({
    level = "h2",
    variant = "liquidGlass",
    italic = false,
    tracking = "tighter",
    transform = "normal",
    className,
}: HeadingSkeletonProps) {
    return (
        <div
            className={cn(
                headingVariants({
                    level,
                    variant,
                    italic,
                    tracking,
                    transform,
                }),
                "skeleton-pulse rounded-sm pointer-events-none select-none text-transparent w-3/4",
                className
            )}
            aria-hidden="true"
        />
    );
}