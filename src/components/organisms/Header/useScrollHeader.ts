import { useState, useEffect } from "react";

export interface UseScrollHeaderOptions {
    /** Distancia en píxeles antes de considerar que se ha scrolleado (para cambiar fondo/sombras) */
    threshold?: number;
    /** Distancia a partir de la cual el header se oculta al hacer scroll hacia abajo */
    hideThreshold?: number;
}

export interface UseScrollHeaderReturn {
    /** true si el usuario bajó más allá del threshold */
    isScrolled: boolean;
    /** true si el usuario está scrolleando hacia abajo después del hideThreshold */
    isHidden: boolean;
}

export function useScrollHeader({
    threshold = 50,
    hideThreshold = 200,
}: UseScrollHeaderOptions = {}): UseScrollHeaderReturn {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Lógica para isScrolled
            setIsScrolled(currentScrollY > threshold);

            // Lógica para isHidden (hide on scroll down, show on scroll up)
            if (currentScrollY > hideThreshold && currentScrollY > lastScrollY) {
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setIsHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Check inicial
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [threshold, hideThreshold]);

    return { isScrolled, isHidden };
}
