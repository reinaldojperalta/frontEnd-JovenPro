# 02 — COMPONENT REGISTRY

> Mapa de dependencias real del sistema Atomic Design.
> Auditoría: **2026-05-12** | Refactor V3 completado

---

## 1. Jerarquía de Directorios (Estado Real)

```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   └── debug/
├── components/
│   ├── atoms/ (13) ← +1 nuevo: Section
│   │   Avatar, Badge, BentoGrid, Button, Container,
│   │   IconButton, Input, Logo, Price, Section,
│   │   Skeleton, StarRating, Typography
│   ├── molecules/ (12) ← +1 nuevo: NewsCard
│   │   CTAGroup, Card, FormField, HeroSideSkeleton,
│   │   Nav, NewsCard, PaginationDots, ProductCard,
│   │   SearchBar, Skeleton, TestimonialCard, VideoCard
│   ├── organisms/ (13)
│   │   BentoCarousel, ContactSection, Footer, Header,
│   │   Hero, HeroSplit, NavbarSticky, NewsSection,
│   │   ProductGrid, Skeleton, Testimonials,
│   │   VideosSection, WorkWithUs
│   ├── templates/ (4)
│   │   DebugTemplate, HomeTemplateV2 ✅ ACTIVO,
│   │   MarketTemplate ⚠️ HUÉRFANO, ProductDetailTemplate ⚠️ HUÉRFANO
│   ├── pages/   ← VACÍO (residuo de migración)
│   ├── debug/   ← Componentes de debug
│   └── index.ts ← Barrel export (solo templates activo exportados)
├── hooks/ (8)
│   index.ts, useCart, useDebounce, useFavorites,
│   useImageFallback, useLocalStorage, useMediaQuery, usePasswordToggle
└── lib/
    ├── data.ts  ← ÚNICA fuente de datos
    └── utils/ → cn.ts (clsx + tailwind-merge)
```

---

## 2. Átomo — Inventario completo

| Átomo | `.tsx` | `.variants.ts` | `index.ts` | `"use client"` | Nota |
| --- | --- | --- | --- | --- | --- |
| `Avatar` | ✅ | ✅ | ✅ | ✅ | usa `useImageFallback` |
| `Badge` | ✅ | ✅ | ✅ | ❌ | |
| `BentoGrid` | ✅ | ✅ | ✅ | ❌ | BentoGrid + BentoItem |
| `Button` | ✅ | ✅ | ✅ | ❌ | forwardRef pendiente de verificar |
| `Container` | ✅ | ✅ | ✅ | ❌ | |
| `IconButton` | ✅ | ✅ | ✅ | ❌ | variant `social` nuevo |
| `Input` | ✅ | ✅ | ✅ | ❌ | |
| `Logo` | ✅ | ✅ | ✅ | ❌ | |
| `Price` | ✅ | ✅ | ✅ | ❌ | |
| `Section` | ✅ | ✅ | ✅ | ❌ | **NUEVO** (antes inline) |
| `Skeleton` | ✅ | ✅ | ✅ | ❌ | SkeletonBlock + SkeletonCircle |
| `StarRating` | ✅ | ✅ | ✅ | ❌ | |
| `Typography` | ✅ | ✅ | ✅ | ❌ | Heading + Text + GradientText |

---

## 3. Molécula → Átomos consumidos

| Molécula | Átomos consumidos | `.variants.ts` | `"use client"` | Skeleton companion |
| --- | --- | --- | --- | --- |
| `CTAGroup` | Button | ✅ | ❌ | ❌ |
| `Card` | Ningún átomo directo | ✅ | ❌ | ❌ |
| `FormField` | Input | ✅ | ❌ | ❌ |
| `HeroSideSkeleton` | Skeleton atoms | ✅ | ✅ | Es un skeleton en sí |
| `Nav` | Solo CVA + cn() | ✅ | ❌ | ❌ |
| `NewsCard` | Badge, Typography | ✅ | ✅ | ✅ NewsCardSkeleton |
| `PaginationDots` | Solo CVA | ✅ | ✅ | ❌ |
| `ProductCard` | Badge, Avatar, Typography | ✅ | ✅ | ✅ ProductCardSkeleton |
| `SearchBar` | Input, IconButton | ✅ | ❌ | ❌ |
| `Skeleton` | SkeletonBlock | ✅ | ❌ | — |
| `TestimonialCard` | Avatar, Typography, StarRating | ✅ | ✅ | ✅ TestimonialCardSkeleton |
| `VideoCard` | Typography, Badge | ✅ | ✅ | ✅ VideoCardSkeleton |

---

## 4. Organismo → Moléculas + Átomos directos

| Organismo | Moléculas | Átomos directos | Estado V3 | `.variants.ts` | Skeleton |
| --- | --- | --- | --- | --- | --- |
| `HeroSplit` | — | Logo, Section | ✅ LIMPIO | ✅ | ✅ |
| `NavbarSticky` | SearchBar | Logo, IconButton, Container, Section | ✅ LIMPIO | ✅ | ✅ |
| `BentoCarousel` | ProductCard, PaginationDots | Container, Typography, Section | ✅ LIMPIO | ✅ | ✅ |
| `NewsSection` | NewsCard, PaginationDots | Badge, Typography, Container, Section | ✅ LIMPIO | ✅ | ✅ |
| `VideosSection` | VideoCard | Typography, Container, Section | ✅ LIMPIO | ✅ | ✅ |
| `Testimonials` | TestimonialCard | Avatar, StarRating, IconButton, Section | ✅ LIMPIO | ✅ | ✅ |
| `WorkWithUs` | — | IconButton, Container, Heading, Text, Section | 🟡 PARCIAL | ✅ | ✅ |
| `ContactSection` | FormField, CTAGroup | Badge, Typography, Container, Section | ✅ LIMPIO | ✅ | ✅ |
| `Footer` | — | Container, IconButton, Section | ✅ LIMPIO | ✅ | ✅ |
| `Header` | SearchBar, Nav | Logo, IconButton, Container | ⚠️ LEGACY | ❓ | ✅ |
| `Hero` | CTAGroup, Card | Badge, Typography, Container | ⚠️ LEGACY | ❓ | ✅ |
| `ProductGrid` | Nav, ProductCard | Container | ⚠️ LEGACY | ❓ | ✅ |
| `Skeleton` | — | Skeleton atoms | N/A | N/A | — |

> ⚠️ **Organismos LEGACY** (`Header`, `Hero`, `ProductGrid`): Usados por `HomeTemplate` (legacy).
> No están en el flujo de `HomeTemplateV2`. Mantenerlos como referencia histórica.

---

## 5. Template → Organismos

### `HomeTemplateV2` ✅ ACTIVO (usado por `app/page.tsx`)

```
HomeTemplateV2 ("use client")
├── HeroSplit
├── NavbarSticky (con searchSuggestions derivadas de products)
├── BentoCarousel (con onProductClick handler)
├── NewsSection
├── VideosSection
├── Testimonials
├── WorkWithUs
└── Footer
```

**Props de `HomeTemplateV2`:**
```typescript
navItems: NavItem[];
heroData: HeroSplitData;
products: Product[];
newsItems: NewsItem[];
videos: VideoItem[];
testimonials: Testimonial[];
workWithUsData: WorkWithUsData;
footerData: FooterData;
className?: string;
```

### `HomeTemplate` ⚠️ LEGACY (NO usado — referencia histórica)
```
HomeTemplate → Header, Hero, ProductGrid, ContactSection, Footer
```

### Templates Huérfanos (sin ruta en `app/`)
```
MarketTemplate       → sin app/marketplace/page.tsx
ProductDetailTemplate → sin app/producto/[id]/page.tsx
DebugTemplate        → en app/debug/
```

---

## 6. Barrel Exports — Estado de `index.ts`

| Nivel | Barrel `index.ts` | Exporta |
| --- | --- | --- |
| `atoms/index.ts` | ✅ | Todos los átomos |
| `molecules/index.ts` | ✅ | Todas las moléculas |
| `organisms/index.ts` | ✅ | Todos los organismos |
| `templates/index.ts` | ✅ | Todos los templates |
| `components/index.ts` | ✅ | Re-exporta de los 4 niveles |
| `hooks/index.ts` | ✅ | Todos los hooks |

**Patrón de cada `ComponentName/index.ts`:**
```typescript
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
export { componentNameVariants } from "./ComponentName.variants";
```

---

## 7. Anomalías y Observaciones

| Problema | Detalle | Acción recomendada |
| --- | --- | --- |
| **SVGs inline duplicados** | Instagram, Facebook, WhatsApp SVGs en `WorkWithUs.tsx` Y `Footer.tsx` | Crear átomo `SocialIcon` o usar Lucide |
| **Templates huérfanos** | `MarketTemplate`, `ProductDetailTemplate` sin ruta en `app/` | Crear `app/marketplace/page.tsx` o eliminar |
| **`pages/` residual** | Carpeta vacía tras migración a `app/` | Eliminar |
| **`ProductCard` cross-layer** | Es molécula pero importa `framer-motion` | Mover animaciones al organismo `BentoCarousel` |
| **`useCart`/`useFavorites` huérfanos** | Implementados pero no usados en `HomeTemplateV2` | Integrar o documentar como futura funcionalidad |
| **`categories` sin uso** | Const en `data.ts`, comentada en `page.tsx` | Eliminar o activar para `MarketTemplate` |
| **`legacy/` directorio** | Componentes legacy sin uso activo | Auditar y posiblemente eliminar |
