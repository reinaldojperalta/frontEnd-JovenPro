// ============================================================================
// SEARCH BAR VARIANTS — Molécula de búsqueda con autocomplete
// ============================================================================
// REFACTOR V3:
// - Colores hardcodeados migrados a tokens de capa:
//   • "bg-white" → "bg-container-low" (capa 3, #FFFFFF)
//   • "border-black/5" → "border-border/10" (coherente con sistema de bordes)
//   • "rounded-2xl" → "rounded-clay" (1rem, equivalente en Tailwind default)
// - EXCEPCIÓN DOCUMENTADA: hover:bg-primary/5 y bg-primary/10 se mantienen.
//   Son estados de interacción suave (hover/highlight) sobre fondo blanco.
//   Reemplazarlos por tokens sólidos (primary-subtle #E0F2FE) cambiaría
//   drásticamente la apariencia. La opacidad sobre primary es el patrón
//   estándar para estados de foco sutiles.
// - Nuevos CVA exportados para eliminar inline del .tsx:
//   • searchBarInputWrapperVariants
//   • searchBarInputIconVariants, searchBarClearIconVariants
//   • searchBarClearButtonVariants: opacity del botón limpiar
//   • searchBarSuggestionContentVariants: flex layout de cada item
//   • searchBarSuggestionIconVariants: icono ShoppingBag
//   • searchBarArrowIconVariants: icono ArrowRight highlighted
//   • searchBarEmptyStateVariants: wrapper del estado vacío
//   • searchBarEmptyTextVariants: estilo italic del mensaje
//   • searchBarOverlayVariants: overlay fixed para cerrar al click fuera
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

export const searchBarVariants = cva("relative w-full", {
    variants: {
        size: {
            sm: "max-w-[300px]",
            md: "max-w-[400px]",
            lg: "max-w-[600px]",
            full: "max-w-none",
        },
        isOpen: {
            true: "",
            false: "",
        },
    },
    defaultVariants: {
        size: "md",
        isOpen: false,
    },
});

export const suggestionsVariants = cva(
    "absolute top-full left-0 right-0 mt-3 bg-container-low shadow-2xl rounded-clay overflow-hidden border border-border/10 z-[60]",
    {
        variants: {
            variant: {
                default: "bg-container-low",
                clay: "bg-surface shadow-clay-lg rounded-clay border-surface-variant",
            },
            animation: {
                fade: "animate-in fade-in slide-in-from-top-2 duration-200",
                none: "",
            },
        },
        defaultVariants: {
            variant: "clay",
            animation: "fade",
        },
    }
);

export const suggestionItemVariants = cva(
    "flex items-center justify-between p-4 transition-colors cursor-pointer",
    {
        variants: {
            variant: {
                default: "hover:bg-primary/5",
                clay: "hover:bg-surface-container rounded-xl mx-2 my-1",
            },
            isHighlighted: {
                true: "bg-primary/10",
                false: "",
            },
        },
        defaultVariants: {
            variant: "clay",
            isHighlighted: false,
        },
    }
);

/** Wrapper del Input (posicionamiento relativo). */
export const searchBarInputWrapperVariants = cva("relative");

/** Icono Search en el input. */
export const searchBarInputIconVariants = cva("w-5 h-5");

/** Icono X del botón limpiar. */
export const searchBarClearIconVariants = cva("w-4 h-4");

/** Opacidad del botón limpiar. */
export const searchBarClearButtonVariants = cva(
    "opacity-50 hover:opacity-100"
);

/** Layout flex de cada sugerencia (icono + texto). */
export const searchBarSuggestionContentVariants = cva(
    "flex items-center gap-4"
);

/** Icono de categoría por defecto (ShoppingBag). */
export const searchBarSuggestionIconVariants = cva("w-5 h-5 text-primary");

/** Icono ArrowRight en item highlighted. */
export const searchBarArrowIconVariants = cva(
    "w-4 h-4 text-primary opacity-60"
);

/** Wrapper del estado vacío. */
export const searchBarEmptyStateVariants = cva("p-4");

/** Estilo del texto vacío. */
export const searchBarEmptyTextVariants = cva("italic");

/** Overlay fixed para cerrar dropdown al hacer click fuera. */
export const searchBarOverlayVariants = cva(
    "fixed inset-0 z-50 pointer-events-none"
);

// Tipos derivados del CVA — sincronización automática
export type SearchBarSize = NonNullable<
    Parameters<typeof searchBarVariants>[0]
>["size"];
export type SuggestionsVariant = NonNullable<
    Parameters<typeof suggestionsVariants>[0]
>["variant"];