// components/molecules/FormField/FormField.tsx

import React, { forwardRef } from "react";
import { Input, type InputProps } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Typography";
import { IconButton } from "@/components/atoms/IconButton";
import {
    formFieldVariants,
    labelVariants,
    helperTextVariants,
    fieldContainerVariants,
    type FormFieldState,
    type FormFieldLayout,
    type FormFieldSize,
    type HelperTextVariant
} from "./FormField.variants";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { usePasswordToggle } from "@/hooks";

// ============================================
// TIPOS DE DATOS
// ============================================

export interface FormFieldValidation {
    isValid: boolean;
    message?: string;
}

// ============================================
// INTERFAZ DEL FORMFIELD
// ============================================

export interface FormFieldProps extends Omit<InputProps, "errorMessage" | "isValid"> {
    /** ID del campo (para label) */
    id?: string;

    /** Label del campo */
    label?: string;

    /** Texto de ayuda */
    helperText?: string;

    /** Texto de error (sobrescribe helperText) */
    errorMessage?: string;

    /** Texto de éxito */
    successMessage?: string;

    /** Estado del campo */
    state?: FormFieldState;

    /** Layout del campo */
    layout?: FormFieldLayout;

    /** Tamaño del espaciado */
    size?: FormFieldSize;

    /** Campo requerido */
    required?: boolean;

    /** Mostrar icono de estado (validación) */
    showValidationIcon?: boolean;

    /** Icono personalizado de la izquierda */
    leftIcon?: React.ReactNode;

    /** Acción personalizada (botón derecha) */
    rightAction?: React.ReactNode;

    /** Callback al limpiar */
    onClear?: () => void;

    /** Mostrar toggle de contraseña */
    passwordToggle?: boolean;

    /** Clases adicionales */
    className?: string;
}

// ============================================
// COMPONENTE FORMFIELD
// ============================================

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
    (
        {
            id,
            label,
            helperText,
            errorMessage,
            successMessage,
            state = "default",
            layout = "vertical",
            size = "md",
            required = false,
            showValidationIcon = true,
            leftIcon,
            rightAction,
            onClear,
            passwordToggle = false,
            value,
            type = "text",
            className,
            disabled,
            isLoading,
            ...inputProps
        },
        ref
    ) => {
        // Hook para password toggle
        const passwordState = usePasswordToggle();
        // Determinar estado efectivo
        const effectiveState: FormFieldState = disabled
            ? "disabled"
            : errorMessage
                ? "error"
                : successMessage
                    ? "success"
                    : isLoading
                        ? "loading"
                        : state;

        // Determinar mensaje a mostrar
        const effectiveMessage = errorMessage || successMessage || helperText;
        const messageVariant: HelperTextVariant = errorMessage
            ? "error"
            : successMessage
                ? "success"
                : helperText
                    ? "hint"
                    : "default";

        // Icono de validación automático
        const getValidationIcon = () => {
            if (!showValidationIcon) return null;

            switch (effectiveState) {
                case "error":
                    return <AlertCircle className="w-5 h-5 text-red-500" />;
                case "success":
                    return <CheckCircle2 className="w-5 h-5 text-green-500" />;
                case "loading":
                    return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
                default:
                    return null;
            }
        };

        // Renderizar icono izquierdo (combinado)
        const renderLeftIcon = () => {
            const validationIcon = getValidationIcon();

            if (leftIcon && validationIcon) {
                return (
                    <div className="relative">
                        {leftIcon}
                        <span className="absolute -top-1 -right-1">{validationIcon}</span>
                    </div>
                );
            }

            return validationIcon || leftIcon;
        };

        // Renderizar acción derecha
        const renderRightAction = () => {
            if (rightAction) return rightAction;

            if (passwordToggle && !disabled && !isLoading) {
                return (
                    <IconButton
                        icon={passwordState.icon}
                        variant="ghost"
                        size="sm"
                        aria-label="Toggle password visibility"
                        onClick={passwordState.toggle}
                        className="opacity-50 hover:opacity-100"
                    />
                );
            }

            if (onClear && value) {
                return (
                    <IconButton
                        icon={<X className="w-4 h-4" />}
                        variant="ghost"
                        size="sm"
                        aria-label="Limpiar campo"
                        onClick={onClear}
                        className="opacity-50 hover:opacity-100"
                    />
                );
            }

            return undefined;
        };

        // Determinar variant del input
        const inputVariant = effectiveState === "error"
            ? "error"
            : effectiveState === "success"
                ? "success"
                : "default";

        return (
            <div
                ref={ref}
                className={cn(
                    formFieldVariants({ state: effectiveState, layout, size }),
                    className
                )}
            >
                {/* Label */}
                {label && layout !== "floating" && (
                    <label
                        htmlFor={id}
                        className={cn(
                            labelVariants({
                                size,
                                state: effectiveState === "loading" ? "default" : effectiveState,
                                required
                            }),
                            "pt-6"
                        )}
                    >
                        {label}
                    </label>
                )}

                {/* Floating label */}
                {label && layout === "floating" && (
                    <label
                        htmlFor={id}
                        className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 transition-all pointer-events-none",
                            value
                                ? "text-[10px] -translate-y-8 text-foreground/60"
                                : "text-base text-foreground/40",
                            effectiveState === "error" && "text-red-500",
                            effectiveState === "success" && "text-green-600",
                        )}
                    >
                        {label}
                        {required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                )}

                {/* Input container */}
                <div className={cn(
                    fieldContainerVariants({
                        hasIcon: !!renderLeftIcon(),
                        hasAction: !!renderRightAction()
                    }),
                    layout === "floating" && "relative"
                )}>
                    <Input
                        id={id}
                        variant={inputVariant}
                        state={effectiveState === "loading" ? "default" : effectiveState}
                        disabled={disabled || effectiveState === "disabled"}
                        isLoading={isLoading || effectiveState === "loading"}
                        value={value}
                        type={passwordToggle ? passwordState.type : type}
                        leftIcon={renderLeftIcon()}
                        rightIcon={renderRightAction()}
                        {...inputProps}
                    />
                </div>

                {/* Helper / Error / Success text */}
                {effectiveMessage && (
                    <Text
                        as="p"
                        size="xs"
                        className={cn(helperTextVariants({ variant: messageVariant }))}
                    >
                        {effectiveMessage}
                    </Text>
                )}
            </div>
        );
    }
);

FormField.displayName = "FormField";

export { FormField };