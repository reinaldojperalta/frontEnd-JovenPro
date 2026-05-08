# 02 — COMPONENT REGISTRY

> Mapa de dependencias real del sistema Atomic Design.
> Auditoría: 2026-05-08

---

## 1. Jerarquía de Directorios

```
src/components/
├── atoms/ (12)
│   Avatar, Badge, BentoGrid, Button, Container,
│   IconButton, Input, Logo, Price, Skeleton,
│   StarRating, Typography
├── molecules/ (13)
│   CTAGroup, Card, FormField, HeroSideSkeleton,
│   Nav, PaginationDots, ProductCard, ProductInfo,
│   SearchBar, Skeleton, TestimonialCard, VideoCard,
│   VideosSection
├── organisms/ (13)
│   BentoCarousel, ContactSection, Footer, Header,
│   Hero, HeroSplit, NavbarSticky, NewsSection,
│   ProductGrid, Skeleton, Testimonials,
│   VideosSection, WorkWithUs
├── templates/ (4)
│   HomeTemplate, HomeTemplateSkeleton,
│   HomeTemplateV2/, MarketTemplate,
│   ProductDetailTemplate
├── pages/ (vacío — legacy)
├── debug/ → SkeletonDebugger.tsx
└── index.ts (barrel export)
```

---

## 2. Molécula → Átomos

| Molécula         | Átomos consumidos                           |
| ---------------- | ------------------------------------------- |
| `ProductCard`    | Badge, Avatar, Typography (Heading, Text)   |
| `Card`           | Ningún átomo directo (genérica)             |
| `FormField`      | Input                                       |
| `CTAGroup`       | Button                                      |
| `Nav`            | Solo CVA + cn() (sin átomos)                |
| `SearchBar`      | Input, IconButton                           |
| `ProductInfo`    | Price, Badge, Typography                    |
| `PaginationDots` | Solo CVA (sin átomos)                       |
| `TestimonialCard`| Avatar, Typography, StarRating              |
| `VideoCard`      | Typography, Badge                           |

---

## 3. Organismo → Moléculas → Átomos

| Organismo        | Moléculas               | Átomos directos              |
| ---------------- | ----------------------- | ---------------------------- |
| `BentoCarousel`  | ProductCard, PaginationDots | Container, Typography     |
| `Header`         | Nav, SearchBar          | Logo, IconButton, Container  |
| `HeroSplit`      | —                       | Logo                         |
| `Hero`           | CTAGroup                | Badge, Typography, Container |
| `ProductGrid`    | ProductCard             | Container, Typography        |
| `NewsSection`    | —                       | Badge, Typography, Container |
| `Testimonials`   | —                       | IconButton, Typography, Container |
| `ContactSection` | FormField, CTAGroup     | Badge, Typography, Container |
| `WorkWithUs`     | —                       | Container                    |
| `Footer`         | —                       | Container                    |
| `NavbarSticky`   | Nav                     | Logo, IconButton, Container  |
| `VideosSection`  | VideoCard               | Typography, Container        |

---

## 4. Template → Organismos

### `HomeTemplateV2` ✅ ACTIVO (usado por `app/page.tsx`)

```
HomeTemplateV2
├── HeroSplit
├── NavbarSticky
├── BentoCarousel
├── NewsSection
├── VideosSection
├── Testimonials
├── WorkWithUs
└── Footer
```

### `HomeTemplate` ⚠️ LEGACY (NO usado)

```
HomeTemplate → Header, Hero, ProductGrid, ContactSection, Footer
```

### `MarketTemplate` / `ProductDetailTemplate`

Sin ruta activa en `app/`. Templates huérfanos.

---

## 5. Anomalías

| Problema | Detalle |
| --- | --- |
| **Duplicación cross-layer** | `ProductCard` existe en `molecules/` Y re-export en `organisms/` |
| **Barrel desactualizado** | `index.ts` NO exporta HeroSplit, NavbarSticky, BentoCarousel, NewsSection, Testimonials, WorkWithUs, VideosSection |
| **Templates legacy** | `HomeTemplate` sigue exportado pero no se usa |
| **`pages/` vacía** | Carpeta legacy sin contenido |
| **`VideosSection` duplicado** | Existe en `molecules/` Y `organisms/` |
| **`Skeleton/` en 3 niveles** | atoms/, molecules/, organisms/ — sin convención |
| **`HeroSplitSide` duplicada** | Definida en HeroSplit.tsx Y en data.ts |
