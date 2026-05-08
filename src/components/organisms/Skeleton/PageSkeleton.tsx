// components/templates/Skeleton/PageSkeleton.tsx

import React from "react";
import { SkeletonBlock, SkeletonCircle } from "@/components/atoms/Skeleton";
import { SkeletonText } from "@/components/molecules/Skeleton";
import { HeroSkeleton, ProductSkeleton } from "@/components/organisms/Skeleton";

const PageSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
                <div className="max-w-7xl mx-auto bg-surface-container h-20 px-8 rounded-clay shadow-clay flex items-center justify-between">
                    <SkeletonBlock width={140} height={32} radius="sm" />
                    <SkeletonBlock width={400} height={48} radius="clay" className="hidden lg:block" />
                    <div className="flex gap-3">
                        <SkeletonCircle size="md" />
                        <SkeletonBlock width={120} height={48} radius="clay" className="hidden md:block" />
                    </div>
                </div>
            </header>

            {/* Hero */}
            <div className="pt-24">
                <HeroSkeleton />
            </div>

            {/* Product Grid */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="space-y-4">
                            <SkeletonBlock width={200} height={16} radius="full" />
                            <SkeletonBlock width={400} height={64} radius="sm" />
                        </div>
                        <div className="flex gap-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <SkeletonBlock key={i} width={100} height={48} radius="clay" />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ProductSkeleton count={4} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background py-32 px-6 border-t border-surface-variant">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
                    <div className="space-y-10">
                        <SkeletonBlock width={160} height={40} radius="sm" />
                        <SkeletonText lines={2} lineHeight={20} />
                        <div className="flex gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <SkeletonCircle key={i} size="md" />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="space-y-8">
                                <SkeletonBlock width={120} height={16} radius="full" />
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, j) => (
                                        <SkeletonBlock key={j} width={140} height={20} radius="sm" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export { PageSkeleton };