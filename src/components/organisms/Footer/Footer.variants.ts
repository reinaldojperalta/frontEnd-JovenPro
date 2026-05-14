// ============================================================================
// FOOTER VARIANTS — Organismo de pie de página
// ============================================================================
// REFACTOR V3:
// - Zero Inline Policy: todas las clases migradas desde .tsx
// - Tokens fantasmas:
//   • font-display → font-headline
// - Nuevos CVA:
//   • footerVariants: bg + border del footer
//   • footerInnerVariants: flex layout interno
//   • footerBrandVariants: logo + copyright
//   • footerLogoVariants: reemplaza font-display
//   • footerCopyrightVariants: texto de copyright
//   • footerNavVariants: lista de links
//   • footerNavItemVariants: cada link
//   • footerSocialsVariants: flex de iconos sociales
// ============================================================================

import { cva } from "class-variance-authority";

export const footerVariants = cva("border-t border-border/20");

export const footerInnerVariants = cva(
    "py-12 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6"
);

export const footerBrandVariants = cva("text-center md:text-left");

export const footerLogoVariants = cva(
    "font-headline text-xl font-bold text-primary block mb-1"
);

export const footerCopyrightVariants = cva(
    "font-body text-xs text-foreground/40"
);

export const footerNavVariants = cva(
    "flex flex-wrap justify-center gap-6"
);

export const footerNavItemVariants = cva(
    "font-body text-xs text-foreground/60 hover:text-primary uppercase tracking-wider transition-colors"
);

export const footerSocialsVariants = cva("flex gap-3");