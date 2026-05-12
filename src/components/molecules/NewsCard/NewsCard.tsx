// ============================================================================
// NEWS CARD — Molécula de tarjeta de noticia
// ============================================================================
// - Zero Inline Policy
// - Consumo de átomos: Badge, Text (implícito via variantes)
// ============================================================================

"use client";

import React, { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    newsCardVariants,
    newsCardMediaVariants,
    newsCardImageVariants,
    newsCardBadgePositionVariants,
    newsCardContentVariants,
    newsCardMetaVariants,
    newsCardMetaDotVariants,
    newsCardTitleVariants,
    newsCardExcerptVariants,
    newsCardLinkVariants,
    newsCardLinkIconVariants,
    newsCardCategoryBadgeVariants,
    type NewsCardVariant,
} from "./NewsCard.variants";

export interface NewsCardData {
    id: string | number;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date?: string;
    readTime?: string;
    href?: string;
}

export interface NewsCardProps {
    data: NewsCardData;
    variant?: NewsCardVariant;
    className?: string;
    onClick?: () => void;
}

export const NewsCard = forwardRef<HTMLDivElement, NewsCardProps>(
    ({ data, variant = "featured", className, onClick }, ref) => {
        const isFeatured = variant === "featured";

        return (
            <article
                ref={ref}
                className={cn(newsCardVariants({ variant }), className)}
                onClick={onClick}
            >
                {/* MEDIA */}
                <div className={newsCardMediaVariants({ variant })}>
                    <img
                        src={data.image}
                        alt={data.title}
                        className={newsCardImageVariants()}
                    />
                    {isFeatured && (
                        <div className={newsCardBadgePositionVariants()}>
                            <Badge variant="primary" size="md">
                                {data.category}
                            </Badge>
                        </div>
                    )}
                </div>

                {/* CONTENT */}
                <div className={newsCardContentVariants({ variant })}>
                    <div>
                        {/* Meta: fecha + tiempo (solo featured) */}
                        {isFeatured && data.date && (
                            <div className={newsCardMetaVariants()}>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {data.date}
                                </span>
                                <span className={newsCardMetaDotVariants()} />
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {data.readTime}
                                </span>
                            </div>
                        )}

                        {/* Categoría badge (solo preview) */}
                        {!isFeatured && (
                            <div className={newsCardCategoryBadgeVariants()}>
                                <Badge variant="default" size="sm">
                                    {data.category}
                                </Badge>
                            </div>
                        )}

                        <h3 className={newsCardTitleVariants({ variant })}>
                            {data.title}
                        </h3>

                        <p className={newsCardExcerptVariants({ variant })}>
                            {data.excerpt}
                        </p>
                    </div>

                    <span className={newsCardLinkVariants({ variant })}>
                        {isFeatured ? "Leer artículo" : "Leer más"}
                        {isFeatured && (
                            <ArrowUpRight className={newsCardLinkIconVariants()} />
                        )}
                    </span>
                </div>
            </article>
        );
    }
);

NewsCard.displayName = "NewsCard";