"use client";

import React, { forwardRef } from "react";
import { m } from "framer-motion";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import { Heading, Text } from "@/components/atoms/Typography";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import {
    productCardVariants,
    productCardHeaderVariants,
    productCardFullMediaVariants,
    productCardFullContentVariants,
    productCardMinMediaVariants,
    productCardMinContentVariants,
    productCardMinFooterVariants,
    productCardThumbnailGlassVariants,
    productCardThumbnailTitleVariants,
    productCardThumbnailPriceVariants,
    productCardImageVariants,
    productCardEmprendedorBadgeVariants,
    productCardEmprendedorNameVariants,
    productCardDiscountBadgeVariants,
    productCardFullTitleVariants,
    productCardFullDescriptionVariants,
    productCardFullFooterRowVariants,
    productCardFullLinkVariants,
    productCardFullPriceRowVariants,
    productCardFullPriceVariants,
    productCardFullOldPriceVariants,
    productCardMinHeaderInfoVariants,
    productCardMinTitleVariants,
    productCardMinEmprendedorNameVariants,
    productCardMinDescriptionVariants,
    productCardMinPriceVariants,
    type ProductCardVariant,
} from "./ProductCard.variants";

export interface ProductCardProps {
    product: Product;
    variant?: ProductCardVariant;
    className?: string;
    animate?: boolean;
    onProductClick?: (href: string) => void;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
    ({ product, variant = "card-preview", className, animate = true, onProductClick }, ref) => {
        const isHistory = variant === "history-slot";

        const hasDiscount = product.oldPrice && product.oldPrice > product.price;
        const discountPercent = hasDiscount
            ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
            : 0;

        const productHref = `https://jovenpro.com/producto/${product.slug}/`;

        const CardWrapper = animate ? m.div : "div";
        const cardProps = animate ? { layoutId: `card-${product.id}` } : {};

        // FAMILIA A: card-full
        if (variant === "card-full") {
            return (
                <CardWrapper
                    ref={ref as any}
                    className={cn(productCardVariants({ variant }), className)}
                    {...cardProps}
                >
                    {/* Flotantes absolutos sobre imagen */}
                    <div className={productCardEmprendedorBadgeVariants()}>
                        <Avatar
                            size="sm"
                            src={product.emprendedor.avatar}
                            fallback={product.emprendedor.initials}
                        />
                        <span className={productCardEmprendedorNameVariants()}>
                            {product.emprendedor.name}
                        </span>
                        {product.emprendedor.verified && (
                            <span className="text-primary text-xs">✓</span>
                        )}
                    </div>

                    {hasDiscount && (
                        <div className={productCardDiscountBadgeVariants()}>
                            <Badge
                                variant="sale"
                                size="md"
                                uppercase={false}
                                className="px-4 py-2 text-xs rounded-clay"
                            >
                                -{discountPercent}%
                            </Badge>
                        </div>
                    )}

                    {/* Layout Vertical */}
                    <div className={productCardFullMediaVariants()}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className={productCardImageVariants()}
                        />
                    </div>

                    <div className={productCardFullContentVariants()}>
                        <Heading level="h4" className={productCardFullTitleVariants()}>
                            {product.name}
                        </Heading>
                        <Text size="sm" variant="muted" className={cn("hidden md:block", productCardFullDescriptionVariants())}>
                            {product.description}
                        </Text>
                        
                        <div className={productCardFullFooterRowVariants()}>
                            <a
                                href={productHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    if (onProductClick) {
                                        e.preventDefault();
                                        onProductClick(productHref);
                                    }
                                }}
                                className={productCardFullLinkVariants()}
                            >
                                Ver detalle <ArrowRight className="w-3 h-3" />
                            </a>
                            
                            <div className={productCardFullPriceRowVariants()}>
                                <span className={productCardFullPriceVariants()}>
                                    ${product.price.toLocaleString()}
                                </span>
                                {hasDiscount && (
                                    <span className={productCardFullOldPriceVariants()}>
                                        ${product.oldPrice!.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardWrapper>
            );
        }

        // FAMILIA A: card-min
        if (variant === "card-min") {
            return (
                <CardWrapper
                    ref={ref as any}
                    className={cn(productCardVariants({ variant }), className)}
                    {...cardProps}
                >
                    {/* Header horizontal MD */}
                    <div className={productCardHeaderVariants()}>
                        <Avatar
                            size="sm"
                            src={product.emprendedor.avatar}
                            fallback={product.emprendedor.initials}
                        />
                        <div className={productCardMinHeaderInfoVariants()}>
                            <Heading level="h4" className={productCardMinTitleVariants()}>
                                {product.name}
                            </Heading>
                            <Text size="xs" variant="muted" className={productCardMinEmprendedorNameVariants()}>
                                {product.emprendedor.name}
                            </Text>
                        </div>
                    </div>

                    <div className={productCardMinMediaVariants()}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className={productCardImageVariants()}
                        />
                    </div>

                    <div className={productCardMinContentVariants()}>
                        <Text size="xs" variant="muted" className={productCardMinDescriptionVariants()}>
                            {product.description}
                        </Text>
                    </div>

                    <div className={productCardMinFooterVariants()}>
                        <div className={productCardMinPriceVariants()}>
                            ${product.price.toLocaleString()}
                        </div>
                    </div>
                </CardWrapper>
            );
        }

        // FAMILIA B: Thumbnail Card (preview-max, preview, history)
        return (
            <CardWrapper
                ref={ref as any}
                className={cn(productCardVariants({ variant }), className)}
                {...cardProps}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className={cn(productCardImageVariants(), "absolute inset-0")}
                />
                <div className={productCardThumbnailGlassVariants()}>
                    <p className={productCardThumbnailTitleVariants()}>
                        {product.name}
                    </p>
                    {!isHistory && (
                        <p className={productCardThumbnailPriceVariants()}>
                            ${product.price.toLocaleString()}
                        </p>
                    )}
                </div>
            </CardWrapper>
        );
    }
);

ProductCard.displayName = "ProductCard";


ProductCard.displayName = "ProductCard";