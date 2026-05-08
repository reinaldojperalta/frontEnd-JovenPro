// components/molecules/ProductInfo/ProductInfo.tsx

import React, { forwardRef } from "react";
import { Heading, Text } from "@/components/atoms/Typography";
import { Price, type PriceProps } from "@/components/atoms/Price";
import { Badge } from "@/components/atoms/Badge";
import {
    productInfoVariants,
    brandVariants,
    nameVariants,
    descriptionVariants,
    type ProductInfoLayout,
    type ProductInfoAlign,
    type ProductInfoPricePosition,
    type ProductInfoBrandSize,
    type ProductInfoBrandVariant,
    type ProductInfoNameSize,
    type ProductInfoNameVariant
} from "./ProductInfo.variants";
import { cn } from "@/lib/utils";

// ============================================
// TIPOS DE DATOS
// ============================================

export interface ProductInfoData {
    /** Marca/emprendedor */
    brand?: string;

    /** Nombre del producto */
    name: string;

    /** Descripción corta */
    description?: string;

    /** Precio actual */
    price: number;

    /** Precio anterior (para descuento) */
    oldPrice?: number;

    /** Badge opcional (nuevo, bestseller, etc) */
    badge?: string;

    /** Variante del badge */
    badgeVariant?: "default" | "primary" | "secondary" | "danger" | "success";
}

// ============================================
// INTERFAZ DEL PRODUCTINFO
// ============================================

export interface ProductInfoProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /** Datos del producto */
    data: ProductInfoData;

    /** Layout general */
    layout?: ProductInfoLayout;

    /** Alineación */
    align?: ProductInfoAlign;

    /** Posición del precio */
    pricePosition?: ProductInfoPricePosition;

    /** Tamaño de la marca */
    brandSize?: ProductInfoBrandSize;

    /** Variante de la marca */
    brandVariant?: ProductInfoBrandVariant;

    /** Tamaño del nombre */
    nameSize?: ProductInfoNameSize;

    /** Variante del nombre */
    nameVariant?: ProductInfoNameVariant;

    /** Mostrar líneas de descripción */
    descriptionLines?: 2 | 3 | "none";

    /** Tamaño del precio */
    priceSize?: "sm" | "md" | "lg" | "xl";

    /** Mostrar descuento como badge separado */
    showDiscountBadge?: boolean;

    /** Callback al clickear el nombre */
    onNameClick?: () => void;

    /** Callback al clickear la marca */
    onBrandClick?: () => void;

    /** Elementos adicionales (rating, stock, etc) */
    extras?: React.ReactNode;
}

// ============================================
// COMPONENTE PRODUCTINFO
// ============================================

const ProductInfo = forwardRef<HTMLDivElement, ProductInfoProps>(
    (
        {
            data,
            layout = "default",
            align = "left",
            pricePosition = "bottom",
            brandSize = "xs",
            brandVariant = "default",
            nameSize = "md",
            nameVariant = "default",
            descriptionLines = 2,
            priceSize = "lg",
            showDiscountBadge = false,
            onNameClick,
            onBrandClick,
            extras,
            className,
            ...props
        },
        ref
    ) => {
        const { brand, name, description, price, oldPrice, badge, badgeVariant } = data;

        // Calcular descuento
        const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

        // Renderizar marca
        const renderBrand = () => {
            if (!brand) return null;

            return (
                <button
                    onClick={onBrandClick}
                    disabled={!onBrandClick}
                    className={cn(
                        brandVariants({ size: brandSize, variant: brandVariant }),
                        onBrandClick && "hover:opacity-80 transition-opacity cursor-pointer"
                    )}
                >
                    {brand}
                </button>
            );
        };

        // Renderizar nombre
        const renderName = () => {
            const nameContent = (
                <Heading
                    level={nameSize === "sm" ? "h5" : nameSize === "md" ? "h4" : "h3"}
                    className={cn(
                        nameVariants({
                            size: nameSize,
                            variant: nameVariant,
                            lineClamp: true
                        }),
                        onNameClick && "hover:text-primary transition-colors cursor-pointer"
                    )}
                >
                    {name}
                </Heading>
            );

            if (onNameClick) {
                return (
                    <button
                        onClick={onNameClick}
                        className="text-left w-full"
                    >
                        {nameContent}
                    </button>
                );
            }

            return nameContent;
        };

        // Renderizar descripción
        const renderDescription = () => {
            if (!description || descriptionLines === "none") return null;

            return (
                <Text
                    size="sm"
                    className={cn(
                        descriptionVariants({
                            size: "sm",
                            lineClamp: descriptionLines
                        })
                    )}
                >
                    {description}
                </Text>
            );
        };

        // Renderizar precio
        const renderPrice = () => {
            return (
                <div className="flex items-center gap-2 flex-wrap">
                    <Price
                        value={price}
                        oldValue={oldPrice}
                        size={priceSize}
                        variant={oldPrice ? "sale" : "default"}
                        showDiscountBadge={showDiscountBadge}
                    />

                    {/* Badge adicional del producto */}
                    {badge && (
                        <Badge variant={badgeVariant || "primary"} size="sm">
                            {badge}
                        </Badge>
                    )}
                </div>
            );
        };

        // Ordenar elementos según pricePosition
        const renderContent = () => {
            const elements = {
                brand: renderBrand(),
                name: renderName(),
                description: renderDescription(),
                price: renderPrice(),
                extras: extras,
            };

            switch (pricePosition) {
                case "top":
                    return (
                        <>
                            {elements.price}
                            {elements.brand}
                            {elements.name}
                            {elements.description}
                            {elements.extras}
                        </>
                    );
                case "inline":
                    return (
                        <>
                            <div className="flex items-baseline gap-4 flex-wrap">
                                {elements.name}
                                {elements.price}
                            </div>
                            {elements.brand}
                            {elements.description}
                            {elements.extras}
                        </>
                    );
                case "bottom":
                default:
                    return (
                        <>
                            {elements.brand}
                            {elements.name}
                            {elements.description}
                            {elements.price}
                            {elements.extras}
                        </>
                    );
            }
        };

        return (
            <div
                ref={ref}
                className={cn(
                    productInfoVariants({
                        layout,
                        align,
                        pricePosition,
                        showBrand: !!brand,
                        showName: true,
                        showPrice: true,
                        showDescription: !!description && descriptionLines !== "none"
                    }),
                    className
                )}
                {...props}
            >
                {renderContent()}
            </div>
        );
    }
);

ProductInfo.displayName = "ProductInfo";

export { ProductInfo };