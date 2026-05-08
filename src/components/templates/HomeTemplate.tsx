// components/templates/HomeTemplate.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Header,
    Hero,
    ProductGrid,
    ContactSection,
    Footer,
    PageSkeleton,
} from "@/components";
import { useCart, useFavorites, type CartItem } from "@/hooks";
import { ArrowRight, Play } from "lucide-react";
import type { ReactNode } from "react";
import { HomeTemplateSkeleton } from "./HomeTemplateSkeleton";

// Tipos de props - TODOS los iconos como ReactNode (JSX ejecutado)
interface FeaturedProduct {
    image: string;
    title: string;
    subtitle?: string;
    author?: string;
    href?: string;
}

interface NavItem {
    id: string;
    label: string;
    href: string;
    isActive?: boolean;
}

interface SearchSuggestion {
    id: string | number;
    label: string;
    category?: string;
}

interface FooterColumn {
    title: string;
    links: Array<{
        id: string;
        label: string;
        href: string;
    }>;
}

interface Product {
    id: number;
    image: string;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number;
    badge?: string;
    badgeVariant?: "default" | "primary" | "secondary" | "danger";
    category: string;
    href?: string;
}

// ✅ HeroCTA - icon SIEMPRE como ReactNode (nunca ComponentType)
interface HeroCTA {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
    priority?: "primary" | "secondary";
}

export interface HomeTemplateProps {
    initialProducts: Product[];
    categories: string[];
    featuredProduct: FeaturedProduct;
    navItems: NavItem[];
    searchSuggestions: SearchSuggestion[];
    footerColumns: FooterColumn[];
    whatsappNumber?: string;
}

export function HomeTemplate({
    initialProducts,
    categories,
    featuredProduct,
    navItems,
    searchSuggestions,
    footerColumns,
    whatsappNumber = "573001234567",
}: HomeTemplateProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);

    const { cart, addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();

    // ✅ Simular carga inicial (reemplazar por fetch real cuando conectes API)
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    // Filtrar productos por categoría
    useEffect(() => {
        if (activeCategory === "Todos") {
            setFilteredProducts(initialProducts);
        } else {
            setFilteredProducts(
                initialProducts.filter(
                    (p) => p.badge === activeCategory || p.category === activeCategory
                )
            );
        }
    }, [activeCategory, initialProducts]);

    // ✅ RENDERIZAR SKELETON MIENTRAS CARGA
    if (isLoading) {
        return (
            <HomeTemplateSkeleton
                productCount={initialProducts.length || 4}
                columns={{ mobile: 1, tablet: 2, desktop: 4 }}
            />
        );
    }

    // ✅ Transformar searchSuggestions con callbacks memoizados (evita recreación)
    const transformedSuggestions = searchSuggestions.map((s) => ({
        id: s.id,
        label: s.label,
        category: s.category,
        onClick: () => {
            const url = `https://jovenpro.com/?s=${encodeURIComponent(s.label)}&post_type=product&product_cat`;
            window.open(url, '_blank');
        },
    }));

    // ✅ Handler memoizado para addToCart (evita que cambie referencia en cada render)
    const handleAddToCart = (id: string | number) => {
        // Convertir a number ya que tus productos usan id numérico
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        const product = initialProducts.find((p) => p.id === numericId);
        if (product) {
            addToCart(product);
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Header
                navItems={navItems}
                searchSuggestions={transformedSuggestions}
                cartCount={cart.length}
                onSearchSubmit={(query) => {
                    const baseUrl = "https://jovenpro.com/";
                    const searchParams = `?s=${encodeURIComponent(query)}&post_type=product&product_cat`;
                    window.location.href = `${baseUrl}${searchParams}`;
                }}
                onCartClick={() => router.push("/carrito")}
            />

            <main className="pt-20">
                <Hero
                    badge={{
                        text: "¡Nueva Temporada JovenPro!",
                        indicator: true,
                    }}
                    title="Propulsando"
                    gradientTitle="Tu Emprendimiento"
                    description="Impulsamos el talento de los emprendedores más creativos de la región. Descubre productos únicos con impacto social y ambiental real."
                    primaryAction={{
                        label: "Explorar Marketplace",
                        icon: <ArrowRight className="w-5 h-5" />,  // ✅ JSX ejecutado
                        onClick: () => window.location.href = "https://jovenpro.com/tienda",
                    }}
                    secondaryAction={{
                        label: "Ver Historia",
                        icon: <Play className="w-5 h-5" />,  // ✅ JSX ejecutado
                        onClick: () => window.location.href = "https://www.youtube.com/watch?v=VEMl5roUvtM",
                    }}
                    featuredItem={featuredProduct}
                    variant="split"
                />

                <ProductGrid
                    title="Talento que Impulsa el Futuro"
                    overline="Marketplace JovenPro"
                    products={filteredProducts}
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={toggleFavorite}
                    favoriteIds={favorites}
                    cartIds={cart.map((c) => c.id)}
                    showFilterButton={true}
                    onFilterClick={() => console.log("Abrir filtros avanzados")}
                    columns={{ mobile: 1, tablet: 2, desktop: 4 }}
                />

                <ContactSection
                    titleLine1="¿Eres un"
                    titleLine2="Emprendedor?"
                    description="Únete a la mayor red de talento joven y lleva tus creaciones a todo el mundo."
                    features={["Visibilidad Global", "Soporte Logístico"]}
                    onSubmit={async (email) => {
                        // ⚠️ /api/subscribe aún no existe — simulación hasta que se conecte el backend
                        // TODO: reemplazar por fetch real cuando la API esté disponible:
                        // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
                        await new Promise((resolve) => setTimeout(resolve, 800));
                        console.log("[ContactSection] Email registrado (simulado):", email);
                    }}
                />
            </main>

            <Footer
                columns={footerColumns}
                whatsapp={{
                    phone: whatsappNumber,
                    message: "Hola, quiero ser parte de JovenPro",
                }}
            />
        </div>
    );
}