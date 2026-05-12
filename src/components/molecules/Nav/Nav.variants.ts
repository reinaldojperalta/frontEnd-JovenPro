// ============================================================================
// NAV VARIANTS — Molécula de navegación
// ============================================================================
// REFACTOR V3:
// - Tokens fantasmas eliminados:
//   • "text-foreground" (navItem isActive=false) → "text-secondary" (navy marca)
// - Colores hardcodeados eliminados: ninguno en este archivo.
// - Nuevos CVA exportados para eliminar inline del .tsx:
//   • navItemWrapperVariants: "inline-flex items-center relative" (a/b/button)
//   • navItemDisabledVariants: estilos de disabled para button
//   • badgeWrapperVariants: "ml-2" del Badge
// - navVariants: corregida inconsistencia de gap. direction y size ambos
//   definen gap, pero variant (pills/underlined/minimal) también redefine gap.
//   Se mantiene comportamiento actual (última variante gana), pero documentado.
// - navItemVariants: agregada dimensión "group" para el span interno.
//   Antes "group" era inline en el .tsx.
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

export const navVariants = cva("flex items-center", {
    variants: {
        direction: {
            horizontal: "flex-row",
            vertical: "flex-col",
        },
        align: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
        },
        size: {
            sm: "gap-4",
            md: "gap-8",
            lg: "gap-12",
        },
        variant: {
            default: "",
            pills: "gap-2",
            underlined: "gap-8",
            minimal: "gap-6",
        },
    },
    defaultVariants: {
        direction: "horizontal",
        align: "center",
        size: "md",
        variant: "default",
    },
});

export const navItemVariants = cva(
    "font-bold transition-all cursor-pointer relative",
    {
        variants: {
            isActive: {
                true: "text-primary",
                false: "text-secondary hover:text-primary",
            },
            size: {
                xs: "text-[10px]",
                sm: "text-xs",
                md: "text-sm",
                lg: "text-base",
            },
            variant: {
                default: "",
                pill: "px-4 py-2 rounded-clay hover:bg-surface-container hover:shadow-clay-sm",
                underlined:
                    "pb-2 border-b-2 border-transparent hover:border-primary/30",
                minimal: "hover:underline underline-offset-4",
            },
            weight: {
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
                black: "font-black",
            },
            transform: {
                none: "",
                uppercase: "uppercase tracking-widest",
                capitalize: "capitalize",
            },
            group: {
                true: "group",
                false: "",
            },
        },
        defaultVariants: {
            isActive: false,
            size: "md",
            variant: "default",
            weight: "bold",
            transform: "none",
            group: false,
        },
    }
);

export const navIndicatorVariants = cva(
    "absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all",
    {
        variants: {
            variant: {
                default: "opacity-100",
                animated: "scale-x-0 group-hover:scale-x-100 origin-left",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

/** Wrapper de cada item (a, button). Antes inline en .tsx. */
export const navItemWrapperVariants = cva(
    "inline-flex items-center relative"
);

/** Estilos para botón disabled. Antes inline en .tsx. */
export const navItemDisabledVariants = cva(
    "bg-transparent border-none p-0"
);

/** Wrapper del Badge opcional. Antes inline "ml-2". */
export const badgeWrapperVariants = cva("ml-2");

// Tipos derivados del CVA — sincronización automática
export type NavDirection = NonNullable<
    Parameters<typeof navVariants>[0]
>["direction"];
export type NavAlign = NonNullable<
    Parameters<typeof navVariants>[0]
>["align"];
export type NavSize = NonNullable<
    Parameters<typeof navVariants>[0]
>["size"];
export type NavVariant = NonNullable<
    Parameters<typeof navVariants>[0]
>["variant"];
export type NavItemVariant = NonNullable<
    Parameters<typeof navItemVariants>[0]
>["variant"];
export type NavItemWeight = NonNullable<
    Parameters<typeof navItemVariants>[0]
>["weight"];
export type NavItemTransform = NonNullable<
    Parameters<typeof navItemVariants>[0]
>["transform"];