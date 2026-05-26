// src/lib/data/config.ts
// ============================================
// CONFIGURACIÓN DE UI / LAYOUT — JovenPro V2
// ============================================

import type {
    Category,
    FooterData,
    HeroSplitData,
    NavItem,
    Testimonial,
    VideoItem,
    WorkWithUsData,
} from "./types";

// --------------------------------------------
// NAVEGACIÓN
// --------------------------------------------

export const navItems: NavItem[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Productos", href: "#productos" },
    { label: "Noticias", href: "#journal" },
    { label: "Membresías", href: "https://jovenpro.com/membresias/" },
    { label: "Convocatorias", href: "https://jovenpro.com/convocatorias/" },
    { label: "Contacto", href: "#contacto" },
];

// --------------------------------------------
// CATEGORÍAS
// --------------------------------------------

export const categories: Category[] = [
    { id: "todos", name: "Todos", icon: "LayoutGrid", count: 24 },
    { id: "ceramica", name: "Cerámica", icon: "Coffee", count: 6 },
    { id: "textil", name: "Textil", icon: "Scissors", count: 5 },
    { id: "joyeria", name: "Joyería", icon: "Gem", count: 4 },
    { id: "madera", name: "Madera", icon: "TreePine", count: 5 },
    { id: "cuero", name: "Cuero", icon: "ShoppingBag", count: 4 },
];

// --------------------------------------------
// TESTIMONIOS
// --------------------------------------------

export const testimonials: Testimonial[] = [
    {
        id: "test-001",
        name: "QuigsyOnlineShop",
        role: "@quigsyonlineshop",
        avatar: "/images/testimonials/quisisy-avatar.webp",
        initials: "Quigsy",
        text: "Me ayuda a conseguir clientes, ha sido mi vitrina comercial y subió mis ventas en un 70% Instagram @quigsyonlineshop",
        rating: 4,
        productImage: "/images/testimonials/quisisy-avatar.webp",
    },
    {
        id: "test-002",
        name: "Dementes Abiertas",
        role: "@dementesabiertasboyaca",
        avatar: "/images/testimonials/dementes-avatar.webp",
        initials: "Dementes Abiertas",
        text: "He podido potenciar mis clientes, la publicidad en redes sociales y el reconocimiento que tenemos nosotros los emprendedores en cuanto a ferias comerciales.",
        rating: 5,
    },
    {
        id: "test-003",
        name: "Atisbe",
        role: "@_atisbe_",
        avatar: "/images/testimonials/atisbe-avatar.webp",
        initials: "Atisbe",
        text: "El inmenso valor de hacer alianza con Joven Pro, me permite eso en diferentes formas, porque no sólo es el espacio físico abierto constantemente...",
        rating: 4,
    },
];

// --------------------------------------------
// VIDEOS (Thumbnails locales)
// --------------------------------------------

export const videos: VideoItem[] = [
    {
        id: "vid-001",
        title: "El Proceso Creativo",
        thumbnail: "/images/videos/thumbnail-raku.jpg",
        youtubeId: "VEMl5roUvtM",
        duration: "12:34",
        emprendedor: "María Camila R.",
    },
    {
        id: "vid-002",
        title: "Comunidad JovenPro",
        thumbnail: "/images/videos/thumbnail-wayuu.jpg",
        youtubeId: "ahDnIPYPPgQ",
        duration: "08:21",
        emprendedor: "Luisa Fernanda T.",
    },
];

// --------------------------------------------
// HERO SPLIT DATA (Imágenes locales)
// --------------------------------------------

export const heroSplitData: HeroSplitData = {
    left: {
        title: "¡Quiero Unirme!",
        subtitle: "Soy Emprendedor",
        cta: " HACER PARTE",
        href: "#contacto",
        image: "/images/hero/imagen_heroSide_emprendedor.webp",
    },
    right: {
        title: "Apoya lo nuestro",
        subtitle: "Quiero comprar",
        cta: "EXPLORAR TIENDA.",
        href: "#productos",
        image: "/images/hero/emprendedor-mirror.png",
    },
    logoSrc: "/images/logo/JovenPro-by-ZonaPro.png",
};

// --------------------------------------------
// WORK WITH US / CTA
// --------------------------------------------

export const workWithUsData: WorkWithUsData = {
    headline: "Únete a la comunidad de Emprendedores.",
    subheadline:
        "Agenda una reunión virtual y/o presencial y únete al mejor ecosistema de emprendedores de la región.",
    sectionLabel: "Trabaja con Nosotros",
    socialsLabel: "Conecta con nosotros",
    whatsappDisplayLabel: "WhatsApp: +57 302 484 0101",
    membershipsDisplayLabel: "Membresías", // AÑADIDO
    membershipsUrl: "https://jovenpro.com/membresias", // AÑADIDO (cambiar por URL real)
    instagramUrl: "https://www.instagram.com/jovenprocolombia",
    facebookUrl: "https://www.facebook.com/jovenprocolombia",
    whatsappNumber: "573024840101",
    whatsappMessage: "Hola, estoy interesado en ser emprendedor JovenPro.",
    mapUrl: "https://maps.app.goo.gl/Lq3bkJrCh4hacK8g7",
    locationLabel: "JovenPro / Sogamoso, Boyacá",
    mapImageUrl: "/images/logo/mapa.webp",
    locationSubLabel: "Descubre tu potencial",
};

// --------------------------------------------
// FOOTER DATA
// --------------------------------------------

export const footerData: FooterData = {
    brand: "JOVENPRO",
    tagline: "Hecho a mano, hecho con alma.",
    links: [
        { label: "Términos y condiciones", href: "#" },
        { label: "Política de privacidad", href: "#" },
        { label: "Preguntas frecuentes", href: "#" },
    ],
    socials: [
        { label: "Instagram", href: "https://www.instagram.com/jovenprocolombia" },
        { label: "Facebook", href: "https://www.facebook.com/jovenprocolombia" },
        { label: "WhatsApp", href: "https://wa.me/573024840101" },
        { label: "Telegram", href: "https://t.me/jovenpro" },
    ],
    copyright: `© ${new Date().getFullYear()} JovenPro. Todos los derechos reservados.`,
};