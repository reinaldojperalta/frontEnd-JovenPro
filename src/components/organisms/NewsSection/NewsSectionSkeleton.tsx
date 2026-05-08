"use client";

import React from "react";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";

export interface NewsSectionSkeletonProps {
    className?: string;
}

export function NewsSectionSkeleton({
    className,
}: NewsSectionSkeletonProps) {
    return (
        <section className={cn("py-24 md:py-32 bg-surface-container-low", className)} aria-hidden="true">
            <Container size="lg" padding="md">
                <div className="mb-12 md:mb-16 space-y-4">
                    <SkeletonBlock className="h-10 md:h-12 w-48 rounded-clay" />
                    <SkeletonBlock className="h-6 md:h-8 w-2/3 rounded-sm" />
                </div>

                <div className="hidden md:block">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-col">
                            <SkeletonBlock className="h-72 sm:h-96 w-full" />
                            <div className="p-8 space-y-3 flex-1">
                                <SkeletonBlock className="h-4 w-32 rounded-sm" />
                                <SkeletonBlock className="h-6 w-full rounded-sm" />
                                <SkeletonBlock className="h-4 w-full rounded-sm" />
                                <SkeletonBlock className="h-4 w-3/4 rounded-sm" />
                                <SkeletonBlock className="h-4 w-24 rounded-sm mt-4" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-row flex-1">
                                    <SkeletonBlock className="w-2/5 h-full" />
                                    <div className="w-3/5 p-6 space-y-2">
                                        <SkeletonBlock className="h-3 w-16 rounded-sm" />
                                        <SkeletonBlock className="h-4 w-full rounded-sm" />
                                        <SkeletonBlock className="h-3 w-full rounded-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-10">
                        <SkeletonBlock className="h-2 w-6 rounded-full" />
                        <SkeletonBlock className="h-2 w-2 rounded-full" />
                    </div>
                </div>

                <div className="md:hidden space-y-4">
                    <div className="rounded-2xl overflow-hidden bg-white border border-border/30">
                        <SkeletonBlock className="h-56 w-full" />
                        <div className="p-6 space-y-2">
                            <SkeletonBlock className="h-5 w-full rounded-sm" />
                            <SkeletonBlock className="h-4 w-3/4 rounded-sm" />
                        </div>
                    </div>
                    <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none]">
                        {[1, 2].map((i) => (
                            <div key={i} className="shrink-0 w-[80vw] max-w-xs">
                                <div className="rounded-2xl overflow-hidden bg-white border border-border/30">
                                    <SkeletonBlock className="aspect-square w-full" />
                                    <div className="p-4 space-y-2">
                                        <SkeletonBlock className="h-3 w-16 rounded-sm" />
                                        <SkeletonBlock className="h-4 w-full rounded-sm" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}