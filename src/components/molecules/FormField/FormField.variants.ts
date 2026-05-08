// components/molecules/FormField/FormField.variants.ts

import { cva } from "class-variance-authority";

/**
 * VARIANTES DE FORMFIELD - Sistema Modular
 */

export const formFieldVariants = cva(
    "w-full space-y-2",
    {
        variants: {
            // Estado del campo
            state: {
                default: "",
                error: "",
                success: "",
                loading: "opacity-80",
                disabled: "opacity-50",
            },

            // Layout del label
            layout: {
                vertical: "flex flex-col",
                horizontal: "flex flex-row items-center gap-4",
                floating: "relative", // Label flotante sobre el input
            },

            // Tamaño del espaciado
            size: {
                sm: "space-y-1",
                md: "space-y-2",
                lg: "space-y-3",
            },
        },
        defaultVariants: {
            state: "default",
            layout: "vertical",
            size: "md",
        },
    }
);

export const labelVariants = cva(
    "block font-black uppercase tracking-[0.2em] transition-colors",
    {
        variants: {
            size: {
                sm: "text-[10px]",
                md: "text-xs",
                lg: "text-sm",
            },

            state: {
                default: "text-foreground/60",
                error: "text-red-500",
                success: "text-green-600",
                disabled: "text-foreground/30",
            },

            required: {
                true: "after:content-['*'] after:ml-1 after:text-red-500",
                false: "",
            },
        },
        defaultVariants: {
            size: "md",
            state: "default",
            required: false,
        },
    }
);

export const helperTextVariants = cva(
    "text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "text-foreground/50",
                hint: "text-primary/70",
                error: "text-red-500",
                success: "text-green-600",
            },

            size: {
                sm: "text-[10px]",
                md: "text-xs",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

export const fieldContainerVariants = cva(
    "relative",
    {
        variants: {
            hasIcon: {
                true: "",
                false: "",
            },

            hasAction: {
                true: "",
                false: "",
            },
        },
        defaultVariants: {
            hasIcon: false,
            hasAction: false,
        },
    }
);

// Tipos exportados
export type FormFieldState = "default" | "error" | "success" | "loading" | "disabled";
export type FormFieldLayout = "vertical" | "horizontal" | "floating";
export type FormFieldSize = "sm" | "md" | "lg";
export type LabelSize = "sm" | "md" | "lg";
export type HelperTextVariant = "default" | "hint" | "error" | "success";