export const SEARCH_FOCUS_STORE_EVENT = "jovenpro:focus-store";
export const SEARCH_FOCUS_PRODUCT_EVENT = "jovenpro:focus-product";

export const SECTION_VITRINA = "#vitrina";
export const SECTION_DESTACADOS = "#destacados";

export interface SearchFocusStoreDetail {
    slug: string;
}

export interface SearchFocusProductDetail {
    slug: string;
}

export function dispatchSearchFocusStore(slug: string) {
    window.dispatchEvent(
        new CustomEvent<SearchFocusStoreDetail>(SEARCH_FOCUS_STORE_EVENT, {
            detail: { slug },
        })
    );
}

export function dispatchSearchFocusProduct(slug: string) {
    window.dispatchEvent(
        new CustomEvent<SearchFocusProductDetail>(SEARCH_FOCUS_PRODUCT_EVENT, {
            detail: { slug },
        })
    );
}
