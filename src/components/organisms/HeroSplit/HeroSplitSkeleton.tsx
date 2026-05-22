

import React from "react";
import { HeroSideSkeleton } from "@/components/molecules/HeroSideSkeleton";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface HeroSplitSkeletonProps {
    className?: string;
}

export function HeroSplitSkeleton({ className }: HeroSplitSkeletonProps) {
    return (
        <section
            className={cn(
                "relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden",
                className
            )}
            aria-hidden="true"
        >
            <HeroSideSkeleton position="left" />
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-surface-variant z-10" />
            <HeroSideSkeleton position="right" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-full shadow-ambient border border-border/30">
                    <SkeletonBlock className="h-16 md:h-24 w-24 md:w-36 rounded-full" />
                </div>
            </div>
        </section>
    );
}