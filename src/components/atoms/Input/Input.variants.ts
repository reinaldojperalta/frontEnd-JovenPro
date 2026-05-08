// ============================================================================
// INPUT VARIANTS — Átomo de captura de datos
// ============================================================================
// REFACTOR V3:
// - Tokens fantasmas eliminados:
//   • "text-on-surface" → "text-foreground"
//   • "text-on-surface-variant" → "text-muted"
//   • "placeholder:text-on-surface-variant/50" → "placeholder:text-muted"
// - Colores hardcodeados migrados a tokens semánticos:
//   • error: bg-red-50 → bg-danger-subtle, border-red-400 → border-danger,
//     text-red-900 → text-foreground, placeholder:red-400 → placeholder:muted
//   • success: bg-green-50 → bg-success-subtle, border-green-400 → border-success,
//     text-green-900 → text-foreground, placeholder:green-400 → placeholder:muted
// - liquidGlass renombrado a "skeleton" (consistencia V3).
// - Variantes "hasIcon" e "iconPosition" eliminadas: eran dead code (todas "").
//   El Debt Log las señala como no-op semántico.
// - Variantes "error" y "success" eliminadas de dimensión "state": se manejan
//   por dimensión "variant". "state" ahora solo cubre funcional (disabled, loading).
// - inputWrapperVariants: "group" agregado al base, variantes vacías eliminadas.
// - Nuevos CVA exportados:
//   • inputIconLeftVariants: elimina inline del .tsx
//   • inputIconRightVariants: elimina inline del .tsx
//   • inputLoaderVariants: elimina inline "w-5 h-5 animate-spin"
// - getIconPadding: tipado con InputSize en lugar de string genérico.
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

export const inputVariants = cva(
    "w-full bg-transparent outline-none transition-all placeholder:text-muted",
    {
        variants: {
            variant: {
                default: [
                    "bg-surface",
                    "shadow-clay-active",
                    "rounded-clay",
                    "border border-transparent",
                    "focus:border-primary",
                    "text-foreground",
                ],
                filled: [
                    "bg-surface-container",
                    "shadow-inner",
                    "rounded-clay",
                    "border border-transparent",
                    "focus:border-primary",
                    "text-foreground",
                ],
                outline: [
                    "bg-transparent",
                    "shadow-none",
                    "rounded-clay",
                    "border-2 border-surface-variant",
                    "focus:border-primary",
                    "text-foreground",
                ],
                ghost: [
                    "bg-transparent",
                    "shadow-none",
                    "rounded-none",
                    "border-b-2 border-surface-variant",
                    "focus:border-primary",
                    "text-foreground",
                    "px-0",
                ],
                search: [
                    "bg-surface-container",
                    "shadow-clay-active",
                    "rounded-clay",
                    "border border-transparent",
                    "focus:border-primary",
                    "text-foreground",
                    "placeholder:text-sm",
                ],
                error: [
                    "bg-danger-subtle",
                    "shadow-clay-active",
                    "rounded-clay",
                    "border border-danger",
                    "focus:border-danger",
                    "text-foreground",
                    "placeholder:text-muted",
                ],
                success: [
                    "bg-success-subtle",
                    "shadow-clay-active",
                    "rounded-clay",
                    "border border-success",
                    "focus:border-success",
                    "text-foreground",
                    "placeholder:text-muted",
                ],
                skeleton: [
                    "bg-white/20 backdrop-blur-md border border-white/30",
                    "shadow-inner shadow-white/40",
                    "animate-pulse cursor-wait",
                    "text-transparent select-none",
                ],
            },
            size: {
                sm: "h-10 px-3 text-sm",
                md: "h-12 px-4 text-base",
                lg: "h-14 px-6 text-lg",
            },
            state: {
                default: "",
                disabled: "opacity-50 cursor-not-allowed",
                loading: "opacity-80 cursor-wait",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            state: "default",
        },
    }
);

export const inputWrapperVariants = cva(
    "relative flex items-center w-full transition-all group",
    {
        variants: {
            size: {
                sm: "h-10",
                md: "h-12",
                lg: "h-14",
            },
            fullWidth: {
                true: "w-full",
                false: "w-auto",
            },
        },
        defaultVariants: {
            size: "md",
            fullWidth: true,
        },
    }
);

/** Icono izquierdo del input. Antes inline en Input.tsx línea 75. */
export const inputIconLeftVariants = cva(
    "absolute left-4 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-primary"
);

/** Icono derecho del input. Antes inline en Input.tsx línea 96. */
export const inputIconRightVariants = cva(
    "absolute right-4 top-1/2 -translate-y-1/2 text-muted flex items-center justify-center"
);

/** Spinner de carga (Loader2). Antes inline en Input.tsx línea 76. */
export const inputLoaderVariants = cva("w-5 h-5 animate-spin");

/** Padding ajustado para iconos. Helper funcional; no hay equivalente CVA
 *  nativo para padding condicional basado en dos props independientes. */
/** Padding ajustado para iconos. Helper funcional. */
export const getIconPadding = (
    size: InputSize | null | undefined,
    position: "left" | "right"
): string => {
    if (!size) return "";
    const paddingMap = {
        sm: { left: "pl-10", right: "pr-10" },
        md: { left: "pl-12", right: "pr-12" },
        lg: { left: "pl-14", right: "pr-14" },
    };
    return paddingMap[size]?.[position] || "";
};

// Tipos derivados del CVA — sincronización automática
export type InputVariant = NonNullable<
    Parameters<typeof inputVariants>[0]
>["variant"];
export type InputSize = NonNullable<Parameters<typeof inputVariants>[0]>["size"];
export type InputState = NonNullable<
    Parameters<typeof inputVariants>[0]
>["state"];