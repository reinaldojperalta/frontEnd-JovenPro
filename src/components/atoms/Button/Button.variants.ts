// ============================================================================
// BUTTON VARIANTS — Átomo de acción principal
// ============================================================================
// REFACTOR V3:
// - Agregado "group" al base para soportar group-hover en icono derecho.
//   Antes el span del icono usaba group-hover pero el botón nunca declaraba
//   la clase "group", por lo que la animación era un no-op silencioso.
// - Eliminada variante "icon" y tamaños "icon"/"iconLg": IconButton es átomo
//   separado. Mantenerlas aquí duplica responsabilidad y viola Atomic Design.
// - "liquidGlass" renombrado a "skeleton" (estado carga, texto transparente)
//   y "glass" (visual interactivo, texto visible).
// - "success" migrado de green-100/green-700 a tokens semánticos V3.
// - "secondary" usa bg-surface en vez de bg-surface-container para evitar
//   fondo invisible cuando el botón se renderiza sobre capa 0 (#F8FAFC).
// - translate arbitrario [2px] reemplazado por utilidad estándar -translate-y-0.5.
// - Nuevos CVA exportados: buttonLoaderVariants, buttonIconVariants.
//   Elimina toda clase inline del .tsx.
// ============================================================================

import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group",
    {
        variants: {
            variant: {
                primary: [
                    "bg-primary text-white",
                    "shadow-clay hover:shadow-clay-sm active:shadow-clay-active",
                    "hover:-translate-y-0.5 active:translate-y-0",
                ],
                secondary: [
                    "bg-surface text-foreground",
                    "shadow-clay hover:shadow-clay-active",
                    "border border-transparent",
                ],
                ghost: [
                    "bg-transparent text-foreground",
                    "hover:bg-surface/50",
                    "shadow-none",
                ],
                success: [
                    "bg-success-subtle text-success",
                    "shadow-none",
                ],
                glass: [
                    "bg-white/40 backdrop-blur-xl border border-white/50 text-secondary",
                    "shadow-lg shadow-black/5",
                ],
                skeleton: [
                    "bg-white/20 backdrop-blur-md border border-white/30",
                    "shadow-inner shadow-white/40",
                    "animate-pulse cursor-wait",
                    "text-transparent select-none",
                ],
            },
            size: {
                sm: "h-10 px-4 text-sm rounded-clay",
                md: "h-12 px-6 text-base rounded-clay",
                lg: "h-16 px-10 text-lg rounded-clay",
            },
            isLoading: {
                true: "cursor-wait opacity-80",
                false: "",
            },
            isFullWidth: {
                true: "w-full",
                false: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            isLoading: false,
            isFullWidth: false,
        },
    }
);

/** Spinner de carga (Loader2). Antes inline en Button.tsx línea 79. */
export const buttonLoaderVariants = cva("w-5 h-5 animate-spin shrink-0");

/** Wrapper del icono. Antes inline en Button.tsx líneas 84 y 92. */
export const buttonIconVariants = cva("shrink-0", {
    variants: {
        position: {
            left: "",
            right: "group-hover:translate-x-1 transition-transform",
        },
    },
    defaultVariants: {
        position: "left",
    },
});

export type ButtonVariant = NonNullable<
    Parameters<typeof buttonVariants>[0]
>["variant"];
export type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>["size"];