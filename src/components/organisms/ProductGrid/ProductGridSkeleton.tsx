"use client";

import React from "react";
import { ProductCardSkeleton } from "@/components/molecules/ProductCard";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";

export interface ProductGridSkeletonProps {
    className?: string;
}

export function ProductGridSkeleton({
    className,
}: ProductGridSkeletonProps) {
    return (
        <section className={cn("py-24 md:py-32", className)} aria-hidden="true">
            <Container size="lg" padding="md">
                <div className="mb-12 md:mb-16 space-y-4">
                    <SkeletonBlock className="h-10 md:h-12 w-2/3 rounded-clay" />
                    <SkeletonBlock className="h-6 md:h-8 w-1/2 rounded-sm" />
                </div>

                <div className="flex flex-wrap gap-3 mb-10">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonBlock key={i} className="h-10 w-24 rounded-full" />
                    ))}
                </div>

                <div className="hidden md:block">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-7 row-span-2">
                            <ProductCardSkeleton variant="card-full" />
                        </div>
                        <div className="col-span-5">
                            <ProductCardSkeleton variant="card-min" />
                        </div>
                        <div className="col-span-6">
                            <ProductCardSkeleton variant="card-preview" />
                        </div>
                        <div className="col-span-6">
                            <ProductCardSkeleton variant="card-preview" />
                        </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-10">
                        <SkeletonBlock className="h-2 w-6 rounded-full" />
                        <SkeletonBlock className="h-2 w-2 rounded-full" />
                    </div>
                </div>

                <div className="md:hidden">
                    <div
                        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="snap-center shrink-0 w-[85vw] max-w-sm">
                                <ProductCardSkeleton variant="card-min" />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}