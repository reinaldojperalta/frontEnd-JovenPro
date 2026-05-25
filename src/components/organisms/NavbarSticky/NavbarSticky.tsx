"use client";

import React, { useEffect, useState } from "react";
import { m, AnimatePresence, LazyMotion } from "framer-motion";
import domAnimation from "@/lib/framer-features";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/atoms/Button";
import { SearchBar } from "@/components/molecules/SearchBar";
import { cn } from "@/lib/utils";
import { Menu, X, Search } from "lucide-react";
import type { NavItem } from "@/lib/data";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import {
    dispatchSearchFocusProduct,
    dispatchSearchFocusStore,
    SECTION_VITRINA,
} from "@/lib/searchFocus";
import type { SearchSuggestion } from "@/components/molecules/SearchBar";
import {
    navbarStickyVariants,
    navbarStickyInnerVariants,
    navbarStickyLogoVariants,
    navbarStickyNavListVariants,
    navbarStickyNavLinkVariants,
    navbarStickySearchVariants,
    navbarStickyActionsVariants,
    navbarStickyActionIconVariants,
    navbarStickySvgIconVariants,
    navbarStickyLoginButtonVariants,
    navbarStickyMobileToggleVariants,
    navbarStickyMobileMenuVariants,
    navbarStickyMobileListVariants,
    navbarStickyMobileLinkVariants,
} from "./NavbarSticky.variants";

export type NavbarSearchSuggestion = SearchSuggestion;

export interface NavbarStickyProps {
    items: NavItem[];
    cartCount?: number;
    className?: string;
    loginHref?: string;
    searchSuggestions?: NavbarSearchSuggestion[];
}

export function NavbarSticky({
    items,
    cartCount = 0,
    className,
    loginHref = "https://jovenpro.com/my-account/",
    searchSuggestions = [],
}: NavbarStickyProps) {
    const [isSolid, setIsSolid] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { searchStore, openExternal, goToCart, scrollToSection } = useAppNavigation();

    useEffect(() => {
        const hero = document.querySelector("#inicio");
        if (!hero) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsSolid(!entry.isIntersecting),
            { root: null, threshold: 0 }
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    const navState = isSolid ? "solid" : "transparent";

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        setSearchActive(false);
        // Espera a que la animación de cierre del drawer (300ms) termine antes de hacer scroll.
        // Esto evita el race condition donde scrollIntoView se ejecuta mientras el menú
        // todavía está superpuesto en pantalla y bloquea el viewport.
        setTimeout(() => scrollToSection(href), 350);
    };

    const toggleSearch = () => {
        setSearchActive((prev) => !prev);
        setMobileOpen(false);
    };

    const handleSearchSelect = (suggestion: SearchSuggestion) => {
        setSearchActive(false);
        setMobileOpen(false);
        setSearchValue(suggestion.label);

        const { sectionHref, targetSlug, kind } = suggestion;
        if (sectionHref && targetSlug && kind) {
            scrollToSection(sectionHref);

            const focusDelay = sectionHref === SECTION_VITRINA ? 700 : 500;
            window.setTimeout(() => {
                if (kind === "store") {
                    dispatchSearchFocusStore(targetSlug);
                } else if (kind === "product") {
                    dispatchSearchFocusProduct(targetSlug);
                }
            }, focusDelay);
        }
    };

    return (
        <>
            <LazyMotion features={domAnimation} strict>
            <m.nav
                className={cn(navbarStickyVariants({ state: navState }), className)}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
                <Container size="lg" padding="md">
                    <div className={navbarStickyInnerVariants()}>
                        <div
                            className={navbarStickyLogoVariants()}
                            onClick={() => handleNavClick("#inicio")}
                        >
                            <img
                                src="/images/logo/jpror.png"
                                alt="JovenPro Logo"
                                className="h-8 md:h-10 w-auto object-contain cursor-pointer"
                            />
                        </div>

                        <ul className={navbarStickyNavListVariants({ searchActive })}>
                            {items.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className={navbarStickyNavLinkVariants({ state: navState })}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className={navbarStickySearchVariants({ active: searchActive })}>
                            <SearchBar
                                value={searchValue}
                                onChange={setSearchValue}
                                onSubmit={searchStore}
                                onSelect={handleSearchSelect}
                                suggestions={searchSuggestions}
                                size="md"
                                autoFocus={searchActive}
                                closeOnClickOutside
                            />
                        </div>

                        <div className={navbarStickyActionsVariants()}>
                            <IconButton
                                icon={
                                    searchActive ? (
                                        <X className={cn(navbarStickySvgIconVariants())} />
                                    ) : (
                                        <Search className={cn(navbarStickySvgIconVariants())} />
                                    )
                                }
                                variant="ghost"
                                size="md"
                                aria-label={searchActive ? "Cerrar búsqueda" : "Buscar"}
                                onClick={toggleSearch}
                                className={navbarStickyActionIconVariants({ state: navState })}
                            />

                            {/* <IconButton
                                icon={<ShoppingCart className={cn(navbarStickySvgIconVariants())} />}
                                variant="ghost"
                                size="md"
                                aria-label="Carrito"
                                onClick={goToCart}
                                hasNotification={cartCount > 0}
                                notificationColor="danger"
                                className={navbarStickyActionIconVariants({ state: navState })}
                            /> */}

                            <div className={navbarStickyLoginButtonVariants()}>
                                <Button
                                    asChild
                                    variant={isSolid ? "primary" : "glass"}
                                    size="sm"
                                    className={navbarStickyLoginButtonVariants({ state: navState })}
                                >
                                    <a href={loginHref} target="_blank" rel="noopener noreferrer">
                                        Iniciar sesión
                                    </a>
                                </Button>
                            </div>

                            <IconButton
                                icon={
                                    mobileOpen ? (
                                        <X className={cn(navbarStickySvgIconVariants())} />
                                    ) : (
                                        <Menu className={cn(navbarStickySvgIconVariants())} />
                                    )
                                }
                                variant="ghost"
                                size="md"
                                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className={cn(
                                    navbarStickyMobileToggleVariants(),
                                    navbarStickyActionIconVariants({ state: navState })
                                )}
                            />
                        </div>
                    </div>
                </Container>
                
                {/* Mobile Search Overlay */}
                <AnimatePresence>
                    {searchActive && (
                        <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-surface-variant z-50 shadow-clay overflow-visible relative"
                        >
                            <Container size="lg" padding="md">
                                <div className="py-4">
                                    <SearchBar
                                        value={searchValue}
                                        onChange={setSearchValue}
                                        onSubmit={searchStore}
                                        onSelect={handleSearchSelect}
                                        suggestions={searchSuggestions}
                                        size="md"
                                        autoFocus
                                    />
                                </div>
                            </Container>
                        </m.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {mobileOpen && (
                        <m.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                            className={navbarStickyMobileMenuVariants()}
                        >
                            <Container size="lg" padding="md">
                                <ul className={navbarStickyMobileListVariants()}>
                                    {items.map((item, i) => (
                                        <m.li
                                            key={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <a
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNavClick(item.href);
                                                }}
                                                className={navbarStickyMobileLinkVariants()}
                                            >
                                                {item.label}
                                            </a>
                                        </m.li>
                                    ))}
                                </ul>
                            </Container>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.nav>
            </LazyMotion>
        </>
    );
}