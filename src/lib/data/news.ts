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
        title: "En el mes de mamá regalas JovenPro Local",
        excerpt:
            "Regala propósito local. Diseñamos anchetas con productos hechos a mano por emprendedores de la región. Una opción ideal para empresas, familias y regalos con impacto social. -Talleres Creativos: Música, Arte & Salud, 9, 10, 16, 17, 23, 24, 30 y 31 de Mayo en nuestra sede física",
        category: "Eventos",
        image: "/images/news/Campaña madres-13.png",
        date: "22 Abr 2026",
        readTime: "2 min",
        href: "https://maps.app.goo.gl/rW3AzpZDKm4A8YLG8",
    },

];