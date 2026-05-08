// components/atoms/Logo/LogoSkeleton.tsx

import { logoVariants, type LogoVariant, type LogoSize } from "./Logo.variants";
import { cn } from "@/lib/utils";

export interface LogoSkeletonProps {
    variant?: LogoVariant;
    size?: LogoSize;
    interactive?: boolean;
    className?: string;
}

export function LogoSkeleton({
    variant = "default",
    size = "md",
    interactive = true,
    className,
}: LogoSkeletonProps) {
    return (
        <div
            className={cn(
                logoVariants({ variant, size, interactive }),
                "skeleton-pulse border-transparent shadow-none text-transparent pointer-events-none select-none",
                className
            )}
            aria-hidden="true"
        />
    );
}