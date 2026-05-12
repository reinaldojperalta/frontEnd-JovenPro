"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "@/components/atoms/Typography";
import { Text } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Container";
import { Badge } from "@/components/atoms/Badge";
import { NewsCard } from "@/components/molecules/NewsCard";
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
    title = "Actualidades",
    subtitle = "Conoce las últimas novedades y eventos de JovenPro",
    className,
    onReadArticle,
}: NewsSectionProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const paginatedItems = useMemo(() => {
        const start = currentPage * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    }, [items, currentPage]);

    const featured = paginatedItems[0];
    const previews = paginatedItems.slice(1, 4);

    const handleReadArticle = (href?: string) => {
        const url = href || "#";
        if (onReadArticle) {
            onReadArticle(url);
        } else {
            window.open(url, "_blank");
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

    // Grid classes para cada posición (de globals.css)
    const previewGridClasses = [
        "news-slot-preview-1",
        "news-slot-preview-2",
        "news-slot-preview-3",
    ];

    return (
        <Section id="journal" spacing="md" background="transparent" className={className}>
            <Container size="lg" padding="md">
                {/* Header */}
                <div className={newsSectionHeaderVariants()}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <Heading level="h2" className={newsSectionTitleVariants()}>
                            {title}
                        </Heading>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <Text variant="lead" size="lg" className={newsSectionSubtitleVariants()}>
                            {subtitle}
                        </Text>
                    </motion.div>
                </div>

                {/* Desktop: Grid 6×6 con NewsCard */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className={newsSectionGridVariants()}
                    >
                        {/* Featured */}
                        {featured && (
                            <div
                                className={cn(
                                    "news-slot-featured",
                                    newsSectionSlotVariants({ position: "featured" })
                                )}
                            >
                                <NewsCard
                                    data={{
                                        id: featured.id,
                                        title: featured.title,
                                        excerpt: featured.excerpt,
                                        image: featured.image,
                                        category: featured.category,
                                        date: featured.date,
                                        readTime: featured.readTime,
                                        href: featured.href,
                                    }}
                                    variant="featured"
                                    onClick={() => handleReadArticle(featured.href)}
                                />
                            </div>
                        )}

                        {/* Previews */}
                        {previews.map((item, i) => (
                            <div
                                key={item.id}
                                className={cn(
                                    previewGridClasses[i],
                                    newsSectionSlotVariants({ position: `preview-${i + 1}` as any })
                                )}
                            >
                                <NewsCard
                                    data={{
                                        id: item.id,
                                        title: item.title,
                                        excerpt: item.excerpt,
                                        image: item.image,
                                        category: item.category,
                                        href: item.href,
                                    }}
                                    variant="preview"
                                    onClick={() => handleReadArticle(item.href)}
                                />
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

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
                    {featured && (
                        <div
                            className={newsSectionMobileCardVariants()}
                            onClick={() => handleReadArticle(featured.href)}
                        >
                            <div className={newsSectionMobileMediaVariants()}>
                                <img
                                    src={featured.image}
                                    alt={featured.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge variant="primary" size="sm">
                                        {featured.category}
                                    </Badge>
                                </div>
                            </div>
                            <div className={newsSectionMobileContentVariants()}>
                                <h3 className="font-headline text-lg font-bold text-secondary mb-2">
                                    {featured.title}
                                </h3>
                                <p className="font-body text-sm text-muted-foreground line-clamp-2">
                                    {featured.excerpt}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className={newsSectionMobileScrollVariants()}>
                        {previews.map((item) => (
                            <div key={item.id} className={newsSectionMobileItemVariants()}>
                                <div
                                    className={newsSectionMobileCardVariants()}
                                    onClick={() => handleReadArticle(item.href)}
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
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
                    </div>
                </div>
            </Container>
        </Section>
    );
}