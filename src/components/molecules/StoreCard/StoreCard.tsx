"use client";

import React, { forwardRef, useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { Avatar } from "@/components/atoms/Avatar";
import { Heading, Text } from "@/components/atoms/Typography";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Store } from "@/lib/data";
import {
    storeCardVariants,
    storeCardHeaderVariants,
    storeCardFullMediaVariants,
    storeCardFullContentVariants,
    storeCardMinMediaVariants,
    storeCardMinContentVariants,
    storeCardMinFooterVariants,
    storeCardThumbnailGlassVariants,
    storeCardThumbnailTitleVariants,
    storeCardThumbnailLocationVariants,
    storeCardImageVariants,
    storeCardEmprendedorBadgeVariants,
    storeCardEmprendedorNameVariants,
    storeCardVerifiedBadgeVariants,
    storeCardFullTitleVariants,
    storeCardFullDescriptionVariants,
    storeCardFullFooterRowVariants,
    storeCardFullLinkVariants,
    storeCardFullLocationRowVariants,
    storeCardFullLocationVariants,
    storeCardMinHeaderInfoVariants,
    storeCardMinTitleVariants,
    storeCardMinEmprendedorNameVariants,
    storeCardMinDescriptionVariants,
    storeCardMinLocationRowVariants,
    storeCardMinLocationVariants,
    type StoreCardVariant,
} from "./StoreCard.variants";

export interface StoreCardProps {
    store: Store;
    variant?: StoreCardVariant;
    className?: string;
    animate?: boolean;
    onStoreClick?: (href: string) => void;
}

const FALLBACK_IMAGE = "/images/placeholders/No-Image-Placeholder.webp";

function StoreImage({ src, alt, className, fill }: { src: string; alt: string; className?: string; fill?: boolean }) {
    const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

    if (fill) {
        return (
            <Image
                src={imgSrc}
                alt={alt}
                fill
                sizes="(max-width: 768px) 33vw, 150px"
                className={className}
                onError={() => setImgSrc(FALLBACK_IMAGE)}
            />
        );
    }

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={className}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
    );
}

export const StoreCard = forwardRef<HTMLDivElement, StoreCardProps>(
    ({ store, variant = "card-preview", className, animate = true, onStoreClick }, ref) => {
        const isHistory = variant === "history-slot";

        const storeHref = `https://jovenpro.com/store/${store.slug}/`;

        const CardWrapper = animate ? m.div : "div";
        const cardProps = animate ? { layoutId: `card-${store.id}` } : {};

        // FAMILIA A: card-full
        if (variant === "card-full") {
            return (
                <CardWrapper
                    ref={ref as any}
                    className={cn(storeCardVariants({ variant }), className)}
                    {...cardProps}
                >
                    {/* Flotantes absolutos sobre imagen */}
                    <div className={storeCardEmprendedorBadgeVariants()}>
                        <Avatar
                            size="sm"
                            src={store.emprendedor.avatar}
                            fallback={store.emprendedor.initials}
                        />
                        <span className={storeCardEmprendedorNameVariants()}>
                            {store.emprendedor.name}
                        </span>
                        {store.emprendedor.verified && (
                            <span className={storeCardVerifiedBadgeVariants()}>✓</span>
                        )}
                    </div>

                    {/* Layout Vertical */}
                    <div className={storeCardFullMediaVariants()}>
                        <StoreImage
                            src={store.image}
                            alt={store.name}
                            className={storeCardImageVariants()}
                        />
                    </div>

                    <div className={storeCardFullContentVariants()}>
                        <Heading level="h4" className={storeCardFullTitleVariants()}>
                            {store.name}
                        </Heading>
                        <Text size="sm" variant="muted" className={storeCardFullDescriptionVariants()}>
                            {store.description}
                        </Text>

                        <div className={storeCardFullFooterRowVariants()}>
                            <a
                                href={storeHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    if (onStoreClick) {
                                        e.preventDefault();
                                        onStoreClick(storeHref);
                                    }
                                }}
                                className={storeCardFullLinkVariants()}
                            >
                                Ver tienda <ArrowRight className="w-3 h-3" />
                            </a>

                            <div className={storeCardFullLocationRowVariants()}>
                                <MapPin className="w-3 h-3" />
                                <span className={storeCardFullLocationVariants()}>
                                    {store.location}
                                </span>
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
                    className={cn(storeCardVariants({ variant }), className)}
                    {...cardProps}
                >
                    {/* Header horizontal MD */}
                    <div className={storeCardHeaderVariants()}>
                        <Avatar
                            size="sm"
                            src={store.emprendedor.avatar}
                            fallback={store.emprendedor.initials}
                        />
                        <div className={storeCardMinHeaderInfoVariants()}>
                            <Heading level="h4" className={storeCardMinTitleVariants()}>
                                {store.name}
                            </Heading>
                            <Text size="xs" variant="muted" className={storeCardMinEmprendedorNameVariants()}>
                                {store.emprendedor.name}
                            </Text>
                        </div>
                    </div>

                    <div className={storeCardMinMediaVariants()}>
                        <StoreImage
                            src={store.image}
                            alt={store.name}
                            className={storeCardImageVariants()}
                        />
                    </div>

                    <div className={storeCardMinContentVariants()}>
                        <Text size="xs" variant="muted" className={storeCardMinDescriptionVariants()}>
                            {store.description}
                        </Text>
                    </div>

                    <div className={storeCardMinFooterVariants()}>
                        <div className={storeCardMinLocationRowVariants()}>
                            <MapPin className="w-3 h-3" />
                            <span className={storeCardMinLocationVariants()}>
                                {store.location}
                            </span>
                        </div>
                    </div>
                </CardWrapper>
            );
        }

        // FAMILIA B: Thumbnail Card (preview-max, preview, history)
        return (
            <CardWrapper
                ref={ref as any}
                className={cn(storeCardVariants({ variant }), className)}
                {...cardProps}
            >
                <StoreImage
                    src={store.image}
                    alt={store.name}
                    className={storeCardImageVariants()}
                    fill
                />
                <div className={storeCardThumbnailGlassVariants()}>
                    <p className={storeCardThumbnailTitleVariants()}>
                        {store.name}
                    </p>
                    {!isHistory && (
                        <p className={storeCardThumbnailLocationVariants()}>
                            {store.location}
                        </p>
                    )}
                </div>
            </CardWrapper>
        );
    }
);

StoreCard.displayName = "StoreCard";