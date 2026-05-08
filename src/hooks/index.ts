// hooks/index.ts

// ============================================
// ESTADO GLOBAL / NEGOCIO
// ============================================

export { useCart } from "./useCart";
export type { CartItem, UseCartReturn } from "./useCart";

export { useFavorites } from "./useFavorites";
export type { UseFavoritesReturn } from "./useFavorites";

// ============================================
// UTILIDADES / UI
// ============================================

export { useLocalStorage } from "./useLocalStorage";
export type { UseLocalStorageOptions } from "./useLocalStorage";

export { useDebounce } from "./useDebounce";

export { useMediaQuery } from "./useMediaQuery";

export { useImageFallback } from "./useImageFallback";

export { usePasswordToggle } from "./usePasswordToggle";
export type { PasswordToggleResult } from "./usePasswordToggle";