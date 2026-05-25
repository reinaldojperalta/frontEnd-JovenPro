"use client";

import { useCallback } from "react";
import { scrollToPageSection } from "@/lib/scrollUtils";

export function useAppNavigation() {
    const openExternal = useCallback((url: string) => {
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    }, []);

    const searchStore = useCallback((query: string) => {
        if (!query.trim()) return;
        const url = `https://jovenpro.com/?s=${encodeURIComponent(query)}&post_type=product&product_cat=`;
        openExternal(url);
    }, [openExternal]);

    const goToCart = useCallback(() => {
        openExternal("https://jovenpro.com/carrito/");
    }, [openExternal]);

    const scrollToSection = useCallback((href: string) => {
        if (href.startsWith("#")) {
            if (scrollToPageSection(href)) return;
        }
        openExternal(href);
    }, [openExternal]);

    return {
        openExternal,
        searchStore,
        goToCart,
        scrollToSection,
    };
}
