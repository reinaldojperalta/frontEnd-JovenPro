// src/components/templates/HomeTemplateV2/HomeTemplateV2.tsx

"use client";

import React from "react";
import { NavbarSticky, NavbarSearchSuggestion } from "@/components/organisms/NavbarSticky";
import { HeroSplit } from "@/components/organisms/HeroSplit";
import { BentoCarousel } from "@/components/organisms/BentoCarousel";
import { NewsSection } from "@/components/organisms/NewsSection";
import { VideosSection } from "@/components/organisms/VideosSection";
import { Testimonials } from "@/components/organisms/Testimonials";
import { WorkWithUs } from "@/components/organisms/WorkWithUs";
import { Footer } from "@/components/organisms/Footer";
import { cn } from "@/lib/utils";
import type {
    Product,
    NewsItem,
    VideoItem,
    Testimonial,
    NavItem,
    FooterData,
    HeroSplitData,
    WorkWithUsData,
} from "@/lib/data";

export interface HomeTemplateV2Props {
    navItems: NavItem[];
    heroData: HeroSplitData;
    products: Product[];
    newsItems: NewsItem[];
    videos: VideoItem[];
    testimonials: Testimonial[];
    workWithUsData: WorkWithUsData;
    footerData: FooterData;
    className?: string;
}

const handleProductClick = (href: string) => {
    window.open(href, "_blank");
};

function buildSearchSuggestions(products: Product[]): NavbarSearchSuggestion[] {
    return products.map((p) => ({
        id: p.id,
        label: p.name,
        category: p.category,
        href: `https://jovenpro.com/producto/${p.slug}/`,
    }));
}

function handleSearchSubmit(value: string) {
    const url = `https://jovenpro.com/?s=${encodeURIComponent(value)}&post_type=product&product_cat=`;
    window.open(url, "_blank", "noopener,noreferrer");
}

function handleSearchSelect(suggestion: NavbarSearchSuggestion) {
    if (suggestion.href) {
        window.open(suggestion.href, "_blank", "noopener,noreferrer");
    }
}

export function HomeTemplateV2({
    navItems,
    heroData,
    products,
    newsItems,
    videos,
    testimonials,
    workWithUsData,
    footerData,
    className,
}: HomeTemplateV2Props) {
    const searchSuggestions = buildSearchSuggestions(products);

    return (
        <div className={cn("min-h-screen bg-background", className)}>
            <HeroSplit
                left={heroData.left}
                right={heroData.right}
                logoSrc={heroData.logoSrc}
            />

            <NavbarSticky
                items={navItems}
                searchSuggestions={searchSuggestions}
                onSearchSubmit={handleSearchSubmit}
                onSearchSelect={handleSearchSelect}
                onCartClick={() =>
                    window.open("https://jovenpro.com/carrito/", "_blank", "noopener,noreferrer")
                }
            />

            <BentoCarousel products={products}
                onProductClick={handleProductClick} />
            <NewsSection items={newsItems} />
            <VideosSection videos={videos} />
            <Testimonials testimonials={testimonials} />
            <WorkWithUs data={workWithUsData} />
            <Footer data={footerData} />
        </div>
    );
}