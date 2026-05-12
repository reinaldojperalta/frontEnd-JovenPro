// components/templates/MarketplaceTemplate.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Header,
    Footer,
    ProductGrid,
    Container,
    Heading,
    Text,
    Input,
    IconButton,
    Badge,
} from "@/components";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { Search, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
    id: number;
    image: string;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number;
    badge?: string;
    category: string;
    rating?: number;
    sales?: number;
}

interface Filter {
    id: string;
    name: string;
    options: Array<{
        value: string;
        label: string;
        count?: number;
    }>;
}

export interface MarketplaceTemplateProps {
    initialProducts: Product[];
    categories: string[];
    filters?: Filter[];
    navItems: Array<{
        id: string;
        label: string;
        href: string;
        isActive?: boolean;
    }>;
    footerColumns: Array<{
        title: string;
        links: Array<{ id: string; label: string; href: string }>;
    }>;
    title?: string;
    description?: string;
}

type ViewMode = "grid" | "list";

export function MarketplaceTemplate({
    initialProducts,
    categories,
    filters = [],
    navItems,
    footerColumns,
    title = "Marketplace",
    description = "Descubre productos únicos de emprendedores locales",
}: MarketplaceTemplateProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
    const [sortBy, setSortBy] = useState("relevance");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const { cart, addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();

    // Filtrar y ordenar productos
    const filteredProducts = initialProducts.filter((product) => {
        // Búsqueda por texto
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Filtros activos
        return Object.entries(activeFilters).every(([filterId, selectedValues]) => {
            if (selectedValues.length === 0) return true;
            // Lógica de filtrado personalizada según el tipo de filtro
            if (filterId === "category") return selectedValues.includes(product.category);
            if (filterId === "price") {
                // Lógica de rango de precios
                return true;
            }
            return true;
        });
    });

    const handleFilterToggle = (filterId: string, value: string) => {
        setActiveFilters((prev) => {
            const current = prev[filterId] || [];
            const updated = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { ...prev, [filterId]: updated };
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                navItems={navItems}
                cartCount={cart.length}
                onCartClick={() => router.push("/carrito")}
            />

            <main className="pt-32 pb-20">
                {/* Header del Marketplace */}
                <Container size="lg" padding="md" className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <Heading level="h1" className="mb-2">{title}</Heading>
                            <Text variant="body">{description}</Text>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-on-surface-variant">
                                {filteredProducts.length} productos
                            </span>
                        </div>
                    </div>
                </Container>

                {/* Barra de herramientas */}
                <Container size="lg" padding="md" className="mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-4 bg-surface rounded-clay shadow-clay">
                        {/* Búsqueda */}
                        <div className="flex-1 max-w-md">
                            <Input
                                variant="search"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={<Search className="w-5 h-5" />}
                                className="w-full"
                            />
                        </div>

                        {/* Controles */}
                        <div className="flex items-center gap-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-surface-container border-none rounded-clay px-4 py-2 text-sm font-bold shadow-clay-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="relevance">Relevancia</option>
                                <option value="price-asc">Precio: Menor a Mayor</option>
                                <option value="price-desc">Precio: Mayor a Menor</option>
                                <option value="newest">Más Recientes</option>
                            </select>

                            <div className="flex bg-surface-container rounded-clay shadow-clay-sm p-1">
                                <IconButton
                                    icon={<Grid3X3 className="w-4 h-4" />}
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="sm"
                                    aria-label="Vista grid"
                                    onClick={() => setViewMode("grid")}
                                    className={cn(viewMode === "grid" && "bg-surface shadow-sm")}
                                />
                                <IconButton
                                    icon={<LayoutList className="w-4 h-4" />}
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="sm"
                                    aria-label="Vista lista"
                                    onClick={() => setViewMode("list")}
                                    className={cn(viewMode === "list" && "bg-surface shadow-sm")}
                                />
                            </div>

                            <IconButton
                                icon={<SlidersHorizontal className="w-5 h-5" />}
                                variant="default"
                                size="md"
                                aria-label="Filtros"
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                                className="lg:hidden"
                            />
                        </div>
                    </div>
                </Container>

                {/* Contenido: Filtros + Grid */}
                <Container size="lg" padding="md">
                    <div className="flex gap-8">
                        {/* Sidebar de filtros */}
                        <aside
                            className={cn(
                                "lg:w-64 shrink-0",
                                "fixed lg:static inset-0 z-40 lg:z-auto bg-background lg:bg-transparent p-6 lg:p-0",
                                "transform transition-transform lg:transform-none",
                                showMobileFilters ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                            )}
                        >
                            <div className="lg:sticky lg:top-32 space-y-8">
                                <div className="flex items-center justify-between lg:hidden mb-6">
                                    <Heading level="h4">Filtros</Heading>
                                    <IconButton
                                        icon={<span className="text-2xl">×</span>}
                                        variant="ghost"
                                        size="md"
                                        aria-label="Cerrar filtros"
                                        onClick={() => setShowMobileFilters(false)}
                                    />
                                </div>

                                {filters.map((filter) => (
                                    <div key={filter.id} className="space-y-4">
                                        <Text variant="label">{filter.name}</Text>
                                        <div className="space-y-2">
                                            {filter.options.map((option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-3 cursor-pointer group"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={(activeFilters[filter.id] || []).includes(option.value)}
                                                        onChange={() => handleFilterToggle(filter.id, option.value)}
                                                        className="w-4 h-4 rounded border-surface-variant text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-sm group-hover:text-primary transition-colors">
                                                        {option.label}
                                                    </span>
                                                    {option.count !== undefined && (
                                                        <Badge variant="default" size="sm" className="ml-auto">
                                                            {option.count}
                                                        </Badge>
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {Object.keys(activeFilters).length > 0 && (
                                    <button
                                        onClick={() => setActiveFilters({})}
                                        className="text-sm text-primary hover:underline font-bold"
                                    >
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        </aside>

                        {/* Overlay móvil */}
                        {showMobileFilters && (
                            <div
                                className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                                onClick={() => setShowMobileFilters(false)}
                            />
                        )}

                        {/* Grid de productos */}
                        <div className="flex-1">
                            <ProductGrid
                                title=""
                                overline=""
                                products={filteredProducts}
                                categories={[]}
                                activeCategory="Todos"
                                onCategoryChange={() => { }}
                                onAddToCart={(id) => {
                                    const product = initialProducts.find((p) => p.id === id);
                                    if (product) addToCart(product);
                                }}
                                onToggleFavorite={toggleFavorite}
                                favoriteIds={favorites}
                                cartIds={cart.map((c) => c.id)}
                                isLoading={isLoading}
                                columns={viewMode === "grid" ? { mobile: 1, tablet: 2, desktop: 3 } : { mobile: 1, tablet: 1, desktop: 1 }}
                            />
                        </div>
                    </div>
                </Container>
            </main>

            <Footer columns={footerColumns} />
        </div>
    );
}