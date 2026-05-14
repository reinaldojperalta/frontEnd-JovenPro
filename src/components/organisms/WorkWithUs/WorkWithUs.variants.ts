// ============================================================================
// WORK WITH US VARIANTS — Organismo de sección de contacto/mapa
// ============================================================================
// REFACTOR V3:
// - Zero Inline Policy: todas las clases migradas desde .tsx
// - shadow-ambient inexistente → shadow-clay
// - Tokens fantasmas: ninguno (WorkWithUs no usaba jp-* tokens)
// - Nuevos CVA:
//   • workWithUsSectionVariants: py del section
//   • workWithUsCardVariants: card principal bg-white + shadow
//   • workWithUsContentVariants: columna izquierda (texto + sociales)
//   • workWithUsDecoVariants: círculo decorativo blur
//   • workWithUsInnerVariants: wrapper relativo z-10
//   • workWithUsTitleVariants: override de Heading (mb + leading)
//   • workWithUsDescriptionVariants: subheadline
//   • workWithUsDividerVariants: separador antes de sociales
//   • workWithUsSocialsVariants: flex gap de botones sociales
//   • workWithUsMapVariants: columna derecha (mapa)
//   • workWithUsMapImageVariants: imagen del mapa con filtros
//   • workWithUsMapOverlayVariants: capa primary/10 sobre mapa
//   • workWithUsPinWrapperVariants: posicionamiento absoluto centrado
//   • workWithUsPinButtonVariants: botón circular del pin
//   • workWithUsPinPingVariants: animación ping del pin
//   • workWithUsPinIconVariants: icono del pin (w-8 h-8 text-secondary)
//   • workWithUsLocationLabelVariants: label de ubicación
//   • workWithUsLocationSubVariants: sub-label (opacity-80)
// ============================================================================

import { cva } from "class-variance-authority";


export const workWithUsCardVariants = cva(
    "bg-white rounded-3xl overflow-hidden shadow-clay border border-border/20 flex flex-col lg:flex-row"
);

export const workWithUsContentVariants = cva(
    "w-full lg:w-1/2 p-6 sm:p-10 md:p-16 flex flex-col justify-center relative overflow-hidden"
);

export const workWithUsDecoVariants = cva(
    "absolute -left-20 -bottom-20 w-64 h-64 bg-surface-container-low/50 rounded-full blur-3xl z-0"
);

export const workWithUsInnerVariants = cva("relative z-10");

export const workWithUsTitleVariants = cva("mb-6 leading-tight");

export const workWithUsDescriptionVariants = cva(
    "font-body text-foreground/70 text-base md:text-lg mb-6 md:mb-10 max-w-md leading-relaxed"
);

export const workWithUsDividerVariants = cva(
    "border-t border-border/30 pt-8"
);

export const workWithUsSocialsVariants = cva("flex gap-3");

export const workWithUsMapVariants = cva(
    "w-full lg:w-1/2 relative min-h-[300px] md:min-h-[400px] bg-surface"
);

export const workWithUsMapImageVariants = cva(
    "absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply filter grayscale contrast-125"
);

export const workWithUsMapOverlayVariants = cva(
    "absolute inset-0 bg-primary/10"
);

export const workWithUsPinWrapperVariants = cva(
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
);

export const workWithUsPinButtonVariants = cva(
    "w-16 h-16 bg-white rounded-full shadow-clay flex items-center justify-center relative mb-4 cursor-pointer"
);

export const workWithUsPinPingVariants = cva(
    "absolute inset-0 rounded-full border-2 border-secondary/30 animate-ping"
);

export const workWithUsPinIconVariants = cva("w-8 h-8 text-secondary");

export const workWithUsLocationLabelVariants = cva(
    "bg-primary text-white px-5 py-3 rounded-xl font-body text-sm font-bold shadow-lg text-center"
);

export const workWithUsLocationSubVariants = cva(
    "font-normal text-xs opacity-80"
);

export const workWithUsWhatsappLinkVariants = cva(
    "font-headline text-base md:text-xl text-primary-dim underline font-bold block mt-4 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0"
);