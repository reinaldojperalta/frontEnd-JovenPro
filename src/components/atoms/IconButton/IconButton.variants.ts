// ============================================================================
// ICON BUTTON VARIANTS — Átomo de acción iconográfica
// ============================================================================
// REFACTOR V3:
// - Colores hardcodeados migrados a tokens semánticos:
//   • "bg-red-500" → "bg-danger" (coincide hex #EF4444)
//   • "shadow-red-500/30|50" → "shadow-danger/30|50"
//   • "bg-green-600" → "bg-success" (cambio de tono: #16A34A → #22C55E)
//   • "bg-green-500" (notification dot) → "bg-success"
// - liquidGlass renombrado a "skeleton" (consistencia con Badge/Button).
// - Nuevos CVA exportados:
//   • iconButtonLoaderVariants: elimina inline "w-5 h-5 animate-spin" del .tsx
//   • iconButtonIconWrapperVariants: elimina inline del span interno
// - Tipos derivados del CVA (Parameters<typeof>) en lugar de listas hardcodeadas.
// - EXCEPCIÓN DOCUMENTADA: variant "whatsapp" conserva bg-[#25D366].
//   Es color de marca externa (Meta/WhatsApp); no existe en paleta JovenPro V3.
// - NOTA: hover:brightness-110 es filtro CSS arbitrario (no token). Efecto
//   aceptable para estados hover de botones sólidos; no sustituible por token.
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
                danger: [
                    "bg-danger text-white",
                    "shadow-lg shadow-danger/30",
                    "hover:shadow-danger/50",
                    "hover:scale-105 active:scale-100",
                    "rounded-clay",
                ],
                // EXCEPCIÓN: color de marca externa (Meta/WhatsApp). No forma parte de la paleta JovenPro V3.
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

/** Indicador de notificación (dot). Posicionado absolutamente sobre el botón. */
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

/** Spinner de carga (Loader2). Antes inline en IconButton.tsx. */
export const iconButtonLoaderVariants = cva("w-5 h-5 animate-spin");

/** Wrapper del icono interno. Antes inline en IconButton.tsx línea 93. */
export const iconButtonIconWrapperVariants = cva(
    "relative z-10 flex items-center justify-center"
);

// Tipos derivados del CVA — sincronización automática
export type IconButtonVariant = NonNullable<
    Parameters<typeof iconButtonVariants>[0]
>["variant"];
export type IconButtonSize = NonNullable<
    Parameters<typeof iconButtonVariants>[0]
>["size"];
export type NotificationColor = NonNullable<
    Parameters<typeof notificationDotVariants>[0]
>["color"];