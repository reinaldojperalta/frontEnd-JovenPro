// components/templates/HomeTemplateSkeleton.tsx

import { HeaderSkeleton } from "@/components/organisms/Header";
import { HeroSkeleton } from "@/components/organisms/Hero";
import { ProductGridSkeleton } from "@/components/organisms/ProductGrid";
import { ContactSectionSkeleton } from "@/components/organisms/ContactSection";
import { FooterSkeleton } from "@/components/organisms/Footer";

export interface HomeTemplateSkeletonProps {
    /** Número de productos skeleton en el grid */
    productCount?: number;
    /** Número de columnas del grid */
    columns?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
}

export function HomeTemplateSkeleton({
    productCount = 4,
    columns = { mobile: 1, tablet: 2, desktop: 4 },
}: HomeTemplateSkeletonProps) {
    return (
        <div className="min-h-screen bg-background" aria-hidden="true">
            <HeaderSkeleton navItems={3} showSearch showCart />

            <main className="pt-20">
                <HeroSkeleton variant="split" minHeight="95vh" />

                <ProductGridSkeleton
                    titleLines={2}
                    overline
                    productCount={productCount}
                    columns={columns}
                    showFilterButton
                    showCategories
                />

                <ContactSectionSkeleton />
            </main>

            <FooterSkeleton columns={2} linksPerColumn={3} />
        </div>
    );
}