"use client";

import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { Section } from "@/components/atoms/Section";
import { cn } from "@/lib/utils";
import type { Store } from "@/lib/data";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import {
    SEARCH_FOCUS_STORE_EVENT,
    type SearchFocusStoreDetail,
} from "@/lib/searchFocus";
import { scrollChildIntoHorizontalContainer } from "@/lib/scrollUtils";
import { MOSAIC_CATEGORIES, type MosaicCategoryFilterId } from "./ProductMosaic.constants";
import {
    mosaicSectionVariants,
    mosaicContainerVariants,
    mosaicHeaderVariants,
    mosaicHeaderLeftVariants,
    mosaicOverlineVariants,
    mosaicTitleVariants,
    mosaicLinkVariants,
    mosaicTabsNavVariants,
    mosaicTabsScrollVariants,
    mosaicTabVariants,
    mosaicTabIconVariants,
    mosaicTabNameVariants,
    mosaicTabCountVariants,
    mosaicTabsArrowVariants,
    mosaicChipsScrollVariants,
    mosaicChipVariants,
    mosaicChipGlassVariants,
    mosaicChipReflectionVariants,
    mosaicChipAvatarVariants,
    mosaicChipNameVariants,
    mosaicChipMobileWidthVariants,
    mosaicGridVariants,
    mosaicFeaturedVariants,
    mosaicFeaturedImageVariants,
    mosaicFeaturedImgVariants,
    mosaicFeaturedInfoVariants,
    mosaicFeaturedBadgeVariants,
    mosaicFeaturedNameVariants,
    mosaicFeaturedMetaVariants,
    mosaicFeaturedCtaVariants,
    mosaicMiniVariants,
    mosaicMiniThumbVariants,
    mosaicMiniThumbImgVariants,
    mosaicMiniInfoVariants,
    mosaicMiniLabelVariants,
    mosaicMiniNameVariants,
    mosaicMiniMetaVariants,
    mosaicMiniDescVariants,
} from "./ProductMosaic.variants";

export interface ProductMosaicProps {
    stores: Store[];
    catalogHref?: string;
    className?: string;
}

function getStoresByCategory(stores: Store[], catId: MosaicCategoryFilterId): Store[] {
    if (catId === "todos") return stores;
    return stores.filter((s) => s.category === catId);
}

function buildMosaicTitle(catName: string, storeName: string, isTodos: boolean): string {
    if (isTodos) return storeName;
    return `${catName}: ${storeName}`;
}

export function ProductMosaic({
    stores,
    catalogHref = "https://jovenpro.com/tienda/",
    className,
}: ProductMosaicProps) {
    const { openExternal } = useAppNavigation();
    const [activeCatIndex, setActiveCatIndex] = useState(0);
    const [activeStoreIndex, setActiveStoreIndex] = useState(0);
    const [isSearchHighlighted, setIsSearchHighlighted] = useState(false);
    const tabsRef = useRef<HTMLDivElement>(null);
    const chipsRef = useRef<HTMLDivElement>(null);
    const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const allowInlineScrollRef = useRef(false);

    const scrollActiveTabIntoView = useCallback(() => {
        const activeTab = tabsRef.current?.querySelector('[data-active="true"]') as HTMLElement | null;
        scrollChildIntoHorizontalContainer(tabsRef.current, activeTab);
    }, []);

    const scrollActiveChipIntoView = useCallback(() => {
        const activeChip = chipsRef.current?.querySelector('[data-active="true"]') as HTMLElement | null;
        scrollChildIntoHorizontalContainer(chipsRef.current, activeChip);
    }, []);

    const activeCategory = MOSAIC_CATEGORIES[activeCatIndex];
    const filteredStores = useMemo(
        () => getStoresByCategory(stores, activeCategory.id),
        [stores, activeCategory.id]
    );

    const activeStore = filteredStores[activeStoreIndex] ?? filteredStores[0] ?? null;

    const resetStoreOnCategoryChange = useCallback((catIndex: number) => {
        setActiveCatIndex(catIndex);
        setActiveStoreIndex(0);
    }, []);

    const selectStore = useCallback((index: number) => {
        setActiveStoreIndex(index);
    }, []);

    const focusStoreBySlug = useCallback(
        (slug: string) => {
            const store = stores.find((s) => s.slug === slug || s.id === slug);
            if (!store) return;

            const catIndex = MOSAIC_CATEGORIES.findIndex((cat) => cat.id === store.category);
            const resolvedCatIndex = catIndex >= 0 ? catIndex : 0;
            const catStores = getStoresByCategory(stores, MOSAIC_CATEGORIES[resolvedCatIndex].id);
            const storeIndex = catStores.findIndex((s) => s.id === store.id);

            setActiveCatIndex(resolvedCatIndex);
            setActiveStoreIndex(storeIndex >= 0 ? storeIndex : 0);

            allowInlineScrollRef.current = true;
            requestAnimationFrame(() => {
                scrollActiveTabIntoView();
                scrollActiveChipIntoView();
            });

            setIsSearchHighlighted(true);
            if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
            highlightTimeoutRef.current = setTimeout(() => setIsSearchHighlighted(false), 2200);
        },
        [stores, scrollActiveTabIntoView, scrollActiveChipIntoView]
    );

    useEffect(() => {
        const onFocusStore = (event: Event) => {
            const { slug } = (event as CustomEvent<SearchFocusStoreDetail>).detail;
            if (slug) focusStoreBySlug(slug);
        };

        window.addEventListener(SEARCH_FOCUS_STORE_EVENT, onFocusStore);
        return () => {
            window.removeEventListener(SEARCH_FOCUS_STORE_EVENT, onFocusStore);
            if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
        };
    }, [focusStoreBySlug]);

    useEffect(() => {
        if (activeStoreIndex >= filteredStores.length) {
            setActiveStoreIndex(0);
        }
    }, [filteredStores.length, activeStoreIndex]);

    useEffect(() => {
        const el = tabsRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    useEffect(() => {
        if (!allowInlineScrollRef.current) return;
        scrollActiveTabIntoView();
    }, [activeCatIndex, scrollActiveTabIntoView]);

    useEffect(() => {
        if (!allowInlineScrollRef.current) return;
        scrollActiveChipIntoView();
    }, [activeStoreIndex, activeCatIndex, scrollActiveChipIntoView]);

    const enableInlineScroll = useCallback(() => {
        allowInlineScrollRef.current = true;
    }, []);

    const scrollTabs = (dir: -1 | 1) => {
        const amount = typeof window !== "undefined" && window.innerWidth <= 768 ? 150 : 200;
        tabsRef.current?.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    const mosaicTitle = activeStore
        ? buildMosaicTitle(
            activeCategory.name,
            activeStore.name,
            activeCategory.id === "todos"
        )
        : "Conoce nuestros emprendedores";

    const storeHref = activeStore
        ? `https://jovenpro.com/store/${activeStore.slug}/`
        : catalogHref;

    if (stores.length === 0) return null;

    return (
        <Section
            id="vitrina"
            spacing="lg"
            background="background"
            className={cn(mosaicSectionVariants(), className)}
        >
            <div className={mosaicContainerVariants()}>
                {/* Header */}
                <header className={mosaicHeaderVariants()}>
                    <div className={mosaicHeaderLeftVariants()}>
                        <p className={mosaicOverlineVariants()}>Vitrina de Emprendedores</p>
                        <h2 className={mosaicTitleVariants()}>{mosaicTitle}</h2>
                    </div>
                    <a
                        href={catalogHref}
                        className={mosaicLinkVariants()}
                        onClick={(e) => {
                            e.preventDefault();
                            openExternal(catalogHref);
                        }}
                    >
                        Ver catálogo
                        <ArrowRight className="w-4 h-4" aria-hidden />
                    </a>
                </header>

                {/* Category tabs */}
                <nav className={mosaicTabsNavVariants()} aria-label="Categorías de emprendedores">
                    <button
                        type="button"
                        className={mosaicTabsArrowVariants()}
                        onClick={() => scrollTabs(-1)}
                        aria-label="Categorías anteriores"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div ref={tabsRef} className={mosaicTabsScrollVariants()} role="tablist">
                        {MOSAIC_CATEGORIES.map((cat, i) => {
                            const count = getStoresByCategory(stores, cat.id).length;
                            const Icon = cat.icon;
                            const isActive = i === activeCatIndex;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    data-active={isActive ? "true" : undefined}
                                    className={mosaicTabVariants({ active: isActive })}
                                    onClick={() => {
                                        enableInlineScroll();
                                        resetStoreOnCategoryChange(i);
                                    }}
                                >
                                    <Icon className={mosaicTabIconVariants()} aria-hidden />
                                    <span className={mosaicTabNameVariants()}>{cat.name}</span>
                                    <span className={mosaicTabCountVariants()}>({count})</span>
                                </button>
                            );
                        })}
                    </div>
                    <button
                        type="button"
                        className={mosaicTabsArrowVariants()}
                        onClick={() => scrollTabs(1)}
                        aria-label="Categorías siguientes"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </nav>

                {/* Store chips */}
                {filteredStores.length > 0 && (
                    <div
                        ref={chipsRef}
                        className={mosaicChipsScrollVariants()}
                        role="tablist"
                        aria-label="Tiendas en la categoría"
                    >
                        {filteredStores.map((store, i) => {
                            const isActive = i === activeStoreIndex;
                            return (
                                <button
                                    key={store.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    data-active={isActive ? "true" : undefined}
                                    className={cn(
                                        mosaicChipVariants({ active: isActive }),
                                        mosaicChipMobileWidthVariants(),
                                        "group"
                                    )}
                                    style={{ backgroundImage: `url(${store.image})` }}
                                    onClick={() => {
                                        enableInlineScroll();
                                        selectStore(i);
                                    }}
                                >
                                    <span
                                        className={mosaicChipGlassVariants({ active: isActive })}
                                        aria-hidden
                                    />
                                    <span
                                        className={mosaicChipReflectionVariants()}
                                        aria-hidden
                                    />
                                    <div className={mosaicChipAvatarVariants()}>
                                        <Avatar
                                            src={store.emprendedor.avatar || undefined}
                                            alt={store.emprendedor.name}
                                            fallback={store.emprendedor.initials}
                                            size="sm"
                                            className="w-full h-full border-0"
                                        />
                                    </div>
                                    <span className={mosaicChipNameVariants()}>{store.name}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Mosaic grid */}
                {activeStore && (
                    <div
                        className={cn(
                            mosaicGridVariants(),
                            isSearchHighlighted &&
                                "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-clay transition-shadow duration-300"
                        )}
                    >
                        {/* Mini — El Emprendedor */}
                        <article
                            className={cn(
                                mosaicMiniVariants({ area: "emprendedor", layout: "desktop" }),
                                "max-md:flex-col"
                            )}
                        >
                            <div
                                className={cn(
                                    mosaicMiniThumbVariants({ layout: "desktop" }),
                                    "max-md:w-full max-md:h-[120px]"
                                )}
                            >
                                <Avatar
                                    src={activeStore.emprendedor.avatar || undefined}
                                    alt={activeStore.emprendedor.name}
                                    fallback={activeStore.emprendedor.initials}
                                    size="lg"
                                    className="w-full h-full rounded-none"
                                />
                            </div>
                            <div className={mosaicMiniInfoVariants()}>
                                <span className={mosaicMiniLabelVariants()}>El Emprendedor</span>
                                <p className={mosaicMiniNameVariants()}>{activeStore.emprendedor.name}</p>
                                {activeStore.location ? (
                                    <p className={mosaicMiniMetaVariants()}>{activeStore.location}</p>
                                ) : null}
                            </div>
                        </article>

                        {/* Mini — La Tienda */}
                        <article
                            className={cn(
                                mosaicMiniVariants({ area: "tienda", layout: "desktop" }),
                                "max-md:flex-col"
                            )}
                        >
                            <div
                                className={cn(
                                    mosaicMiniThumbVariants({ layout: "desktop" }),
                                    "max-md:w-full max-md:h-[120px]"
                                )}
                            >
                                <img
                                    src={activeStore.image}
                                    alt={activeStore.name}
                                    className={mosaicMiniThumbImgVariants()}
                                />
                            </div>
                            <div className={mosaicMiniInfoVariants()}>
                                <span className={mosaicMiniLabelVariants()}>La Tienda</span>
                                <p className={mosaicMiniNameVariants()}>{activeStore.name}</p>
                                <p className={mosaicMiniDescVariants()}>{activeStore.description}</p>
                            </div>
                        </article>

                        {/* Featured */}
                        <article className={mosaicFeaturedVariants()}>
                            <div className={mosaicFeaturedImageVariants()}>
                                <img
                                    src={activeStore.image}
                                    alt={activeStore.name}
                                    className={mosaicFeaturedImgVariants()}
                                />
                            </div>
                            <div className={mosaicFeaturedInfoVariants()}>
                                <span className={mosaicFeaturedBadgeVariants()}>Vitrina Destacada</span>
                                <h3 className={mosaicFeaturedNameVariants()}>{activeStore.name}</h3>
                                <p className={mosaicFeaturedMetaVariants()}>
                                    Por {activeStore.emprendedor.name}
                                    {activeStore.location ? ` · ${activeStore.location}` : ""}
                                </p>
                                <a
                                    href={storeHref}
                                    className={mosaicFeaturedCtaVariants()}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        openExternal(storeHref);
                                    }}
                                >
                                    Visitar tienda
                                    <ArrowRight className="w-4 h-4" aria-hidden />
                                </a>
                            </div>
                        </article>
                    </div>
                )}
            </div>
        </Section>
    );
}
