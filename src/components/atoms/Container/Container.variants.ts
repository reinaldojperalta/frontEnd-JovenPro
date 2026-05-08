// ============================================================================
// CONTAINER VARIANTS — Átomo de layout estructural
// ============================================================================
// REFACTOR V3:
// - Todos los tipos exportados ahora se derivan del CVA via Parameters<typeof>
//   en lugar de listas hardcodeadas. Elimina riesgo de desincronización.
// - Tokens validados contra paleta V3:
//   • bg-surface, bg-surface-container, bg-background: existen
//   • shadow-clay, shadow-clay-active, rounded-clay: existen
//   • border-surface-variant: existe
// - No hay colores hardcodeados ni tokens fantasmas en este archivo.
// - Nota de diseño: "surface-container" (#F8FAFC) y "surface" (#F1F5F9) tienen
//   contraste 1.11:1. No anidar variantes de estas dos capas sin borde visible.
// ============================================================================

import { cva } from "class-variance-authority";

export const containerVariants = cva("mx-auto w-full", {
    variants: {
        size: {
            xs: "max-w-xl",
            sm: "max-w-3xl",
            md: "max-w-5xl",
            lg: "max-w-7xl",
            xl: "max-w-[1440px]",
            full: "max-w-none",
            prose: "max-w-prose",
        },
        padding: {
            none: "px-0",
            xs: "px-2",
            sm: "px-4",
            md: "px-6",
            lg: "px-8",
            xl: "px-12",
            "2xl": "px-16",
        },
        paddingY: {
            none: "py-0",
            xs: "py-4",
            sm: "py-8",
            md: "py-16",
            lg: "py-24",
            xl: "py-32",
            "2xl": "py-40",
        },
        variant: {
            transparent: "",
            surface: "bg-surface",
            "surface-container": "bg-surface-container",
            background: "bg-background",
            clay: "bg-surface shadow-clay rounded-clay",
            "clay-active": "bg-surface shadow-clay-active rounded-clay",
            bordered: "border-2 border-surface-variant rounded-clay",
        },
        align: {
            left: "mr-auto ml-0",
            center: "mx-auto",
            right: "ml-auto mr-0",
        },
        minHeight: {
            none: "",
            screen: "min-h-screen",
            "75vh": "min-h-[75vh]",
            "50vh": "min-h-[50vh]",
        },
        flex: {
            true: "flex flex-col",
            false: "",
        },
        centered: {
            true: "items-center justify-center",
            false: "",
        },
        radius: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            clay: "rounded-clay",
            full: "rounded-full",
        },
    },
    defaultVariants: {
        size: "lg",
        padding: "md",
        paddingY: "none",
        variant: "transparent",
        align: "center",
        minHeight: "none",
        flex: false,
        centered: false,
        radius: "none",
    },
});

// Tipos derivados del CVA — sincronización automática
export type ContainerSize = NonNullable<
    Parameters<typeof containerVariants>[0]
>["size"];
export type ContainerPadding = NonNullable<
    Parameters<typeof containerVariants>[0]
>["padding"];
export type ContainerPaddingY = NonNullable<
    Parameters<typeof containerVariants>[0]
>["paddingY"];
export type ContainerVariant = NonNullable<
    Parameters<typeof containerVariants>[0]
>["variant"];
export type ContainerAlign = NonNullable<
    Parameters<typeof containerVariants>[0]
>["align"];
export type ContainerMinHeight = NonNullable<
    Parameters<typeof containerVariants>[0]
>["minHeight"];
export type ContainerRadius = NonNullable<
    Parameters<typeof containerVariants>[0]
>["radius"];