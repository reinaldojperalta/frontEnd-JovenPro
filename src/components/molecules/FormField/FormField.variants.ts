// ============================================================================
// FORMFIELD VARIANTS — Molécula de campo de formulario
// ============================================================================
// REFACTOR V3:
// - Tokens fantasmas eliminados:
//   • "text-foreground/60" → "text-muted"
//   • "text-foreground/40" → "text-muted"
//   • "text-foreground/50" → "text-muted"
//   • "text-foreground/30" → "text-muted"
//   • "text-primary/70" → "text-primary-dim"
// - Colores hardcodeados migrados a tokens semánticos:
//   • "text-red-500" (label error, helper error, required asterisk, icono) → "text-danger"
//   • "text-green-600" (label success, helper success, icono) → "text-success"
//   • "text-green-500" (icono success) → "text-success"
// - Dead code eliminado: fieldContainerVariants tenía hasIcon/hasAction con
//   variantes vacías (""). Reemplazadas por dimensión layout.
// - Nuevos CVA exportados para eliminar inline del .tsx:
//   • floatingLabelVariants: label flotante con estados hasValue + state + required
//   • validationIconVariants: iconos AlertCircle/CheckCircle2/Loader2
//   • validationBadgeWrapperVariants: contenedor relativo del badge de validación
//   • validationBadgeVariants: posicionamiento absoluto del badge
//   • formFieldActionVariants: opacity para IconButton de acciones (password/clear)
// - labelVariants: agregada dimensión spacing ("pt-6" para labels no-floating).
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

export const formFieldVariants = cva("w-full space-y-2", {
    variants: {
        state: {
            default: "",
            error: "",
            success: "",
            loading: "opacity-80",
            disabled: "opacity-50",
        },
        layout: {
            vertical: "flex flex-col",
            horizontal: "flex flex-row items-center gap-4",
            floating: "",
        },
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
});

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
                default: "text-muted",
                error: "text-danger",
                success: "text-success",
                disabled: "text-muted",
            },
            required: {
                true: "after:content-['*'] after:ml-1 after:text-danger",
                false: "",
            },
            spacing: {
                default: "",
                top: "pt-6",
            },
        },
        defaultVariants: {
            size: "md",
            state: "default",
            required: false,
            spacing: "default",
        },
    }
);

/** Label flotante sobre el input. Se mueve según hasValue. */
export const floatingLabelVariants = cva(
    "absolute left-4 top-1/2 -translate-y-1/2 transition-all pointer-events-none",
    {
        variants: {
            hasValue: {
                true: "text-[10px] -translate-y-8 text-muted",
                false: "text-base text-muted",
            },
            state: {
                default: "",
                error: "text-danger",
                success: "text-success",
                loading: "",
                disabled: "",
            },
            required: {
                true: "after:content-['*'] after:ml-1 after:text-danger",
                false: "",
            },
        },
        defaultVariants: {
            hasValue: false,
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
                default: "text-muted",
                hint: "text-primary-dim",
                error: "text-danger",
                success: "text-success",
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

/** Contenedor del input. Maneja posicionamiento relativo para floating labels. */
export const fieldContainerVariants = cva("", {
    variants: {
        layout: {
            default: "",
            floating: "relative",
        },
    },
    defaultVariants: {
        layout: "default",
    },
});

/** Icono de validación (AlertCircle, CheckCircle2, Loader2). */
export const validationIconVariants = cva("w-5 h-5", {
    variants: {
        state: {
            error: "text-danger",
            success: "text-success",
            loading: "text-primary animate-spin",
            default: "",
        },
    },
    defaultVariants: {
        state: "default",
    },
});

/** Wrapper relativo para el badge de validación cuando hay leftIcon. */
export const validationBadgeWrapperVariants = cva("relative");

/** Posicionamiento absoluto del badge de validación sobre el icono. */
export const validationBadgeVariants = cva("absolute -top-1 -right-1");

/** Variante visual para IconButton de acciones (password toggle, clear). */
export const formFieldActionVariants = cva("", {
    variants: {
        visible: {
            true: "opacity-100",
            false: "opacity-50 hover:opacity-100",
        },
    },
    defaultVariants: {
        visible: false,
    },
});

// Tipos derivados del CVA — sincronización automática
export type FormFieldState = NonNullable<
    Parameters<typeof formFieldVariants>[0]
>["state"];
export type FormFieldLayout = NonNullable<
    Parameters<typeof formFieldVariants>[0]
>["layout"];
export type FormFieldSize = NonNullable<
    Parameters<typeof formFieldVariants>[0]
>["size"];
export type HelperTextVariant = NonNullable<
    Parameters<typeof helperTextVariants>[0]
>["variant"];