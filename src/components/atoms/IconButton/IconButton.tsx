// ============================================================================
// ICON BUTTON — Átomo de acción iconográfica
// ============================================================================
// REFACTOR V3:
// - Zero inline classes: loader y wrapper de icono delegados a CVA exportados.
//   Antes: Loader2 tenía "w-5 h-5 animate-spin" inline (línea 79).
//   Antes: span interno tenía "relative z-10 flex items-center justify-center" inline (línea 93).
// - Tipos importados desde .variants.ts (derivados del CVA).
// - Variante "liquidGlass" renombrada a "skeleton" en consumidores externos.
// ============================================================================

"use client";

import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import {
    iconButtonVariants,
    notificationDotVariants,
    iconButtonLoaderVariants,
    iconButtonIconWrapperVariants,
    type IconButtonVariant,
    type IconButtonSize,
    type NotificationColor,
} from "./IconButton.variants";
import { cn } from "@/lib/utils";

export interface IconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Icono a mostrar (debe ser JSX ejecutado: <Icon className="w-5 h-5" />) */
    icon: React.ReactNode;

    /** Variante visual */
    variant?: IconButtonVariant;

    /** Tamaño del botón */
    size?: IconButtonSize;

    /** Etiqueta para accesibilidad (obligatorio) */
    "aria-label": string;

    /** Mostrar spinner de carga */
    isLoading?: boolean;

    /** Mostrar indicador de notificación */
    hasNotification?: boolean;

    /** Color del indicador de notificación */
    notificationColor?: NotificationColor;

    /** Texto del tooltip (opcional) */
    tooltip?: string;

    /** Usar como child (composición avanzada) */
    asChild?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            icon,
            variant = "default",
            size = "md",
            "aria-label": ariaLabel,
            isLoading = false,
            hasNotification = false,
            notificationColor = "secondary",
            tooltip,
            asChild = false,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        const isDisabled = disabled || isLoading;

        const renderIcon = () => {
            if (isLoading) {
                return <Loader2 className={cn(iconButtonLoaderVariants())} />;
            }
            return icon;
        };

        return (
            <Comp
                ref={ref}
                className={cn(
                    iconButtonVariants({
                        variant,
                        size,
                        isLoading,
                        hasNotification,
                    }),
                    className
                )}
                disabled={isDisabled}
                aria-label={ariaLabel}
                title={tooltip}
                {...props}
            >
                {hasNotification && !isLoading && (
                    <span
                        className={cn(
                            notificationDotVariants({ size, color: notificationColor })
                        )}
                    />
                )}

                <span className={cn(iconButtonIconWrapperVariants())}>
                    {renderIcon()}
                </span>
            </Comp>
        );
    }
);

IconButton.displayName = "IconButton";

export { IconButton };