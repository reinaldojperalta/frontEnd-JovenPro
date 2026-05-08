// src/lib/data.ts
// ============================================
// DATOS MOCK — JovenPro V2 SPA (Imágenes locales)
// ============================================

// --------------------------------------------
// TIPOS BASE
// --------------------------------------------

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    discountPrice?: number;  // NUEVO: alias semántico para oldPrice
    currency: "COP" | "USD";
    image: string;
    category: string;
    artisan: {
        name: string;
        avatar: string;
        initials: string;
        verified: boolean;
    };
    badge?: string;
    status?: 'new' | 'sale' | 'featured' | 'none';  // NUEVO
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
    href?: string;  // NUEVO
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    initials: string;
    text: string;  // CAMBIO: content → text
    rating: number;
    productImage?: string;
}

export interface VideoItem {
    id: string;
    title: string;
    thumbnail: string;
    youtubeId: string;
    duration: string;
    artisan: string;
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
    logoSrc?: string;  // NUEVO
}

export interface WorkWithUsData {
    headline: string;
    subheadline: string;
    instagramUrl: string;  // NUEVO
    facebookUrl: string;   // NUEVO
    whatsappNumber: string;
    whatsappMessage: string;
    mapUrl: string;        // NUEVO
    locationLabel: string; // NUEVO
}

export interface FooterData {
    brand: string;
    tagline: string;
    links: { label: string; href: string }[];
    socials: { label: string; href: string }[];
    copyright: string;
}

// --------------------------------------------
// NAVEGACIÓN
// --------------------------------------------

export const navItems: NavItem[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Productos", href: "#productos" },
    { label: "Journal", href: "#journal" },
    { label: "Videos", href: "#videos" },
    { label: "Testimonios", href: "#testimonios" },
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
// PRODUCTOS (Imágenes locales)
// --------------------------------------------

export const products: Product[] = [
    {
        id: "prod-001",
        name: "Vasija de Barro Raku",
        slug: "vasija-de-barro-raku",
        description: "Pieza única cocida en técnica japonesa raku con esmaltes naturales.",
        price: 185000,
        oldPrice: 220000,
        discountPrice: 220000,
        currency: "COP",
        image: "/images/products/vasija-raku.jpg",
        category: "ceramica",
        artisan: {
            name: "María Camila R.",
            avatar: "/images/artisans/maria-camila.jpg",
            initials: "MR",
            verified: true,
        },
        badge: "Más vendido",
        status: "featured",
        rating: 4.9,
        reviewCount: 128,
    },
    {
        id: "prod-002",
        name: "Mochila Wayúu Original",
        slug: "mochila-wayuu-original",
        description: "Tejida a mano por artesanas wayúu con hilos de algodón egipcio.",
        price: 320000,
        currency: "COP",
        image: "/images/products/mochila-wayuu.jpg",
        category: "textil",
        artisan: {
            name: "Luisa Fernanda T.",
            avatar: "/images/artisans/luisa-fernanda.jpg",
            initials: "LT",
            verified: true,
        },
        badge: "Nuevo",
        status: "new",
        rating: 4.8,
        reviewCount: 86,
    },
    {
        id: "prod-003",
        name: "Aretes de Plata .925",
        slug: "aretes-de-plata-925",
        description: "Diseño minimalista con acabado martillado a mano.",
        price: 95000,
        oldPrice: 120000,
        discountPrice: 120000,
        currency: "COP",
        image: "/images/products/aretes-plata.jpg",
        category: "joyeria",
        artisan: {
            name: "Andrés Felipe G.",
            avatar: "/images/artisans/andres-felipe.jpg",
            initials: "AG",
            verified: true,
        },
        status: "sale",
        rating: 4.7,
        reviewCount: 64,
    },
    {
        id: "prod-004",
        name: "Tabla de Cortar en Nogal",
        slug: "tabla-de-cortar-en-nogal",
        description: "Madera de nogal americano con acabado en aceite de linaza.",
        price: 145000,
        currency: "COP",
        image: "/images/products/tabla-nogal.jpg",
        category: "madera",
        artisan: {
            name: "Carlos Eduardo M.",
            avatar: "/images/artisans/carlos-eduardo.jpg",
            initials: "CM",
            verified: false,
        },
        status: "none",
        rating: 4.6,
        reviewCount: 42,
    },
    {
        id: "prod-005",
        name: "Cartera de Cuero Vegetal",
        slug: "cartera-de-cuero-vegetal",
        description: "Cuero curtido vegetalmente, costuras a mano con hilo encerado.",
        price: 275000,
        currency: "COP",
        image: "/images/products/cartera-cuero.jpg",
        category: "cuero",
        artisan: {
            name: "Sofía Alejandra P.",
            avatar: "/images/artisans/sofia-alejandra.jpg",
            initials: "SP",
            verified: true,
        },
        badge: "Edición limitada",
        status: "featured",
        rating: 5.0,
        reviewCount: 37,
    },
    {
        id: "prod-006",
        name: "Tetera de Cerámica Japonesa",
        slug: "tetera-de-ceramica-japonesa",
        description: "Esmaltada en tonos verde musgo, ideal para ceremonia del té.",
        price: 210000,
        oldPrice: 250000,
        discountPrice: 250000,
        currency: "COP",
        image: "/images/products/tetera-ceramica.jpg",
        category: "ceramica",
        artisan: {
            name: "María Camila R.",
            avatar: "/images/artisans/maria-camila.jpg",
            initials: "MR",
            verified: true,
        },
        status: "sale",
        rating: 4.9,
        reviewCount: 93,
    },
    {
        id: "prod-007",
        name: "Hamaca Santandereana",
        slug: "hamaca-santandereana",
        description: "Tejida en algodón crudo con franjas tradicionales.",
        price: 450000,
        currency: "COP",
        image: "/images/products/hamaca-santandereana.jpg",
        category: "textil",
        artisan: {
            name: "Jorge Enrique V.",
            avatar: "/images/artisans/jorge-enrique.jpg",
            initials: "JV",
            verified: true,
        },
        status: "none",
        rating: 4.8,
        reviewCount: 55,
    },
    {
        id: "prod-008",
        name: "Hamaca Santandereana",
        slug: "hamaca-santandereana",
        description: "Tejida en algodón crudo con franjas tradicionales.",
        price: 450000,
        currency: "COP",
        image: "/images/products/hamaca-santandereana.jpg",
        category: "textil",
        artisan: {
            name: "Jorge Enrique V.",
            avatar: "/images/artisans/jorge-enrique.jpg",
            initials: "JV",
            verified: true,
        },
        status: "none",
        rating: 4.8,
        reviewCount: 55,
    },
    {
        id: "prod-009",
        name: "Hamaca Santandereana",
        slug: "hamaca-santandereana",
        description: "Tejida en algodón crudo con franjas tradicionales.",
        price: 450000,
        currency: "COP",
        image: "/images/products/hamaca-santandereana.jpg",
        category: "textil",
        artisan: {
            name: "Jorge Enrique V.",
            avatar: "/images/artisans/jorge-enrique.jpg",
            initials: "JV",
            verified: true,
        },
        status: "none",
        rating: 4.8,
        reviewCount: 55,
    },

];

// --------------------------------------------
// JOURNAL / NOTICIAS (Imágenes locales)
// --------------------------------------------

export const newsItems: NewsItem[] = [
    {
        id: "news-001",
        title: "El renacer de la cerámica colombiana",
        excerpt: "Cómo los jóvenes artesanos están revolucionando una tradición milenaria con técnicas contemporáneas y diseños de vanguardia.",
        category: "Cerámica",
        image: "/images/news/ceramica-colombiana.jpg",
        date: "28 Abr 2026",
        readTime: "5 min",
        href: "https://jovenpro.com/blog/ceramica-colombiana",
    },
    {
        id: "news-002",
        title: "Tejiendo tradición: El arte wayúu",
        excerpt: "Conoce el significado de cada patrón y color en el tejido ancestral del pueblo wayúu.",
        category: "Textil",
        image: "/images/news/tejido-wayuu.jpg",
        date: "25 Abr 2026",
        readTime: "4 min",
        href: "https://jovenpro.com/blog/arte-wayuu",
    },
    {
        id: "news-003",
        title: "La madera noble de los Andes",
        excerpt: "Un recorrido por los talleres de ebanistería que utilizan maderas sostenibles de la región.",
        category: "Madera",
        image: "/images/news/madera-andes.jpg",
        date: "22 Abr 2026",
        readTime: "6 min",
        href: "https://jovenpro.com/blog/madera-andes",
    },
    {
        id: "news-004",
        title: "Plata y esmeraldas: la dupla perfecta",
        excerpt: "Tendencias en joyería artesanal colombiana para esta temporada.",
        category: "Joyería",
        image: "/images/news/plata-esmeraldas.jpg",
        date: "18 Abr 2026",
        readTime: "3 min",
        href: "https://jovenpro.com/blog/plata-esmeraldas",
    },
];

// --------------------------------------------
// TESTIMONIOS (Imágenes locales)
// --------------------------------------------

export const testimonials: Testimonial[] = [
    {
        id: "test-001",
        name: "Valentina Ríos",
        role: "Diseñadora de Interiores",
        avatar: "/images/testimonials/valentina-rios.jpg",
        initials: "VR",
        text: "La vasija raku que compré es absolutamente única. El acabado irregular y los tonos naturales le dan un carácter que no encuentras en productos industriales. María Camila fue muy amable y me envió fotos del proceso de creación.",
        rating: 5,
        productImage: "/images/products/vasija-raku.jpg",
    },
    {
        id: "test-002",
        name: "Esteban Murillo",
        role: "Emprendedor",
        avatar: "/images/testimonials/esteban-murillo.jpg",
        initials: "EM",
        text: "Llevo dos años comprando en JovenPro y la calidad siempre supera mis expectativas. La mochila wayúu que le regalé a mi hermana fue el hit de la Navidad.",
        rating: 5,
    },
    {
        id: "test-003",
        name: "Camila Fernández",
        role: "Chef Profesional",
        avatar: "/images/testimonials/camila-fernandez.jpg",
        initials: "CF",
        text: "La tabla de nogal es una joya. La uso todos los días en mi restaurante y los clientes siempre preguntan dónde la conseguí. El acabado en aceite de linaza es perfecto.",
        rating: 4,
        productImage: "/images/products/tabla-nogal.jpg",
    },
    {
        id: "test-004",
        name: "Andrés López",
        role: "Fotógrafo",
        avatar: "/images/testimonials/andres-lopez.jpg",
        initials: "AL",
        text: "El collar de esmeraldas es simplemente espectacular. La calidad de las piedras y el trabajo del orfebre son de nivel internacional. Totalmente recomendado.",
        rating: 5,
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
        youtubeId: "dQw4w9WgXcQ",
        duration: "12:34",
        artisan: "María Camila R.",
    },
    {
        id: "vid-002",
        title: "Comunidad JovenPro",
        thumbnail: "/images/videos/thumbnail-wayuu.jpg",
        youtubeId: "dQw4w9WgXcQ",
        duration: "08:21",
        artisan: "Luisa Fernanda T.",
    },
];

// --------------------------------------------
// HERO SPLIT DATA (Imágenes locales)
// --------------------------------------------

export const heroSplitData: HeroSplitData = {
    left: {
        title: "Crea con nosotros",
        subtitle: "",
        cta: "Quiero vender",
        href: "#contacto",
        image: "/images/hero/emprendedor.jpg",
    },
    right: {
        title: "Apoya lo local",
        subtitle: "",
        cta: "Explorar tienda.",
        href: "#productos",
        image: "/images/hero/emprendedor.jpg",
    },
    logoSrc: "/images/logo/JovenPro-by-ZonaPro.png",
};

// --------------------------------------------
// WORK WITH US / CTA
// --------------------------------------------

export const workWithUsData: WorkWithUsData = {
    headline: "Únete a los demás emprendedores.",
    subheadline: "Transforma tu pasión en un negocio próspero. Accede a herramientas exclusivas, visibilidad internacional y una comunidad que respalda tu crecimiento artesanal.",
    instagramUrl: "https://instagram.com/jovenpro",
    facebookUrl: "https://facebook.com/jovenpro",
    whatsappNumber: "573001234567",
    whatsappMessage: "Hola, estoy interesado en ser emprendedor JovenPro.",
    mapUrl: "https://maps.google.com/?q=Madrid,España",
    locationLabel: "JovenPro HQ / Madrid, España",
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
        { label: "Instagram", href: "https://instagram.com/jovenpro" },
        { label: "Facebook", href: "https://facebook.com/jovenpro" },
        { label: "TikTok", href: "https://tiktok.com/@jovenpro" },
    ],
    copyright: `© ${new Date().getFullYear()} JovenPro. Todos los derechos reservados.`,
};