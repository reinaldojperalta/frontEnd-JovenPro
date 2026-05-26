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
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [slideDirection, setSlideDirection] = useState<"left" | "right" | "none">("none");
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
        const len = paginatedItems.length;
        return paginatedItems[(((localIndex + offset) % len) + len) % len];
    };

    const handleReadArticle = (href?: string) => {
        const url = href || "#";
        if (onReadArticle) {
            onReadArticle(url);
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    const handleSlotClick = (slot: { offset: number }) => {
        if (slot.offset === 0) {
            const item = getItem(0);
            if (item) handleReadArticle(item.href);
        } else {
            setSlideDirection(slot.offset > 0 ? "left" : "right");
            const len = paginatedItems.length;
            setLocalIndex((prev) => (((prev + slot.offset) % len) + len) % len);
        }
    };

    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe && currentPage < totalPages - 1) {
            // Swipe left → next page (next 3 news items)
            setSlideDirection("left");
            setCurrentPage((prev) => prev + 1);
        } else if (isRightSwipe && currentPage > 0) {
            // Swipe right → previous page
            setSlideDirection("right");
            setCurrentPage((prev) => prev - 1);
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
                                        <div key={slot.id} className={cn(slotClass, "relative")}>
                                            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                                                <Badge variant="primary" size="sm">
                                                    Nuestras Alianzas
                                                </Badge>
                                            </div>
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
                <div 
                    className="md:hidden flex flex-col gap-4"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <style dangerouslySetInnerHTML={{__html: `
                        @keyframes slideInFromRight {
                            from { opacity: 0; transform: translateX(30px); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                        @keyframes slideInFromLeft {
                            from { opacity: 0; transform: translateX(-30px); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                        .animate-slide-left {
                            animation: slideInFromRight 0.4s ease-out forwards;
                        }
                        .animate-slide-right {
                            animation: slideInFromLeft 0.4s ease-out forwards;
                        }
                    `}} />
                    
                    <div 
                        key={`page-${currentPage}-idx-${localIndex}`} 
                        className={cn(
                            "flex flex-col gap-4 w-full",
                            slideDirection === "left" ? "animate-slide-left" : slideDirection === "right" ? "animate-slide-right" : ""
                        )}
                    >
                        {(() => {
                            const mFeatured = getItem(0);
                            const mPrev = getItem(-1);
                            const mNext = getItem(1);

                            return (
                                <>
                                    {mFeatured && (
                                    <div
                                        className={newsSectionMobileCardVariants()}
                                        onClick={() => handleSlotClick({ offset: 0 })}
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

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { item: mPrev, offset: -1, label: "Anterior" },
                                        { item: mNext, offset: 1, label: "Siguiente" },
                                    ].map(({ item, offset, label }) => {
                                        if (!item) return null;
                                        return (
                                            <div
                                                key={`${label}-${item.id}`}
                                                className={cn(newsSectionMobileCardVariants(), "relative group overflow-hidden")}
                                                onClick={() => handleSlotClick({ offset })}
                                            >
                                                <div className="relative aspect-[4/5] w-full">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        sizes="50vw"
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                    <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                                                        <Badge variant="secondary" size="sm" className="mb-2 self-start bg-white/20 backdrop-blur-md text-white border-none">
                                                            {item.category}
                                                        </Badge>
                                                        <h4 className="font-headline text-sm font-bold text-white line-clamp-2">
                                                            {item.title}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Nuestras Alianzas - Debajo de las noticias en móvil */}
                                <div className="w-full relative overflow-hidden rounded-2xl h-48 bg-white border border-border/30 mt-2">
                                    <div className="absolute top-3 left-3 z-10">
                                        <Badge variant="primary" size="sm">
                                            Nuestras Alianzas
                                        </Badge>
                                    </div>
                                    <AlliesLogoRotator className="w-full h-full" />
                                </div>

                                {/* Mobile Pagination Dots */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center pt-2">
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
                            </>
                        );
                    })()}
                    </div>
                </div>
            </Container>
        </Section>
    );
}