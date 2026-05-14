// components/atoms/IconButton/IconButtonSkeleton.tsx

import { iconButtonVariants, type IconButtonVariant, type IconButtonSize } from "./IconButton.variants";
import { cn } from "@/lib/utils";

export interface IconButtonSkeletonProps {
  /** Misma variante visual */
  variant?: IconButtonVariant;
  /** Mismo tamaño */
  size?: IconButtonSize;
  /** Clases adicionales */
  className?: string;
}

/**
 * IconButtonSkeleton - Átomo Skeleton
 * 
 * Respeta el tamaño exacto del IconButton (w-12 h-12, etc.)
 * para que el layout no salte ni un píxel.
 */
export function IconButtonSkeleton({
  variant = "skeleton",
  size = "md",
  className,
}: IconButtonSkeletonProps) {
  return (
    <div
      className={cn(
        iconButtonVariants({ variant, size }),
        "skeleton-pulse border-transparent shadow-none text-transparent pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
    />
  );
}
