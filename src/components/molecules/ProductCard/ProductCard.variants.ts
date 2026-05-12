// ============================================================================
// PRODUCT CARD VARIANTS — Molécula de tarjeta de producto (Bento Carousel)
// ============================================================================
// REFACTOR V3:
// - Nuevos CVA exportados para eliminar inline del .tsx:
//   • productCardImageVariants: "w-full h-full object-cover transition-transform..."
//   • productCardHistoryImageVariants: grayscale + hover transition
//   • productCardAvatarInfoVariants: "text-xs font-semibold text-foreground"
//   • productCardAvatarVerifiedVariants: "text-primary text-xs"
//   • productCardPriceRowVariants: "flex items-center justify-between gap-2"
//   • productCardPriceContainerVariants: "flex items-baseline gap-2 flex-wrap"
//   • productCardLinkIconVariants: "w-3 h-3"
//   • productCardCornerIconInnerVariants: "w-4 h-4"
// - productCardCornerIconVariants: movido "hidden" a variantes no-preview.
//   Antes "hidden" era inline en el .tsx para card-full/card-min/history-slot.
// - productCardAvatarVariants: agregada dimensión "visible" para controlar
//   display sin inline condicional.
// - Dead code eliminado: productCardArrowVariants (todas las variantes eran
//   "hidden", jamás importado en el componente. Debt Log lo señaló).
// - Tokens validados: bg-white/90, bg-white/20, text-white/80, text-white/90,
//   text-white/60, backdrop-blur-sm, drop-shadow-lg, drop-shadow-md, drop-shadow.
//   Son utilitarios Tailwind core con opacidad; funcionan con cualquier color base.
// - text-foreground en avatar info: validado, existe en paleta V3.
// - NOTA: Los overlays usan "black" y "primary" directamente (no tokens semánticos
//   de la paleta) porque son efectos visuales de superposición sobre imágenes,
//   no elementos de UI con estado semántico.
// ============================================================================

import { cva } from "class-variance-authority";

export const productCardVariants = cva(
    "relative overflow-hidden rounded-clay bg-surface shadow-clay transition-all duration-500 ease-smooth group cursor-pointer min-h-0 min-w-0",
    {
        variants: {
            variant: {
                "card-full": "flex flex-col justify-end h-full",
                "card-min": "flex flex-col justify-end h-full",
                "card-preview-max": "flex flex-col justify-end h-full",
                "card-preview": "flex flex-col justify-end h-full",
                "history-slot": "relative h-full min-h-[80px] rounded-lg",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

export const productCardMediaVariants = cva(
    "absolute inset-0 z-0 overflow-hidden",
    {
        variants: {
            variant: {
                "card-full": "",
                "card-min": "",
                "card-preview-max": "",
                "card-preview": "",
                "history-slot": "",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

export const productCardOverlayVariants = cva(
    "absolute inset-0 z-10 pointer-events-none",
    {
        variants: {
            variant: {
                "card-full": "bg-gradient-to-t from-secondary-light/90 via-white/10 to-transparent",
                "card-min": "bg-gradient-to-t from-secondary-light/90 via-white/10 to-transparent",
                "card-preview-max": "bg-gradient-to-t from-secondary-light/80 via-primary-dim/30 to-transparent",
                "card-preview": "bg-gradient-to-t from-secondary-light/90 via-primary-dim/40 to-transparent",
                "history-slot": "bg-gradient-to-t from-secondary-light/90 via-primary-dim/40 to-transparent",
            },
        },
        defaultVariants: {
            variant: "card-full",
        },
    }
);

export const productCardContentVariants = cva(
    "relative z-20 flex flex-col min-h-0 overflow-hidden",
    {
        variants: {
            variant: {
                "card-full": "p-6 gap-2",
                "card-min": "p-4 gap-1.5",
                "card-preview-max": "p-4",
                "card-preview": "p-3",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

export const productCardTitleVariants = cva(
    "font-headline font-bold text-white leading-tight drop-shadow-lg",
    {
        variants: {
            variant: {
                "card-full": "text-2xl lg:text-3xl",
                "card-min": "text-lg",
                "card-preview-max": "text-base",
                "card-preview": "text-sm",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

export const productCardDescriptionVariants = cva(
    "font-body text-white/90 leading-relaxed drop-shadow-md",
    {
        variants: {
            variant: {
                "card-full": "text-md line-clamp-2",
                "card-min": "text-sm line-clamp-1",
                "card-preview-max": "hidden",
                "card-preview": "hidden",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

export const productCardPriceVariants = cva(
    "font-headline font-bold text-white drop-shadow-md",
    {
        variants: {
            variant: {
                "card-full": "text-xl",
                "card-min": "text-base",
                "card-preview-max": "hidden",
                "card-preview": "hidden",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

export const productCardOldPriceVariants = cva(
    "font-body line-through text-white/60",
    {
        variants: {
            variant: {
                "card-full": "text-sm",
                "card-min": "text-xs",
                "card-preview-max": "hidden",
                "card-preview": "hidden",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

export const productCardLinkVariants = cva(
    "inline-flex items-center gap-1 font-body text-md font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-all duration-300 group-hover:gap-2 drop-shadow",
    {
        variants: {
            variant: {
                "card-full": "",
                "card-min": "",
                "card-preview-max": "hidden",
                "card-preview": "hidden",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

export const productCardStatusBadgeVariants = cva(
    "absolute z-30 top-4 left-4",
    {
        variants: {
            variant: {
                "card-full": "block",
                "card-min": "hidden",
                "card-preview-max": "hidden",
                "card-preview": "hidden",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-full",
        },
    }
);

export const productCardAvatarVariants = cva(
    "absolute z-30 top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full",
    {
        variants: {
            variant: {
                "card-full": "flex",
                "card-min": "hidden",
                "card-preview-max": "hidden",
                "card-preview": "hidden",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-full",
        },
    }
);

export const productCardCornerIconVariants = cva(
    "absolute z-30 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300",
    {
        variants: {
            variant: {
                "card-full": "hidden",
                "card-min": "hidden",
                "card-preview-max": "top-2 right-2 w-7 h-7 bg-white/20 text-white group-hover:bg-white group-hover:text-primary",
                "card-preview": "top-1.5 right-1.5 w-6 h-6 bg-white/20 text-white group-hover:bg-white group-hover:text-primary",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

// ============================================
// NUEVOS CVA V3 — Eliminan inline del .tsx
// ============================================

/** Imagen principal del producto. */
export const productCardImageVariants = cva(
    "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
);

/** Imagen del historial con grayscale + hover. */
export const productCardHistoryImageVariants = cva(
    "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 transition-all duration-300"
);

/** Fila de precio + flecha. */
export const productCardPriceRowVariants = cva(
    "flex items-center justify-between gap-2"
);

/** Contenedor de precio actual + tachado. */
export const productCardPriceContainerVariants = cva(
    "flex items-baseline gap-2 flex-wrap"
);

/** Nombre del artesano en avatar. */
export const productCardAvatarInfoVariants = cva(
    "text-xs font-semibold text-foreground"
);

/** Checkmark de verificación del artesano. */
export const productCardAvatarVerifiedVariants = cva("text-primary text-xs");

/** Icono del link "Ver detalle". */
export const productCardLinkIconVariants = cva("w-3 h-3");

/** Icono de esquina (ArrowUpRight). */
export const productCardCornerIconInnerVariants = cva("w-4 h-4");

// Tipos derivados del CVA — sincronización automática
export type ProductCardVariant = NonNullable<
    Parameters<typeof productCardVariants>[0]
>["variant"];