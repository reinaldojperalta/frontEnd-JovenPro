// ============================================================================
// INPUT — Átomo de captura de datos
// ============================================================================
// REFACTOR V3:
// - Zero inline classes:
//   • "group" eliminado del wrapper → vive en inputWrapperVariants base.
//   • Icono izquierdo: delegado a inputIconLeftVariants.
//   • Loader2: delegado a inputLoaderVariants.
//   • Icono derecho: delegado a inputIconRightVariants.
// - Tipos importados desde .variants.ts (derivados del CVA).
// - Variante "liquidGlass" renombrada a "skeleton" en consumidores externos.
// ============================================================================

import React, { forwardRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import {
    inputVariants,
    inputWrapperVariants,
    inputIconLeftVariants,
    inputIconRightVariants,
    inputLoaderVariants,
    getIconPadding,
    type InputVariant,
    type InputSize,
    type InputState,
} from "./Input.variants";
import { cn } from "@/lib/utils";

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
    /** Icono izquierdo (ReactNode) */
    leftIcon?: React.ReactNode;

    /** Icono derecho (ReactNode) */
    rightIcon?: React.ReactNode;

    /** Estado de carga */
    isLoading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant = "default",
            size = "md",
            state = "default",
            leftIcon,
            rightIcon,
            isLoading = false,
            type = "text",
            disabled,
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        const functionalState: InputState = disabled
            ? "disabled"
            : isLoading
                ? "loading"
                : (state as InputState) || "default";

        return (
            <div
                className={cn(
                    inputWrapperVariants({
                        size,
                        fullWidth: true,
                    }),
                    className
                )}
            >
                {leftIcon && (
                    <div className={cn(inputIconLeftVariants())}>
                        {isLoading ? (
                            <Loader2 className={cn(inputLoaderVariants())} />
                        ) : (
                            leftIcon
                        )}
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled || isLoading}
                    className={cn(
                        inputVariants({
                            variant: variant as InputVariant,
                            size,
                            state: functionalState,
                        }),
                        leftIcon && getIconPadding(size, "left"),
                        rightIcon && getIconPadding(size, "right")
                    )}
                    {...props}
                />

                {rightIcon && (
                    <div className={cn(inputIconRightVariants())}>{rightIcon}</div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };