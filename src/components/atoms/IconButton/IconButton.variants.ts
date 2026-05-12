// ============================================================================
// ICON BUTTON VARIANTS — Átomo de acción iconográfica
// ============================================================================
// REFACTOR V3:
// - AGREGADA variante "social" para botones de redes sociales.
//   Patrón recurrente: bg-surface text-primary hover:bg-secondary hover:text-white.
//   Antes inline en WorkWithUs.tsx.
// ============================================================================

import { cva } from "class-variance-authority";

export const iconButtonVariants = cva(
    "inline-flex items-center justify-center shrink-0 transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default: [
                    "bg-surface text-foreground",
                    "shadow-clay hover:shadow-clay-sm active:shadow-clay-active",
                    "hover:text-primary",
                    "rounded-clay",
                ],
                primary: [
                    "bg-primary text-white",
                    "shadow-clay hover:shadow-clay-sm active:shadow-clay-active",
                    "hover:brightness-110",
                    "rounded-clay",
                ],
                secondary: [
                    "bg-secondary text-white",
                    "shadow-clay hover:shadow-clay-sm active:shadow-clay-active",
                    "rounded-clay",
                ],
                ghost: [
                    "bg-transparent text-foreground",
                    "shadow-none",
                    "hover:bg-surface-container",
                    "hover:shadow-clay-sm",
                    "rounded-clay",
                ],
                outline: [
                    "bg-transparent text-foreground",
                    "border-2 border-surface-variant",
                    "shadow-none",
                    "hover:border-primary hover:text-primary",
                    "rounded-clay",
                ],
                circular: [
                    "bg-surface text-foreground",
                    "shadow-clay hover:shadow-clay-sm active:shadow-clay-active",
                    "hover:text-primary",
                    "rounded-full",
                ],
                // AGREGADO V3: Botones de redes sociales
                social: [
                    "bg-surface text-primary",
                    "shadow-sm hover:shadow-clay-sm",
                    "hover:bg-secondary hover:text-white",
                    "rounded-full",
                ],
                danger: [
                    "bg-danger text-white",
                    "shadow-lg shadow-danger/30",
                    "hover:shadow-danger/50",
                    "hover:scale-105 active:scale-100",
                    "rounded-clay",
                ],
                whatsapp: [
                    "bg-[#25D366] text-white",
                    "shadow-clay hover:shadow-clay-sm active:shadow-clay-active",
                    "hover:brightness-110",
                    "rounded-clay",
                ],
                success: [
                    "bg-success text-white",
                    "shadow-clay hover:shadow-clay-sm active:shadow-clay-active",
                    "hover:brightness-110",
                    "rounded-clay",
                ],
                skeleton: [
                    "bg-white/20 backdrop-blur-md border border-white/30",
                    "shadow-inner shadow-white/40",
                    "animate-pulse cursor-wait",
                    "text-transparent select-none",
                ],
            },
            size: {
                xs: "w-8 h-8",
                sm: "w-10 h-10",
                md: "w-12 h-12",
                lg: "w-14 h-14",
                xl: "w-16 h-16",
            },
            isLoading: {
                true: "cursor-wait opacity-80",
                false: "",
            },
            hasNotification: {
                true: "relative",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            isLoading: false,
            hasNotification: false,
        },
    }
);

export const notificationDotVariants = cva(
    "absolute z-10 rounded-full border-2 border-surface-container animate-pulse",
    {
        variants: {
            size: {
                xs: "w-2 h-2 top-0 right-0",
                sm: "w-2.5 h-2.5 top-0.5 right-0.5",
                md: "w-3 h-3 top-0.5 right-0.5",
                lg: "w-3 h-3 top-1 right-1",
                xl: "w-3.5 h-3.5 top-1 right-1",
            },
            color: {
                primary: "bg-primary",
                secondary: "bg-secondary",
                danger: "bg-danger",
                success: "bg-success",
            },
        },
        defaultVariants: {
            size: "md",
            color: "secondary",
        },
    }
);

export const iconButtonLoaderVariants = cva("w-5 h-5 animate-spin");

export const iconButtonIconWrapperVariants = cva(
    "relative z-10 flex items-center justify-center"
);

export type IconButtonVariant = NonNullable<
    Parameters<typeof iconButtonVariants>[0]
>["variant"];
export type IconButtonSize = NonNullable<
    Parameters<typeof iconButtonVariants>[0]
>["size"];
export type NotificationColor = NonNullable<
    Parameters<typeof notificationDotVariants>[0]
>["color"];