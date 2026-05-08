// components/atoms/Container/ContainerSkeleton.tsx

import {
    containerVariants,
    type ContainerSize,
    type ContainerPadding,
    type ContainerPaddingY,
    type ContainerVariant,
    type ContainerAlign,
    type ContainerMinHeight,
    type ContainerRadius,
} from "./Container.variants";
import { cn } from "@/lib/utils";

export interface ContainerSkeletonProps {
    size?: ContainerSize;
    padding?: ContainerPadding;
    paddingY?: ContainerPaddingY;
    variant?: ContainerVariant;
    align?: ContainerAlign;
    minHeight?: ContainerMinHeight;
    radius?: ContainerRadius;
    flex?: boolean;
    centered?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function ContainerSkeleton({
    size = "lg",
    padding = "md",
    paddingY = "none",
    variant = "transparent",
    align = "center",
    minHeight = "none",
    radius = "none",
    flex = false,
    centered = false,
    className,
    children,
}: ContainerSkeletonProps) {
    return (
        <div
            className={cn(
                containerVariants({
                    size,
                    padding,
                    paddingY,
                    variant,
                    align,
                    minHeight,
                    radius,
                    flex,
                    centered,
                }),
                "pointer-events-none select-none",
                className
            )}
            aria-hidden="true"
        >
            {children}
        </div>
    );
}