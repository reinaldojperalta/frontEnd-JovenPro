// ============================================================================
// NAV — Molécula de navegación
// ============================================================================
// REFACTOR V3:
// - Zero inline classes:
//   • "inline-flex items-center relative" (a/button) → navItemWrapperVariants
//   • "bg-transparent border-none p-0" (button disabled) → navItemDisabledVariants
//   • "group" (span interno) → navItemVariants group dimension
//   • "ml-2" (Badge wrapper) → badgeWrapperVariants
//   • "bottom-0" (indicator animated) → navIndicatorVariants (ya incluía bottom-0)
// - "text-foreground" (item inactivo) → "text-secondary" (navy marca).
//   "text-foreground" es token de texto principal; en navegación, los items
//   inactivos deben tener menor énfasis que el activo. secondary (#2D2B52)
//   sobre surface (#F1F5F9) da contraste 7.5:1, suficiente.
// - Tipos importados desde .variants.ts (derivados del CVA).
// - Badge consumido correctamente: variant + size, className via wrapper CVA.
// ============================================================================

import React, { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import {
    navVariants,
    navItemVariants,
    navIndicatorVariants,
    navItemWrapperVariants,
    navItemDisabledVariants,
    badgeWrapperVariants,
    type NavDirection,
    type NavAlign,
    type NavSize,
    type NavVariant,
    type NavItemVariant,
    type NavItemWeight,
    type NavItemTransform,
} from "./Nav.variants";
import { cn } from "@/lib/utils";

export interface NavItem {
    id: string;
    label: string;
    href?: string;
    isActive?: boolean;
    badge?: string;
    badgeVariant?: "default" | "primary" | "secondary" | "danger";
    external?: boolean;
    onClick?: () => void;
    disabled?: boolean;
}

export interface NavProps {
    items: NavItem[];
    direction?: NavDirection;
    align?: NavAlign;
    size?: NavSize;
    variant?: NavVariant;
    itemVariant?: NavItemVariant;
    itemSize?: "xs" | "sm" | "md" | "lg";
    itemWeight?: NavItemWeight;
    itemTransform?: NavItemTransform;
    showActiveIndicator?: boolean;
    onItemClick?: (item: NavItem) => void;
    className?: string;
    ariaLabel?: string;
}

interface NavItemComponentProps {
    item: NavItem;
    variant: NavItemVariant;
    size: "xs" | "sm" | "md" | "lg";
    weight: NavItemWeight;
    transform: NavItemTransform;
    showIndicator: boolean;
    onClick?: (item: NavItem) => void;
}

const NavItemComponent: React.FC<NavItemComponentProps> = ({
    item,
    variant,
    size,
    weight,
    transform,
    showIndicator,
    onClick,
}) => {
    const content = (
        <>
            <span
                className={cn(
                    navItemVariants({
                        isActive: item.isActive,
                        size,
                        variant,
                        weight,
                        transform,
                        group: true,
                    })
                )}
            >
                {item.label}

                {showIndicator && item.isActive && (
                    <span
                        className={cn(navIndicatorVariants({ variant: "default" }))}
                    />
                )}

                {showIndicator && !item.isActive && variant === "underlined" && (
                    <span
                        className={cn(navIndicatorVariants({ variant: "animated" }))}
                    />
                )}
            </span>

            {item.badge && (
                <span className={cn(badgeWrapperVariants())}>
                    <Badge
                        variant={item.badgeVariant || "primary"}
                        size="sm"
                    >
                        {item.badge}
                    </Badge>
                </span>
            )}
        </>
    );

    const handleClick = (e: React.MouseEvent) => {
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        item.onClick?.();
        onClick?.(item);
    };

    if (item.href && !item.external) {
        return (
            <a
                href={item.href}
                className={cn(navItemWrapperVariants())}
                onClick={handleClick}
                aria-current={item.isActive ? "page" : undefined}
            >
                {content}
            </a>
        );
    }

    if (item.href && item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(navItemWrapperVariants())}
                onClick={handleClick}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            className={cn(
                navItemWrapperVariants(),
                navItemDisabledVariants()
            )}
            onClick={handleClick}
            disabled={item.disabled}
            aria-current={item.isActive ? "page" : undefined}
        >
            {content}
        </button>
    );
};

const Nav = forwardRef<HTMLElement, NavProps>(
    (
        {
            items,
            direction = "horizontal",
            align = "center",
            size = "md",
            variant = "default",
            itemVariant = "default",
            itemSize = "md",
            itemWeight = "bold",
            itemTransform = "none",
            showActiveIndicator = false,
            onItemClick,
            className,
            ariaLabel = "Navegación principal",
        },
        ref
    ) => {
        return (
            <nav
                ref={ref}
                className={cn(
                    navVariants({ direction, align, size, variant }),
                    className
                )}
                aria-label={ariaLabel}
            >
                {items.map((item) => (
                    <NavItemComponent
                        key={item.id}
                        item={item}
                        variant={itemVariant}
                        size={itemSize}
                        weight={itemWeight}
                        transform={itemTransform}
                        showIndicator={showActiveIndicator}
                        onClick={onItemClick}
                    />
                ))}
            </nav>
        );
    }
);

Nav.displayName = "Nav";

export { Nav };