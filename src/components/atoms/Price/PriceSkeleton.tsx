// components/atoms/Price/PriceSkeleton.tsx

import { cn } from "@/lib/utils";
import { SkeletonBlock } from "@/components/atoms/Skeleton";

export interface PriceSkeletonProps {
    showOldPrice?: boolean;
    showDiscountBadge?: boolean;
    layout?: "stack" | "inline";
    align?: "left" | "center" | "right";
    className?: string;
}

export function PriceSkeleton({
    showOldPrice = false,
    showDiscountBadge = false,
    layout = "stack",
    align = "left",
    className,
}: PriceSkeletonProps) {
    const isStack = layout === "stack";

    return (
        <span
            className={cn(
                "inline-flex",
                isStack ? "flex-col" : "flex-row items-baseline flex-wrap",
                align === "center" && "items-center",
                align === "right" && "items-end",
                className
            )}
            aria-hidden="true"
        >
            {showOldPrice && isStack && (
                <SkeletonBlock className="w-14 h-3.5 rounded-sm mb-1" />
            )}

            <span className="flex items-center gap-2">
                <SkeletonBlock className="w-20 h-6 rounded-sm" />
                {showDiscountBadge && (
                    <SkeletonBlock className="w-12 h-4 rounded-full" />
                )}
            </span>

            {showOldPrice && !isStack && (
                <SkeletonBlock className="w-12 h-3.5 rounded-sm ml-2" />
            )}
        </span>
    );
}