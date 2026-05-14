"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "@/components/atoms/Typography";
import { Text } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Container";
import { ProductCard } from "@/components/molecules/ProductCard";
import { cn } from "@/lib/utils";
import type { Product, Category } from "@/lib/data";

export interface ProductGridProps {
    products: Product[];
    categories: Category[];
    title?: string;
    subtitle?: string;
    className?: string;
}

export function ProductGrid({
    products,
    categories,
    title = "De nuestros emprendedores",
    subtitle = "Piezas únicas hechas a mano con dedicación y alma",
    className,
}: ProductGridProps) {
    const [activeCategory, setActiveCategory] = useState("todos");
    const [currentPage, setCurrentPage] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "todos") return products;
        return products.filter((p) => p.category === activeCategory);
    }, [products, activeCategory]);

    const totalPages = Math.ceil(filteredProducts.length / 5);

    const paginatedProducts = useMemo(() => {
        const start = currentPage * 5;
        return filteredProducts.slice(start, start + 5);
    }, [filteredProducts, currentPage]);

    const handleCategoryChange = (catId: string) => {
        setActiveCategory(catId);
        setCurrentPage(0);
    };

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        const handleScroll = () => {
            const scrollLeft = el.scrollLeft;
            const width = el.offsetWidth;
            setActiveSlide(Math.round(scrollLeft / width));
        };
        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    const getCardVariant = (index: number): "card-full" | "card-min" | "card-preview" => {
        if (index === 0) return "card-full";
        if (index === 1) return "card-min";
        return "card-preview";
    };

    const getGridArea = (index: number): string => {
        const areas = [
            "1 / 1 / 5 / 5",   // featured
            "1 / 5 / 5 / 7",   // medium
            "5 / 1 / 7 / 3",   // preview 1
            "5 / 3 / 7 / 5",   // preview 2
            "5 / 5 / 7 / 7",   // preview 3
        ];
        return areas[index] || "auto";
    };

    return (
        <section id="productos" className={cn("py-24 md:py-32", className)}>
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

                <motion.div
                    className="flex flex-wrap gap-3 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={cn(
                                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                                activeCategory === cat.id
                                    ? "bg-primary text-white shadow-clay"
                                    : "bg-surface-container text-foreground hover:bg-surface-container-high"
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </motion.div>

                <div className="hidden md:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeCategory}-${currentPage}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        >
                            {paginatedProducts.length > 0 ? (
                                <div
                                    className="grid gap-4"
                                    style={{
                                        gridTemplateColumns: "repeat(6, 1fr)",
                                        gridTemplateRows: "repeat(6, 1fr)",
                                        minHeight: "600px",
                                    }}
                                >
                                    {paginatedProducts.map((product, i) => (
                                        <div
                                            key={product.id}
                                            style={{ gridArea: getGridArea(i) }}
                                            className="min-h-0"
                                        >
                                            <ProductCard
                                                product={product}
                                                variant={getCardVariant(i)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <Text variant="muted" size="lg">
                                        No hay productos en esta categoría aún.
                                    </Text>
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-10">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i)}
                                            className={cn(
                                                "h-2 rounded-full transition-all duration-300",
                                                i === currentPage
                                                    ? "bg-primary w-6"
                                                    : "bg-surface-variant w-2 hover:bg-border"
                                            )}
                                            aria-label={`Página ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="md:hidden">
                    {filteredProducts.length > 0 ? (
                        <div className="relative">
                            <div
                                ref={carouselRef}
                                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none]"
                                style={{ msOverflowStyle: "none" }}
                            >
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="snap-center shrink-0 w-[85vw] max-w-sm"
                                    >
                                        <ProductCard
                                            product={product}
                                            variant="card-min"
                                        />
                                    </div>
                                ))}
                            </div>
                            {filteredProducts.length > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                    {filteredProducts.map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-2 rounded-full transition-all duration-300",
                                                i === activeSlide ? "bg-primary w-6" : "bg-surface-variant w-2"
                                            )}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Text variant="muted">No hay productos en esta categoría.</Text>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}