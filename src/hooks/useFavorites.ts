// hooks/useFavorites.ts
"use client";

import { useState, useCallback, useEffect } from "react";

export interface UseFavoritesReturn {
    favorites: (string | number)[];
    toggleFavorite: (id: string | number, isFavorite: boolean) => void;
    isFavorite: (id: string | number) => boolean;
}

export function useFavorites(): UseFavoritesReturn {
    const [favorites, setFavorites] = useState<(string | number)[]>([]);

    // Cargar desde localStorage al montar
    useEffect(() => {
        const saved = localStorage.getItem("favorites");
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Error parsing favorites from localStorage", e);
            }
        }
    }, []);

    // Guardar en localStorage al cambiar
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback((id: string | number, isFavorite: boolean) => {
        setFavorites((prev) =>
            isFavorite ? [...prev, id] : prev.filter((f) => f !== id)
        );
    }, []);

    const isFavorite = useCallback(
        (id: string | number) => favorites.includes(id),
        [favorites]
    );

    return { favorites, toggleFavorite, isFavorite };
}