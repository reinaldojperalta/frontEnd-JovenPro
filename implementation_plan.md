# Plan de Implementación Arquitectura V5

Este documento traza la ruta definitiva para consolidar la Arquitectura V5 en JovenPro, resolviendo deuda técnica crítica e implementando un estándar estricto de Server Components.

## User Review Required

> [!WARNING]
> **Error de Serialización en Next.js (Mitigado)**
> Se han desconectado exitosamente los hooks `useAppNavigation` y `searchFocus` de los organismos (`NavbarSticky`, `ProductCarousel`, `ProductMosaic`, `BentoCarousel`, `HeroSplit`), añadiendo *props* como `onNavigate` y `onStoreClick`. 
> Se ha implementado un fallback interno nativo (`window.open` y `href`) dentro de estos componentes clientes para evitar crashes en caso de que `HomeTemplateV2` (Server Component) no pueda inyectar estas funciones por las restricciones de Next.js.

## Open Questions

- Ya he completado la limpieza y desconexión de hooks que me pediste. ¿Puedo proceder ahora mismo con la migración masiva de `<img>` a `<Image>` (next/image) en todas las cards y carruseles?

## Proposed Changes

---

### Phase 1: Protección RSC y Navegación (Desconexión de Hooks COMPLETADA)

#### [MODIFY] src/components/organisms/BentoCarousel/BentoCarousel.tsx
- [x] Eliminada importación de `useAppNavigation`.
- [x] Agregado prop `onStoreClick?: (url: string) => void`.

#### [MODIFY] src/components/organisms/NavbarSticky/NavbarSticky.tsx
- [x] Eliminadas importaciones de `useAppNavigation` y `searchFocus`.
- [x] Agregados props `onNavigate`, `onSearch`, `onCartClick`, `onSearchFocus`.

#### [MODIFY] src/components/organisms/ProductCarousel/ProductCarousel.tsx
- [x] Eliminadas importaciones de hooks globales y eventos Custom.
- [x] Eventos sustituidos por props puras (`highlightedSlugFromProps`, `onNavigate`).

#### [MODIFY] src/components/organisms/ProductMosaic/ProductMosaic.tsx
- [x] Desconectados listeners de window global para eventos de foco.
- [x] Eliminada inyección de navegación de cliente. Agregada prop `onStoreClick`.

#### [MODIFY] src/components/organisms/HeroSplit/HeroSplit.tsx
- [x] Eliminado hook `useAppNavigation` y agregado fallback local y prop `onNavigate`.

#### [NEW] src/components/providers/FramerMotionProvider.tsx
- [ ] Implementación de Provider cliente que envuelve `LazyMotion`. Aislará la librería para que RootLayout pueda ser Server Component puro.

---

### Phase 2: Zero Inline & next/image (En proceso)

Implementar Regla 14 vigente. Migración global obligatoria a `next/image` lidiando con el tipado estricto de Next.js.
- **`ProductCard`**: Migrar `<img>` a `<Image>`.
- **`StoreCard`**: Migrar `<img>` a `<Image>`.
- **`NewsCard`**: Migrar `<img>` a `<Image>`.
- **`ProductCarousel`, `ProductMosaic`, `HeroSplit`**: Migrar `<img>` a `<Image>`.

---

### Phase 3: Modularización Data
- Migración de `src/lib/data.ts` a `src/lib/data/` (config.ts, types.ts, products.ts, stores.ts, index.ts).

## Verification Plan

### Automated Tests
- Type checking en todos los componentes para validar que no haya referencias a hooks huérfanos.
- Proceso de build (`npx next build`) para comprobar compatibilidad estática.

### Manual Verification
- Testing en vivo de las props inyectadas para garantizar flujos de navegación fluidos.
