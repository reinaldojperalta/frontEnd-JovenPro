"use client";

import React from "react";
import { Container } from "@/components/atoms/Container";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { SkeletonCircle } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface NavbarStickySkeletonProps {
    className?: string;
}

export function NavbarStickySkeleton({ className }: NavbarStickySkeletonProps) {
    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/40 shadow-clay",
                className
            )}
            aria-hidden="true"
        >
            <Container size="lg" padding="md">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <SkeletonBlock className="h-8 w-32 rounded-clay" />

                    <div className="hidden md:flex items-center gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <SkeletonBlock
                                key={i}
                                className="h-4 w-16 rounded-sm"
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <SkeletonCircle size="md" />
                        <SkeletonCircle size="md" className="hidden sm:flex" />
                        <SkeletonCircle size="md" />
                        <SkeletonCircle size="md" className="md:hidden" />
                    </div>
                </div>
            </Container>
        </nav>
    );
}