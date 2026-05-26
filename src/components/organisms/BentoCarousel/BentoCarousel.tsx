"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { m, AnimatePresence, LazyMotion } from "framer-motion";
import domAnimation from "@/lib/framer-features";
import { Container } from "@/components/atoms/Container";
import { Heading, Text } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { StoreCard } from "@/components/molecules/StoreCard";
import { PaginationDots } from "@/components/molecules/PaginationDots";
import { BentoGrid, BentoItem } from "@/components/atoms/BentoGrid";
import { cn } from "@/lib/utils";
import type { Store } from "@/lib/data";
import { Section } from "@/components/atoms/Section";
import Image from "next/image";
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
    stores: Store[];
    title?: string;
    subtitle?: string;
    className?: string;
    interval?: number;
    paginationSize?: "compact" | "standard";
    catalogHref?: string;
    onStoreClick?: (url: string) => void;
}

export function BentoCarousel({
    stores,
    title = "Emprendedores",
    subtitle = "Propulsando nuevos talentos",
    className,
    interval = 4000,
    paginationSize = "standard",
    catalogHref = "https://jovenpro.com/tienda/",
    onStoreClick,
}: BentoCarouselProps) {
    const [idx, setIdx] = useState(0);
    const [direction, setDirection] = useState<"next" | "prev">("next");
    const [isHovered, setIsHovered] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleNavigation = useCallback((url: string) => {
        if (onStoreClick) {
            onStoreClick(url);
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    }, [onStoreClick]);

    const safeStores =
        stores.length >= 9
            ? stores
            : Array.from({ length: Math.ceil(9 / stores.length) }, () => stores)
                .flat()
                .slice(0, Math.max(9, stores.length));

    const total = safeStores.length;

    const getItem = useCallback(
        (offset: number): Store | null => {
            if (total === 0) return null;
            return safeStores[wrapIndex(idx + offset, total)];
        },
        [idx, total, safeStores]
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

        const targetIndex = safeStores.findIndex((p) => p.id === targetItem.id);
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

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleSwipe = () => {
        if (touchEndX.current < touchStartX.current - 50) {
            rotate("next");
            resetTimer();
        }
        if (touchEndX.current > touchStartX.current + 50) {
            rotate("prev");
            resetTimer();
        }
    };

    const offsets =
        paginationSize === "compact"
            ? [-1, 0, 1]
            : [-3, -2, -1, 0, 1, 2, 3];

    const previewLabels = React.useMemo(() => {
        const labels: Record<number, string> = {};
        offsets.forEach((offset) => {
            const targetIdx = wrapIndex(idx + offset, total);
            const store = safeStores[targetIdx];
            labels[offset] = store ? `#${targetIdx + 1} · ${store.name}` : "";
        });
        return labels;
    }, [idx, total, safeStores, offsets]);

    const renderSlot = (slot: BentoSlotConfig) => {
        const item = getItem(slot.offset);
        const isHistory = slot.variant === "history-slot";
        const dir = BENTO_DIRECTIONS[direction];
        const animations = isHistory ? dir.history : dir.main;

        const isHiddenOnMobile = ["history-2", "history-3", "history-4", "preview-1", "preview-2", "next"].includes(slot.position);
        const isForcedVisibleOnMobile = ["history-1", "preview-max"].includes(slot.position);

        return (
            <BentoItem
                key={slot.id}
                position={slot.position}
                type="product"
                isHistory={isHistory}
                onClick={() => handleSlotClick(slot)}
                className={cn(
                    "cursor-pointer",
                    isHiddenOnMobile && "hidden md:block",
                    isForcedVisibleOnMobile && "!block md:!block aspect-square md:aspect-auto md:h-full",
                    slot.position === "hero" && "h-[460px] md:h-full"
                )}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {item ? (
                        <m.div
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
                            <StoreCard
                                store={item}
                                variant={slot.variant}
                                animate={false}
                                onStoreClick={handleNavigation}
                            />
                        </m.div>
                    ) : (
                        <m.div
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
        handleNavigation(catalogHref);
    };

    return (
        <Section id="productos" spacing="xl" background="background" className={className}>
            <Container size="xl" padding="md">
                <LazyMotion features={domAnimation} strict>
                    <BentoGrid
                        layout="carousel"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* ── TEXTOS ── */}
                        <BentoItem position="subtitle2" type="text" background="surface" className="hidden md:flex">
                            <Image
                                src="/images/logo/JovenPro-by-ZonaPro.png"
                                alt="JovenPro by ZonaPro"
                                width={200}
                                height={48}
                                className="object-contain opacity-80"
                                priority
                            />
                        </BentoItem>

                        <BentoItem position="subtitle" type="text" background="primary" className="hidden md:flex">
                            <Text
                                variant="inverted"
                                size="md"
                            >
                                {subtitle}
                            </Text>
                        </BentoItem>

                        <BentoItem position="title" type="text" background="primary">
                            <Heading
                                level="h3"
                                className="text-white"
                            >
                                {title}
                            </Heading>
                        </BentoItem>

                        {/* ── PRODUCTOS ── */}
                        {BENTO_SLOTS.map(renderSlot)}

                        {/* ── CONTROLES ── */}
                        <BentoItem position="dots" type="control" background="glass" className="hidden md:flex shadow-sm">
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                <span className="text-xs uppercase tracking-widest font-bold text-foreground/50">Navegar</span>
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

                        <BentoItem position="catalogo" type="control" background="glass" className="shadow-xl shadow-primary/20">
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
                </LazyMotion>

                {/* Info label debajo del grid */}
                <div className={bentoCarouselInfoVariants()}>
                    <Text
                        size="xs"
                        variant="muted"
                        className={bentoCarouselLabelVariants()}
                    >
                        Tienda {idx + 1} de {total}
                    </Text>
                </div>
            </Container>
        </Section>
    );
}