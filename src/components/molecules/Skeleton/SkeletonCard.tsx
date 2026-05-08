// components/molecules/Skeleton/SkeletonCard.tsx

import React from "react";
import { SkeletonBlock, SkeletonCircle } from "@/components/atoms/Skeleton";
import { SkeletonText } from "./SkeletonText";

interface SkeletonCardProps {
    hasImage?: boolean;
    imageAspectRatio?: string;
    lines?: 1 | 2 | 3 | 4;
    hasAction?: boolean;
    layout?: "vertical" | "horizontal";
    className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
    hasImage = true,
    imageAspectRatio = "1/1",
    lines = 3,
    hasAction = true,
    layout = "vertical",
    className,
}) => {
    const isHorizontal = layout === "horizontal";

    return (
        <div
            className={className}
            style={{
                display: "flex",
                flexDirection: isHorizontal ? "row" : "column",
                gap: 16,
                padding: 24,
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-clay)",
                boxShadow: "var(--shadow-clay)",
            }}
        >
            {hasImage && (
                <SkeletonBlock
                    aspectRatio={imageAspectRatio}
                    radius="clay"
                    style={{ flexShrink: 0, width: isHorizontal ? 120 : "100%" }}
                />
            )}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <SkeletonText lines={lines} lineHeight={16} />

                {hasAction && (
                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <SkeletonBlock width={80} height={32} radius="clay" />
                        <SkeletonCircle size="md" />
                    </div>
                )}
            </div>
        </div>
    );
};

export { SkeletonCard };