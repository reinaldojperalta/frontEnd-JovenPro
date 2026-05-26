export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
}

export const teamMembers: TeamMember[] = [
    { id: "1", name: "Carlos Mojica", role: "Programador", image: "/images/equipo/carlos_programador.jpg" },
    { id: "2", name: "Angie Lopez", role: "JovenPro Ferias", image: "/images/equipo/angie_ferias.jpg" },
    { id: "3", name: "Lucia López", role: "Coordinadora Inventarios JovenPro Local", image: "/images/equipo/coordinadora_lucia.png" },
    { id: "4", name: "César", role: "Gerente", image: "/images/equipo/cesar_gerente.jpg" },
    { id: "5", name: "Alejandra González", role: "Dirección Marketing & Redes", image: "/images/equipo/alejandra_marketing.jpg" },
    { id: "6", name: "Shabby", role: "Coordinadora", image: "/images/equipo/shabby_coordinadora.jpeg" },
    { id: "7", name: "Laura", role: "Coordinadora", image: "/images/equipo/laura_coordinadora.png" },
];