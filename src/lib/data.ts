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

export const featuredProducts: Product[] = [
    {
        id: "23597",
        slug: "ondas-sin-calor-de-satin-con-2-scrunchies",
        name: "Ondas sin calor de satín con 2 scrunchies",
        description: "Logra un peinado bonito, natural y sin dañar tu melena con este set de ondas sin calor de satén. Diseñado para moldear el cabello de forma suave, este accesorio te ayuda a conseguir rizos u ondas definidas sin recurrir a planchas, tenacillas ni otras herramientas térmicas. Su acabado en satén ayuda a reducir el encrespamiento y el roce sobre el cabello, favoreciendo un resultado más pulido y cómodo durante su uso. Además, incorpora 2 scrunchies a juego para sujetar el pelo con suavidad y mantener el moldeado en su sitio. Es una opción ideal para quienes buscan cuidar su cabello, evitar el daño por calor y añadir un accesorio práctico y delicado a su rutina de belleza. Perfecto para usar durante la noche o durante unas horas en casa y despertarte con un look natural y favorecedor. Características destacadas Moldeador para ondas sin calor Acabado suave en satén Incluye 2 scrunchies Ayuda a reducir el daño térmico Cómodo para usar durante horas o mientras duermes Ideal para conseguir ondas naturales y rizos suaves",
        price: 25000,
        currency: "COP",
        image: "/images/products/ondas-sin-calor-de-satin-con-2-scrunchies_1.webp",
        category: "Destacados",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "22428",
        slug: "gorro-satin-doble-tela",
        name: "Gorro Satín Doble Tela",
        description: "GORRO DOBLE TELA, se puede usar por ambos lados tienes la opción de pedirlos unicolor o en dos colores, disponible en varios colores, manejamos horma adulto y horma niños, no olvides preguntar en que tamaño lo necesitas.",
        price: 30000,
        currency: "COP",
        image: "/images/products/gorro-satin-doble-tela_1.webp",
        category: "Destacados",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "22418",
        slug: "scrunchies-mediano",
        name: "Scrunchies Mediano",
        description: "Disponible es muchos colores",
        price: 9000,
        currency: "COP",
        image: "/images/products/scrunchies-mediano_1.webp",
        category: "Destacados",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "22373",
        slug: "kit-antrifrizz-cuidado-completo",
        name: "Kit Antrifrizz Cuidado Completo",
        description: "Toalla microfibra: ✨No absorbe la hidratación natural del cabello, tiene hebras mucho más delgadas y absorben solamente el exceso de humedad, dejando tu cabello más brillante, sedoso y humectado. ✨Previene el frizz, la microfibra es un material suave y delicado que ayuda a reducir la fricción al secar el cabello. ✨Reduce la aparición de orquilla, ya sea por deshidratación o por fricción, secar tu cabello con toallas convencionales lastimas las puntas y propicias que se abran. ✨Para todo tipo de cabello. Esta te puede llegar en cualquier color. Productos en satin ✨Ayuda a reducir el frizz, los quiebres y nudos en el cabellos que se generan con la fricción entre el cabello y la almohada de algodón. ✨Para todo tipo de cabello. ✨Perfecto para conservar los peinados por mucho más tiempo. ✨Ideal para tu cuidado de keratina o cirugía capilar. ✨No absorbe tus productos de skin care mientras duermes. ✨Es amigable con tu piel y pestañas. Preguntas nuestra disponibilidad de colores.",
        price: 90000,
        currency: "COP",
        image: "/images/products/kit-antrifrizz-cuidado-completo_1.webp",
        category: "Destacados",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "22324",
        slug: "calzado-hombre-ref-raices",
        name: "Calzado hombre ref raices",
        description: "Calzado que están hecho con técnicas de telares mapuche y tejido guane. Hecho con fibras textiles de fique, yute y algodón pensado también para personas que cuiden el medio ambiente",
        price: 110000,
        currency: "COP",
        image: "/images/products/calzado-hombre-ref-raices_1.webp",
        category: "Destacados",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0,
        oldPrice: 130000,
        discountPrice: 110000,
        badge: "Oferta",
        status: "sale"
    },
    {
        id: "22314",
        slug: "zapato-ref-tayrona",
        name: "zapato ref tayrona",
        description: "calzado que están hecho con técnicas ancestrales y tejido guane. Hecho con fibras textiles de fique, yute y algodón pensado también para personas que cuiden el medio ambiente",
        price: 110000,
        currency: "COP",
        image: "/images/products/zapato-ref-tayrona_1.webp",
        category: "Destacados",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0,
        oldPrice: 130000,
        discountPrice: 110000,
        badge: "Oferta",
        status: "sale"
    },
    {
        id: "22201",
        slug: "soporte-y-control-nintendo-switch",
        name: "Soporte y control Nintendo Switch",
        description: "Imagina exhibir tu consola con un estilo que atrapa miradas y, en un instante, transformarlo en un control ergonómico que te da una ventaja INJUSTA en cada partida. ¡Siente la comodidad extrema en tus manos y olvídate del dolor incluso en las sesiones de juego más épicas! ¿El secreto? Impresión 3D de alta calidad que garantiza durabilidad y un tacto premium. Además, ¡organiza tus juegos como un PRO! Su base inteligente te da acceso rápido a tus cartuchos favoritos. No te conformes con lo ordinario. Este no es solo un soporte, es una declaración de estilo y una mejora tangible en tu experiencia de juego. ¡Piensa en la envidia de tus amigos gamers! ¡Stock limitado! La demanda por este diseño exclusivo es alta. Actúa AHORA y sé uno de los pocos en poseer esta joya gamer. ¡Siente la diferencia desde el primer momento! ¡Haz clic en &#8220;Añadir al carrito&#8221; y desbloquea un nuevo nivel de inmersión!",
        price: 99900,
        currency: "COP",
        image: "/images/products/soporte-y-control-nintendo-switch_1.webp",
        category: "Destacados",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "22151",
        slug: "combo-grabador-y-cortador-laser-phecda",
        name: "COMBO Grabador y cortador láser Phecda",
        description: "el combo grabador y cortador láser phecda funciona dirigiendo un rayo láser de alta potencia controlado por software para grabar marcas o cortar materiales como madera acrílico cuero y papel lo que lo hace diferente es su diseño combo que integra ambas funcionalidades en un solo dispositivo su potencia láser de [insertar potencia láser si la conoces] que determina la capacidad de corte y grabado su área de trabajo de [insertar área de trabajo si la conoces] que limita el tamaño de los materiales a procesar su software de control que permite diseñar y enviar los trabajos al láser y sus posibles características adicionales como asistencia de aire para mejorar los cortes y reducir quemaduras o sistemas de seguridad las medidas aproximadas del equipo son 673 x 660 x 190 mm .",
        price: 4409000,
        currency: "COP",
        image: "/images/products/combo-grabador-y-cortador-laser-phecda_1.webp",
        category: "Servicios",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "22145",
        slug: "elegoo-mars-5-ultra",
        name: "ELEGOO MARS 5 ULTRA",
        description: "la elegoo mars 5 ultra funciona con tecnología de estereolitografía de máscara líquida msla utilizando una pantalla lcd monocromática de 7 pulgadas con resolución 9k para curar resina fotosensible capa por capa lo que la hace diferente es su altísima resolución de 9k y su precisión xy de 18 μm que permite imprimir detalles extremadamente finos su velocidad de impresión rápida de hasta 150 mm/h gracias a la tecnología tilt release su nivelación automática inteligente su sensor mecánico para detectar residuos y escasez de resina su conectividad wifi y su cámara ai para monitoreo en tiempo real las medidas aproximadas de la impresora son 250 x 250 x 448 mm",
        price: 2518000,
        currency: "COP",
        image: "/images/products/elegoo-mars-5-ultra_1.webp",
        category: "Servicios",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "22134",
        slug: "elegoo-neptune-4",
        name: "ELEGOO NEPTUNE 4",
        description: "ultra velocidad 3d crea hoy diseña sin frenos materializa ya precisión velocidad olvida esperas tu creatividad vuela la elegoo neptune 4 funciona por deposición fundida fdm derritiendo filamento y depositándolo capa por capa lo que la hace diferente es su alta velocidad de impresión de hasta 500 mm/s gracias al firmware klipper preinstalado su autonivelación de 121 puntos su extrusor directo de doble engranaje y su hotend de alta temperatura hasta 300°c las medidas aproximadas de la impresora son 475 x 445 x 515 mm",
        price: 1732500,
        currency: "COP",
        image: "/images/products/elegoo-neptune-4_1.webp",
        category: "Servicios",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "22129",
        slug: "bambu-lab-a1-combo",
        name: "Bambu Lab A1 Combo",
        description: "bambu lab a1 combo impresora 3d fdm multicolor con alimentación automática de filamento y cama caliente activa ideal para principiantes y usuarios avanzados impresión rápida y de alta calidad fácil de usar y mantener, él bambu lab a1 combo contiene la impresora 3d bambu lab a1, el ams lite sistema automático de materiales, cuatro portacarretes ams lite tubos de ptfe, soporte para carrete de filamento boquilla de acero inoxidable preinstalada placa de construcción, muestra de filamento, bambu limpiador de purga, caja de accesorios cable de alimentación y guía de inicio rápido",
        price: 3969000,
        currency: "COP",
        image: "/images/products/bambu-lab-a1-combo_1.webp",
        category: "Servicios",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "21874",
        slug: "pollito-gigante-amigurumi",
        name: "Pollito Gigante Amigurumi",
        description: "Recuerda que los amigurumis son pequeños peluches creados para convertirse en tus mejores amigos, ya que se cree que pueden sentir las emociones de su propietario, como la tristeza y la felicidad. Así, se convierten en compañeros leales, compartiendo tus emociones y sentimientos. Marca: Carolinda Amigurumis Alto: 18 cm Ancho: 17 cm Largo: 15 cm Tierno y adorable Pollito Gigante Tejido a mano con dedicación, este adorable Pollito Gigante es ideal para que los pequeños disfruten de una experiencia divertida mientras juegan y recrean situaciones de cuidado familiar, con amor y responsabilidad. Este muñeco está fabricado artesanalmente, completamente a mano, utilizando lana Plushy anti alergénica de alta calidad que no suelta pelusas. Es el regalo perfecto para expresar afecto o agradecimiento, y es sinónimo de ternura y amor. Beneficios: Te acompañará en la hora de dormir. Será tu amigo de todos los días. Te brindará apoyo emocional como tu muñeco de apego. Ideal como decoración para tu hogar. Perfecto para llevar de viaje o tenerlo en el auto. Lavable en Funda(maquina) o a mano. Antiestrés ¡Conoce nuestro encantador Amigurumi de Pollito Gigante hecho a mano! Este tierno Pollito Gigante es el compañero perfecto tanto para los más pequeños como para los más grandes, y también para los medianos de la casa. Es ideal para darle un toque especial a cualquier habitación. Su suave textura y colores vibrantes lo hacen irresistible para abrazar y jugar. Cada Pollito Gigante está elaborado con mucho cariño y atención al detalle, asegurando que sea un amigo fiel en todas tus aventuras. Además, es liviano y fácil de llevar, convirtiéndolo en el regalo ideal para cualquier ocasión. ¡No dejes pasar la oportunidad de añadir este adorable amigurumi a tu hogar y haz que la diversión nunca termine!",
        price: 55000,
        currency: "COP",
        image: "/images/products/pollito-gigante-amigurumi_1.webp",
        category: "Artesanias &amp; Decoración",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0,
        oldPrice: 90000,
        discountPrice: 55000,
        badge: "Oferta",
        status: "sale"
    },
    {
        id: "21730",
        slug: "ancheta-jb-licores",
        name: "Ancheta JB Licores",
        description: "ANCHETA JB LICORES Caja organizadora forte No 2 alta 6.5 lt Licor artesanal JB botella x 375 ml ( Escoge el licor JB que quieras) Galleta gameza x 180g Galletas crakeñas saltin mini taco x 106 g Mermelada Aro x 200 g Natilla x 300 g Atun lomo en agua x 170 g",
        price: 47000,
        currency: "COP",
        image: "/images/products/ancheta-jb-licores_1.webp",
        category: "Alimentos",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "21713",
        slug: "crema-de-whisky-de-chocolate-750-ml",
        name: "Crema de Whisky De Chocolate 750 ML",
        description: "Exquisita Crema de whisky sabor a chocolate, usamos cocoa en su elaboracion, sabor unico y caracteristico por su aroma y sabor, 15% de graduacion alcoholica.",
        price: 47000,
        currency: "COP",
        image: "/images/products/crema-de-whisky-de-chocolate-750-ml_1.webp",
        category: "Alimentos",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "21658",
        slug: "laser-kitdiy",
        name: "Grabadora y Cortadora Láser – KIT DIY MK2 10W",
        description: "¡Descubre AlgoLaser DIY KIT MK2 10W: La Opción Más Económica y Potente del Mercado! AlgoLaser DIY KIT MK2 10W – Potencia y Precisión al Mejor Precio ¿Buscas una solución accesible y eficiente para tus proyectos de grabado y corte láser? El AlgoLaser DIY KIT 10W es tu mejor elección. Con la potencia de un módulo láser de 10W al precio más competitivo del mercado, esta máquina es perfecta tanto para pequeñas empresas como para entusiastas del bricolaje. Características Clave: Pantalla Tactil (Control Offline): Pantalla Tactil Touchscreen, permite controlar, grabar o cortar desde la misma. Módulo Láser de Alta Potencia: 10W para cortes y grabados precisos en una variedad de materiales. Precisión Excepcional: Spot láser ultrafino de 0.085mmx0.1mm para detalles finos y acabados de alta calidad. Fácil de Usar: Configuración rápida, operación inteligente y soporte completo. Seguridad Garantizada: Funciones avanzadas para una operación segura y controlada. Compatibilidad Amplia: Soporta una variedad de sistemas operativos y formatos de archivo. Ideal para Diversos Materiales: Desde madera y cuero hasta acrílico (No Claros) y más, el AlgoLaser DIY KIT Mk2 10W maneja una amplia gama de materiales para grabado y corte. ¡No Comprometas Calidad por Precio! El AlgoLaser DIY KIT Mk2 10W es la elección inteligente para quienes buscan eficiencia y calidad a un costo accesible. ¡Adquiere el tuyo hoy y lleva tus proyectos al siguiente nivel! 🌟💡🛠️",
        price: 2200000,
        currency: "COP",
        image: "/images/products/laser-kitdiy_1.webp",
        category: "Destacados",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0,
        oldPrice: 2500000,
        discountPrice: 2200000,
        badge: "Oferta",
        status: "sale"
    },
    {
        id: "20498",
        slug: "manjar-de-rosas",
        name: "Manjar de Rosas",
        description: "La sensación de las flores en nuestro paladar un sabor sensacional único, es tener dentro de tus manos el aroma natural de las rosas sentir su dulzura y absorber dentro de tu ser esa sensación",
        price: 33000,
        currency: "COP",
        image: "/images/products/manjar-de-rosas_1.webp",
        category: "Alimentos",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "19744",
        slug: "vela-mini-5x5-en-presentacion-de-75-gramos",
        name: "Vela Mini 5&#215;5 en presentación de 75 gramos",
        description: "Vela aromática en presentación Mini ideales para detalle o ambientar espacios pequeños. Personalizadas de acuerdo con el bienestar que genera su aroma o en colores intencionadas con el beneficio asociado a su color. Categorías disponibles 1. Elixir relajante y sanador: Lavanda &#8211; vainilla &#8211; sándalo 2. Concentración, jovialidad e inspiración: Jazmín 3. Agradecimiento y manifestación: Vainilla 4. Vela de los deseos y la prosperidad: Galletas 5. Vitalidad y buena energía: Sandía 6. Conciencia y meditación: Sándalo 7. Historias por agradecer y festejar: Ron 8. Vigor mental y espiritual: Coctel de frutas cítricas 9. Vela de los recuerdos y la felicidad: Chocolate 10. Conexión y equilibrio emocional: Coco lima",
        price: 13900,
        currency: "COP",
        image: "/images/products/vela-mini-5x5-en-presentacion-de-75-gramos_1.webp",
        category: "Artesanias &amp; Decoración",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "18821",
        slug: "precolombino",
        name: "PreColombino",
        description: "Alcancia Mini Pig Precolombino Grabado $45.000",
        price: 45000,
        currency: "COP",
        image: "/images/products/precolombino_1.webp",
        category: "Artesanias &amp; Decoración",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    },
    {
        id: "15752",
        slug: "cafe-500-gr-origen-berbeo-boyaca-incluye-aretes",
        name: "Café 500 Gr Origen Berbeo Boyacá (Incluye Aretes)",
        description: "",
        price: 29000,
        currency: "COP",
        image: "/images/products/cafe-500-gr-origen-berbeo-boyaca-incluye-aretes_1.webp",
        category: "Alimentos",
        emprendedor: {
            name: "Emprendedor JovenPro",
            avatar: "",
            initials: "EJ",
            verified: false
        },
        rating: 0.0,
        reviewCount: 0
    }
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