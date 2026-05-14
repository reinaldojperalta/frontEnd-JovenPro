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
    sectionLabel: string;          // Etiqueta overline de la sección (ej. "Maker Hub")
    socialsLabel: string;          // Label sobre los iconos sociales (ej. "Conecta con nosotros")
    whatsappDisplayLabel: string;  // Texto visible del enlace de WhatsApp
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

// --------------------------------------------
// NAVEGACIÓN
// --------------------------------------------

export const navItems: NavItem[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Productos", href: "#productos" },
    { label: "Noticias", href: "#journal" },
    { label: "Videos", href: "#videos" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "emprende", href: "#contacto" },
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
        id: "prod-23597",
        slug: "ondas-sin-calor-de-satin-con-2-scrunchies",
        name: "Ondas sin calor de satín con 2 scrunchies",
        description: "Consigue ondas y rizos definidos sin necesidad de aplicar calor. Este set de satén en color rosa incluye moldeador y 2 scrunchies, ideales para crear un peinado cómodo, suave y respetuoso con tu cabello mientras duermes o durante varias horas.",
        price: 25000,
        currency: "COP",
        image: "/images/products/ondas-sin-calor.webp",
        category: "textil",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22428",
        slug: "gorro-satin-doble-tela",
        name: "Gorro Satín Doble Tela",
        description: "GORRO DOBLE TELA, se puede usar por ambos lados tienes la opción de pedirlos unicolor o en dos colores, disponible en varios colores, manejamos horma adulto y horma niños, no olvides preguntar en que tamaño lo necesitas.",
        price: 30000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/gorro-satin-doble-tela.webp",
        category: "textil",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Nuevo",
        status: "none",
        rating: 0,
        reviewCount: 0,
    }, {
        id: "prod-22418",
        slug: "scrunchies-mediano",
        name: "Scrunchies Mediano",
        description: "Disponible es muchos colores",
        price: 9000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/scrunchies-mediano.webp",
        category: "textil",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22373",
        slug: "kit-antrifrizz-cuidado-completo",
        name: "Kit Antrifrizz Cuidado Completo",
        description: "ADQUIERE NUESTRO KIT CUIDADO CAPILAR! Gorro satín doble faz 2 fundas de almohada tamaño estándar Schunchie Toalla en microfibra para el cabelo",
        price: 90000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/kit-antrifrizz-cuidado-completo.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22324",
        slug: "calzado-hombre-ref-raices",
        name: "Calzado hombre ref raices",
        description: "Calzado que están hecho con técnicas de telares mapuche y tejido guane. Hecho con fibras textiles de fique, yute y algodón pensado también para personas que cuiden el medio ambiente",
        price: 110000,
        oldPrice: 130000,
        discountPrice: 130000,
        currency: "COP",
        image: "/images/products/calzado-hombre-ref-raices.webp",
        category: "textil",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "En oferta",
        status: "sale",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22314",
        slug: "zapato-ref-tayrona",
        name: "zapato ref tayrona",
        description: "calzado que están hecho con técnicas ancestrales y tejido guane. Hecho con fibras textiles de fique, yute y algodón pensado también para personas que cuiden el medio ambiente",
        price: 110000,
        oldPrice: 130000,
        discountPrice: 130000,
        currency: "COP",
        image: "/images/products/zapato-ref-tayrona.webp",
        category: "textil",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "En oferta",
        status: "sale",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22201",
        slug: "soporte-y-control-nintendo-switch",
        name: "Soporte y control Nintendo Switch",
        description: "¡Atención gamer! ¿Cansado de soportes aburridos? ¡Este soporte/control 2 en 1 con diseño de planta carnívora es la pieza única que tu setup NECESITA! Compatible con los controles Joy-Con de Nintendo Switch.",
        price: 99900,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/soporte-y-control-nintendo-switch.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22151",
        slug: "combo-grabador-y-cortador-laser-phecda",
        name: "COMBO Grabador y cortador láser Phecda",
        description: "transforma tu creatividad con phecda combo graba corta personaliza sin límites proyectos únicos detalles perfectos hazlo fácil hazlo rápido actúa hoy",
        price: 4409000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/combo-grabador-y-cortador-laser-phecda.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22145",
        slug: "elegoo-mars-5-ultra",
        name: "ELEGOO MARS 5 ULTRA",
        description: "Siente la precisión de la Elegoo Mars 5 Ultra. Detalles increíbles, velocidad y gran formato. ¿Necesitas impresiones en resina? ¡Nosotros lo hacemos! Contáctanos y crea hoy!",
        price: 2518000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/elegoo-mars-5-ultra.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22134",
        slug: "elegoo-neptune-4",
        name: "ELEGOO NEPTUNE 4",
        description: "siente la adrenalina de la impresión 3d ultrarrápida con neptune 4 diseña sin límites materializa tus ideas en tiempo récord observa cómo la precisión se une a la velocidad olvídate de esperas infinitas dale alas a tu creatividad hoy",
        price: 1732500,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/elegoo-neptune-4.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-22129",
        slug: "bambu-lab-a1-combo",
        name: "Bambu Lab A1 Combo",
        description: "imprime en múltiples colores con la bambu lab a1 combo incluye envío gratis ¡ordénala ya en nextgen3d!",
        price: 3969000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/bambu-lab-a1-combo.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-21874",
        slug: "pollito-gigante-amigurumi",
        name: "Pollito Gigante Amigurumi",
        description: "¡Conoce nuestro encantador Amigurumi de Pollito Gigante hecho a mano! Producto Exclusivo – Uno solo por referencia. Marca: Carolinda Amigurumis Alto: 18 cm Ancho: 17 cm Largo: 15 cm Beneficios: Te acompañará en la hora de dormir. Será tu amigo de todos los días. Te brindará apoyo emocional como tu muñeco de apego. Ideal como decoración para tu hogar. Perfecto para llevar de viaje o tenerlo en el auto. Lavable en funda(maquina) o a mano Antiestrés Para todas las edades Tiene ojos de seguridad para los más chicos.",
        price: 55000,
        oldPrice: 90000,
        discountPrice: 90000,
        currency: "COP",
        image: "/images/products/pollito-gigante-amigurumi.webp",
        category: "textil",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "En oferta",
        status: "sale",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-21730",
        slug: "ancheta-jb-licores",
        name: "Ancheta JB Licores",
        description: "ANCHETA JB LICORES Caja organizadora forte No 2 alta 6.5 lt Licor artesanal JB botella x 375 ml ( Escoge el licor JB que quieras) Galleta gameza x 180g Galletas crakeñas saltin mini taco x 106 g Mermelada Aro x 200 g Natilla x 300 g Atun lomo en agua x 170 g",
        price: 47000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/ancheta-jb-licores.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-21713",
        slug: "crema-de-whisky-de-chocolate-750-ml",
        name: "Crema de Whisky De Chocolate 750 ML",
        description: "Exquisita Crema de whisky sabor a chocolate, usamos cocoa en su elaboracion, sabor unico y caracteristico por su aroma y sabor, 15% de graduacion alcoholica.",
        price: 47000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/crema-de-whisky-de-chocolate-750-ml.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-21658",
        slug: "laser-kitdiy",
        name: "Grabadora y Cortadora Láser – KIT DIY MK2 10W",
        description: "Láser de Corte y Grabado AlgoLaser con una potencia óptica de 10W, cuenta con pantalla táctil (Control Offline), un área de trabajo de 400x400mm, Wi-fi y protecciones de seguridad.",
        price: 2200000,
        oldPrice: 2500000,
        discountPrice: 2500000,
        currency: "COP",
        image: "/images/products/laser-kitdiy.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "En oferta",
        status: "sale",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-20498",
        slug: "manjar-de-rosas",
        name: "Manjar de Rosas",
        description: "Esencia comestible de Rosas, endulzado con miel de abejas, 100% orgánico",
        price: 33000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/manjar-de-rosas.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-19744",
        slug: "vela-mini-5x5-en-presentacion-de-75-gramos",
        name: "Vela Mini 5x5 en presentación de 75 gramos",
        description: "Vela aromática en presentación Mini ideales para detalle o ambientar espacios pequeños. Personalizadas de acuerdo con el bienestar que genera su aroma o en colores intencionadas con el beneficio asociado a su color. Categorías disponibles 1. Elixir relajante y sanador: Lavanda – vainilla – sándalo 2. Concentración, jovialidad e inspiración: Jazmín 3. Agradecimiento y manifestación: Vainilla 4. Vela de los deseos y la prosperidad: Galletas 5. Vitalidad y buena energía: Sandía 6. Conciencia y meditación: Sándalo 7. Historias por agradecer y festejar: Ron 8. Vigor mental y espiritual: Coctel de frutas cítricas 9. Vela de los recuerdos y la felicidad: Chocolate 10. Conexión y equilibrio emocional: Coco lima",
        price: 13900,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/vela-mini-5x5-en-presentacion-de-75-gramos.webp",
        category: "todos",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-18821",
        slug: "precolombino",
        name: "PreColombino",
        description: "Alcancia Mini Pig Precolombino Grabado $45.000",
        price: 45000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/precolombino.webp",
        category: "ceramica",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },
    {
        id: "prod-15752",
        slug: "cafe-500-gr-origen-berbeo-boyaca-incluye-aretes",
        name: "Café 500 Gr Origen Berbeo Boyacá (Incluye Aretes)",
        description: "",
        price: 29000,
        // oldPrice: undefined,
        // discountPrice: undefined,
        currency: "COP",
        image: "/images/products/cafe-500-gr-origen-berbeo-boyaca-incluye-aretes.webp",
        category: "joyeria",
        artisan: {
            name: "Artesano JovenPro",
            avatar: "/images/artisans/placeholder_author.png",
            initials: "JP",
            verified: false,
        },
        badge: "Destacado",
        status: "featured",
        rating: 0,
        reviewCount: 0,
    },


];

// --------------------------------------------
// JOURNAL / NOTICIAS (Imágenes locales)
// --------------------------------------------

export const newsItems: NewsItem[] = [
    {
        id: "news-001",
        title: "Capacitaciones & Cursos para Emprendedores",
        excerpt: "Universidad Santo Tomas 11 y 12 de Mayo Emprendimiento a otro nivel Capacitaciones en Marketing Digital con Inteligencia Artificia en Alianza Peace Corps Colombia Alianza Internacional para promover productos en Estados Únidos.",
        category: "Capacitaciones",
        image: "/images/news/jovenpro_noticia_uno.webp",
        date: "12 May 2026",
        readTime: "5 min",
        href: "https://www.sumerce.org/jovenpro",
    },
    {
        id: "news-002",
        title: "Tejiendo tradición: El arte wayúu",
        excerpt: "Conoce el significado de cada patrón y color en el tejido ancestral del pueblo wayúu.",
        category: "Textil",
        image: "/images/news/madera-andes.jpg",
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
    {
        id: "news-005",
        title: "Cerámica raku: fuego y alma colombiana",
        excerpt: "La técnica milenaria del raku llega a los talleres de JovenPro. Descubre cómo nuestros artesanos fusionan la tradición japonesa con la identidad boyacense.",
        category: "Cerámica",
        image: "/images/news/madera-andes.jpg",
        date: "10 Abr 2026",
        readTime: "5 min",
        href: "https://jovenpro.com/blog/ceramica-raku",
    },
];

// --------------------------------------------
// TESTIMONIOS (Imágenes locales)
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
        youtubeId: "VEMl5roUvtM",
        duration: "12:34",
        artisan: "María Camila R.",
    },
    {
        id: "vid-002",
        title: "Comunidad JovenPro",
        thumbnail: "/images/videos/thumbnail-wayuu.jpg",
        youtubeId: "ahDnIPYPPgQ",
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
        subtitle: "Únete a nuestra plataforma y lleva tus productos a miles de compradores.",
        cta: "Quiero vender",
        href: "#contacto",
        image: "/images/hero/imagen_heroSide_emprendedor.webp",
    },
    right: {
        title: "Apoya lo local",
        subtitle: "Descubre artesanías únicas, hechas a mano por emprendedores colombianos.",
        cta: "Explorar tienda.",
        href: "#productos",
        image: "/images/hero/emprendedor-mirror.jpg",
    },
    logoSrc: "/images/logo/JovenPro-by-ZonaPro.png",
};

// --------------------------------------------
// WORK WITH US / CTA
// --------------------------------------------

export const workWithUsData: WorkWithUsData = {
    headline: "Únete a los demás emprendedores.",
    subheadline: "Transforma tu pasión en un negocio próspero. Accede a herramientas exclusivas, visibilidad internacional y una comunidad que respalda tu crecimiento emprendedor.",
    sectionLabel: "Maker Hub",
    socialsLabel: "Conecta con nosotros",
    whatsappDisplayLabel: "WhatsApp: +57 302 484 0101",
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
        { label: "Facebook",  href: "https://www.facebook.com/jovenprocolombia" },
        { label: "WhatsApp",  href: "https://wa.me/573024840101" },
        { label: "Telegram",  href: "https://t.me/jovenpro" },
    ],
    copyright: `© ${new Date().getFullYear()} JovenPro. Todos los derechos reservados.`,
};