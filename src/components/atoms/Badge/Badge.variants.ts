import { cva } from "class-variance-authority";

export const badgeVariants = cva(
    "inline-flex items-center gap-2 font-black transition-all",
    {
        variants: {
            variant: {
                default: ["bg-surface text-secondary shadow-clay-sm"],
                primary: [
                    "bg-primary-subtle text-primary-dim",
                    "shadow-clay-sm",
                    "border border-primary/20",
                ],
                secondary: [
                    "bg-surface-variant text-secondary",
                    "shadow-clay-sm",
                    "border border-secondary/20",
                ],
                success: ["bg-success-subtle text-success shadow-none"],
                danger: ["bg-danger text-white shadow-lg shadow-danger/30"],
                warning: ["bg-warning-subtle text-warning shadow-none"],
                glass: [
                    "bg-white/40 backdrop-blur-xl border border-white/50 text-secondary",
                    "shadow-lg shadow-black/5",
                ],
                skeleton: [
                    "bg-white/20 backdrop-blur-md border border-white/30",
                    "shadow-inner shadow-white/40",
                    "animate-pulse cursor-wait",
                    "text-transparent select-none",
                ],
                new: [
                    "bg-success-subtle text-success",
                    "shadow-clay-sm",
                    "border border-success/50",
                ],
                sale: [
                    "bg-accent-subtle text-secondary",
                    "shadow-clay-sm",
                    "border border-accent/50",
                ],
                featured: [
                    "bg-accent-subtle text-secondary",
                    "shadow-clay-sm",
                    "border border-accent/50",
                ],
            },
            size: {
                sm: "px-2 py-1 text-[10px] rounded-full",
                md: "px-3 py-1.5 text-xs rounded-full",
                lg: "px-6 py-3 text-sm rounded-clay",
                xl: "px-2 py-1 text-[10px] rounded-full",
            },
            uppercase: {
                true: "uppercase tracking-[0.2em]",
                false: "normal-case tracking-normal",
            },
            indicator: {
                true: "pl-2",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            uppercase: true,
            indicator: false,
        },
    }
);

export const indicatorVariants = cva("relative flex h-2 w-2", {
    variants: {
        color: {
            primary: "",
            secondary: "",
            danger: "",
            success: "",
        },
    },
    defaultVariants: {
        color: "primary",
    },
});

export const pingVariants = cva(
    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
    {
        variants: {
            color: {
                primary: "bg-primary",
                secondary: "bg-secondary",
                danger: "bg-danger",
                success: "bg-success",
            },
        },
        defaultVariants: {
            color: "primary",
        },
    }
);

export const dotVariants = cva("relative inline-flex rounded-full h-2 w-2", {
    variants: {
        color: {
            primary: "bg-primary",
            secondary: "bg-secondary",
            danger: "bg-danger",
            success: "bg-success",
        },
    },
    defaultVariants: {
        color: "primary",
    },
});

export type BadgeVariant = NonNullable<
    Parameters<typeof badgeVariants>[0]
>["variant"];
export type BadgeSize = NonNullable<Parameters<typeof badgeVariants>[0]>["size"];
export type IndicatorColor = NonNullable<
    Parameters<typeof dotVariants>[0]
>["color"];