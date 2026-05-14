// components/atoms/Typography/TextSkeleton.tsx

import { textVariants, type TextSize, type TextVariant, type TextWeight, type TextAlign } from "./Typography.variants";
import { cn } from "@/lib/utils";

export interface TextSkeletonProps {
    size?: TextSize;
    variant?: TextVariant;
    weight?: TextWeight;
    align?: TextAlign;
    transform?: "uppercase" | "lowercase" | "capitalize" | "normal";
    className?: string;
    lines?: 1 | 2 | 3 | 4 | 5;
    width?: string | number;
    height?: string | number;
}

export function TextSkeleton({
    size = "base",
    variant = "default",
    weight = "medium",
    align = "left",
    transform = "normal",
    className,
    lines = 1,
    width,
    height,
}: TextSkeletonProps) {
    return (
        <div
            style={{ width, height }}
            className={cn(
                textVariants({
                    size,
                    variant,
                    weight,
                    align,
                    transform,
                    truncate: false,
                    lineClamp: "none",
                }),
                "pointer-events-none select-none flex flex-col gap-2",
                className
            )}
            aria-hidden="true"
        >
            {Array.from({ length: lines }).map((_, i) => (
                <span
                    key={i}
                    className={cn(
                        "block skeleton-pulse rounded-sm text-transparent h-4",
                        i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
                    )}
                />
            ))}
        </div>
    );
}