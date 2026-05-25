// src/lib/data/news.ts
// ============================================
// NOTICIAS MOCK — JovenPro V2 (Imágenes locales)
// ============================================

import type { NewsItem } from "./types";

export const newsItems: NewsItem[] = [
    {
        id: "news-001",
        title: "Capacitaciones & Cursos para Emprendedores",
        excerpt:
            "Universidad Santo Tomas 11 y 12 de Mayo Emprendimiento a otro nivel Capacitaciones en Marketing Digital con Inteligencia Artificia en Alianza Peace Corps Colombia Alianza Internacional para promover productos en Estados Únidos.",
        category: "Capacitaciones",
        image: "/images/news/jovenpro_noticia_uno.webp",
        date: "12 May 2026",
        readTime: "5 min",
        href: "https://www.sumerce.org/jovenpro",
    },
    {
        id: "news-002",
        title: "Tejiendo tradición: El arte wayúu",
        excerpt:
            "Conoce el significado de cada patrón y color en el tejido ancestral del pueblo wayúu.",
        category: "Textil",
        image: "/images/news/madera-andes.jpg",
        date: "25 Abr 2026",
        readTime: "4 min",
        href: "https://jovenpro.com/",
    },
    {
        id: "news-003",
        title: "La madera noble de los Andes",
        excerpt:
            "Un recorrido por los talleres de ebanistería que utilizan maderas sostenibles de la región.",
        category: "Madera",
        image: "/images/news/madera-andes.jpg",
        date: "22 Abr 2026",
        readTime: "6 min",
        href: "https://jovenpro.com/",
    },
    {
        id: "news-004",
        title: "Plata y esmeraldas: la dupla perfecta",
        excerpt:
            "Tendencias en joyería artesanal colombiana para esta temporada.",
        category: "Joyería",
        image: "/images/news/plata-esmeraldas.jpg",
        date: "18 Abr 2026",
        readTime: "3 min",
        href: "https://jovenpro.com/",
    },
];