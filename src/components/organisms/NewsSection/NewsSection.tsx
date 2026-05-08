"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "@/components/atoms/Typography";
import { Text } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Container";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import type { NewsItem } from "@/lib/data";

export interface NewsSectionProps {
    items: NewsItem[];
    title?: string;
    subtitle?: string;
    className?: string;
}

export function NewsSection({
    items,
    title = "Journal",
    subtitle = "Historias detrás de cada pieza",
    className,
}: NewsSectionProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const paginatedItems = useMemo(() => {
        const start = currentPage * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    }, [items, currentPage]);

    const featured = paginatedItems[0];
    const rest = paginatedItems.slice(1, 3);

    const handleReadArticle = (href?: string) => {
        const url = href || "#";
        window.open(url, "_blank");
    };

    return (
        <section id="journal" className={cn("py-24 md:py-32 bg-surface-container-low", className)}>
            <Container size="lg" padding="md">
                <div className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <Heading level="h2" className="mb-4">
                            {title}
                        </Heading>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <Text variant="lead" size="lg">
                            {subtitle}
                        </Text>
                    </motion.div>
                </div>

                <div className="hidden md:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        >
                            {featured && (
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-2 row-span-2 group cursor-pointer rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-col"
                                        onClick={() => handleReadArticle(featured.href)}>
                                        <div className="h-72 sm:h-96 overflow-hidden relative">
                                            <img src={featured.image} alt={featured.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute top-4 left-4">
                                                <Badge variant="primary" size="sm">{featured.category}</Badge>
                                            </div>
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 mb-3 text-sm text-foreground/60">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />{featured.date}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-border" />
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />{featured.readTime}
                                                    </span>
                                                </div>
                                                <h3 className="font-headline text-2xl font-bold text-jp-navy mb-3 group-hover:text-jp-sky transition-colors">
                                                    {featured.title}
                                                </h3>
                                                <p className="font-body text-jp-text-secondary text-sm leading-relaxed">
                                                    {featured.excerpt}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center gap-1 mt-6 text-jp-navy font-body text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                                                Leer artículo <ArrowUpRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        {rest.map((item) => (
                                            <div key={item.id}
                                                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-row flex-1"
                                                onClick={() => handleReadArticle(item.href)}>
                                                <div className="w-2/5 overflow-hidden">
                                                    <img src={item.image} alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                </div>
                                                <div className="w-3/5 p-6 flex flex-col justify-center">
                                                    <span className="inline-block px-2 py-0.5 bg-surface-container-low text-jp-navy text-[10px] font-bold uppercase tracking-wider rounded mb-2 w-max">
                                                        {item.category}
                                                    </span>
                                                    <h4 className="font-headline text-base font-bold text-jp-navy leading-tight mb-2 group-hover:text-jp-sky transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <p className="font-body text-xs text-jp-text-secondary leading-relaxed line-clamp-2">
                                                        {item.excerpt}
                                                    </p>
                                                    <span className="font-body text-xs font-semibold text-jp-sky mt-3 hover:underline">
                                                        Leer más
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-10">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300",
                                        i === currentPage ? "bg-primary w-6" : "bg-surface-variant w-2 hover:bg-border"
                                    )}
                                    aria-label={`Página ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="md:hidden space-y-4">
                    {featured && (
                        <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-col"
                            onClick={() => handleReadArticle(featured.href)}>
                            <div className="h-56 overflow-hidden relative">
                                <img src={featured.image} alt={featured.title}
                                    className="w-full h-full object-cover" />
                                <div className="absolute top-4 left-4">
                                    <Badge variant="primary" size="sm">{featured.category}</Badge>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-headline text-lg font-bold text-jp-navy mb-2">
                                    {featured.title}
                                </h3>
                                <p className="font-body text-sm text-jp-text-secondary line-clamp-2">
                                    {featured.excerpt}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none]">
                        {rest.map((item) => (
                            <div key={item.id} className="snap-center shrink-0 w-[80vw] max-w-xs">
                                <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-col"
                                    onClick={() => handleReadArticle(item.href)}>
                                    <div className="aspect-square overflow-hidden">
                                        <img src={item.image} alt={item.title}
                                            className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <span className="inline-block px-2 py-0.5 bg-surface-container-low text-jp-navy text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                                            {item.category}
                                        </span>
                                        <h4 className="font-headline text-sm font-bold text-jp-navy mb-1">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}