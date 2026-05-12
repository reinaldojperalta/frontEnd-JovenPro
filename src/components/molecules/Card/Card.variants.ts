// ============================================================================
// CARD VARIANTS — Molécula de contenedor de contenido
// ============================================================================
// REFACTOR V3:
// - cardVariants base: agregado "group flex flex-col" (antes inline en .tsx).
//   Eliminado condicional "relative" redundante para mediaPosition=background.
// - cardMediaVariants base: agregado "w-full" (antes inline).
// - Nuevos CVA para eliminar inline del .tsx:
//   • cardMediaTopWrapperVariants: overflow-hidden + radius top
//   • cardMediaBackgroundWrapperVariants: absolute inset-0 -z-10
//   • cardMediaImageVariants: object-cover + transition group-hover
//   • cardMediaOverlayVariants: overlay absoluto con flex items-end
//   • cardMediaGradientVariants: gradiente de fondo para media background
// - Tipos derivados del CVA.
// - Tokens validados: bg-surface, bg-surface-container, shadow-clay,
//   border-surface-variant, bg-surface-variant, bg-background/80, rounded-clay.
// ============================================================================

import { cva } from "class-variance-authority";

export const cardVariants = cva(
    "relative overflow-hidden transition-all duration-300 group flex flex-col",
    {
        variants: {
            variant: {
                surface: "bg-surface shadow-clay hover:shadow-clay-sm",
                "surface-container":
                    "bg-surface-container shadow-clay hover:shadow-clay-sm",
                clay: "bg-surface shadow-clay-active",
                outline:
                    "bg-transparent border-2 border-surface-variant hover:border-primary/30",
                ghost: "bg-transparent shadow-none hover:bg-surface-container/50",
                elevated: "bg-surface shadow-xl hover:shadow-2xl",
            },
            radius: {
                none: "rounded-none",
                sm: "rounded-lg",
                md: "rounded-xl",
                lg: "rounded-2xl",
                clay: "rounded-clay",
                full: "rounded-3xl",
            },
            padding: {
                none: "p-0",
                xs: "p-3",
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
                xl: "p-12",
            },
            interactive: {
                true: "cursor-pointer hover:-translate-y-1",
                false: "",
            },
            isLoading: {
                true: "animate-pulse bg-surface-variant",
                false: "",
            },
            width: {
                auto: "w-auto",
                full: "w-full",
                fit: "w-fit",
            },
        },
        defaultVariants: {
            variant: "surface",
            radius: "clay",
            padding: "md",
            interactive: true,
            isLoading: false,
            width: "full",
        },
    }
);

export const cardHeaderVariants = cva(
    "flex items-start justify-between gap-4",
    {
        variants: {
            padding: {
                none: "",
                xs: "p-3",
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
                xl: "p-12",
            },
            border: {
                true: "border-b border-surface-variant",
                false: "",
            },
        },
        defaultVariants: {
            padding: "none",
            border: false,
        },
    }
);

export const cardContentVariants = cva("flex-1", {
    variants: {
        padding: {
            none: "p-0",
            xs: "p-3",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
            xl: "p-12",
        },
    },
    defaultVariants: {
        padding: "none",
    },
});

export const cardFooterVariants = cva(
    "flex items-center justify-between gap-4",
    {
        variants: {
            padding: {
                none: "",
                xs: "p-3",
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
                xl: "p-12",
            },
            border: {
                true: "border-t border-surface-variant",
                false: "",
            },
            align: {
                start: "justify-start",
                center: "justify-center",
                end: "justify-end",
                between: "justify-between",
            },
        },
        defaultVariants: {
            padding: "none",
            border: false,
            align: "between",
        },
    }
);

export const cardMediaVariants = cva("relative overflow-hidden w-full", {
    variants: {
        aspectRatio: {
            auto: "",
            square: "aspect-square",
            video: "aspect-video",
            portrait: "aspect-[3/4]",
            wide: "aspect-[16/9]",
            banner: "aspect-[21/9]",
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
        aspectRatio: "square",
        radius: "none",
    },
});

/** Wrapper para mediaPosition="top". Radius condicional superior. */
export const cardMediaTopWrapperVariants = cva("overflow-hidden", {
    variants: {
        radius: {
            none: "rounded-none",
            sm: "rounded-t-lg",
            md: "rounded-t-xl",
            lg: "rounded-t-2xl",
            clay: "rounded-t-clay",
            full: "rounded-t-3xl",
        },
    },
    defaultVariants: {
        radius: "none",
    },
});

/** Wrapper para mediaPosition="background". */
export const cardMediaBackgroundWrapperVariants = cva(
    "absolute inset-0 -z-10"
);

/** Imagen dentro del media. Transición de escala en hover grupal. */
export const cardMediaImageVariants = cva(
    "object-cover transition-transform duration-700 group-hover:scale-110"
);

/** Overlay de contenido sobre la imagen (mediaPosition=top o background). */
export const cardMediaOverlayVariants = cva(
    "absolute inset-0 flex items-end p-6"
);

/** Gradiente de fondo para mediaPosition="background". */
export const cardMediaGradientVariants = cva(
    "absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
);

// Tipos derivados del CVA — sincronización automática
export type CardVariant = NonNullable<
    Parameters<typeof cardVariants>[0]
>["variant"];
export type CardRadius = NonNullable<
    Parameters<typeof cardVariants>[0]
>["radius"];
export type CardPadding = NonNullable<
    Parameters<typeof cardVariants>[0]
>["padding"];
export type CardWidth = NonNullable<
    Parameters<typeof cardVariants>[0]
>["width"];
export type CardMediaAspectRatio = NonNullable<
    Parameters<typeof cardMediaVariants>[0]
>["aspectRatio"];
export type CardFooterAlign = NonNullable<
    Parameters<typeof cardFooterVariants>[0]
>["align"];