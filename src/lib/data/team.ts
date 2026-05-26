export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
}

export const teamMembers: TeamMember[] = [
    { id: "1", name: "Carlos Mojica", role: "Programador", image: "/images/equipo/carlos_programador.jpg" },
    { id: "2", name: "Angie Lopez", role: "JovenPro Ferias", image: "/images/equipo/angie_ferias.jpg" },
    { id: "3", name: "Camila Pabón", role: "Logistica & Ventas", image: "/images/equipo/camila_logistica.jpg" },
    { id: "4", name: "Angely Michel", role: "Ventas Ferias", image: "/images/equipo/angely_ventas.jpg" },
    { id: "5", name: "Lucia López", role: "Coordinadora Inventarios JovenPro Local", image: "/images/equipo/coordinadora_lucia.png" },
    { id: "6", name: "Alejandra González", role: "Dirección Marketing & Redes", image: "/images/equipo/alejandra_marketing.jpg" },
    { id: "7", name: "César", role: "Gerente", image: "/images/equipo/cesar_gerente.jpg" },
    { id: "8", name: "Shabby", role: "Coordinadora", image: "/images/equipo/shabby_coordinadora.jpeg" },
    { id: "9", name: "Laura", role: "Coordinadora", image: "/images/equipo/laura_coordinadora.png" },
];