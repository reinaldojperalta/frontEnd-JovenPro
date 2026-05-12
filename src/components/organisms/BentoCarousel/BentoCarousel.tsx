"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Heading, Text } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { ProductCard } from "@/components/molecules/ProductCard";
import { PaginationDots } from "@/components/molecules/PaginationDots";
import { BentoGrid, BentoItem } from "@/components/atoms/BentoGrid";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { Section } from "@/components/atoms/Section";
import {
    BENTO_SLOTS,
    BENTO_SPRING,
    BENTO_DIRECTIONS,
    bentoPlaceholderVariants,
    bentoCarouselInfoVariants,
    bentoCarouselLabelVariants,
    bentoCarouselOverlineVariants,
    type BentoSlotConfig,
} from "./BentoCarousel.variants";

/* ============================================================
 * BentoCarousel — Refactor V4 | Grid 16×9
 * ============================================================ */

function wrapIndex(index: number, length: number): number {
    return ((index % length) + length) % length;
}

export interface BentoCarouselProps {
    products: Product[];
    title?: string;
    subtitle?: string;
    className?: string;
    interval?: number;
    paginationSize?: "compact" | "standard";
    catalogHref?: string;
    onCatalogClick?: (href: string) => void;
    onProductClick?: (href: string) => void;
}

export function BentoCarousel({
    products,
    title = "Catálogo de productos",
    subtitle = "Propulsando nuevos talentos",
    className,
    interval = 4000,
    paginationSize = "standard",
    catalogHref = "https://jovenpro.com/tienda/",
    onCatalogClick,
    onProductClick,
}: BentoCarouselProps) {
    const [idx, setIdx] = useState(0);
    const [direction, setDirection] = useState<"next" | "prev">("next");
    const [isHovered, setIsHovered] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const safeProducts =
        products.length >= 9
            ? products
            : Array.from({ length: Math.ceil(9 / products.length) }, () => products)
                .flat()
                .slice(0, Math.max(9, products.length));

    const total = safeProducts.length;

    const getItem = useCallback(
        (offset: number): Product | null => {
            if (total === 0) return null;
            return safeProducts[wrapIndex(idx + offset, total)];
        },
        [idx, total, safeProducts]
    );

    const navigate = useCallback(
        (dir: "next" | "prev", targetIdx?: number) => {
            if (isLocked || total === 0) return;

            setIsLocked(true);
            const newIdx =
                targetIdx !== undefined
                    ? targetIdx
                    : dir === "next"
                        ? (idx + 1) % total
                        : (idx - 1 + total) % total;

            setDirection(dir);

            queueMicrotask(() => {
                setIdx(newIdx);
                setTimeout(() => setIsLocked(false), 600);
            });
        },
        [idx, total, isLocked]
    );

    const rotate = useCallback(
        (dir: "next" | "prev" = "next") => {
            navigate(dir);
        },
        [navigate]
    );

    useEffect(() => {
        if (!isHovered && total > 0 && !isLocked) {
            intervalRef.current = setInterval(() => rotate("next"), interval);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovered, rotate, interval, total, isLocked]);

    const resetTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimeout(() => {
            if (!isHovered && total > 0 && !isLocked) {
                intervalRef.current = setInterval(() => rotate("next"), interval);
            }
        }, 100);
    }, [isHovered, total, rotate, interval, isLocked]);

    const handleSlotClick = (slotConfig: BentoSlotConfig) => {
        const targetItem = getItem(slotConfig.offset);
        if (!targetItem) return;

        const targetIndex = safeProducts.findIndex((p) => p.id === targetItem.id);
        if (targetIndex === -1 || targetIndex === idx) return;

        const dir = targetIndex > idx ? "next" : "prev";
        navigate(dir, targetIndex);
        resetTimer();
    };

    const handleDotOffsetChange = (offset: number) => {
        if (offset === 0) {
            resetTimer();
            return;
        }
        const newIdx = wrapIndex(idx + offset, total);
        const dir = offset > 0 ? "next" : "prev";
        navigate(dir, newIdx);
        resetTimer();
    };

    const offsets =
        paginationSize === "compact"
            ? [-1, 0, 1]
            : [-3, -2, -1, 0, 1, 2, 3];

    const previewLabels = React.useMemo(() => {
        const labels: Record<number, string> = {};
        offsets.forEach((offset) => {
            const targetIdx = wrapIndex(idx + offset, total);
            const product = safeProducts[targetIdx];
            labels[offset] = product ? `#${targetIdx + 1} · ${product.name}` : "";
        });
        return labels;
    }, [idx, total, safeProducts, offsets]);

    const renderSlot = (slot: BentoSlotConfig) => {
        const item = getItem(slot.offset);
        const isHistory = slot.variant === "history-slot";
        const dir = BENTO_DIRECTIONS[direction];
        const animations = isHistory ? dir.history : dir.main;

        return (
            <BentoItem
                key={slot.id}
                position={slot.position}
                type="product"
                isHistory={isHistory}
                onClick={() => handleSlotClick(slot)}
                className="cursor-pointer"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {item ? (
                        <motion.div
                            key={item.id}
                            initial={animations.enter}
                            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                            exit={animations.exit}
                            transition={{
                                ...BENTO_SPRING,
                                delay: slot.delay,
                            }}
                            className="w-full h-full"
                        >
                            <ProductCard
                                product={item}
                                variant={slot.variant}
                                animate={false}
                                onProductClick={onProductClick}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "w-full h-full",
                                bentoPlaceholderVariants({ isHistory })
                            )}
                        />
                    )}
                </AnimatePresence>
            </BentoItem>
        );
    };

    const handleCatalogClick = () => {
        if (onCatalogClick) {
            onCatalogClick(catalogHref);
        } else {
            window.open(catalogHref, "_blank");
        }
    };

    return (
        <Section id="productos" spacing="xl" background="background" className={className}>
            <Container size="xl" padding="md">
                <BentoGrid
                    layout="carousel"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* ── TEXTOS ── */}
                    <BentoItem position="subtitle2" type="text">
                        <Text
                            size="sm"
                            variant="default"
                            weight="semibold"
                            className={cn(bentoCarouselOverlineVariants())}
                        >
                            Compralo ya
                        </Text>
                    </BentoItem>

                    <BentoItem position="subtitle" type="text">
                        <Text
                            variant="muted"
                            size="md"
                        >
                            {subtitle}
                        </Text>
                    </BentoItem>

                    <BentoItem position="title" type="text">
                        <Heading
                            level="h3"
                            className="text-foreground"
                        >
                            {title}
                        </Heading>
                    </BentoItem>

                    {/* ── PRODUCTOS ── */}
                    {BENTO_SLOTS.map(renderSlot)}

                    {/* ── CONTROLES ── */}
                    <BentoItem position="dots" type="control">
                        <div className="w-full h-full flex items-center justify-center">
                            <PaginationDots
                                size={paginationSize}
                                currentOffset={0}
                                onOffsetChange={handleDotOffsetChange}
                                total={total}
                                currentIndex={idx}
                                previewLabels={previewLabels}
                            />
                        </div>
                    </BentoItem>

                    <BentoItem position="catalogo" type="control">
                        <div className="w-full h-full flex items-center justify-center">
                            <Button
                                asChild
                                variant="primary"
                                size="md"
                                className="w-full sm:w-auto"
                                onClick={handleCatalogClick}
                            >
                                <a
                                    href={catalogHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ver catálogo
                                </a>
                            </Button>
                        </div>
                    </BentoItem>
                </BentoGrid>

                {/* Info label debajo del grid */}
                <div className={bentoCarouselInfoVariants()}>
                    <Text
                        size="xs"
                        variant="muted"
                        className={bentoCarouselLabelVariants()}
                    >
                        Producto {idx + 1} de {total}
                    </Text>
                </div>
            </Container>
        </Section>
    );
}