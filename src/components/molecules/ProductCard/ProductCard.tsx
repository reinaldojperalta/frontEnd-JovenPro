"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import { Heading } from "@/components/atoms/Typography";
import { Text } from "@/components/atoms/Typography";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import {
    productCardVariants,
    productCardMediaVariants,
    productCardOverlayVariants,
    productCardContentVariants,
    productCardTitleVariants,
    productCardDescriptionVariants,
    productCardPriceVariants,
    productCardOldPriceVariants,
    productCardLinkVariants,
    productCardStatusBadgeVariants,
    productCardAvatarVariants,
    productCardCornerIconVariants,
    productCardImageVariants,
    productCardHistoryImageVariants,
    productCardPriceRowVariants,
    productCardPriceContainerVariants,
    productCardAvatarInfoVariants,
    productCardAvatarVerifiedVariants,
    productCardLinkIconVariants,
    productCardCornerIconInnerVariants,
    type ProductCardVariant,
} from "./ProductCard.variants";

export interface ProductCardProps {
    product: Product;
    variant?: ProductCardVariant;
    className?: string;
    animate?: boolean;
    /** Handler de click en el producto. Recibe la URL completa.
     *  Si no se provee, el link se renderiza como <a> nativo. */
    onProductClick?: (href: string) => void;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
    ({ product, variant = "card-preview", className, animate = true, onProductClick }, ref) => {
        const isHistory = variant === "history-slot";
        const hasDiscount = product.oldPrice && product.oldPrice > product.price;
        const discountPercent = hasDiscount
            ? Math.round(
                ((product.oldPrice! - product.price) / product.oldPrice!) * 100
            )
            : 0;

        const statusBadgeConfig = {
            new: { variant: "new" as const, label: "Nuevo" },
            sale: { variant: "sale" as const, label: `-${discountPercent}%` },
            featured: { variant: "featured" as const, label: "Destacado" },
            none: null,
        };

        const statusConfig = product.status
            ? statusBadgeConfig[product.status]
            : null;

        // Link interno del producto
        const productHref = `https://jovenpro.com/producto/${product.slug}/`;

        const CardWrapper = animate ? motion.div : "div";
        const ImageWrapper = animate ? motion.img : "img";

        const cardProps = animate
            ? {
                layoutId: `card-${product.id}`,
                transition: { type: "spring", stiffness: 300, damping: 30 },
            }
            : {};

        const imageProps = animate
            ? {
                layoutId: `img-${product.id}`,
                transition: { type: "spring", stiffness: 300, damping: 30 },
            }
            : {};

        return (
            <CardWrapper
                ref={ref as any}
                className={cn(productCardVariants({ variant }), className)}
                {...cardProps}
            >
                {/* MEDIA */}
                <div className={cn(productCardMediaVariants({ variant }))}>
                    <ImageWrapper
                        src={product.image}
                        alt={product.name}
                        className={cn(
                            isHistory
                                ? productCardHistoryImageVariants()
                                : productCardImageVariants()
                        )}
                        {...imageProps}
                    />
                    <div className={cn(productCardOverlayVariants({ variant }))} />
                </div>

                {/* STATUS BADGE */}
                {statusConfig && (
                    <div className={cn(productCardStatusBadgeVariants({ variant }))}>
                        <Badge
                            variant={statusConfig.variant}
                            size="lg"
                            uppercase={false}
                        >
                            {statusConfig.label}
                        </Badge>
                    </div>
                )}

                {/* AVATAR ARTESANO */}
                <div className={cn(productCardAvatarVariants({ variant }))}>
                    <Avatar
                        src={product.artisan.avatar}
                        alt={product.artisan.name}
                        fallback={product.artisan.initials}
                        size="sm"
                    />
                    <span className={cn(productCardAvatarInfoVariants())}>
                        {product.artisan.name}
                    </span>
                    {product.artisan.verified && (
                        <span className={cn(productCardAvatarVerifiedVariants())}>✓</span>
                    )}
                </div>

                {/* ICONO ESQUINA */}
                <div className={cn(productCardCornerIconVariants({ variant }))}>
                    <ArrowUpRight
                        className={cn(productCardCornerIconInnerVariants())}
                    />
                </div>

                {/* CONTENIDO */}
                <div className={cn(productCardContentVariants({ variant }))}>
                    <Heading
                        level={variant === "card-full" ? "h3" : "h4"}
                        className={cn(productCardTitleVariants({ variant }))}
                    >
                        {product.name}
                    </Heading>

                    <Text
                        size="md"
                        className={cn(productCardDescriptionVariants({ variant }))}
                    >
                        {product.description}
                    </Text>

                    <div className={cn(productCardPriceRowVariants())}>
                        <div className={cn(productCardPriceContainerVariants())}>
                            <span className={cn(productCardPriceVariants({ variant }))}>
                                ${product.price.toLocaleString()}
                            </span>
                            {hasDiscount && (
                                <span
                                    className={cn(
                                        productCardOldPriceVariants({ variant })
                                    )}
                                >
                                    ${product.oldPrice!.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* LINK: si hay onProductClick, previene default y lo llama.
                        Si no, <a> nativo con target="_blank" */}
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
                        className={cn(productCardLinkVariants({ variant }))}
                    >
                        Ver detalle{" "}
                        <ArrowRight className={cn(productCardLinkIconVariants())} />
                    </a>
                </div>
            </CardWrapper>
        );
    }
);

ProductCard.displayName = "ProductCard";