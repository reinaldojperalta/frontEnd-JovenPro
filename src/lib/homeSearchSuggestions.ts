import type { SearchSuggestion } from "@/components/molecules/SearchBar";
import type { Product, Store } from "@/lib/data";
import { SECTION_DESTACADOS, SECTION_VITRINA } from "@/lib/searchFocus";

export type HomeSearchSuggestion = SearchSuggestion & {
    category: string;
    kind: "store" | "product";
    sectionHref: string;
    targetSlug: string;
};

export function buildHomeSearchSuggestions(
    stores: Store[],
    featuredProducts: Product[]
): HomeSearchSuggestion[] {
    const storeSuggestions: HomeSearchSuggestion[] = stores.map((store) => ({
        id: `store-${store.id}`,
        label: store.name,
        category: "Tienda",
        kind: "store",
        sectionHref: SECTION_VITRINA,
        targetSlug: store.slug,
    }));

    const productSuggestions: HomeSearchSuggestion[] = featuredProducts.map((product) => ({
        id: `product-${product.id}`,
        label: product.name,
        category: "Destacado",
        kind: "product",
        sectionHref: SECTION_DESTACADOS,
        targetSlug: product.slug,
    }));

    return [...storeSuggestions, ...productSuggestions];
}
