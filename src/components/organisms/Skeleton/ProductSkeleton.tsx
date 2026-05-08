// components/organisms/Skeleton/ProductSkeleton.tsx

import React from "react";
import { SkeletonBlock, SkeletonCircle } from "@/components/atoms/Skeleton";
import { SkeletonText } from "@/components/molecules/Skeleton";

interface ProductSkeletonProps {
    count?: number;
    className?: string;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count = 1, className }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <article
                    key={i}
                    className={className}
                    style={{
                        backgroundColor: "var(--surface)",
                        padding: 24,
                        borderRadius: "var(--radius-clay)",
                        boxShadow: "var(--shadow-clay)",
                    }}
                >
                    {/* Imagen */}
                    <SkeletonBlock
                        aspectRatio="1/1"
                        radius="clay"
                        className="mb-6"
                    />

                    {/* Contenido */}
                    <div className="px-2 space-y-4">
                        {/* Brand */}
                        <SkeletonBlock width="33%" height={12} radius="full" />

                        {/* Nombre */}
                        <SkeletonBlock width="75%" height={24} radius="sm" />

                        {/* Precio y botón */}
                        <div className="flex items-center justify-between pt-4">
                            <div className="flex flex-col gap-1">
                                <SkeletonBlock width={60} height={16} radius="sm" />
                                <SkeletonBlock width={80} height={32} radius="sm" />
                            </div>
                            <SkeletonCircle size="lg" />
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
};

export { ProductSkeleton };