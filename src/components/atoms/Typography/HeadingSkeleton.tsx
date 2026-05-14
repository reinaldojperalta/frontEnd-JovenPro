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
    width?: string | number;
    height?: string | number;
}

export function HeadingSkeleton({
    level = "h2",
    variant = "skeleton",
    italic = false,
    tracking = "tighter",
    transform = "normal",
    className,
    width,
    height,
}: HeadingSkeletonProps) {
    return (
        <div
            style={{ width, height }}
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