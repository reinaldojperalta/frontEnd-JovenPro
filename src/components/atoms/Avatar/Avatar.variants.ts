import { cva } from "class-variance-authority";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarVariant = "default" | "solid" | "outline";

export const avatarVariants = cva(
    "relative flex shrink-0 overflow-hidden rounded-full items-center justify-center bg-surface-variant font-headline text-foreground",
    {
        variants: {
            size: {
                xs: "w-6 h-6 text-[10px]",
                sm: "w-8 h-8 text-xs",
                md: "w-10 h-10 text-sm",
                lg: "w-14 h-14 text-base",
                xl: "w-20 h-20 text-lg",
            },
            variant: {
                default: "",
                solid: "bg-primary text-white",
                outline: "border-2 border-border bg-surface",
            },
        },
        defaultVariants: {
            size: "md",
            variant: "default",
        },
    }
);

export const avatarImageVariants = cva("h-full w-full object-cover");

export const avatarFallbackVariants = cva("font-semibold uppercase");