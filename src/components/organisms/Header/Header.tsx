// components/organisms/Header/Header.tsx

"use client";

import React, { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { useScrollHeader } from "./useScrollHeader"
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { IconButton } from "@/components/atoms/IconButton";
import { SearchBar, type SearchSuggestion } from "@/components/molecules/SearchBar";
import { Nav, type NavItem } from "@/components/molecules/Nav";
import { Menu, ShoppingCart, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// TIPOS DE DATOS
// ============================================

export interface HeaderProps {
    /** Items de navegación */
    navItems?: NavItem[];

    /** Sugerencias de búsqueda */
    searchSuggestions?: SearchSuggestion[];

    /** Callback al buscar */
    onSearch?: (query: string) => void;

    /** Callback al seleccionar sugerencia */
    onSearchSelect?: (suggestion: SearchSuggestion) => void;

    onSearchSubmit?: (query: string) => void;

    /** Número de items en carrito (para badge) */
    cartCount?: number;

    /** Usuario logueado */
    user?: {
        name: string;
        avatar?: string;
    } | null;

    /** Callback al clickear carrito */
    onCartClick?: () => void;

    /** Callback al clickear cuenta */
    onAccountClick?: () => void;

    /** Callback al clickear menú móvil */
    onMenuClick?: () => void;

    /** Clases adicionales */
    className?: string;
}

// ============================================
// COMPONENTE HEADER
// ============================================

const Header = forwardRef<HTMLElement, HeaderProps>(
    (
        {
            navItems = [],
            searchSuggestions = [],
            onSearch,
            onSearchSelect,
            cartCount = 0,
            user,
            onCartClick,
            onAccountClick,
            onMenuClick,
            onSearchSubmit,
            className,
        },
        ref
    ) => {
        const router = useRouter();
        const { isScrolled, isHidden } = useScrollHeader({ threshold: 50, hideThreshold: 200 });

        const [searchQuery, setSearchQuery] = useState("");
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        // Handlers
        const handleSearchChange = (value: string) => {
            setSearchQuery(value);
            onSearch?.(value);
        };

        const handleSearchSelect = (suggestion: SearchSuggestion) => {
            onSearchSelect?.(suggestion);
            setSearchQuery("");
        };

        const handleCartClick = () => {
            onCartClick?.();
            router.push("https://jovenpro.com/carrito/");
        };

        const handleAccountClick = () => {
            onAccountClick?.();
            //window.location.href = "https://jovenpro.com/wp-login.php";
            window.location.href = "https://jovenpro.com/my-account/";
        };

        const handleMenuClick = () => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            onMenuClick?.();
        };

        return (
            <header
                ref={ref}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled ? "pt-4" : "pt-0",
                    isHidden && "-translate-y-full",
                    className
                )}
            >
                <Container
                    size="lg"
                    padding={isScrolled ? "md" : "none"}
                    variant={isScrolled ? "surface-container" : "transparent"}
                    radius={isScrolled ? "clay" : "none"}
                    className={cn(
                        "flex items-center justify-between transition-all duration-500",
                        isScrolled ? "h-20 shadow-clay" : "h-24"
                    )}
                >
                    {/* Logo + Search (desktop) */}
                    <div className="flex items-center gap-10">
                        <Logo
                            href="/"
                            variant={isScrolled ? "default" : "default"}
                            size="md"
                        />

                        {/* SearchBar - desktop only */}
                        <div className="hidden lg:block">
                            <SearchBar
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onSelect={handleSearchSelect}
                                suggestions={searchSuggestions}
                                onSubmit={onSearchSubmit}
                                placeholder="Busca productos..."
                                size="md"
                                minChars={1}
                            />
                        </div>
                    </div>

                    {/* Navigation - desktop */}
                    <Nav
                        items={navItems}
                        direction="horizontal"
                        align="center"
                        size="md"
                        variant="default"
                        itemVariant="default"
                        className="hidden md:flex"
                    />

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Cart */}
                        <IconButton
                            icon={<ShoppingCart className="w-5 h-5" />}  // ✅ JSX EJECUTADO
                            variant="circular"
                            size="md"
                            aria-label="Carrito"
                            hasNotification={cartCount > 0}
                            notificationColor="secondary"
                            onClick={handleCartClick}
                            className="relative"
                        />

                        {/* Account - desktop */}
                        <div className="hidden md:block">
                            {user ? (
                                <IconButton
                                    icon={<User className="w-5 h-5" />}  // ✅ JSX EJECUTADO
                                    variant="default"
                                    size="md"
                                    aria-label={`Cuenta de ${user.name}`}
                                    onClick={handleAccountClick}
                                />
                            ) : (
                                <button
                                    onClick={handleAccountClick}
                                    className="bg-surface-container text-foreground h-12 px-8 rounded-clay font-bold hover:shadow-clay-active shadow-clay-sm transition-all"
                                >
                                    Mi Cuenta
                                </button>
                            )}
                        </div>

                        {/* Mobile menu toggle */}
                        <IconButton
                            icon={isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}  // ✅ JSX EJECUTADO
                            variant="ghost"
                            size="md"
                            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            onClick={handleMenuClick}
                            className="md:hidden"
                        />
                    </div>
                </Container>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <Container
                        size="full"
                        padding="md"
                        variant="surface-container"
                        className="md:hidden border-t border-surface-variant animate-in slide-in-from-top-2"
                    >
                        <div className="space-y-6 py-4">
                            {/* Mobile search */}
                            <SearchBar
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onSelect={handleSearchSelect}
                                suggestions={searchSuggestions}
                                placeholder="Busca productos..."
                                size="full"
                            />

                            {/* Mobile nav */}
                            <Nav
                                items={navItems}
                                direction="vertical"
                                align="start"
                                size="lg"
                                variant="minimal"
                                itemVariant="minimal"
                                itemSize="lg"
                            />

                            {/* Mobile account */}
                            {!user && (
                                <button
                                    onClick={handleAccountClick}
                                    className="w-full bg-primary text-white h-14 rounded-clay font-bold shadow-clay hover:shadow-clay-sm transition-all"
                                >
                                    Iniciar Sesión
                                </button>
                            )}
                        </div>
                    </Container>
                )}
            </header>
        );
    }
);

Header.displayName = "Header";

export { Header };