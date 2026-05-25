// ============================================================================
// NEWS CARD — Molécula de tarjeta de noticia
// ============================================================================
// - Zero Inline Policy
// - Server Component (sin "use client")
// - Variantes: featured | preview | ghost
// ============================================================================

import React, { forwardRef } from "react";
import Image from "next/image";
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
    newsCardMetaItemVariants,
    newsCardMetaDotVariants,
    newsCardTitleVariants,
    newsCardExcerptVariants,
    newsCardLinkVariants,
    newsCardLinkIconVariants,
    newsCardCategoryBadgeVariants,
    newsCardGhostMediaVariants,
    newsCardGhostContentVariants,
    newsCardGhostLineVariants,
    newsCardGhostLineShortVariants,
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
    data?: NewsCardData;
    variant?: NewsCardVariant;
    className?: string;
    onClick?: () => void;
}

export const NewsCard = forwardRef<HTMLDivElement, NewsCardProps>(
    ({ data, variant = "featured", className, onClick }, ref) => {
        const isFeatured = variant === "featured";
        const isGhost = variant === "ghost";

        // GHOST CARD — Renderiza esqueleto visual sin datos
        if (isGhost) {
            return (
                <article
                    ref={ref}
                    className={cn(newsCardVariants({ variant }), className)}
                >
                    <div className={newsCardGhostMediaVariants({ variant: isFeatured ? "featured" : "preview" })}>
                        <div className="w-full h-full skeleton-pulse skeleton-block" />
                    </div>
                    <div className={newsCardGhostContentVariants({ variant: isFeatured ? "featured" : "preview" })}>
                        <div className="space-y-3">
                            <div className={newsCardGhostLineVariants()} />
                            <div className={newsCardGhostLineShortVariants()} />
                            <div className={newsCardGhostLineVariants()} />
                        </div>
                    </div>
                </article>
            );
        }

        // Normal cards (featured | preview)
        if (!data) return null;

        return (
            <article
                ref={ref}
                className={cn(newsCardVariants({ variant }), className)}
                onClick={onClick}
            >
                {/* MEDIA */}
                <div className={newsCardMediaVariants({ variant })}>
                    <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        sizes={isFeatured ? "(max-width: 768px) 100vw, 600px" : "200px"}
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
                                <span className={newsCardMetaItemVariants()}>
                                    <Calendar className="w-4 h-4" />
                                    {data.date}
                                </span>
                                <span className={newsCardMetaDotVariants()} />
                                <span className={newsCardMetaItemVariants()}>
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