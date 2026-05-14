// src/components/templates/HomeTemplateV2/HomeTemplateV2.tsx

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
    Store,
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
    stores: Store[];
    newsItems: NewsItem[];
    videos: VideoItem[];
    testimonials: Testimonial[];
    workWithUsData: WorkWithUsData;
    footerData: FooterData;
    className?: string;
}

function buildSearchSuggestions(products: Product[]): NavbarSearchSuggestion[] {
    return products.map((p) => ({
        id: p.id,
        label: p.name,
        category: p.category,
        href: `https://jovenpro.com/producto/${p.slug}/`,
    }));
}

export function HomeTemplateV2({
    navItems,
    heroData,
    products,
    stores,
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
            />

            <BentoCarousel stores={stores} />
            <NewsSection items={newsItems} />
            <VideosSection videos={videos} />
            <Testimonials testimonials={testimonials} />
            <WorkWithUs data={workWithUsData} />
            <Footer data={footerData} />
        </div>
    );
}