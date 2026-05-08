// app/debug/skeleton/page.tsx
"use client";

import { HomeTemplateSkeleton } from "@/components/templates/HomeTemplateSkeleton";
import { HomeTemplate } from "@/components/templates/HomeTemplate";

const DEBUG_DATA = {
    navItems: [
        { id: "marketplace", label: "Marketplace", href: "https://jovenpro.com/tienda", isActive: true },
        { id: "nosotros", label: "Nosotros", href: "https://jovenpro.com/nosotros/" },
        { id: "servicios", label: "Servicios", href: "https://jovenpro.com/membresias/" },
        { id: "convocatorias", label: "Convocatorias", href: "https://jovenpro.com/fex-feriaexpojoven/" },
    ],

    searchSuggestions: [
        { id: 1, label: "Pollito Gigante Amigurumi", category: "Tejidos" },
        { id: 2, label: "Aretes Cuerpo Artesanía", category: "Accesorios" },
        { id: 3, label: "Mapamundi Dioses Griegos", category: "Hogar" },
    ],

    featuredProduct: {
        image: "/placeholders/skillet-01.png",
        title: "Cerámica Ancestral v2",
        subtitle: "Destacado de la Semana",
        author: "Artesanías del Valle",
    },

    initialProducts: [
        {
            id: 1,
            image: "/placeholders/amigurumi.webp",
            name: "Pollito Gigante Amigurumi",
            brand: "Carolinda Amigurumis",
            price: 55000,
            oldPrice: 90000,
            badge: "Nuevo",
            badgeVariant: "primary" as const,
            category: "Tejidos",
            href: "/producto/1",
        },
        {
            id: 2,
            image: "/placeholders/skillet-02.png",
            name: "Aretes Cuerpo Artesanía",
            brand: "Accesorios Pro",
            price: 9000,
            badge: "Handmade",
            badgeVariant: "secondary" as const,
            category: "Accesorios",
            href: "/producto/2",
        },
        {
            id: 3,
            image: "/placeholders/skillet-03.png",
            name: "Mapamundi Dioses Griegos",
            brand: "Atlas Decor",
            price: 45000,
            badge: "Best Seller",
            badgeVariant: "primary" as const,
            category: "Hogar",
            href: "/producto/3",
        },
        {
            id: 4,
            image: "/placeholders/skillet-04.png",
            name: "Buzo Unisex Camisero",
            brand: "Trendwear Joven",
            price: 150000,
            category: "Moda",
            href: "/producto/4",
        },
    ],

    categories: ["Tejidos", "Moda", "Accesorios", "Hogar"],

    footerColumns: [
        {
            title: "Marketplace",
            links: [
                { id: "nuevos", label: "Nuevos Ingresos", href: "/nuevos" },
                { id: "bestsellers", label: "Best Sellers", href: "/bestsellers" },
                { id: "ofertas", label: "Ofertas Flash", href: "/ofertas" },
            ],
        },
        {
            title: "Compañía",
            links: [
                { id: "nosotros", label: "Sobre Nosotros", href: "/nosotros" },
                { id: "sostenibilidad", label: "Sostenibilidad", href: "/sostenibilidad" },
                { id: "prensa", label: "Prensa", href: "/prensa" },
            ],
        },
    ],
};

export default function DebugSkeleton() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold p-4">SKELETON</h1>
            <HomeTemplateSkeleton productCount={4} />

            <hr className="border-red-500 border-4" />

            <h1 className="text-2xl font-bold p-4">REAL</h1>
            <HomeTemplate {...DEBUG_DATA} />
        </div>
    );
}