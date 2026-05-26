"use client";

import React, { useState, useMemo, useEffect } from "react";
import { m, AnimatePresence, LazyMotion } from "framer-motion";
import domAnimation from "@/lib/framer-features";
import Image from "next/image";
import { Heading } from "@/components/atoms/Typography";
import { Text } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Container";
import { Badge } from "@/components/atoms/Badge";
import { NewsCard } from "@/components/molecules/NewsCard";
import { AlliesLogoRotator } from "@/components/molecules/AlliesLogoRotator";
import { PaginationDots } from "@/components/molecules/PaginationDots";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/data";
import { Section } from "@/components/atoms/Section";
import {
    newsSectionVariants,
    newsSectionHeaderVariants,
    newsSectionTitleVariants,
    newsSectionSubtitleVariants,
    newsSectionGridVariants,
    newsSectionSlotVariants,
    newsSectionPaginationVariants,
    newsSectionMobileScrollVariants,
    newsSectionMobileItemVariants,
    newsSectionMobileCardVariants,
    newsSectionMobileMediaVariants,
    newsSectionMobileContentVariants,
    newsSectionMobileImageVariants,
    newsSectionMobileBadgeVariants,
    newsSectionMobileTitleVariants,
    newsSectionMobileExcerptVariants,
    NEWS_SPRING,
    NEWS_DIRECTIONS,
    NEWS_SLOTS,
    NEWS_ITEMS_PER_PAGE,
    type NewsSlotConfig,
} from "./NewsSection.variants";

export interface NewsSectionProps {
    items: NewsItem[];
    title?: string;
    subtitle?: string;
    className?: string;
    onReadArticle?: (href: string) => void;
}

export function NewsSection({
    items,
    title = "Novedades",
    subtitle = "conoce como impactamos a la región",
    className,
    onReadArticle,
}: NewsSectionProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [localIndex, setLocalIndex] = useState(0);
    const itemsPerPage = NEWS_ITEMS_PER_PAGE;

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const paginatedItems = useMemo(() => {
        const start = currentPage * itemsPerPage;
        const pageItems = items.slice(start, start + itemsPerPage);

        // GHOST FILL: Completar hasta múltiplo de 3 con nulls
        const remainder = pageItems.length % itemsPerPage;
        if (remainder !== 0 && pageItems.length > 0) {
            const ghostsNeeded = itemsPerPage - remainder;
            return [...pageItems, ...Array(ghostsNeeded).fill(null)];
        }
        return pageItems;
    }, [items, currentPage, itemsPerPage]);

    useEffect(() => {
        setLocalIndex(0);
    }, [currentPage]);

    const getItem = (offset: number) => {
        if (paginatedItems.length === 0) return null;
        return paginatedItems[(localIndex + offset) % paginatedItems.length];
    };

    const handleReadArticle = (href?: string) => {
        const url = href || "#";
        if (onReadArticle) {
            onReadArticle(url);
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    const handleSlotClick = (slot: NewsSlotConfig) => {
        if (slot.offset === 0) {
            const item = getItem(0);
            if (item) handleReadArticle(item.href);
        } else {
            setLocalIndex((prev) => (prev + slot.offset) % paginatedItems.length);
        }
    };

    const handleDotOffsetChange = (offset: number) => {
        if (offset === 0) return;
        const newPage = currentPage + (offset > 0 ? 1 : -1);
        setCurrentPage(Math.max(0, Math.min(newPage, totalPages - 1)));
    };

    const previewLabels = React.useMemo(() => {
        const labels: Record<number, string> = {};
        for (let i = -1; i <= 1; i++) {
            const page = currentPage + i;
            if (page >= 0 && page < totalPages) {
                labels[i] = `Página ${page + 1} de ${totalPages}`;
            }
        }
        return labels;
    }, [currentPage, totalPages]);

    return (
        <Section id="journal" spacing="md" background="transparent" className={className}>
            <Container size="lg" padding="md">
                <LazyMotion features={domAnimation} strict>
                    {/* Header */}
                    <div className={newsSectionHeaderVariants()}>
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        >
                            <Heading level="h2" className={newsSectionTitleVariants()}>
                                {title}
                            </Heading>
                        </m.div>
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                        >
                            <Text variant="lead" size="lg" className={newsSectionSubtitleVariants()}>
                                {subtitle}
                            </Text>
                        </m.div>
                    </div>

                    {/* Desktop: Grid 6×6 con NewsCard */}
                    <AnimatePresence mode="wait">
                        <m.div
                            key={currentPage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                            className={newsSectionGridVariants()}
                        >
                            {NEWS_SLOTS.map((slot) => {
                                const slotClass = cn(
                                    slot.gridClass,
                                    newsSectionSlotVariants({ position: slot.variant as any })
                                );

                                if (slot.kind === "allies") {
                                    return (
                                        <div key={slot.id} className={slotClass}>
                                            <AlliesLogoRotator className="w-full h-full" />
                                        </div>
                                    );
                                }

                                const item = getItem(slot.offset);
                                const isGhost = item === null;

                                return (
                                    <div key={`${slot.id}-${isGhost ? 'ghost' : item?.id}`} className={slotClass}>
                                        <AnimatePresence mode="wait" initial={false}>
                                            <m.div
                                                key={isGhost ? `ghost-${slot.id}` : item.id}
                                                initial={NEWS_DIRECTIONS.up.enter}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={NEWS_DIRECTIONS.up.exit}
                                                transition={{ ...NEWS_SPRING, delay: slot.delay }}
                                                className="w-full h-full"
                                            >
                                                {isGhost ? (
                                                    <NewsCard variant={slot.variant === "featured" ? "ghost" : "ghost"} />
                                                ) : (
                                                    <NewsCard
                                                        data={{
                                                            id: item.id,
                                                            title: item.title,
                                                            excerpt: item.excerpt,
                                                            image: item.image,
                                                            category: item.category,
                                                            date: item.date,
                                                            readTime: item.readTime,
                                                            href: item.href,
                                                        }}
                                                        variant={slot.variant === "featured" ? "featured" : "preview"}
                                                        onClick={() => handleSlotClick(slot)}
                                                    />
                                                )}
                                            </m.div>
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </m.div>
                    </AnimatePresence>
                </LazyMotion>

                {/* PaginationDots (desktop) */}
                {totalPages > 1 && (
                    <div className={newsSectionPaginationVariants()}>
                        <PaginationDots
                            size="compact"
                            currentOffset={0}
                            onOffsetChange={handleDotOffsetChange}
                            total={totalPages}
                            currentIndex={currentPage}
                            previewLabels={previewLabels}
                        />
                    </div>
                )}

                {/* Mobile */}
                <div className="md:hidden space-y-4">
                    {(() => {
                        const mFeatured = getItem(0);
                        const mPreviews = [getItem(1), getItem(2)].filter(Boolean) as NewsItem[];

                        return (
                            <>
                                {mFeatured && (
                                    <div
                                        className={newsSectionMobileCardVariants()}
                                        onClick={() => handleSlotClick(NEWS_SLOTS[0])}
                                    >
                                        <div className={newsSectionMobileMediaVariants()}>
                                            <Image
                                                src={mFeatured.image}
                                                alt={mFeatured.title}
                                                fill
                                                sizes="100vw"
                                                className={newsSectionMobileImageVariants()}
                                            />
                                            <div className={newsSectionMobileBadgeVariants()}>
                                                <Badge variant="primary" size="sm">
                                                    {mFeatured.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className={newsSectionMobileContentVariants()}>
                                            <h3 className={newsSectionMobileTitleVariants()}>
                                                {mFeatured.title}
                                            </h3>
                                            <p className={newsSectionMobileExcerptVariants()}>
                                                {mFeatured.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className={newsSectionMobileScrollVariants()}>
                                    {mPreviews.map((item, idx) => (
                                        <div key={item.id} className={newsSectionMobileItemVariants()}>
                                            <div
                                                className={newsSectionMobileCardVariants()}
                                                onClick={() => handleSlotClick(NEWS_SLOTS[idx + 1])}
                                            >
                                                <div className="relative aspect-square overflow-hidden">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        sizes="80vw"
                                                        className={newsSectionMobileImageVariants()}
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <Badge variant="default" size="sm" className="mb-2">
                                                        {item.category}
                                                    </Badge>
                                                    <h4 className="font-headline text-sm font-bold text-secondary mb-1">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className={newsSectionMobileItemVariants()}>
                                        <div className="aspect-square w-full overflow-hidden rounded-2xl">
                                            <AlliesLogoRotator className="w-full h-full min-h-[280px]" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>
            </Container>
        </Section>
    );
}