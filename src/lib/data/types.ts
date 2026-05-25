// src/lib/data/types.ts
// ============================================
// TIPOS BASE — JovenPro V2
// ============================================

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    discountPrice?: number; // NUEVO: alias semántico para oldPrice
    currency: "COP" | "USD";
    image: string;
    category: string;
    emprendedor: {
        name: string;
        avatar: string;
        initials: string;
        verified: boolean;
    };
    badge?: string;
    status?: "new" | "sale" | "featured" | "none"; // NUEVO
    rating: number;
    reviewCount: number;
}

export interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    date: string;
    readTime: string;
    href?: string; // NUEVO
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    initials: string;
    text: string; // CAMBIO: content → text
    rating: number;
    productImage?: string;
}

export interface VideoItem {
    id: string;
    title: string;
    thumbnail: string;
    youtubeId: string;
    duration: string;
    emprendedor: string;
}

export type StoreCategoryId =
    | "artesanias"
    | "alimentos"
    | "moda_belleza"
    | "servicios";

export interface Store {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    location: string;
    category: StoreCategoryId;
    rating: number;
    reviewCount: number;
    emprendedor: {
        name: string;
        avatar: string;
        initials: string;
        verified: boolean;
    };
}

export interface NavItem {
    label: string;
    href: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    count: number;
}

export interface HeroSplitSide {
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    image: string;
}

export interface HeroSplitData {
    left: HeroSplitSide;
    right: HeroSplitSide;
    logoSrc?: string; // NUEVO
}

export interface WorkWithUsData {
    headline: string;
    subheadline: string;
    sectionLabel: string; // Etiqueta overline de la sección (ej. "Maker Hub")
    socialsLabel: string; // Label sobre los iconos sociales (ej. "Conecta con nosotros")
    whatsappDisplayLabel: string; // Texto visible del enlace de WhatsApp
    membershipsDisplayLabel: string; // NUEVO: Texto visible del enlace de membresías
    membershipsUrl: string; // NUEVO: URL de membresías
    instagramUrl: string;
    facebookUrl: string;
    whatsappNumber: string;
    whatsappMessage: string;
    mapUrl: string;
    locationLabel: string;
    mapImageUrl: string;
    locationSubLabel: string;
}

export interface FooterData {
    brand: string;
    tagline: string;
    links: { label: string; href: string }[];
    socials: { label: string; href: string }[];
    copyright: string;
}