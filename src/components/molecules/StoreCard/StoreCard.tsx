"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
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
    storeCardFullTitleVariants,
    storeCardFullDescriptionVariants,
    storeCardFullFooterRowVariants,
    storeCardFullLinkVariants,
    storeCardFullLocationVariants,
    storeCardMinHeaderInfoVariants,
    storeCardMinTitleVariants,
    storeCardMinEmprendedorNameVariants,
    storeCardMinDescriptionVariants,
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

export const StoreCard = forwardRef<HTMLDivElement, StoreCardProps>(
    ({ store, variant = "card-preview", className, animate = true, onStoreClick }, ref) => {
        const isHistory = variant === "history-slot";

        const storeHref = `https://jovenpro.com/store/${store.slug}/`;

        const CardWrapper = animate ? motion.div : "div";
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
                            <span className="text-primary text-xs">✓</span>
                        )}
                    </div>

                    {/* Layout Vertical */}
                    <div className={storeCardFullMediaVariants()}>
                        <img
                            src={store.image}
                            alt={store.name}
                            className={storeCardImageVariants()}
                            onError={(e) => {
                                e.currentTarget.src = "/images/placeholders/No-Image-Placeholder.webg";
                            }}
                        />
                    </div>

                    <div className={storeCardFullContentVariants()}>
                        <Heading level="h4" className={storeCardFullTitleVariants()}>
                            {store.name}
                        </Heading>
                        <Text size="sm" variant="muted" className={cn("hidden md:block", storeCardFullDescriptionVariants())}>
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
                            
                            <div className="flex items-center gap-1 text-muted-foreground">
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
                        <img
                            src={store.image}
                            alt={store.name}
                            className={storeCardImageVariants()}
                            onError={(e) => {
                                e.currentTarget.src = "/images/placeholders/No-Image-Placeholder.webg";
                            }}
                        />
                    </div>

                    <div className={storeCardMinContentVariants()}>
                        <Text size="xs" variant="muted" className={storeCardMinDescriptionVariants()}>
                            {store.description}
                        </Text>
                    </div>

                    <div className={storeCardMinFooterVariants()}>
                        <div className="flex items-center gap-1 text-muted-foreground ml-auto">
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
                <img
                    src={store.image}
                    alt={store.name}
                    className={cn(storeCardImageVariants(), "absolute inset-0")}
                    onError={(e) => {
                        e.currentTarget.src = "/images/placeholders/No-Image-Placeholder.webg";
                    }}
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
