// src/components/molecules/ProductCard/ProductCard.variants.ts

import { cva } from "class-variance-authority";

/**
 * VARIANTES DE PRODUCTCARD — Sistema Bento Carousel v2.1 (FIX)
 * 
 * FIX CRÍTICO: El contenido NO va absolute. Va en flujo normal flex,
 * empujado al fondo por justify-end del contenedor padre.
 * El overlay gradiente SÍ es absolute (está detrás).
 * 
 * Estructura:
 * CardWrapper (flex flex-col justify-end relative overflow-hidden)
 *   ├── Media (absolute inset-0 z-0)
 *   │   ├── Image
 *   │   └── Overlay (absolute inset-0 z-10)
 *   ├── Badge (absolute top-4 left-4 z-30)
 *   ├── Avatar (absolute top-4 right-4 z-30)
 *   ├── CornerIcon (absolute top-3 right-3 z-30) [previews]
 *   └── Content (relative z-20, en flujo flex, al fondo por justify-end)
 *       ├── Title
 *       ├── Description
 *       ├── Price
 *       └── Link
 */

// ============================================
// VARIANTE PRINCIPAL DEL CONTENEDOR
// ============================================
// justify-end empuja TODO el contenido al fondo

export const productCardVariants = cva(
    "relative overflow-hidden rounded-clay bg-surface shadow-clay transition-all duration-500 ease-smooth group cursor-pointer",
    {
        variants: {
            variant: {
                // Hero: flex justify-end empuja contenido abajo
                "card-full": "flex flex-col justify-end h-full",

                // Vertical: igual
                "card-min": "flex flex-col justify-end h-full",

                // Preview Max: flex justify-end
                "card-preview-max": "flex flex-col justify-end h-full",

                // Preview: flex justify-end
                "card-preview": "flex flex-col justify-end h-full",

                // Historial: solo imagen centrada
                "history-slot": "relative aspect-bento-history min-h-[80px] rounded-lg",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

// ============================================
// VARIANTES DEL MEDIA (IMAGEN)
// ============================================
// absolute inset-0 = fondo de la card, detrás de todo

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

// ============================================
// VARIANTES DEL OVERLAY (gradiente)
// ============================================
// absolute inset-0 = cubre toda la imagen

export const productCardOverlayVariants = cva(
    "absolute inset-0 z-10 pointer-events-none",
    {
        variants: {
            variant: {
                // Hero: NEGRO agresivo abajo para que el texto resalte
                "card-full": "bg-gradient-to-t from-black via-black/60 to-transparent",

                // Min: negro ligeramente menos denso
                "card-min": "bg-gradient-to-t from-black/80 via-black/40 to-transparent",

                // Preview Max: primary sólido abajo
                "card-preview-max": "bg-gradient-to-t from-primary/90 via-primary/50 to-transparent",

                // Preview: primary sólido abajo
                "card-preview": "bg-gradient-to-t from-primary/90 via-primary/50 to-transparent",

                // History: sin overlay
                "history-slot": "",
            },
        },
        defaultVariants: {
            variant: "card-full",
        },
    }
);

// ============================================
// VARIANTES DEL CONTENIDO (FOOTER)
// ============================================
// relative z-20 = EN EL FLUJO del flex, no absolute
// justify-end del padre lo empuja al fondo

export const productCardContentVariants = cva(
    "relative z-20 flex flex-col",
    {
        variants: {
            variant: {
                "card-full": "p-6 gap-2",
                "card-min": "p-4 gap-1.5",
                "card-preview-max": "p-7",
                "card-preview": "p-7",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

// ============================================
// VARIANTES DEL TÍTULO
// ============================================

export const productCardTitleVariants = cva(
    "font-headline font-bold text-white leading-tight drop-shadow-lg",
    {
        variants: {
            variant: {
                "card-full": "text-2xl lg:text-3xl",
                "card-min": "text-lg",
                "card-preview-max": "text-lg",
                "card-preview": "text-md lg:text-lg",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

// ============================================
// VARIANTES DE LA DESCRIPCIÓN
// ============================================

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

// ============================================
// VARIANTES DEL PRECIO
// ============================================

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

// ============================================
// VARIANTES DEL PRECIO TACHADO
// ============================================

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

// ============================================
// VARIANTES DEL LINK "VER DETALLE"
// ============================================

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

// ============================================
// VARIANTES DEL BADGE DE STATUS
// ============================================

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

// ============================================
// VARIANTES DEL AVATAR (ARTESANO)
// ============================================

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

// ============================================
// VARIANTES DEL ICONO DE ESQUINA (Previews)
// ============================================

export const productCardCornerIconVariants = cva(
    "absolute z-30 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300",
    {
        variants: {
            variant: {
                "card-full": "hidden",
                "card-min": "hidden",
                "card-preview-max": "top-3 right-3 w-8 h-8 bg-white/20 text-white group-hover:bg-white group-hover:text-primary",
                "card-preview": "top-2.5 right-2.5 w-7 h-7 bg-white/20 text-white group-hover:bg-white group-hover:text-primary",
                "history-slot": "hidden",
            },
        },
        defaultVariants: {
            variant: "card-preview",
        },
    }
);

// ============================================
// VARIANTES DE LA FLECHA (DEPRECADA)
// ============================================

export const productCardArrowVariants = cva(
    "hidden",
    {
        variants: {
            variant: {
                "card-full": "hidden",
                "card-min": "hidden",
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

// Tipos exportados
export type ProductCardVariant = "card-full" | "card-min" | "card-preview-max" | "card-preview" | "history-slot";