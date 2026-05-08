// src/components/molecules/ProductCard/ProductCard.tsx

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
} from "./ProductCard.variants";

export interface ProductCardProps {
    product: Product;
    variant?: "card-full" | "card-min" | "card-preview-max" | "card-preview" | "history-slot";
    className?: string;
    /** Si es true, aplica layoutId de Framer Motion para morphing */
    animate?: boolean;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
    ({ product, variant = "card-preview", className, animate = true }, ref) => {
        const isHistory = variant === "history-slot";
        const isPreview = variant === "card-preview" || variant === "card-preview-max";
        const hasDiscount = product.oldPrice && product.oldPrice > product.price;
        const discountPercent = hasDiscount
            ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
            : 0;

        // Status badge mapping
        const statusBadgeConfig = {
            new: { variant: "new" as const, label: "Nuevo" },
            sale: { variant: "sale" as const, label: `-${discountPercent}%` },
            featured: { variant: "featured" as const, label: "Destacado" },
            none: null,
        };

        const statusConfig = product.status ? statusBadgeConfig[product.status] : null;

        // Wrapper condicional para Framer Motion
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
                onClick={() => console.log("Click")}
                {...cardProps}
            >
                {/* ============================================
                    MEDIA (IMAGEN) — Fondo absoluto para todas
                ============================================ */}
                <div className={cn(productCardMediaVariants({ variant }))}>
                    <ImageWrapper
                        src={product.image}
                        alt={product.name}
                        className={cn(
                            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                            isHistory && "grayscale group-hover:grayscale-0 transition-all duration-300"
                        )}
                        {...imageProps}
                    />

                    {/* Overlay gradiente */}
                    <div className={cn(productCardOverlayVariants({ variant }))} />
                </div>

                {/* ============================================
                    STATUS BADGE (Top-Left) — Solo full
                ============================================ */}
                {statusConfig && (
                    <div className={cn(productCardStatusBadgeVariants({ variant }))}>
                        <Badge variant={statusConfig.variant} size="lg" uppercase={false}>
                            {statusConfig.label}
                        </Badge>
                    </div>
                )}

                {/* ============================================
                    AVATAR DEL ARTESANO (Top-Right) — Solo full
                ============================================ */}
                <div className={cn(productCardAvatarVariants({ variant }))}>
                    <Avatar
                        src={product.artisan.avatar}
                        alt={product.artisan.name}
                        fallback={product.artisan.initials}
                        size="sm"
                    />
                    <span className="text-xs font-semibold text-foreground">
                        {product.artisan.name}
                    </span>
                    {product.artisan.verified && (
                        <span className="text-primary text-xs">✓</span>
                    )}
                </div>

                {/* ============================================
                    ICONO DE ESQUINA (Top-Right) — Solo previews
                ============================================ */}
                {isPreview && (
                    <div className={cn(productCardCornerIconVariants({ variant }))}>
                        <ArrowUpRight className="w-4 h-4" />
                    </div>
                )}

                {/* ============================================
                    CONTENIDO (FOOTER)
                ============================================ */}
                <div className={cn(productCardContentVariants({ variant }))}>

                    {/* Título — Siempre visible, blanco, sombra sutil */}
                    <Heading
                        level={variant === "card-full" ? "h3" : "h4"}
                        className={cn(productCardTitleVariants({ variant }))}

                    >
                        {product.name}
                    </Heading>

                    {/* Descripción — Solo full y min */}
                    <Text
                        size="md"
                        className={cn(productCardDescriptionVariants({ variant }))}
                    >
                        {product.description}
                    </Text>

                    {/* Precio + Flecha — Solo full y min */}
                    <div className={cn(
                        "flex items-center justify-between gap-2",
                        isPreview && "hidden"
                    )}>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            {/* Precio actual */}
                            <span className={cn(productCardPriceVariants({ variant }))}>
                                ${product.price.toLocaleString()}
                            </span>

                            {/* Precio tachado */}
                            {hasDiscount && (
                                <span className={cn(productCardOldPriceVariants({ variant }))}>
                                    ${product.oldPrice!.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Link "Ver detalle" — Solo full y min */}
                    <span className={cn(productCardLinkVariants({ variant }))}>
                        Ver detalle <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
            </CardWrapper>
        );
    }
);

ProductCard.displayName = "ProductCard";