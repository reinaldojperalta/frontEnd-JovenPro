

import React from "react";
import { Container } from "@/components/atoms/Container";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface VideosSectionSkeletonProps {
    className?: string;
}

export function VideosSectionSkeleton({
    className,
}: VideosSectionSkeletonProps) {
    return (
        <section className={cn("py-20 md:py-28", className)} aria-hidden="true">
            <Container size="lg" padding="md">
                <div className="hidden md:grid md:grid-cols-2 gap-8">
                    {[1, 2].map((i) => (
                        <div key={i}>
                            <SkeletonBlock className="aspect-video rounded-2xl w-full mb-4" />
                            <SkeletonBlock className="h-6 w-48 rounded-sm" />
                        </div>
                    ))}
                </div>

                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none]">
                        {[1, 2].map((i) => (
                            <div key={i} className="snap-center shrink-0 w-[85vw] max-w-sm">
                                <SkeletonBlock className="aspect-video rounded-2xl w-full mb-4" />
                                <SkeletonBlock className="h-6 w-48 rounded-sm" />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}