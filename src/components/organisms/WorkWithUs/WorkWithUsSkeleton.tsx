"use client";

import React from "react";
import { Container } from "@/components/atoms/Container";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface WorkWithUsSkeletonProps {
    className?: string;
}

export function WorkWithUsSkeleton({ className }: WorkWithUsSkeletonProps) {
    return (
        <section className={cn("py-20 md:py-28", className)} aria-hidden="true">
            <Container size="lg" padding="md">
                <div className="bg-white rounded-3xl overflow-hidden shadow-ambient border border-border/20 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 p-10 md:p-16 space-y-6">
                        <SkeletonBlock className="h-3 w-20 rounded-sm" />
                        <SkeletonBlock className="h-12 md:h-16 w-full rounded-clay" />
                        <SkeletonBlock className="h-4 w-full rounded-sm" />
                        <SkeletonBlock className="h-4 w-3/4 rounded-sm" />
                        <div className="border-t border-border/30 pt-8">
                            <SkeletonBlock className="h-3 w-32 rounded-sm mb-4" />
                            <div className="flex gap-3">
                                <SkeletonBlock className="w-12 h-12 rounded-full" />
                                <SkeletonBlock className="w-12 h-12 rounded-full" />
                                <SkeletonBlock className="w-12 h-12 rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 relative min-h-[400px] bg-surface">
                        <SkeletonBlock className="absolute inset-0 w-full h-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <SkeletonBlock className="w-16 h-16 rounded-full mb-4" />
                            <SkeletonBlock className="h-10 w-32 rounded-xl" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}