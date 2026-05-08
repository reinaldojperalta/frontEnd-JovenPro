// components/molecules/Skeleton/SkeletonText.tsx

import React from "react";
import { SkeletonBlock } from "@/components/atoms/Skeleton";

interface SkeletonTextProps {
    lines?: 1 | 2 | 3 | 4 | 5;
    lineHeight?: number;
    lastLineWidth?: "full" | "3/4" | "1/2" | "1/4";
    gap?: number;
    className?: string;
}

const widthMap = {
    full: "100%",
    "3/4": "75%",
    "1/2": "50%",
    "1/4": "25%",
};

const SkeletonText: React.FC<SkeletonTextProps> = ({
    lines = 3,
    lineHeight = 16,
    lastLineWidth = "3/4",
    gap = 8,
    className,
}) => {
    return (
        <div className={className} style={{ display: "flex", flexDirection: "column", gap }}>
            {Array.from({ length: lines }).map((_, i) => {
                const isLast = i === lines - 1;
                const width = isLast ? widthMap[lastLineWidth] : "100%";

                return (
                    <SkeletonBlock
                        key={i}
                        height={lineHeight}
                        width={width}
                        radius="sm"
                    />
                );
            })}
        </div>
    );
};

export { SkeletonText };