// components/atoms/Typography/GradientTextSkeleton.tsx

import { cn } from "@/lib/utils";

export interface GradientTextSkeletonProps {
    className?: string;
}

export function GradientTextSkeleton({
    className,
}: GradientTextSkeletonProps) {
    return (
        <span
            className={cn(
                "block skeleton-pulse rounded-sm pointer-events-none select-none text-transparent w-3/4 h-4",
                className
            )}
            aria-hidden="true"
        />
    );
}