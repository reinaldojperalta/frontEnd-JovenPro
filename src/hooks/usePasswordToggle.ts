import { useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

export interface PasswordToggleResult {
  type: "text" | "password";
  icon: React.ReactNode;
  toggle: () => void;
  isVisible: boolean;
}

/**
 * Hook para manejar el estado de visibilidad de contraseñas.
 * Retorna el tipo de input ('text' o 'password'), el icono correspondiente,
 * y la función para alternar el estado.
 */
export function usePasswordToggle(initialState: boolean = false): PasswordToggleResult {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // Nota: Devolver JSX en un hook es un patrón aceptable para iconos de UI simples,
  // pero asegúrate de importar React si no usas el nuevo transformador de JSX.
  const icon = isVisible ? React.createElement(EyeOff, { className: "w-5 h-5" }) : React.createElement(Eye, { className: "w-5 h-5" });

  return {
    type: isVisible ? "text" : "password",
    icon,
    toggle,
    isVisible,
  };
}
