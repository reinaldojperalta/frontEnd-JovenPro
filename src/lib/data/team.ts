export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
}

export const teamMembers: TeamMember[] = [
    { id: "1", name: "Carlos Mojica", role: "Programador", image: "/images/equipo/carlos_programador.webp" },
    { id: "2", name: "Angie Lopez", role: "JovenPro Ferias", image: "/images/equipo/angie_ferias.webp" },
    { id: "3", name: "Lucia López", role: "Coordinadora Inventarios JovenPro Local", image: "/images/equipo/coordinadora_lucia.webp" },
    { id: "4", name: "César González", role: "Gerente General", image: "/images/equipo/cesar_gerente.webp" },
    { id: "5", name: "Alejandra González", role: "Dirección Marketing & Redes", image: "/images/equipo/alejandra_marketing.webp" },
    { id: "6", name: "Shabby Galindo", role: "Coordinadora Bogotá DC", image: "/images/equipo/shabby_coordinadora.webp" },
    { id: "7", name: "Laura Pacheco", role: "Coordinadora JovenPro Local", image: "/images/equipo/laura_coordinadora.webp" },
];