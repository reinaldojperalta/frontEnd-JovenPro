// src/components/templates/HomeTemplateV2.tsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarSticky } from "@/components/organisms/NavbarSticky";
import { NavbarStickySkeleton } from "@/components/organisms/NavbarSticky";
import { HeroSplit } from "@/components/organisms/HeroSplit";
import { HeroSplitSkeleton } from "@/components/organisms/HeroSplit";
// 👇 REEMPLAZADO: ProductGrid → BentoCarousel
import { BentoCarousel } from "@/components/organisms/BentoCarousel";
// import { ProductGridSkeleton } from "@/components/organisms/ProductGrid"; // Eliminado
import { NewsSection } from "@/components/organisms/NewsSection";
import { NewsSectionSkeleton } from "@/components/organisms/NewsSection";
import { VideosSection } from "@/components/organisms/VideosSection";
import { VideosSectionSkeleton } from "@/components/organisms/VideosSection";
import { Testimonials } from "@/components/organisms/Testimonials";
import { TestimonialsSkeleton } from "@/components/organisms/Testimonials";
import { WorkWithUs } from "@/components/organisms/WorkWithUs";
import { WorkWithUsSkeleton } from "@/components/organisms/WorkWithUs";
import { Footer } from "@/components/organisms/Footer";
import { FooterSkeleton } from "@/components/organisms/Footer";
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
    // 👇 ELIMINADO: categories ya no se necesitan
    // categories: Category[];
    newsItems: NewsItem[];
    videos: VideoItem[];
    testimonials: Testimonial[];
    workWithUsData: WorkWithUsData;
    footerData: FooterData;
    isLoading?: boolean;
    className?: string;
}

export function HomeTemplateV2({
    navItems,
    heroData,
    products,
    // categories, // Eliminado
    newsItems,
    videos,
    testimonials,
    workWithUsData,
    footerData,
    isLoading = false,
    className,
}: HomeTemplateV2Props) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShowContent(true), 100);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const isSkeleton = isLoading || !showContent;

    return (
        <div className={cn("min-h-screen bg-background", className)}>
            <AnimatePresence mode="wait">
                {isSkeleton ? (
                    <HomeTemplateSkeleton key="skeleton" />
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <HeroSplit
                            left={heroData.left}
                            right={heroData.right}
                            logoSrc={heroData.logoSrc}
                        />

                        <NavbarSticky items={navItems} />

                        {/* 👇 REEMPLAZADO: ProductGrid → BentoCarousel */}
                        <BentoCarousel products={products} />

                        <NewsSection items={newsItems} />

                        <VideosSection videos={videos} />

                        <Testimonials testimonials={testimonials} />

                        <WorkWithUs data={workWithUsData} />

                        <Footer data={footerData} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function HomeTemplateSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <HeroSplitSkeleton />
            <NavbarStickySkeleton />
            {/* TODO: Crear BentoCarouselSkeleton */}
            <div className="py-32 px-6">
                <div className="skeleton-pulse h-8 w-64 rounded-lg mb-4" />
                <div className="skeleton-pulse h-4 w-96 rounded-lg mb-12" />
                <div className="grid grid-cols-7 grid-rows-6 gap-4 h-[600px]">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="skeleton-pulse rounded-clay" />
                    ))}
                </div>
            </div>
            <NewsSectionSkeleton />
            <VideosSectionSkeleton />
            <TestimonialsSkeleton />
            <WorkWithUsSkeleton />
            <FooterSkeleton />
        </motion.div>
    );
}