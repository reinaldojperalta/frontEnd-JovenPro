// components/molecules/TestimonialCard/TestimonialCardSkeleton.tsx

"use client";

import React from "react";
import { SkeletonCircle } from "@/components/atoms/Skeleton";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { StarRatingSkeleton } from "@/components/atoms/StarRating";
import { cn } from "@/lib/utils";

export interface TestimonialCardSkeletonProps {
    hasProductImage?: boolean;
    className?: string;
}

export function TestimonialCardSkeleton({
    hasProductImage = false,
    className,
}: TestimonialCardSkeletonProps) {
    return (
        <div
            className={cn(
                "flex flex-col h-full bg-surface-container rounded-clay shadow-clay p-6 md:p-8",
                className
            )}
            aria-hidden="true"
        >
            {/* Header Skeleton */}
            <div className="flex items-center gap-4 mb-6">
                <SkeletonCircle size="md" />
                <div className="space-y-2 flex-1">
                    <SkeletonBlock className="h-5 w-32 rounded-sm" />
                    <SkeletonBlock className="h-4 w-24 rounded-sm" />
                </div>
            </div>

            {/* Quote decoration skeleton */}
            <SkeletonBlock className="h-8 w-8 rounded-sm mb-2" />

            {/* Content Skeleton */}
            <div className="flex-1 space-y-2 mb-6">
                <SkeletonBlock className="h-4 w-full rounded-sm" />
                <SkeletonBlock className="h-4 w-full rounded-sm" />
                <SkeletonBlock className="h-4 w-5/6 rounded-sm" />
            </div>

            {/* Footer Skeleton */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-surface-variant/50">
                <StarRatingSkeleton size="sm" />
                {hasProductImage && (
                    <SkeletonBlock className="w-12 h-12 rounded-clay-sm shrink-0" />
                )}
            </div>
        </div>
    );
}