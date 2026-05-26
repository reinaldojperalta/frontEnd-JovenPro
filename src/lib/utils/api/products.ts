// lib/api/products.ts
// Server-side data fetching

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    badge?: string;
}

export async function getProducts(): Promise<Product[]> {
    // En producción: llamada a API o DB
    // const res = await fetch("https://api.jovenpro.com/products", { cache: "no-store" });

    // Mock data por ahora
    return [
        {
            id: 1,
            name: "Pollito Gigante Amigurumi",
            brand: "Carolinda Amigurumis",
            price: 55000,
            oldPrice: 90000,
            image: "/placeholders/amigurumi.webp",
            category: "Tejidos",
            badge: "Nuevo",
        },
        // ... más productos
    ];
}

export async function getCategories(): Promise<string[]> {
    return ["Tejidos", "Moda", "Accesorios", "Hogar"];
}

export async function getFeaturedProduct() {
    return {
        image: "/placeholders/skillet-01.webp",
        title: "Cerámica Ancestral v2",
        subtitle: "Destacado de la Semana",
        author: "Artesanías del Valle",
    };
}