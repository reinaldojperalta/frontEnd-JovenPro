// components/molecules/HeroSideSkeleton/HeroSideSkeleton.tsx



import React from "react";
import { Container } from "@/components/atoms/Container";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface HeroSideSkeletonProps {
    position: "left" | "right";
    className?: string;
}

export function HeroSideSkeleton({ position, className }: HeroSideSkeletonProps) {
    const isLeft = position === "left";

    return (
        <div
            className={cn(
                "relative flex-1 flex items-center justify-center min-h-[50vh] md:min-h-screen",
                "bg-surface-container",
                className
            )}
        >
            <SkeletonBlock className="absolute inset-0 rounded-none" animation="shimmer" />
            <div
                className={cn(
                    "absolute inset-0",
                    isLeft
                        ? "bg-gradient-to-r from-surface-container via-surface-container/80 to-transparent"
                        : "bg-gradient-to-l from-surface-container via-surface-container/80 to-transparent"
                )}
            />
            <Container size="sm" padding="md" className="relative z-10 w-full">
                <div className={cn("space-y-6", !isLeft && "md:ml-auto")}>
                    <SkeletonBlock className="h-12 md:h-16 w-3/4 rounded-clay" />
                    <SkeletonBlock className="h-12 md:h-16 w-1/2 rounded-clay" />
                    <div className="space-y-2 max-w-md">
                        <SkeletonBlock className="h-5 w-full rounded-sm" />
                        <SkeletonBlock className="h-5 w-5/6 rounded-sm" />
                        <SkeletonBlock className="h-5 w-4/6 rounded-sm" />
                    </div>
                    <SkeletonBlock className="h-6 w-40 rounded-sm" />
                </div>
            </Container>
        </div>
    );
}