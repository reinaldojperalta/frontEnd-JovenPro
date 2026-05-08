"use client";

import React from "react";
import { Container } from "@/components/atoms/Container";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface TestimonialsSkeletonProps {
    className?: string;
}

export function TestimonialsSkeleton({
    className,
}: TestimonialsSkeletonProps) {
    return (
        <section className={cn("py-20 md:py-28 bg-surface-container-low/30", className)} aria-hidden="true">
            <Container size="lg" padding="md">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                    <div className="md:col-span-4 space-y-4">
                        <SkeletonBlock className="h-3 w-20 rounded-sm" />
                        <SkeletonBlock className="h-10 w-full rounded-clay" />
                        <SkeletonBlock className="h-4 w-3/4 rounded-sm" />
                    </div>

                    <div className="md:col-span-8">
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-border/20 space-y-6">
                            <SkeletonBlock className="h-20 w-full rounded-sm" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <SkeletonBlock className="w-12 h-12 rounded-full" />
                                    <div className="space-y-2">
                                        <SkeletonBlock className="h-4 w-24 rounded-sm" />
                                        <SkeletonBlock className="h-3 w-16 rounded-sm" />
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <SkeletonBlock key={i} className="w-4 h-4 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <div className="flex gap-2">
                                <SkeletonBlock className="h-2 w-6 rounded-full" />
                                <SkeletonBlock className="h-2 w-2 rounded-full" />
                                <SkeletonBlock className="h-2 w-2 rounded-full" />
                            </div>
                            <div className="flex gap-2">
                                <SkeletonBlock className="w-10 h-10 rounded-full" />
                                <SkeletonBlock className="w-10 h-10 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}