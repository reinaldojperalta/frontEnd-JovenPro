"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/atoms/Button";
import { SearchBar } from "@/components/molecules/SearchBar";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import type { NavItem } from "@/lib/data";
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

export interface NavbarSearchSuggestion {
    id: string | number;
    label: string;
    category?: string;
    href?: string;
}

export interface NavbarStickyProps {
    items: NavItem[];
    onCartClick?: () => void;
    onFavoritesClick?: () => void;
    onSearchSubmit?: (value: string) => void;
    onSearchSelect?: (suggestion: NavbarSearchSuggestion) => void;
    cartCount?: number;
    className?: string;
    loginHref?: string;
    searchSuggestions?: NavbarSearchSuggestion[];
}

export function NavbarSticky({
    items,
    onCartClick,
    onSearchSubmit,
    onSearchSelect,
    cartCount = 0,
    className,
    loginHref = "https://jovenpro.com/my-account/",
    searchSuggestions = [],
}: NavbarStickyProps) {
    const [isSolid, setIsSolid] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");

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
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const toggleSearch = () => {
        setSearchActive((prev) => !prev);
        setMobileOpen(false);
    };

    return (
        <>
            <motion.nav
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
                            <Logo
                                variant={isSolid ? "default" : "inverted"}
                                size="md"
                                className={navbarStickyLogoVariants({ state: navState })}
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
                                onSubmit={onSearchSubmit}
                                onSelect={onSearchSelect}
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
                                onClick={onCartClick}
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

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                            className={navbarStickyMobileMenuVariants()}
                        >
                            <Container size="lg" padding="md">
                                <ul className={navbarStickyMobileListVariants()}>
                                    {items.map((item, i) => (
                                        <motion.li
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
                                        </motion.li>
                                    ))}
                                </ul>
                            </Container>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}