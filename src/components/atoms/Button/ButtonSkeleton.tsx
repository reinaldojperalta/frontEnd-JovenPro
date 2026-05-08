// components/atoms/Button/ButtonSkeleton.tsx

import { buttonVariants, type ButtonVariant, type ButtonSize } from "./Button.variants";
import { cn } from "@/lib/utils";


export interface ButtonSkeletonProps {
  /** Misma variante visual que el botón real */
  variant?: ButtonVariant;
  /** Mismo tamaño que el botón real */
  size?: ButtonSize;
  /** Si ocupa todo el ancho */
  isFullWidth?: boolean;
  /** Clases adicionales */
  className?: string;
}

/**
 * ButtonSkeleton - Átomo Skeleton
 * 
 * Mantiene exacto el layout del Button (padding, height, radius, gap)
 * pero reemplaza el contenido por un bloque gris animado.
 */
export function ButtonSkeleton({
  variant = "liquidGlass",
  size = "md",
  isFullWidth = false,
  className,
}: ButtonSkeletonProps) {
  return (
    <div
      className={cn(
        buttonVariants({ variant, size, isFullWidth }),
        "skeleton-pulse border-transparent shadow-none text-transparent pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
    />
  );
}
