// components/organisms/VideosSection/VideosSectionSkeleton.tsx

"use client";

import React from "react";
import { Container } from "@/components/atoms/Container";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { VideoCardSkeleton } from "@/components/molecules/VideoCard";
import { cn } from "@/lib/utils";

export interface VideosSectionSkeletonProps {
    videoCount?: number;
    className?: string;
}

export function VideosSectionSkeleton({
    videoCount = 3,
    className,
}: VideosSectionSkeletonProps) {
    return (
        <section className={cn("py-24 md:py-32", className)} aria-hidden="true">
            <Container size="lg" padding="md">
                {/* Header Skeleton */}
                <div className="mb-12 md:mb-16 space-y-4">
                    <SkeletonBlock className="h-10 md:h-12 w-2/3 rounded-clay" />
                    <SkeletonBlock className="h-6 md:h-8 w-1/2 rounded-sm" />
                </div>

                {/* Desktop Grid Skeleton */}
                <div className="hidden md:grid md:grid-cols-3 gap-6">
                    {Array.from({ length: videoCount }).map((_, i) => (
                        <VideoCardSkeleton key={i} />
                    ))}
                </div>

                {/* Mobile Carousel Skeleton */}
                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {Array.from({ length: videoCount }).map((_, i) => (
                            <div
                                key={i}
                                className="snap-center shrink-0 w-[85vw] max-w-sm"
                            >
                                <VideoCardSkeleton />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}