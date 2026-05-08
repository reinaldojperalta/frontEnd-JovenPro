// components/atoms/StarRating/StarRatingSkeleton.tsx

import React from "react";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface StarRatingSkeletonProps {
    max?: number;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function StarRatingSkeleton({ max = 5, size = "sm", className }: StarRatingSkeletonProps) {
    const starSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

    return (
        <div className={cn("flex items-center gap-0.5", className)} aria-hidden="true">
            {Array.from({ length: max }).map((_, i) => (
                <SkeletonBlock key={i} className={cn("rounded-sm", starSize)} />
            ))}
        </div>
    );
}