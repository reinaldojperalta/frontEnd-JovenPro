// ============================================================================
// FORMFIELD — Molécula de campo de formulario
// ============================================================================
// REFACTOR V3:
// - Zero inline classes:
//   • "relative" (wrapper icono) → validationBadgeWrapperVariants
//   • "absolute -top-1 -right-1" (badge validación) → validationBadgeVariants
//   • "opacity-50 hover:opacity-100" (IconButton) → formFieldActionVariants
//   • "pt-6" (label) → labelVariants spacing
//   • Floating label completo → floatingLabelVariants
//   • "ml-1 text-red-500" (required asterisk) → after: pseudo-elemento en CVA
//   • "relative" (fieldContainer floating) → fieldContainerVariants layout
//   • Iconos de validación con colores inline → validationIconVariants
// - Colores hardcodeados migrados a tokens semánticos (danger, success, muted).
// - Dead code eliminado: hasIcon/hasAction de fieldContainerVariants.
// - Tipos importados desde .variants.ts (derivados del CVA).
// - NOTA: <X className="w-4 h-4" /> se mantiene como excepción documentada.
//   Los iconos de lucide-react requieren dimensiones via className cuando se
//   usan como children de IconButton.
// ============================================================================

import React, { forwardRef } from "react";
import { Input, type InputProps } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Typography";
import { IconButton } from "@/components/atoms/IconButton";
import {
    formFieldVariants,
    labelVariants,
    floatingLabelVariants,
    helperTextVariants,
    fieldContainerVariants,
    validationIconVariants,
    validationBadgeWrapperVariants,
    validationBadgeVariants,
    formFieldActionVariants,
    type FormFieldState,
    type FormFieldLayout,
    type FormFieldSize,
    type HelperTextVariant,
} from "./FormField.variants";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { usePasswordToggle } from "@/hooks";

export interface FormFieldValidation {
    isValid: boolean;
    message?: string;
}

export interface FormFieldProps
    extends Omit<InputProps, "errorMessage" | "isValid" | "state"> {
    id?: string;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    successMessage?: string;
    state?: FormFieldState;
    layout?: FormFieldLayout;
    size?: FormFieldSize;
    required?: boolean;
    showValidationIcon?: boolean;
    leftIcon?: React.ReactNode;
    rightAction?: React.ReactNode;
    onClear?: () => void;
    passwordToggle?: boolean;
    className?: string;
}

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
        const passwordState = usePasswordToggle();

        const effectiveState: FormFieldState = disabled
            ? "disabled"
            : errorMessage
                ? "error"
                : successMessage
                    ? "success"
                    : isLoading
                        ? "loading"
                        : state;

        const effectiveMessage = errorMessage || successMessage || helperText;
        const messageVariant: HelperTextVariant = errorMessage
            ? "error"
            : successMessage
                ? "success"
                : helperText
                    ? "hint"
                    : "default";

        const getValidationIcon = () => {
            if (!showValidationIcon) return null;
            switch (effectiveState) {
                case "error":
                    return (
                        <AlertCircle
                            className={cn(validationIconVariants({ state: "error" }))}
                        />
                    );
                case "success":
                    return (
                        <CheckCircle2
                            className={cn(validationIconVariants({ state: "success" }))}
                        />
                    );
                case "loading":
                    return (
                        <Loader2
                            className={cn(validationIconVariants({ state: "loading" }))}
                        />
                    );
                default:
                    return null;
            }
        };

        const renderLeftIcon = () => {
            const validationIcon = getValidationIcon();
            if (leftIcon && validationIcon) {
                return (
                    <div className={cn(validationBadgeWrapperVariants())}>
                        {leftIcon}
                        <span className={cn(validationBadgeVariants())}>
                            {validationIcon}
                        </span>
                    </div>
                );
            }
            return validationIcon || leftIcon;
        };

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
                        className={cn(formFieldActionVariants({ visible: false }))}
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
                        className={cn(formFieldActionVariants({ visible: false }))}
                    />
                );
            }
            return undefined;
        };

        const inputVariant =
            effectiveState === "error"
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
                {label && layout !== "floating" && (
                    <label
                        htmlFor={id}
                        className={cn(
                            labelVariants({
                                size,
                                state:
                                    effectiveState === "loading" ? "default" : effectiveState,
                                required,
                                spacing: "top",
                            })
                        )}
                    >
                        {label}
                    </label>
                )}

                {label && layout === "floating" && (
                    <label
                        htmlFor={id}
                        className={cn(
                            floatingLabelVariants({
                                hasValue: !!value,
                                state:
                                    effectiveState === "loading" ? "default" : effectiveState,
                                required,
                            })
                        )}
                    >
                        {label}
                    </label>
                )}

                <div
                    className={cn(
                        fieldContainerVariants({
                            layout: layout === "floating" ? "floating" : "default",
                        })
                    )}
                >
                    <Input
                        id={id}
                        variant={inputVariant}
                        state={
                            effectiveState === "loading" ||
                            effectiveState === "error" ||
                            effectiveState === "success"
                                ? "default"
                                : effectiveState
                        }
                        disabled={disabled || effectiveState === "disabled"}
                        isLoading={isLoading || effectiveState === "loading"}
                        value={value}
                        type={passwordToggle ? passwordState.type : type}
                        leftIcon={renderLeftIcon()}
                        rightIcon={renderRightAction()}
                        {...inputProps}
                    />
                </div>

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