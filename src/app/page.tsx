// app/page.tsx — Server Component

import { HomeTemplateV2 } from "@/components/templates/HomeTemplateV2";
import {
  navItems,
  // categories, // Eliminado
  stores,
  newsItems,
  testimonials,
  videos,
  heroSplitData,
  workWithUsData,
  footerData,
} from "@/lib/data";

export default function HomePage() {
  return (
    <HomeTemplateV2
      navItems={navItems}
      heroData={heroSplitData}
      stores={stores}
      products={[]}
      // categories={categories} // Eliminado
      newsItems={newsItems}
      videos={videos}
      testimonials={testimonials}
      workWithUsData={workWithUsData}
      footerData={footerData}
    />
  );
}