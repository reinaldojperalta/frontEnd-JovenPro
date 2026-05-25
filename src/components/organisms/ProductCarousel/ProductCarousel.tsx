"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/molecules/ProductCard";
import type { Product } from "@/lib/data";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import {
    SEARCH_FOCUS_PRODUCT_EVENT,
    type SearchFocusProductDetail,
} from "@/lib/searchFocus";
import { cn } from "@/lib/utils";
import { scrollChildIntoHorizontalContainer } from "@/lib/scrollUtils";
import {
    carouselSectionVariants,
    carouselContainerVariants,
    carouselEditorialVariants,
    carouselCategoryVariants,
    carouselTitleVariants,
    carouselDescriptionVariants,
    carouselCtaVariants,
    carouselDividerVariants,
    carouselRightVariants,
    carouselTrackWrapperVariants,
    carouselTrackVariants,
    carouselArrowVariants,
} from "./ProductCarousel.variants";

export interface ProductCarouselProps {
    products: Product[];
    category?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
}

export function ProductCarousel({
    products,
    category = "Destacados",
    title = "Productos destacados",
    description = "Cada producto es una selección especial de nuestros emprendedores — piezas con historia, calidad y el sello único de quienes las crean con pasión.",
    ctaText = "Ver productos",
    ctaHref = "https://jovenpro.com/categoria-producto/destacados",
}: ProductCarouselProps) {
    const { openExternal } = useAppNavigation();
    const trackRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Duplicate products for infinite loop. Usually handled with 2 sets.
    const displayProducts = [...products, ...products];

    const pauseAnimation = useCallback(() => {
        setIsAnimating(false);
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
            resumeTimeoutRef.current = null;
        }
    }, []);

    const resumeAnimation = useCallback(() => {
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }
        resumeTimeoutRef.current = setTimeout(() => {
            setIsAnimating(true);
            resumeTimeoutRef.current = null;
        }, 625);
    }, []);

    const handleScroll = (dir: 1 | -1) => {
        if (!wrapperRef.current) return;

        pauseAnimation();

        const isMobile = window.innerWidth <= 768;
        const cardWidth = isMobile ? window.innerWidth - 48 : 264; // 240px card + 24px gap

        wrapperRef.current.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });

        resumeAnimation();
    };

    const handleMouseEnter = () => pauseAnimation();
    const handleMouseLeave = () => resumeAnimation();

    const focusProductBySlug = useCallback(
        (slug: string) => {
            pauseAnimation();
            setHighlightedSlug(slug);

            window.setTimeout(() => {
                const card = wrapperRef.current?.querySelector(
                    `[data-product-slug="${CSS.escape(slug)}"]`
                ) as HTMLElement | null;
                scrollChildIntoHorizontalContainer(wrapperRef.current, card);
            }, 100);

            if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
            highlightTimeoutRef.current = setTimeout(() => {
                setHighlightedSlug(null);
                resumeAnimation();
            }, 2800);
        },
        [pauseAnimation, resumeAnimation]
    );

    useEffect(() => {
        const onFocusProduct = (event: Event) => {
            const { slug } = (event as CustomEvent<SearchFocusProductDetail>).detail;
            if (slug) focusProductBySlug(slug);
        };

        window.addEventListener(SEARCH_FOCUS_PRODUCT_EVENT, onFocusProduct);
        return () => {
            window.removeEventListener(SEARCH_FOCUS_PRODUCT_EVENT, onFocusProduct);
            if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
        };
    }, [focusProductBySlug]);

    return (
        <section id="destacados" className={carouselSectionVariants()}>
            <div className={carouselContainerVariants()}>

                {/* Left: Editorial Block */}
                <div className={carouselEditorialVariants()}>
                    <div className={carouselCategoryVariants()}>{category}</div>
                    <h2 className={carouselTitleVariants()}>{title}</h2>
                    <p className={carouselDescriptionVariants()}>{description}</p>
                    <a href={ctaHref} className={carouselCtaVariants()}>
                        {ctaText}
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                {/* Vertical Divider */}
                <div className={carouselDividerVariants()} />

                {/* Right: Scrollable Product Row */}
                <div className={carouselRightVariants()}>
                    <button
                        className={carouselArrowVariants({ direction: "prev" })}
                        onClick={() => handleScroll(-1)}
                        aria-label="Anterior"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div
                        className={carouselTrackWrapperVariants()}
                        ref={wrapperRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={pauseAnimation}
                        onTouchEnd={resumeAnimation}
                    >
                        <div
                            className={carouselTrackVariants()}
                            ref={trackRef}
                            style={{
                                animationPlayState: isAnimating ? 'running' : 'paused'
                            }}
                        >
                            {displayProducts.map((product, index) => (
                                <ProductCard
                                    key={`${product.id}-${index}`}
                                    product={product}
                                    variant="editorial"
                                    animate={false}
                                    onProductClick={openExternal}
                                    className={cn(
                                        highlightedSlug === product.slug &&
                                            "ring-2 ring-primary ring-offset-2 shadow-clay-active"
                                    )}
                                    data-product-slug={product.slug}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        className={carouselArrowVariants({ direction: "next" })}
                        onClick={() => handleScroll(1)}
                        aria-label="Siguiente"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </section>
    );
}
