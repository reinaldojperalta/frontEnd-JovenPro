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
    emprendedor: {
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
    emprendedor: string;
}

export interface Store {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    location: string;
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

export const stores: Store[] = [

    {
        id: "345",
        slug: "fragola-premium",
        name: "Fragola Premium",
        description: "Condiciones de entrega y conservación La entrega del producto se realiza a domicilio, por lo cual el cliente debe proporcionar una dirección exacta y completa, o indicar un lugar específico y seguro donde el pedido pueda ser recibido o dejado. Una vez entregado, es responsabilidad del cliente garantizar su adecuada conservación.  El producto debe mantenerse en un lugar fresco y seco. No es necesario refrigerarlo; sin embargo, en caso de hacerlo, se recomienda no someterlo a temperaturas muy bajas, ya que esto puede afectar su textura y calidad original. Se aconseja evitar la exposición directa al sol, al calor excesivo o a la humedad para conservar el producto en óptimas condiciones.",
        image: "/images/products/fragola-premium.webp",
        location: "Firavitoba, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Leidy Johana Molano Lopez",
            avatar: "/images/artisans/fragola-premium-avatar.webp",
            initials: "LM",
            verified: false
        }
    },
    {
        id: "340",
        slug: "luna-glam",
        name: "Luna Glam",
        description: "Tienda Luna Glam.",
        image: "/images/products/luna-accesorios.webp",
        location: "TOL",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Mayfred Toledo Perez",
            avatar: "/images/artisans/luna-accesorios-avatar.webp",
            initials: "MT",
            verified: false
        }
    },
    {
        id: "339",
        slug: "httpswww-instagram-comrouri_col",
        name: "Róuri",
        description: "Tienda Róuri en sogamoso.",
        image: "/images/products/r-uri.webp",
        location: "sogamoso, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Grether Ruiz",
            avatar: "",
            initials: "GR",
            verified: false
        }
    },
    {
        id: "337",
        slug: "inspira-turquesa",
        name: "Inspira Turquesa",
        description: "Todos nuestros artículos son confeccionados o fabricados a mano con materiales de calidad, especialmente pensados para el cuidado del cabello y uso personal. Las imágenes de nuestros productos son de referencia. Debido al proceso artesanal, pueden existir ligeras variaciones en colores, costuras o acabados. En productos personalizados (como pulseras o kits especiales), no se aceptan modificaciones una vez aprobado el diseño final por el cliente. Nuestros accesorios elaborados en rodio y acero presentan una excelente calidad. Sin embargo, no cuentan con garantía, ya que su durabilidad depende del pH de la piel de cada persona y del cuidado que se les brinde.",
        image: "/images/products/inspira-turquesa.webp",
        location: "Sogamoso, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Katherin Andrea Lopez Vija",
            avatar: "/images/artisans/inspira-turquesa-avatar.webp",
            initials: "KL",
            verified: false
        }
    },
    {
        id: "336",
        slug: "waypaoficial-com",
        name: "Waypa",
        description: "Tienda Waypa en Bucaramanga.",
        image: "/images/products/calzado-hombre-ref-raices.webp",
        location: "Bucaramanga, SAN",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Walter Jesus Rivera Morad",
            avatar: "",
            initials: "WR",
            verified: false
        }
    },
    {
        id: "332",
        slug: "nextgen-3dlasersolutions",
        name: "NextGen 3D",
        description: "Tienda NextGen 3D en Diutama.",
        image: "/images/products/nextgen-3d.webp",
        location: "Diutama, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "MAYRA ALEJANDRA MARTINEZ HERRERA",
            avatar: "",
            initials: "MM",
            verified: false
        }
    },
    {
        id: "326",
        slug: "carolinda",
        name: "Carolinda",
        description: "Tienda Carolinda en Tuta.",
        image: "/images/products/carolinda.webp",
        location: "Tuta, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Carolina Prieto",
            avatar: "/images/artisans/carolinda-avatar.webp",
            initials: "CP",
            verified: false
        }
    },
    {
        id: "321",
        slug: "3d-land",
        name: "3D-Land",
        description: "Tienda 3D-Land en Firavitoba.",
        image: "/images/products/3d-land.webp",
        location: "Firavitoba, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Fabian Andres Salamanca F.",
            avatar: "/images/artisans/3d-land-avatar.webp",
            initials: "FS",
            verified: false
        }
    },
    {
        id: "319",
        slug: "upin-pines-metalicos",
        name: "UPin Pines Metálicos",
        description: "Tienda UPin Pines Metálicos en Sogamoso.",
        image: "/images/products/upin-pines-met-licos.webp",
        location: "Sogamoso, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Sebastian Camargo Cuesto",
            avatar: "/images/artisans/upin-pines-met-licos-avatar.webp",
            initials: "SC",
            verified: false
        }
    },
    {
        id: "318",
        slug: "licores-artesanales-jb",
        name: "Licores Artesanales JB",
        description: "Tienda Licores Artesanales JB en Duitama.",
        image: "/images/products/ancheta-jb-licores.webp",
        location: "Duitama, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Jaider Fabian Blanco Becerra",
            avatar: "/images/artisans/licores-artesanales-jb-avatar.webp",
            initials: "JB",
            verified: false
        }
    },
    {
        id: "317",
        slug: "httpswww-facebook-comprofile-phpid61553130868135",
        name: "LUX DENT ODONTOLOGIA Y ESTETICA S.A.S",
        description: "Tienda LUX DENT ODONTOLOGIA Y ESTETICA S.A.S en SOGAMOSO.",
        image: "/images/products/lux-dent-odontologia-y-estetica-s-a-s.webp",
        location: "SOGAMOSO, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Ivonne Alejandra Quiceno Zamora",
            avatar: "",
            initials: "IQ",
            verified: false
        }
    },
    {
        id: "296",
        slug: "angela-saavedra-mentora-de-negocios",
        name: "Ángela Saavedra Mentora de negocios",
        description: "Tienda Ángela Saavedra Mentora de negocios.",
        image: "/images/products/Asesoria.jpeg",
        location: "",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Angela Saavedra",
            avatar: "",
            initials: "AS",
            verified: false
        }
    },
    {
        id: "271",
        slug: "httpswww-instagram-comcrochetaretes",
        name: "Crochetaretes",
        description: "Tienda Crochetaretes.",
        image: "/images/products/arete.png",
        location: "x",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Diana Ximena Ladino Morales",
            avatar: "",
            initials: "DL",
            verified: false
        }
    },
    {
        id: "137",
        slug: "uvihatu_esencial",
        name: "Uvihatu_esencial",
        description: "Tienda Uvihatu_esencial en Sogamoso.",
        image: "/images/products/uvihatu-esencial.webp",
        location: "Sogamoso, BOY",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Leidy Marcela León Tellez",
            avatar: "/images/artisans/uvihatu-esencial-avatar.webp",
            initials: "LL",
            verified: false
        }
    },
    {
        id: "106",
        slug: "makadamia-velas-y-aromas",
        name: "Makadamia - Velas y aromas",
        description: "Tienda Makadamia - Velas y aromas en Duitama.",
        image: "/images/products/makadamia-velas-y-aromas.webp",
        location: "Duitama, Boyacá",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Monica Murcia",
            avatar: "/images/artisans/makadamia-velas-y-aromas-avatar.webp",
            initials: "MM",
            verified: false
        }
    },
    {
        id: "84",
        slug: "arttemacu",
        name: "MACU",
        description: "Tienda MACU en Bogota D.c.",
        image: "/images/products/macu.webp",
        location: "Bogota D.c",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Maria Castro",
            avatar: "/images/artisans/macu-avatar.webp",
            initials: "MC",
            verified: false
        }
    },
    {
        id: "36",
        slug: "julio-cesar-gonzalez-mejia-abogados-asesores",
        name: "Julio César González Mejía Abogados Asesores",
        description: "Tienda Julio César González Mejía Abogados Asesores en Sogamoso.",
        image: "/images/products/julio-c-sar-gonz-lez-mej-a-abogados-asesores.webp",
        location: "Sogamoso, Boyacá",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Julio César González Mejía",
            avatar: "/images/artisans/julio-c-sar-gonz-lez-mej-a-abogados-asesores-avatar.webp",
            initials: "JG",
            verified: false
        }
    },
    {
        id: "30",
        slug: "uzesuamox",
        name: "UZE Suamox",
        description: "Tienda UZE Suamox.",
        image: "/images/products/collar.png",
        location: "",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Astrid Constanza Castro Gordillo",
            avatar: "",
            initials: "AC",
            verified: false
        }
    },
    {
        id: "25",
        slug: "tuarte",
        name: "TuArte",
        description: "Tienda TuArte en Sogamoso.",
        image: "/images/products/tuarte.webp",
        location: "Sogamoso, Boyacá",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Javier Mojica",
            avatar: "/images/artisans/tuarte-avatar.webp",
            initials: "JM",
            verified: false
        }
    },
    {
        id: "20",
        slug: "gricellarts",
        name: "Gricellarts",
        description: "Tienda Gricellarts en Bogota.",
        image: "/images/products/gricellarts.webp",
        location: "Bogota, CUN",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "CLAUDIA EMILSEN LOPEZ RIAÑO",
            avatar: "/images/artisans/gricellarts-avatar.webp",
            initials: "CL",
            verified: false
        }
    },
    {
        id: "16",
        slug: "muiscafe",
        name: "MUISCAFE",
        description: "Tienda MUISCAFE en Sogamoso.",
        image: "/images/products/muiscafe.webp",
        location: "Sogamoso",
        rating: 0.0,
        reviewCount: 0,
        emprendedor: {
            name: "Gonzalo Chaparro Mongui",
            avatar: "/images/artisans/muiscafe-avatar.webp",
            initials: "GC",
            verified: false
        }
    }

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
        href: "https://jovenpro.com/",
    },
    {
        id: "news-003",
        title: "La madera noble de los Andes",
        excerpt: "Un recorrido por los talleres de ebanistería que utilizan maderas sostenibles de la región.",
        category: "Madera",
        image: "/images/news/madera-andes.jpg",
        date: "22 Abr 2026",
        readTime: "6 min",
        href: "https://jovenpro.com/",
    },
    {
        id: "news-004",
        title: "Plata y esmeraldas: la dupla perfecta",
        excerpt: "Tendencias en joyería artesanal colombiana para esta temporada.",
        category: "Joyería",
        image: "/images/news/plata-esmeraldas.jpg",
        date: "18 Abr 2026",
        readTime: "3 min",
        href: "https://jovenpro.com/",
    },
    {
        id: "news-005",
        title: "Cerámica raku: fuego y alma colombiana",
        excerpt: "La técnica milenaria del raku llega a los talleres de JovenPro. Descubre cómo nuestros artesanos fusionan la tradición japonesa con la identidad boyacense.",
        category: "Cerámica",
        image: "/images/news/madera-andes.jpg",
        date: "10 Abr 2026",
        readTime: "5 min",
        href: "https://jovenpro.com/",
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

    }
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
        { label: "Facebook", href: "https://www.facebook.com/jovenprocolombia" },
        { label: "WhatsApp", href: "https://wa.me/573024840101" },
        { label: "Telegram", href: "https://t.me/jovenpro" },
    ],
    copyright: `© ${new Date().getFullYear()} JovenPro. Todos los derechos reservados.`,
};