import { cva } from "class-variance-authority";

export const navbarStickyVariants = cva(
    "z-50 w-full transition-all duration-500 ease-smooth",
    {
        variants: {
            state: {
                transparent: "relative bg-transparent/5 backdrop-blur-md border-b border-border/70 shadow-clay",
                solid: "sticky top-0 bg-background backdrop-blur-sm border-b border-border/40 shadow-clay",
            },
        },
        defaultVariants: { state: "transparent" },
    }
);

export const navbarStickyInnerVariants = cva(
    "flex items-center justify-between h-16 md:h-20"
);

export const navbarStickyLogoVariants = cva("", {
    variants: {
        state: {
            transparent: "text-muted-foreground/50",
            solid: "text-secondary",
        },
    },
    defaultVariants: { state: "solid" },
});

export const navbarStickyNavListVariants = cva("", {
    variants: {
        searchActive: {
            true: "hidden",
            false: "hidden md:flex items-center gap-8",
        },
    },
    defaultVariants: { searchActive: false },
});

export const navbarStickyNavLinkVariants = cva(
    "text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
    {
        variants: {
            state: {
                transparent: "text-muted-foreground/50 hover:text-foreground",
                solid: "text-foreground hover:text-primary",
            },
        },
        defaultVariants: { state: "solid" },
    }
);

export const navbarStickySearchVariants = cva("", {
    variants: {
        active: {
            true: "flex-1 max-w-md mx-4 hidden md:block",
            false: "hidden",
        },
    },
    defaultVariants: { active: false },
});

export const navbarStickyActionsVariants = cva(
    "flex items-center gap-2 shrink-0"
);

export const navbarStickyActionIconVariants = cva("", {
    variants: {
        state: {
            transparent: "text-muted-foreground/50",
            solid: "text-foreground",
        },
    },
    defaultVariants: { state: "solid" },
});

/** NUEVO: elimina "w-5 h-5" inline de todos los iconos SVG lucide. */
export const navbarStickySvgIconVariants = cva("w-5 h-5");

export const navbarStickyLoginButtonVariants = cva("", {
    variants: {
        state: {
            transparent: "bg-secondary/20 text-muted-foreground/50 hover:bg-white/20 backdrop-blur-sm border border-white/20 shadow-none",
            solid: "",
        },
    },
    defaultVariants: { state: "solid" },
});

export const navbarStickyMobileToggleVariants = cva("md:hidden");

export const navbarStickyMobileMenuVariants = cva(
    "md:hidden bg-background/95 backdrop-blur-md border-t border-surface-variant overflow-hidden"
);

export const navbarStickyMobileListVariants = cva("flex flex-col gap-4 py-4");

export const navbarStickyMobileLinkVariants = cva(
    "text-base font-semibold text-foreground hover:text-primary transition-colors w-full block py-2"
);

export type NavbarStickyState = "transparent" | "solid";