export interface Entrepreneur {
    id: string;
    name: string;
    business: string;
    image: string;
}

export const entrepreneurs: Entrepreneur[] = [
    { id: "1", name: "Diana Marcela", business: "Artesanías & Deco", image: "/images/emprendedores/emprendedor1.webp" },
    { id: "2", name: "Jorge Eliecer", business: "Dulces Tradicionales", image: "/images/emprendedores/emprendedor2.webp" },
    { id: "3", name: "Luz Marina", business: "Joyería Artesanal", image: "/images/emprendedores/emprendedor3.webp" },
    { id: "4", name: "Ferney & Ana", business: "Café Especial", image: "/images/emprendedores/emprendedor4.webp" },
    { id: "5", name: "Olga Lucía", business: "Tejidos & Moda", image: "/images/emprendedores/emprendedor5.webp" },
    { id: "6", name: "José Armando", business: "Cuero & Marroquinería", image: "/images/emprendedores/emprendedor6.webp" },
];