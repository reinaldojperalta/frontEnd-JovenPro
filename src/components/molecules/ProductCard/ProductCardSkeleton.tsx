

import React from "react";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";
import { productCardMediaVariants } from "./ProductCard.variants";

export interface ProductCardSkeletonProps {
    variant?: "card-full" | "card-min" | "card-preview-max" | "card-preview" | "history-slot";
    className?: string;
}

export function ProductCardSkeleton({
    variant = "card-preview",
    className,
}: ProductCardSkeletonProps) {
    const isFeatured = variant === "card-full";

    return (
        <div className={cn("h-full", className)} aria-hidden="true">
            <div className="relative overflow-hidden rounded-2xl bg-surface mb-4">
                <SkeletonBlock className={cn(productCardMediaVariants({ variant }), "w-full")} />
                {isFeatured && (
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        <SkeletonBlock className="w-8 h-8 rounded-full" />
                        <SkeletonBlock className="w-20 h-4 rounded-full" />
                    </div>
                )}
            </div>
            <div className="px-1 space-y-2">
                <div className="flex items-start justify-between gap-3">
                    <SkeletonBlock className="h-5 w-2/3 rounded-sm" />
                    {!isFeatured && <SkeletonBlock className="h-5 w-16 rounded-sm" />}
                </div>
                {isFeatured && (
                    <>
                        <SkeletonBlock className="h-4 w-full rounded-sm" />
                        <SkeletonBlock className="h-4 w-3/4 rounded-sm" />
                    </>
                )}
                <SkeletonBlock className="h-4 w-24 rounded-sm" />
            </div>
        </div>
    );
}