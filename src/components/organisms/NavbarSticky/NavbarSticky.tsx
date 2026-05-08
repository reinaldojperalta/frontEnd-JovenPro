"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { IconButton } from "@/components/atoms/IconButton";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingCart, Heart, Search } from "lucide-react";
import type { NavItem } from "@/lib/data";

export interface NavbarStickyProps {
    items: NavItem[];
    onCartClick?: () => void;
    onFavoritesClick?: () => void;
    onSearchClick?: () => void;
    cartCount?: number;
    className?: string;
}

export function NavbarSticky({
    items,
    onCartClick,
    onFavoritesClick,
    onSearchClick,
    cartCount = 0,
    className,
}: NavbarStickyProps) {
    const [isSolid, setIsSolid] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const hero = document.querySelector("#inicio");
        if (!hero) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSolid(!entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
                rootMargin: "0px 0px 0px 0px",
            }
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                className={cn(
                    "z-50 w-full transition-all duration-500 ease-smooth",
                    isSolid
                        ? "sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-clay"
                        : "relative bg-transparent",
                    className
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
                <Container size="lg" padding="md">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <Logo
                            variant={isSolid ? "default" : "inverted"}
                            size="md"
                            onClick={() => handleNavClick("#inicio")}
                        />

                        <ul className="hidden md:flex items-center gap-8">
                            {items.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className={cn(
                                            "text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                                            isSolid
                                                ? "text-foreground hover:text-primary"
                                                : "text-white/90 hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-2">
                            <IconButton
                                icon={<Search className="w-5 h-5" />}
                                variant="ghost"
                                size="md"
                                aria-label="Buscar"
                                onClick={onSearchClick}
                                className={cn(
                                    isSolid ? "text-foreground" : "text-white"
                                )}
                            />
                            <IconButton
                                icon={<Heart className="w-5 h-5" />}
                                variant="ghost"
                                size="md"
                                aria-label="Favoritos"
                                onClick={onFavoritesClick}
                                className={cn(
                                    isSolid ? "text-foreground" : "text-white",
                                    "hidden sm:flex"
                                )}
                            />
                            <IconButton
                                icon={<ShoppingCart className="w-5 h-5" />}
                                variant="ghost"
                                size="md"
                                aria-label="Carrito"
                                onClick={onCartClick}
                                hasNotification={cartCount > 0}
                                notificationColor="danger"
                                className={cn(
                                    isSolid ? "text-foreground" : "text-white"
                                )}
                            />
                            <IconButton
                                icon={mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                variant="ghost"
                                size="md"
                                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className={cn(
                                    "md:hidden",
                                    isSolid ? "text-foreground" : "text-white"
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
                            className="md:hidden bg-background/95 backdrop-blur-md border-t border-surface-variant overflow-hidden"
                        >
                            <Container size="lg" padding="md">
                                <ul className="flex flex-col gap-4 py-4">
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
                                                className="text-base font-semibold text-foreground hover:text-primary transition-colors w-full block py-2"
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