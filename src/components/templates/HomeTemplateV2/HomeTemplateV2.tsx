// src/components/templates/HomeTemplateV2/HomeTemplateV2.tsx

import React from "react";
import { NavbarSticky } from "@/components/organisms/NavbarSticky";
import { buildHomeSearchSuggestions } from "@/lib/homeSearchSuggestions";
import { HeroSplit } from "@/components/organisms/HeroSplit";
import { BentoCarousel } from "@/components/organisms/BentoCarousel";
import { NewsSection } from "@/components/organisms/NewsSection";
import { ProductCarousel } from "@/components/organisms/ProductCarousel";
import { VideosSection } from "@/components/organisms/VideosSection";
import { ProductMosaic } from "@/components/organisms/ProductMosaic";
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
    featuredProducts: Product[];
    stores: Store[];
    newsItems: NewsItem[];
    videos: VideoItem[];
    testimonials: Testimonial[];
    workWithUsData: WorkWithUsData;
    footerData: FooterData;
    className?: string;
}

export function HomeTemplateV2({
    navItems,
    heroData,
    products,
    featuredProducts,
    stores,
    newsItems,
    videos,
    testimonials,
    workWithUsData,
    footerData,
    className,
}: HomeTemplateV2Props) {
    const searchSuggestions = buildHomeSearchSuggestions(stores, featuredProducts);

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
            {featuredProducts && featuredProducts.length > 0 && (
                <ProductCarousel products={featuredProducts} />
            )}
            <VideosSection videos={videos} />
            <ProductMosaic stores={stores} />
            
            <WorkWithUs data={workWithUsData} />
            <Testimonials testimonials={testimonials} />
            <Footer data={footerData} />
        </div>
    );
}