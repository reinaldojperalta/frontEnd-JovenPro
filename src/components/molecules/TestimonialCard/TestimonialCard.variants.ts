// ============================================================================
// TESTIMONIAL CARD VARIANTS — Molécula de tarjeta de testimonio
// ============================================================================
// REFACTOR V3:
// - Archivo creado (no existía). Extrae todo el CSS inline del .tsx.
// - Tokens validados:
//   • bg-surface-container, rounded-clay, shadow-clay: existen
//   • bg-surface-variant, border-surface-variant: existen
//   • rounded-clay-sm: existe en tailwind.config.ts
// - EXCEPCIÓN DOCUMENTADA: font-serif en quote decorativa. No es parte de la
//   identidad tipográfica (Montserrat); se usa solo para el carácter de comilla
//   como elemento decorativo estilístico.
// - text-primary/10: opacidad sobre primary para elemento decorativo. Aceptable.
// - border-surface-variant/50: opacidad sobre borde para separador sutil.
//   Aceptable para estados de borde decorativos.
// - Tipos derivados del CVA.
// ============================================================================

import { cva } from "class-variance-authority";

/** Wrapper principal del testimonio. */
export const testimonialCardVariants = cva(
    "flex flex-col h-full bg-surface-container rounded-clay shadow-clay",
    {
        variants: {
            size: {
                default: "p-6 md:p-8",
                compact: "p-4 md:p-6",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

/** Header: Avatar + Info. */
export const testimonialCardHeaderVariants = cva(
    "flex items-center gap-4 mb-6"
);

/** Contenedor de info (nombre + rol). */
export const testimonialCardInfoVariants = cva("min-w-0");

/** Nombre del autor. */
export const testimonialCardNameVariants = cva("block truncate");

/** Rol del autor. */
export const testimonialCardRoleVariants = cva("block truncate");

/** Comilla decorativa. */
export const testimonialCardQuoteVariants = cva(
    "text-primary/10 text-5xl font-serif leading-none mb-2 select-none"
);

/** Cuerpo del testimonio. */
export const testimonialCardContentVariants = cva(
    "flex-1 leading-relaxed mb-6"
);

/** Footer: Rating + imagen de producto. */
export const testimonialCardFooterVariants = cva(
    "flex items-center justify-between gap-4 pt-4 border-t border-surface-variant/50"
);

/** Contenedor de la imagen del producto comprado. */
export const testimonialCardProductImageVariants = cva(
    "relative w-12 h-12 rounded-clay-sm overflow-hidden shrink-0 bg-surface-variant"
);

/** Imagen del producto. */
export const testimonialCardProductImgVariants = cva(
    "w-full h-full object-cover"
);

// Tipos derivados del CVA — sincronización automática
export type TestimonialCardSize = NonNullable<
    Parameters<typeof testimonialCardVariants>[0]
>["size"];