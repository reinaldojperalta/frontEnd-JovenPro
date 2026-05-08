// ============================================================================
// TYPOGRAPHY VARIANTS — Átomos de texto (Heading, Text, GradientText)
// ============================================================================
// REFACTOR V3:
// - Tokens fantasmas eliminados:
//   • "text-on-surface-variant" → "text-muted"
//   • "text-on-surface-variant/60" → "text-muted"
//   • "text-foreground/60" (label) → "text-muted"
//   • "text-foreground/50" (muted) → "text-muted"
// - Colores hardcodeados migrados a tokens semánticos:
//   • "text-green-600" (success) → "text-success"
//   • "text-red-500" (error) → "text-danger"
//   • "text-amber-600" (warning) → "text-warning"
// - liquidGlass renombrado a "skeleton" (consistencia V3).
// - Nuevo CVA: gradientTextVariants. Elimina construcción de strings CSS
//   dinámicos en GradientText.tsx (bg-gradient-${direction} ${colors.join}).
//   Tailwind JIT no puede purgar strings dinámicos; esto era deuda crítica.
// - Tipos derivados del CVA. Excepción: LineClamp mantiene type manual
//   porque CVA no preserva tipos numéricos en keys de objeto (se convierten
//   a string en TypeScript).
// ============================================================================

import { cva } from "class-variance-authority";

// ============================================
// HEADINGS (h1 - h6)
// ============================================

export const headingVariants = cva(
    "font-black tracking-tight leading-none",
    {
        variants: {
            level: {
                h1: "text-5xl lg:text-7xl xl:text-8xl",
                h2: "text-4xl lg:text-6xl xl:text-7xl",
                h3: "text-3xl lg:text-4xl xl:text-5xl",
                h4: "text-2xl lg:text-3xl",
                h5: "text-xl lg:text-2xl font-bold",
                h6: "text-lg lg:text-xl font-bold",
            },
            variant: {
                default: "text-foreground",
                primary: "text-primary",
                secondary: "text-secondary",
                gradient:
                    "bg-gradient-to-r from-primary-dim to-primary bg-clip-text text-transparent",
                muted: "text-muted",
                inverted: "text-white",
                skeleton:
                    "bg-white/20 backdrop-blur-md border border-white/30 shadow-inner shadow-white/40 animate-pulse cursor-wait text-transparent select-none",
            },
            italic: {
                true: "italic",
                false: "",
            },
            tracking: {
                tighter: "tracking-tighter",
                tight: "tracking-tight",
                normal: "tracking-normal",
                wide: "tracking-wide",
                wider: "tracking-wider",
                widest: "tracking-widest",
            },
            transform: {
                uppercase: "uppercase",
                lowercase: "lowercase",
                capitalize: "capitalize",
                normal: "normal-case",
            },
        },
        defaultVariants: {
            level: "h2",
            variant: "default",
            italic: false,
            tracking: "tighter",
            transform: "normal",
        },
    }
);

// ============================================
// TEXTOS DE PÁRRAFO (body, caption, etc.)
// ============================================

export const textVariants = cva("leading-relaxed", {
    variants: {
        size: {
            xs: "text-[10px] leading-tight",
            sm: "text-xs",
            md: "text-sm",
            base: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
        },
        variant: {
            default: "text-foreground font-medium",
            body: "text-muted font-body",
            lead: "text-muted text-xl lg:text-2xl font-medium",
            caption: "text-muted text-xs",
            overline:
                "text-primary text-[10px] font-black uppercase tracking-[0.3em]",
            label:
                "text-muted text-xs font-black uppercase tracking-[0.2em]",
            muted: "text-muted",
            inverted: "text-white/80",
            link: "text-primary hover:text-primary-dim underline-offset-4 hover:underline cursor-pointer",
            success: "text-success font-medium",
            error: "text-danger font-medium",
            warning: "text-warning font-medium",
            skeleton:
                "bg-white/20 backdrop-blur-md border border-white/30 shadow-inner shadow-white/40 animate-pulse cursor-wait text-transparent select-none",
        },
        weight: {
            light: "font-light",
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            black: "font-black",
        },
        align: {
            left: "text-left",
            center: "text-center",
            right: "text-right",
        },
        transform: {
            uppercase: "uppercase",
            lowercase: "lowercase",
            capitalize: "capitalize",
            normal: "normal-case",
        },
        truncate: {
            true: "truncate",
            false: "",
        },
        lineClamp: {
            none: "",
            1: "line-clamp-1",
            2: "line-clamp-2",
            3: "line-clamp-3",
            4: "line-clamp-4",
        },
    },
    defaultVariants: {
        size: "base",
        variant: "default",
        weight: "medium",
        align: "left",
        transform: "normal",
        truncate: false,
        lineClamp: "none",
    },
});

// ============================================
// GRADIENT TEXT (texto con gradiente)
// ============================================

export const gradientTextVariants = cva(
    "bg-clip-text text-transparent",
    {
        variants: {
            direction: {
                "to-r": "bg-gradient-to-r",
                "to-l": "bg-gradient-to-l",
                "to-t": "bg-gradient-to-t",
                "to-b": "bg-gradient-to-b",
                "to-tr": "bg-gradient-to-tr",
                "to-tl": "bg-gradient-to-tl",
                "to-br": "bg-gradient-to-br",
                "to-bl": "bg-gradient-to-bl",
            },
            from: {
                primary: "from-primary",
                "primary-dim": "from-primary-dim",
                secondary: "from-secondary",
                accent: "from-accent",
            },
            to: {
                primary: "to-primary",
                secondary: "to-secondary",
                "secondary-light": "to-secondary-light",
                accent: "to-accent",
            },
        },
        defaultVariants: {
            direction: "to-r",
            from: "primary-dim",
            to: "primary",
        },
    }
);

// ============================================
// TIPOS EXPORTADOS
// ============================================

// Heading
export type HeadingLevel = NonNullable<
    Parameters<typeof headingVariants>[0]
>["level"];
export type HeadingVariant = NonNullable<
    Parameters<typeof headingVariants>[0]
>["variant"];
export type HeadingTracking = NonNullable<
    Parameters<typeof headingVariants>[0]
>["tracking"];
export type HeadingTransform = NonNullable<
    Parameters<typeof headingVariants>[0]
>["transform"];

// Text
export type TextSize = NonNullable<
    Parameters<typeof textVariants>[0]
>["size"];
export type TextVariant = NonNullable<
    Parameters<typeof textVariants>[0]
>["variant"];
export type TextWeight = NonNullable<
    Parameters<typeof textVariants>[0]
>["weight"];
export type TextAlign = NonNullable<
    Parameters<typeof textVariants>[0]
>["align"];
export type TextTransform = NonNullable<
    Parameters<typeof textVariants>[0]
>["transform"];
/** CVA convierte keys numéricas a string; se mantiene manual para type safety. */
export type TextLineClamp = "none" | 1 | 2 | 3 | 4;

// GradientText
export type GradientTextDirection = NonNullable<
    Parameters<typeof gradientTextVariants>[0]
>["direction"];
export type GradientTextFrom = NonNullable<
    Parameters<typeof gradientTextVariants>[0]
>["from"];
export type GradientTextTo = NonNullable<
    Parameters<typeof gradientTextVariants>[0]
>["to"];