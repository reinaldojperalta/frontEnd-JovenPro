// components/molecules/Nav/NavSkeleton.tsx

import {
    navVariants,
    navItemVariants,
    type NavDirection,
    type NavAlign,
    type NavSize,
    type NavVariant,
    type NavItemVariant,
    type NavItemWeight,
    type NavItemTransform,
} from "./Nav.variants";
import { cn } from "@/lib/utils";

export interface NavSkeletonProps {
    items?: number;
    direction?: NavDirection;
    align?: NavAlign;
    size?: NavSize;
    variant?: NavVariant;
    itemVariant?: NavItemVariant;
    itemSize?: "xs" | "sm" | "md" | "lg";
    itemWeight?: NavItemWeight;
    itemTransform?: NavItemTransform;
    className?: string;
}

// ✅ Anchos determinísticos con clases Tailwind (sin style inline)
const WIDTH_CLASSES = [
    "w-12",
    "w-16",
    "w-14",
    "w-20",
    "w-18",
    "w-12",
    "w-16",
    "w-22"
];

export function NavSkeleton({
    items = 4,
    direction = "horizontal",
    align = "center",
    size = "md",
    variant = "default",
    itemVariant = "default",
    itemSize = "md",
    itemWeight = "bold",
    itemTransform = "none",
    className,
}: NavSkeletonProps) {
    return (
        <nav
            className={cn(navVariants({ direction, align, size, variant }), className)}
            aria-hidden="true"
        >
            {Array.from({ length: items }).map((_, i) => (
                <div key={i} className="inline-flex items-center relative">
                    <span
                        className={cn(
                            navItemVariants({
                                isActive: false,
                                size: itemSize,
                                variant: itemVariant,
                                weight: itemWeight,
                                transform: itemTransform,
                            }),
                            "relative block"
                        )}
                    >
                        <span
                            className={cn(
                                "block skeleton-pulse rounded-sm h-3",
                                WIDTH_CLASSES[i % WIDTH_CLASSES.length]
                            )}
                        />
                    </span>
                </div>
            ))}
        </nav>
    );
}