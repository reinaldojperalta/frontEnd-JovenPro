// components/atoms/Badge/BadgeSkeleton.tsx

import { badgeVariants, type BadgeVariant, type BadgeSize } from "./Badge.variants";
import { cn } from "@/lib/utils";

export interface BadgeSkeletonProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  indicator?: boolean;
  className?: string;
}

export function BadgeSkeleton({
  variant = "liquidGlass",
  size = "md",
  indicator = false,
  className,
}: BadgeSkeletonProps) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size, uppercase: true, indicator }),
        "skeleton-pulse border-transparent shadow-none text-transparent pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
    />
  );
}