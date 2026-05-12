// ============================================================================
// CONTACT SECTION VARIANTS — Organismo de formulario de contacto
// ============================================================================
// REFACTOR V3:
// - Zero Inline Policy: todas las clases migradas desde .tsx
// - Background accents con valores arbitrarios: migrados a CVA
//   (son decorativos únicos de esta sección, no se repiten en otros organismos)
// - Badge abuse documentado: el override "px-0 py-0 bg-transparent shadow-none"
//   se migra a featureIndicatorVariants. TODO: reemplazar por un dot simple.
// - Nuevos CVA:
//   • contactSectionVariants: py + px del section
//   • contactSectionCardVariants: card principal (clay + layout split/centered)
//   • contactSectionContentVariants: columna izquierda (texto)
//   • contactSectionTitleVariants: override de Heading (size + leading + tracking)
//   • contactSectionDescriptionVariants: descripción con alineación
//   • contactSectionFeaturesVariants: flex de features
//   • contactSectionFeatureItemVariants: cada feature con icono
//   • contactSectionFeatureIndicatorVariants: reemplaza Badge abuse
//   • contactSectionFormVariants: columna derecha (formulario)
//   • contactSectionFormCardVariants: card interna del form (surface + shadow)
//   • contactSectionFormWrapperVariants: form space-y
//   • contactSectionCTAVariants: wrapper del CTAGroup
//   • contactSectionAccentTopVariants: blur decorativo superior
//   • contactSectionAccentBottomVariants: blur decorativo inferior
// ============================================================================

import { cva } from "class-variance-authority";

export const contactSectionVariants = cva("py-16 px-6");

export const contactSectionCardVariants = cva(
    "relative overflow-hidden p-8 lg:p-20 lg:pb-28",
    {
        variants: {
            layout: {
                split: "flex flex-col lg:flex-row items-center gap-6",
                centered: "flex flex-col items-center text-center max-w-4xl mx-auto",
            },
        },
        defaultVariants: {
            layout: "split",
        },
    }
);

export const contactSectionContentVariants = cva("flex-1 space-y-2 relative z-10", {
    variants: {
        layout: {
            split: "text-left",
            centered: "text-center",
        },
    },
    defaultVariants: {
        layout: "split",
    },
});

export const contactSectionTitleVariants = cva(
    "leading-tight lg:leading-[1.1] text-5xl lg:text-7xl tracking-tighter"
);

export const contactSectionDescriptionVariants = cva("max-w-md", {
    variants: {
        layout: {
            split: "mx-auto lg:mx-0",
            centered: "mx-auto",
        },
    },
    defaultVariants: {
        layout: "split",
    },
});

export const contactSectionFeaturesVariants = cva(
    "flex flex-wrap gap-8 text-xs font-black uppercase tracking-[0.2em] opacity-80",
    {
        variants: {
            layout: {
                split: "justify-center lg:justify-start",
                centered: "justify-center",
            },
        },
        defaultVariants: {
            layout: "split",
        },
    }
);

export const contactSectionFeatureItemVariants = cva(
    "flex items-center gap-3"
);

/** Reemplaza el abuso de Badge override.
 *  TODO: reemplazar por un dot decorativo simple en vez de Badge. */
export const contactSectionFeatureIndicatorVariants = cva(
    "w-2 h-2 rounded-full bg-secondary"
);

export const contactSectionFormVariants = cva(
    "flex-1 w-full max-w-lg relative z-10",
    {
        variants: {
            layout: {
                split: "lg:ml-auto",
                centered: "max-w-xl",
            },
        },
        defaultVariants: {
            layout: "split",
        },
    }
);

export const contactSectionFormCardVariants = cva(
    "shadow-clay-active"
);

export const contactSectionFormWrapperVariants = cva("space-y-8");

export const contactSectionCTAVariants = cva("");

/** Blur decorativo superior derecho */
export const contactSectionAccentTopVariants = cva(
    "absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2"
);

/** Blur decorativo inferior izquierdo */
export const contactSectionAccentBottomVariants = cva(
    "absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 blur-[100px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2"
);

export type ContactSectionLayout = "split" | "centered";