// ============================================================================
// TESTIMONIALS VARIANTS — Organismo de testimonios
// ============================================================================
// REFACTOR V3:
// - Zero Inline Policy: todas las clases migradas desde .tsx
// - Tokens fantasmas:
//   • shadow-soft → shadow-clay
// - Nuevos CVA:
//   • testimonialsGridVariants
//   • testimonialsHeaderVariants
//   • testimonialsOverlineVariants
//   • testimonialsCardWrapperVariants
//   • testimonialsCardVariants
//   • testimonialsQuoteVariants
//   • testimonialsFooterVariants
//   • testimonialsAuthorVariants
//   • testimonialsAuthorInfoVariants
//   • testimonialsNameVariants
//   • testimonialsRoleVariants
//   • testimonialsProductVariants
//   • testimonialsProductImageVariants
//   • testimonialsControlsVariants
//   • testimonialsDotsWrapperVariants
//   • testimonialsDotVariants
//   • testimonialsArrowsWrapperVariants
// ============================================================================

import { cva } from "class-variance-authority";



export const testimonialsGridVariants = cva(
    "grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
);

export const testimonialsHeaderVariants = cva("md:col-span-4");

export const testimonialsOverlineVariants = cva("mb-2 block");

export const testimonialsCardWrapperVariants = cva("md:col-span-8");

export const testimonialsCardVariants = cva(
    "bg-white rounded-2xl p-8 md:p-10 shadow-clay border border-border/20 relative min-h-[280px] flex flex-col justify-between"
);

export const testimonialsQuoteVariants = cva(
    "font-body text-lg italic text-foreground leading-relaxed mb-8"
);

export const testimonialsFooterVariants = cva(
    "flex items-center justify-between mt-8"
);

export const testimonialsAuthorVariants = cva("flex items-center gap-4");

export const testimonialsAuthorInfoVariants = cva("");

export const testimonialsNameVariants = cva(
    "font-headline text-sm font-bold text-primary"
);

export const testimonialsRoleVariants = cva(
    "font-body text-xs text-foreground/60 uppercase tracking-wider"
);

export const testimonialsProductVariants = cva("flex items-center gap-3");

export const testimonialsProductImageVariants = cva(
    "w-12 h-12 rounded-lg object-cover hidden sm:block"
);

export const testimonialsControlsVariants = cva(
    "flex items-center justify-between mt-6"
);

export const testimonialsDotsWrapperVariants = cva("flex gap-2");

export const testimonialsDotVariants = cva(
    "h-2 rounded-full transition-all duration-300",
    {
        variants: {
            state: {
                active: "bg-primary w-6",
                inactive: "bg-surface-variant w-2 hover:bg-border",
            },
        },
        defaultVariants: {
            state: "inactive",
        },
    }
);

export const testimonialsArrowsWrapperVariants = cva("flex gap-2");