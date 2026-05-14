import { cva } from "class-variance-authority";

export const sectionVariants = cva("w-full", {
    variants: {
        spacing: {
            none: "py-0",
            sm: "py-12 md:py-16",
            md: "py-16 md:py-20",
            lg: "py-20 md:py-28",
            xl: "py-24 md:py-32",
            hero: "min-h-screen flex flex-col md:flex-row items-stretch",
        },
        background: {
            transparent: "bg-transparent",
            background: "bg-primary/10",
            surface: "bg-surface",
            "surface-container": "bg-surface-container",
            "surface-container-low": "bg-surface-container-low",
        },
    },
    defaultVariants: {
        spacing: "lg",
        background: "transparent",
    },
});

export type SectionSpacing = NonNullable<
    Parameters<typeof sectionVariants>[0]
>["spacing"];
export type SectionBackground = NonNullable<
    Parameters<typeof sectionVariants>[0]
>["background"];