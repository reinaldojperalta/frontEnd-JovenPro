// components/molecules/VideoCard/VideoCardSkeleton.tsx



import React from "react";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface VideoCardSkeletonProps {
    className?: string;
}

export function VideoCardSkeleton({ className }: VideoCardSkeletonProps) {
    return (
        <div className={cn("flex flex-col", className)} aria-hidden="true">
            <SkeletonBlock className="aspect-video rounded-clay shadow-clay" />
            <div className="mt-4 space-y-2">
                <SkeletonBlock className="h-5 w-3/4 rounded-sm" />
                <SkeletonBlock className="h-4 w-1/2 rounded-sm" />
            </div>
        </div>
    );
}