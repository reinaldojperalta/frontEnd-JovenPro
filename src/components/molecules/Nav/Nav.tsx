// components/molecules/Nav/Nav.tsx

import React, { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Text } from "@/components/atoms/Typography";
import {
    navVariants,
    navItemVariants,
    navIndicatorVariants,
    type NavDirection,
    type NavAlign,
    type NavSize,
    type NavVariant,
    type NavItemVariant,
    type NavItemWeight,
    type NavItemTransform
} from "./Nav.variants";
import { cn } from "@/lib/utils";

// ============================================
// TIPOS DE DATOS
// ============================================

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

// ============================================
// INTERFAZ DEL NAV
// ============================================

export interface NavProps {
    /** Items de navegación */
    items: NavItem[];

    /** Dirección del layout */
    direction?: NavDirection;

    /** Alineación */
    align?: NavAlign;

    /** Tamaño del gap entre items */
    size?: NavSize;

    /** Variante visual del contenedor */
    variant?: NavVariant;

    /** Variante visual de cada item */
    itemVariant?: NavItemVariant;

    /** Tamaño de fuente de los items */
    itemSize?: "xs" | "sm" | "md" | "lg";

    /** Peso de fuente de los items */
    itemWeight?: NavItemWeight;

    /** Transformación de texto */
    itemTransform?: NavItemTransform;

    /** Mostrar indicador de activo */
    showActiveIndicator?: boolean;

    /** Callback al clickear item (si no usa href) */
    onItemClick?: (item: NavItem) => void;

    /** Clases adicionales */
    className?: string;

    /** ID para accesibilidad */
    ariaLabel?: string;
}

// ============================================
// COMPONENTE NAV ITEM (interno)
// ============================================

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
            <span className={cn(
                navItemVariants({
                    isActive: item.isActive,
                    size,
                    variant,
                    weight,
                    transform
                }),
                "group" // Para efectos hover en hijos
            )}>
                {item.label}

                {/* Indicador de activo (línea inferior) */}
                {showIndicator && item.isActive && (
                    <span className={navIndicatorVariants({ variant: "default" })} />
                )}

                {/* Indicador animado en hover */}
                {showIndicator && !item.isActive && variant === "underlined" && (
                    <span className={cn(
                        navIndicatorVariants({ variant: "animated" }),
                        "bottom-0"
                    )} />
                )}
            </span>

            {/* Badge opcional */}
            {item.badge && (
                <Badge
                    variant={item.badgeVariant || "primary"}
                    size="sm"
                    className="ml-2"
                >
                    {item.badge}
                </Badge>
            )}
        </>
    );

    // Handler de click
    const handleClick = (e: React.MouseEvent) => {
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        item.onClick?.();
        onClick?.(item);
    };

    // Renderizar como enlace interno (SPA anchor)
    if (item.href && !item.external) {
        return (
            <a
                href={item.href}
                className="inline-flex items-center relative"
                onClick={handleClick}
                aria-current={item.isActive ? "page" : undefined}
            >
                {content}
            </a>
        );
    }

    // Renderizar como <a> externa
    if (item.href && item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center relative"
                onClick={handleClick}
            >
                {content}
            </a>
        );
    }

    // Renderizar como <button>
    return (
        <button
            className="inline-flex items-center relative bg-transparent border-none p-0"
            onClick={handleClick}
            disabled={item.disabled}
            aria-current={item.isActive ? "page" : undefined}
        >
            {content}
        </button>
    );
};

// ============================================
// COMPONENTE NAV
// ============================================

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