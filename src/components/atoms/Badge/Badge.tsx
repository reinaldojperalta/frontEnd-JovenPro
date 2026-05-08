import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
    badgeVariants,
    indicatorVariants,
    pingVariants,
    dotVariants,
    type IndicatorColor,
} from "./Badge.variants";
import { cn } from "@/lib/utils";

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    children: React.ReactNode;
    indicator?: boolean;
    indicatorColor?: IndicatorColor;
    indicatorPosition?: "left" | "right";
}

const StatusIndicator: React.FC<{
    color: IndicatorColor;
}> = ({ color }) => {
    return (
        <span className={cn(indicatorVariants({ color }))}>
            <span className={cn(pingVariants())} />
            <span className={cn(dotVariants({ color }))} />
        </span>
    );
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant = "default",
            size = "md",
            uppercase = true,
            indicator = false,
            indicatorColor = "primary",
            indicatorPosition = "left",
            children,
            ...props
        },
        ref
    ) => {
        return (
            <span
                className={cn(
                    badgeVariants({
                        variant,
                        size,
                        uppercase,
                        indicator,
                    }),
                    className
                )}
                ref={ref}
                {...props}
            >
                {indicator && indicatorPosition === "left" && (
                    <StatusIndicator color={indicatorColor} />
                )}
                {children}
                {indicator && indicatorPosition === "right" && (
                    <StatusIndicator color={indicatorColor} />
                )}
            </span>
        );
    }
);

Badge.displayName = "Badge";

export { Badge };