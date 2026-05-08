// components/organisms/Skeleton/HeroSkeleton.tsx

import React from "react";
import { SkeletonBlock, SkeletonCircle } from "@/components/atoms/Skeleton";
import { SkeletonText } from "@/components/molecules/Skeleton";

const HeroSkeleton: React.FC = () => {
    return (
        <section className="min-h-[95vh] flex items-center px-6 py-20">
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
                {/* Lado izquierdo - Texto */}
                <div className="lg:w-1/2 space-y-8 w-full">
                    <SkeletonBlock width={200} height={32} radius="clay" />

                    <div className="space-y-4">
                        <SkeletonBlock width="100%" height={64} radius="sm" />
                        <SkeletonBlock width="80%" height={64} radius="sm" />
                    </div>

                    <SkeletonText lines={2} lineHeight={24} />

                    <div className="flex gap-6 pt-4">
                        <SkeletonBlock width={200} height={64} radius="clay" />
                        <SkeletonBlock width={180} height={64} radius="clay" />
                    </div>
                </div>

                {/* Lado derecho - Imagen */}
                <div className="lg:w-1/2 w-full">
                    <SkeletonBlock
                        height={500}
                        radius="clay"
                        className="border-8 border-surface-container"
                    />
                </div>
            </div>
        </section>
    );
};

export { HeroSkeleton };