// components/atoms/Input/InputSkeleton.tsx

import { inputVariants, inputWrapperVariants, getIconPadding, type InputVariant, type InputSize } from "./Input.variants";
import { cn } from "@/lib/utils";

export interface InputSkeletonProps {
  /** Misma variante visual */
  variant?: InputVariant;
  /** Mismo tamaño */
  size?: InputSize;
  /** Si muestra label placeholder */
  showLabel?: boolean;
  /** Si muestra icono izquierdo (ajusta padding) */
  hasLeftIcon?: boolean;
  /** Si muestra icono derecho (ajusta padding) */
  hasRightIcon?: boolean;
  /** Clases adicionales */
  className?: string;
}

/**
 * InputSkeleton - Átomo Skeleton
 * 
 * Replica la estructura completa del Input:
 * - Label (opcional)
 * - Wrapper con mismo height, radius, border
 * - Espaciado para iconos (izquierda/derecha)
 * - Bloque gris animado en lugar del input nativo
 */
export function InputSkeleton({
  variant = "skeleton",
  size = "md",
  showLabel = false,
  hasLeftIcon = false,
  hasRightIcon = false,
  className,
}: InputSkeletonProps) {
  // Mapa de alturas según size para el bloque interno
  const heightMap = { sm: "h-5", md: "h-6", lg: "h-7" };
  const iconSizeMap = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-5 h-5" };

  return (
    <div className={cn("w-full space-y-2", className)} aria-hidden="true">
      {/* Label placeholder */}
      {showLabel && (
        <div className="h-3 w-24 rounded-sm skeleton-block animate-pulse" />
      )}

      {/* Wrapper con mismo layout que el input real */}
      <div
        className={cn(
          inputWrapperVariants({ size, fullWidth: true }),
          "relative flex items-center skeleton-pulse/40 border-transparent"
        )}
      >
        {/* Icono izquierdo placeholder */}
        {hasLeftIcon && (
          <div className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 rounded-full skeleton-block",
            iconSizeMap[size as keyof typeof iconSizeMap] || "w-5 h-5"
          )} />
        )}

        {/* Bloque que simula el campo de texto */}
        <div
          className={cn(
            inputVariants({
              variant,
              size,
              state: "default",
            }),
            "bg-transparent border-transparent shadow-none pointer-events-none select-none",
            hasLeftIcon && getIconPadding(size as InputSize, "left"),
            hasRightIcon && getIconPadding(size as InputSize, "right")
          )}
        >
          <div className={cn("w-full rounded-sm bg-muted", heightMap[size as keyof typeof heightMap] || "h-6")} />
        </div>

        {/* Icono derecho placeholder */}
        {hasRightIcon && (
          <div className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-muted",
            iconSizeMap[size as keyof typeof iconSizeMap] || "w-5 h-5"
          )} />
        )}
      </div>
    </div>
  );
}
