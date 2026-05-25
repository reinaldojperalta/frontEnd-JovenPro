import type { LucideIcon } from "lucide-react";
import {
    LayoutGrid,
    Coffee,
    Scissors,
    Briefcase,
    Palette,
} from "lucide-react";
import type { StoreCategoryId } from "@/lib/data";

export type MosaicCategoryFilterId = "todos" | StoreCategoryId;

export interface MosaicCategoryConfig {
    id: MosaicCategoryFilterId;
    name: string;
    icon: LucideIcon;
}

export const MOSAIC_CATEGORIES: MosaicCategoryConfig[] = [
    { id: "todos", name: "Todos", icon: LayoutGrid },
    { id: "artesanias", name: "Artesanías", icon: Palette },
    { id: "alimentos", name: "Alimentos", icon: Coffee },
    { id: "moda_belleza", name: "Moda y Belleza", icon: Scissors },
    { id: "servicios", name: "Servicios", icon: Briefcase },
];

export const CATEGORY_DISPLAY_NAMES: Record<StoreCategoryId, string> = {
    artesanias: "Artesanías",
    alimentos: "Alimentos",
    moda_belleza: "Moda y Belleza",
    servicios: "Servicios",
};
