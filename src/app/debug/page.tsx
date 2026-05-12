// src/app/debug/page.tsx
// Server Component — importa datos y renderiza DebugTemplate (Client Component)

import { DebugTemplate } from "@/components/templates/DebugTemplate";
import {
    navItems,
    heroSplitData,
    products,
    newsItems,
    videos,
    testimonials,
    workWithUsData,
    footerData,
} from "@/lib/data";

export const metadata = {
    title: "V2 Debug Console",
    description: "Kitchen Sink / Design System Playground para HomeTemplateV2",
};

export default function DebugPage() {
    return (
        <DebugTemplate
            navItems={navItems}
            heroData={heroSplitData}
            products={products}
            newsItems={newsItems}
            videos={videos}
            testimonials={testimonials}
            workWithUsData={workWithUsData}
            footerData={footerData}
        />
    );
}