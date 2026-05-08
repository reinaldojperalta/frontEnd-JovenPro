"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Heading, Text } from "@/components/atoms/Typography";
import { ProductCard } from "@/components/molecules/ProductCard";
import { PaginationDots } from "@/components/molecules/PaginationDots";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import {
    BENTO_SLOTS,
    BENTO_SPRING,
    BENTO_DIRECTIONS,
    bentoPlaceholderVariants,
    type BentoSlotConfig,
} from "./BentoCarousel.variants";

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
}

export function BentoCarousel({
    products,
    title = "Talento que Impulsa el Futuro",
    subtitle = "Piezas únicas hechas a mano con dedicación y alma",
    className,
    interval = 4000,
    paginationSize = "standard",
}: BentoCarouselProps) {
    const [idx, setIdx] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [isHovered, setIsHovered] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Asegurar mínimo 9 productos
    const safeProducts = products.length >= 9
        ? products
        : Array.from(
            { length: Math.ceil(9 / products.length) },
            () => products
        ).flat().slice(0, Math.max(9, products.length));

    const total = safeProducts.length;

    const getItem = useCallback(
        (offset: number): Product | null => {
            if (total === 0) return null;
            return safeProducts[wrapIndex(idx + offset, total)];
        },
        [idx, total, safeProducts]
    );

    // ============================================
    // NAVEGACIÓN ATÓMICA (El fix del delay)
    // ============================================
    // Paso 1: Actualizar direction (los slots viejos se re-renderizan 
    //         con la nueva dirección, actualizando sus exit animations)
    // Paso 2: Cambiar idx (los items nuevos entran con todo sincronizado)

    const navigate = useCallback((dir: 'next' | 'prev', targetIdx?: number) => {
        if (isLocked || total === 0) return;

        setIsLocked(true);
        const newIdx = targetIdx !== undefined
            ? targetIdx
            : dir === 'next'
                ? (idx + 1) % total
                : (idx - 1 + total) % total;

        // PASO 1: Dirección primero. Esto fuerza re-render de todos los slots
        // con los items ACTUALES pero direction NUEVA. Los motion.div existentes
        // actualizan sus props de exit.
        setDirection(dir);

        // PASO 2: En el siguiente microtask (después del render de direction),
        // cambiamos idx. Los items viejos ahora salen con el exit actualizado.
        queueMicrotask(() => {
            setIdx(newIdx);
            // Desbloquear después de que la animación termine (~600ms)
            setTimeout(() => setIsLocked(false), 600);
        });
    }, [idx, total, isLocked]);

    const rotate = useCallback((dir: 'next' | 'prev' = 'next') => {
        navigate(dir);
    }, [navigate]);

    useEffect(() => {
        if (!isHovered && total > 0 && !isLocked) {
            intervalRef.current = setInterval(() => rotate('next'), interval);
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
                intervalRef.current = setInterval(() => rotate('next'), interval);
            }
        }, 100);
    }, [isHovered, total, rotate, interval, isLocked]);

    const handleSlotClick = (slotConfig: BentoSlotConfig) => {
        const targetItem = getItem(slotConfig.offset);
        if (!targetItem) return;

        const targetIndex = safeProducts.findIndex(p => p.id === targetItem.id);
        if (targetIndex === -1 || targetIndex === idx) return;

        const dir = targetIndex > idx ? 'next' : 'prev';
        navigate(dir, targetIndex);
        resetTimer();
    };

    const handleDotOffsetChange = (offset: number) => {
        if (offset === 0) {
            resetTimer();
            return;
        }
        const newIdx = wrapIndex(idx + offset, total);
        const dir = offset > 0 ? 'next' : 'prev';
        navigate(dir, newIdx);
        resetTimer();
    };

    const handleArrow = (dir: 'next' | 'prev') => {
        navigate(dir);
        resetTimer();
    };

    // ============================================
    // PREVIEW LABELS PARA DOTS (tooltip)
    // ============================================
    const offsets = paginationSize === "compact"
        ? [-1, 0, 1]
        : [-3, -2, -1, 0, 1, 2, 3];

    const previewLabels = React.useMemo(() => {
        const labels: Record<number, string> = {};
        offsets.forEach(offset => {
            const targetIdx = wrapIndex(idx + offset, total);
            const product = safeProducts[targetIdx];
            labels[offset] = product ? `#${targetIdx + 1} · ${product.name}` : "";
        });
        return labels;
    }, [idx, total, safeProducts, offsets]);

    // ============================================
    // RENDER SLOT
    // ============================================
    const renderSlot = (slot: BentoSlotConfig) => {
        const item = getItem(slot.offset);
        const isHistory = slot.variant === "history-slot";
        const dir = BENTO_DIRECTIONS[direction];
        const animations = isHistory ? dir.history : dir.main;

        return (
            <div
                key={slot.id}
                className={cn(
                    slot.gridClass,
                    "bento-slot",
                    isHistory && "bento-history-inactive"
                )}
                onClick={() => handleSlotClick(slot)}
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
                                bentoPlaceholderVariants.base,
                                isHistory && bentoPlaceholderVariants.history
                            )}
                        />
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <section id="productos" className={cn("py-24 md:py-32", className)}>
            <Container size="xl" padding="md">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
                    <div>
                        <Text
                            size="sm"
                            variant="default"
                            weight="semibold"
                            className="uppercase tracking-[0.2em] text-primary mb-3"
                        >
                            Curation
                        </Text>
                        <Heading level="h2" className="text-foreground">
                            {title}
                        </Heading>
                    </div>
                    <Text variant="muted" size="lg" className="max-w-md">
                        {subtitle}
                    </Text>
                </div>

                {/* Grid */}
                <div
                    className="bento-grid-container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {BENTO_SLOTS.map(renderSlot)}
                </div>

                {/* Controles: Flechas + Info + Dots */}
                <div className="flex items-center justify-center gap-4 md:gap-6 mt-10">
                    {/* Flecha izquierda */}
                    <button
                        onClick={() => handleArrow('next')}
                        disabled={isLocked}
                        className={cn(
                            "touch-target rounded-full bg-surface shadow-clay",
                            "text-foreground hover:bg-primary hover:text-white",
                            "transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        )}
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col items-center gap-2 min-w-[200px]">
                        {/* Label absoluto: Producto X de Y */}
                        <Text
                            size="xs"
                            variant="caption"
                            className="uppercase tracking-[0.15em] font-semibold"
                        >
                            Producto {idx + 1} de {total}
                        </Text>

                        {/* Dots: offset relativo (comportamiento original) */}
                        <PaginationDots
                            size={paginationSize}
                            currentOffset={0}
                            onOffsetChange={handleDotOffsetChange}
                            total={total}
                            currentIndex={idx}
                            previewLabels={previewLabels}
                        />
                    </div>

                    {/* Flecha derecha */}
                    <button
                        onClick={() => handleArrow('prev')}
                        disabled={isLocked}
                        className={cn(
                            "touch-target rounded-full bg-surface shadow-clay",
                            "text-foreground hover:bg-primary hover:text-white",
                            "transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        )}
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Footer CTA */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => window.open("https://jovenpro.com/catalogo", "_blank")}
                        className={cn(
                            "px-8 py-3 rounded-full border-2 border-foreground/20",
                            "font-body text-sm font-semibold uppercase tracking-wider",
                            "text-foreground hover:bg-foreground hover:text-background",
                            "transition-all duration-300"
                        )}
                    >
                        Ver catálogo completo
                    </button>
                </div>
            </Container>
        </section>
    );
}