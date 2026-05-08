"use client";

import React from "react";
import { Container } from "@/components/atoms/Container";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface FooterSkeletonProps {
    className?: string;
}

export function FooterSkeleton({ className }: FooterSkeletonProps) {
    return (
        <footer className={cn("bg-surface-container-low border-t border-border/20", className)} aria-hidden="true">
            <Container size="lg" padding="md">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left space-y-2">
                        <SkeletonBlock className="h-6 w-24 rounded-sm" />
                        <SkeletonBlock className="h-3 w-48 rounded-sm" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <SkeletonBlock key={i} className="h-3 w-20 rounded-sm" />
                        ))}
                    </div>

                    <div className="flex gap-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <SkeletonBlock key={i} className="w-10 h-10 rounded-full" />
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}