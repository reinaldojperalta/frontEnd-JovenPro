"use client";

import { useEffect } from "react";

/**
 * Evita que el navegador o efectos hijos dejen la página scrolleada al cargar.
 * Respeta hash en URL (#vitrina, etc.) si el usuario llega con ancla.
 */
export function ScrollRestoration() {
    useEffect(() => {
        if (window.location.hash) return;
        window.scrollTo(0, 0);
    }, []);

    return null;
}
