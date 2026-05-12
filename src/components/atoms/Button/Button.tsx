// ============================================================================
// BUTTON — Átomo de acción principal
// ============================================================================
// REFACTOR V3:
// - Zero inline classes: loader e iconos delegados a buttonLoaderVariants y
//   buttonIconVariants respectivamente.
// - Eliminada variante "icon" y tamaños "icon"/"iconLg": IconButton es átomo
//   separado. Cualquier uso previo de <Button variant="icon"> debe migrarse
//   al componente IconButton.
// - "group" ahora vive en el CVA base de .variants.ts, no como clase inline.
// - Tipos ButtonVariant y ButtonSize importados desde .variants.ts en lugar
//   de re-declararse (evita desincronización con el CVA).
// ============================================================================

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import {
    buttonVariants,
    buttonLoaderVariants,
    buttonIconVariants,
    type ButtonVariant,
    type ButtonSize,
} from "./Button.variants";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    /** Contenido del botón */
    children: React.ReactNode;

    /** Icono opcional (izquierda o derecha) */
    icon?: React.ReactNode;

    /** Posición del icono */
    iconPosition?: "left" | "right";

    /** Si está cargando, muestra spinner y deshabilita */
    isLoading?: boolean;

    /** Si ocupa todo el ancho disponible */
    isFullWidth?: boolean;

    /** Para usar comoChild (composición avanzada) */
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            isFullWidth = false,
            children,
            icon,
            iconPosition = "right",
            asChild = false,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        const isDisabled = disabled || isLoading;

        return (
            <Comp
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        isLoading,
                        isFullWidth,
                    }),
                    className
                )}
                ref={ref}
                disabled={isDisabled}
                {...props}
            >
                {/* Cuando asChild, Slot necesita exactamente 1 hijo */}
                {asChild ? (
                    children
                ) : (
                    <>
                        {/* Spinner de loading (izquierda) */}
                        {isLoading && <Loader2 className={cn(buttonLoaderVariants())} />}

                        {/* Icono izquierda (solo si no está loading) */}
                        {!isLoading && icon && iconPosition === "left" && (
                            <span className={cn(buttonIconVariants({ position: "left" }))}>
                                {icon}
                            </span>
                        )}

                        {/* Contenido principal */}
                        {children}

                        {/* Icono derecha */}
                        {!isLoading && icon && iconPosition === "right" && (
                            <span className={cn(buttonIconVariants({ position: "right" }))}>
                                {icon}
                            </span>
                        )}
                    </>
                )}
            </Comp>
        );
    }
);

Button.displayName = "Button";

export { Button };