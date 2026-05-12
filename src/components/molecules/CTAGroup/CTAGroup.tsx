// ============================================================================
// CTA GROUP — Molécula de agrupación de botones de acción
// ============================================================================
// REFACTOR V3:
// - Zero inline classes:
//   • "flex-col-reverse sm:flex-row" → dimensión reverseOnMobile en CVA
//   • "w-full sm:w-auto" por botón → eliminado. El CVA del contenedor ya
//     aplica [&>button]:w-full sm:[&>button]:w-auto via fullWidthMobile.
// - Consumo de Button: correcto. Solo props de variante, sin clases arbitrarias.
// - action.className se propaga al Button como override puntual (excepción
//   documentada en ATOMOS_CONSUMO.md).
// - Tipos importados desde .variants.ts (derivados del CVA).
// ============================================================================

import React, { forwardRef } from "react";
import { Button, type ButtonProps } from "@/components/atoms/Button";
import {
    ctaGroupVariants,
    type CTAGroupDirection,
    type CTAGroupAlign,
    type CTAGroupGap,
    type CTAGroupVerticalAlign,
} from "./CTAGroup.variants";
import { cn } from "@/lib/utils";

export interface CTAAction {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    priority?: "primary" | "secondary" | "tertiary";
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    iconPosition?: "left" | "right";
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    order?: "first" | "last";
}

export interface CTAGroupProps
    extends React.HTMLAttributes<HTMLDivElement> {
    primaryAction: CTAAction;
    secondaryAction?: CTAAction;
    tertiaryAction?: CTAAction;
    direction?: CTAGroupDirection;
    align?: CTAGroupAlign;
    gap?: CTAGroupGap;
    verticalAlign?: CTAGroupVerticalAlign;
    responsive?: boolean;
    fullWidthMobile?: boolean;
    reverseOnMobile?: boolean;
}

const CTAGroup = forwardRef<HTMLDivElement, CTAGroupProps>(
    (
        {
            primaryAction,
            secondaryAction,
            tertiaryAction,
            direction = "horizontal",
            align = "start",
            gap = "sm",
            verticalAlign = "center",
            responsive = true,
            fullWidthMobile = true,
            reverseOnMobile = false,
            className,
            ...props
        },
        ref
    ) => {
        const actions = [
            {
                ...primaryAction,
                key: "primary",
                defaultPriority: "primary" as const,
            },
            secondaryAction && {
                ...secondaryAction,
                key: "secondary",
                defaultPriority: "secondary" as const,
            },
            tertiaryAction && {
                ...tertiaryAction,
                key: "tertiary",
                defaultPriority: "tertiary" as const,
            },
        ].filter(
            (action): action is NonNullable<typeof action> => Boolean(action)
        );

        const sortedActions = actions.sort((a, b) => {
            if (a.order === "first") return -1;
            if (b.order === "first") return 1;
            if (a.order === "last") return 1;
            if (b.order === "last") return -1;
            return 0;
        });

        const getButtonVariant = (
            action: (typeof sortedActions)[0]
        ): ButtonProps["variant"] => {
            const priority = action.priority || action.defaultPriority;
            switch (priority) {
                case "primary":
                    return action.variant || "primary";
                case "secondary":
                    return action.variant || "secondary";
                case "tertiary":
                    return action.variant || "ghost";
                default:
                    return "primary";
            }
        };

        return (
            <div
                ref={ref}
                className={cn(
                    ctaGroupVariants({
                        direction,
                        align,
                        gap,
                        verticalAlign,
                        responsive,
                        fullWidthMobile,
                        reverseOnMobile,
                    }),
                    className
                )}
                {...props}
            >
                {sortedActions.map((action) => (
                    <Button
                        key={action.key}
                        variant={getButtonVariant(action)}
                        size={action.size || "lg"}
                        icon={action.icon}
                        iconPosition={action.iconPosition || "right"}
                        isLoading={action.isLoading}
                        disabled={action.disabled}
                        onClick={action.onClick}
                        className={action.className}
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        );
    }
);

CTAGroup.displayName = "CTAGroup";

export { CTAGroup };