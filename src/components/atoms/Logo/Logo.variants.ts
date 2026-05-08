// ============================================================================
// LOGO VARIANTS — Átomo de identidad de marca
// ============================================================================
// REFACTOR V3:
// - Tokens fantasmas eliminados:
//   • "text-on-surface" → "text-secondary" (highlight "PRO" en navy)
//   • "text-on-surface-variant" → eliminado del gradiente
//   • "from-on-surface" / "to-on-surface-variant" → "from-secondary" / "to-secondary-light"
// - "inverted" conserva "text-white": es utilitario Tailwind válido para fondos
//   oscuros (deep #1A1832). No es token fantasma; es color CSS puro.
// - Tipos derivados del CVA (Parameters<typeof>).
// - Zero inline classes en .tsx ya cumplido; no se toca la estructura del componente.
// ============================================================================

import { cva } from "class-variance-authority";

export const logoVariants = cva(
    "font-black tracking-tighter inline-flex items-center select-none",
    {
        variants: {
            variant: {
                default: "text-primary [&>span]:text-secondary",
                inverted: "text-white [&>span]:text-white/80",
                monochrome: "text-foreground [&>span]:text-foreground",
                gradient:
                    "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent [&>span]:bg-gradient-to-r [&>span]:from-secondary [&>span]:to-secondary-light [&>span]:bg-clip-text [&>span]:text-transparent",
            },
            size: {
                sm: "text-xl",
                md: "text-2xl",
                lg: "text-4xl",
                xl: "text-6xl",
            },
            interactive: {
                true: "cursor-pointer hover:opacity-80 transition-opacity",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            interactive: true,
        },
    }
);

// Tipos derivados del CVA — sincronización automática
export type LogoVariant = NonNullable<
    Parameters<typeof logoVariants>[0]
>["variant"];
export type LogoSize = NonNullable<Parameters<typeof logoVariants>[0]>["size"];