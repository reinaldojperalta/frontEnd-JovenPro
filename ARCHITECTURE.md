# 🏗️ Arquitectura de Componentes — JovenPro Next.js 14

> **Versión:** 3.1 (Auditoría 2026-05-12)
> **Stack:** Next.js 14.2.3 (App Router) + TypeScript estricto + Tailwind CSS 3.4 + CVA 0.7 + Framer Motion 11
> **Patrón:** Atomic Design (Atoms → Molecules → Organisms → Templates)
> **Propósito:** Contexto único de verdad para cualquier LLM que trabaje en este codebase.
> **Última auditoría:** 2026-05-12 | Refactor V3 completado

---

## 📁 Estructura de Carpetas (Estado Real)

```
src/
├── app/                           # Next.js App Router (Server Components por defecto)
│   ├── page.tsx                   # Único entry point: importa datos y monta HomeTemplateV2
│   ├── layout.tsx                 # Root layout: fuentes (Inter + Montserrat), metadata, globals.css
│   ├── globals.css                # Directivas @tailwind + CSS custom props + utilidades bento/news
│   └── debug/                     # Ruta de debug interna (no producción)
├── components/
│   ├── atoms/ (13)
│   │   Avatar, Badge, BentoGrid, Button, Container,
│   │   IconButton, Input, Logo, Price, Section,
│   │   Skeleton, StarRating, Typography
│   ├── molecules/ (12)
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
│   ├── pages/                     # Vacío — migrado a app/
│   ├── debug/                     # Componentes de debug
│   └── index.ts                   # Barrel export raíz
├── hooks/ (8)
│   useCart, useDebounce, useFavorites, useImageFallback,
│   useLocalStorage, useMediaQuery, usePasswordToggle, index.ts
├── lib/
│   ├── data.ts                    # ÚNICA fuente de datos (mock, 18 productos, 4 testimonios, 5 noticias, 2 videos)
│   └── utils/
│       └── cn.ts                  # clsx + tailwind-merge
└── legacy/                        # Componentes legacy no utilizados
```

---

## 🧩 Niveles de Atomic Design — Responsabilidades

### 1. Átomos (`components/atoms/`) — 13 átomos

**Regla de oro:** Un átomo no decide su posición en el espacio. Solo sabe cómo se ve y qué hace.

| Átomo | Responsabilidad | Tiene `.variants.ts` | `use client` |
|-------|----------------|---------------------|--------------|
| `Button` | Botón con variantes, icono, loading, forwardRef | ✅ | ❌ |
| `IconButton` | Botón circular con icono ReactNode + notificación | ✅ | ❌ |
| `Input` | Campo de texto con estados (error, success, loading) | ✅ | ❌ |
| `Badge` | Pill de texto con variantes de color | ✅ | ❌ |
| `Typography` | Heading, Text, GradientText con escalas tipográficas | ✅ | ❌ |
| `Container` | Wrapper con max-width, padding, radius, variant | ✅ | ❌ |
| `Avatar` | Avatar con fallback de imagen | ✅ | ✅ (usa useImageFallback) |
| `Logo` | Logo con variantes y tamaños | ✅ | ❌ |
| `Price` | Display de precio con formato | ✅ | ❌ |
| `BentoGrid` | Grid container bento | ✅ | ❌ |
| `Section` | Wrapper semántico `<section>/<footer>/<header>` | ✅ | ❌ |
| `Skeleton` | SkeletonBlock, SkeletonCircle | ✅ | ❌ |
| `StarRating` | Renderizado de estrellas | ✅ | ❌ |

**Props de átomos:** Solo reciben props del DOM + variantes de CVA. Nunca reciben objetos de dominio (`Product`, `User`).

### 2. Moléculas (`components/molecules/`) — 12 moléculas

| Molécula | Átomos consumidos | `use client` |
|----------|-------------------|--------------|
| `ProductCard` | Badge, Avatar, Typography | ✅ (motion) |
| `NewsCard` | Badge, Typography | ✅ |
| `Card` | Ningún átomo directo (genérica) | ❌ |
| `FormField` | Input | ❌ |
| `CTAGroup` | Button | ❌ |
| `Nav` | Solo CVA + cn() | ❌ |
| `SearchBar` | Input, IconButton | ❌ |
| `PaginationDots` | Solo CVA | ✅ |
| `TestimonialCard` | Avatar, Typography, StarRating | ✅ |
| `VideoCard` | Typography, Badge | ✅ |
| `HeroSideSkeleton` | Skeleton atoms | ✅ |
| `Skeleton` | SkeletonBlock | ❌ |

### 3. Organismos (`components/organisms/`) — 13 organismos

**TODOS tienen `"use client"`.** Ver 04-DATA-LOGIC.md para impacto de bundle.

| Organismo | Estado Refactor | `.variants.ts` | Skeleton companion |
|-----------|----------------|----------------|--------------------|
| `HeroSplit` | ✅ LIMPIO V3 | ✅ | ✅ HeroSplitSkeleton |
| `NavbarSticky` | ✅ LIMPIO V3 | ✅ | ✅ NavbarStickySkeleton |
| `BentoCarousel` | ✅ LIMPIO V3 | ✅ | ✅ BentoCarouselSkeleton |
| `NewsSection` | ✅ LIMPIO V3 | ✅ | ✅ NewsSectionSkeleton |
| `VideosSection` | ✅ LIMPIO V3 | ✅ | ✅ VideosSectionSkeleton |
| `Testimonials` | ✅ LIMPIO V3 | ✅ | ✅ TestimonialsSkeleton |
| `WorkWithUs` | 🟡 PARCIAL | ✅ | ✅ WorkWithUsSkeleton |
| `ContactSection` | ✅ LIMPIO V3 | ✅ | ✅ ContactSectionSkeleton |
| `Footer` | ✅ LIMPIO V3 | ✅ | ✅ FooterSkeleton |
| `Header` | ⚠️ LEGACY | ❓ | ✅ HeaderSkeleton |
| `Hero` | ⚠️ LEGACY | ❓ | ✅ ProductGridSkeleton |
| `ProductGrid` | ⚠️ LEGACY | ❓ | ✅ ProductGridSkeleton |
| `Skeleton` | Organismo skeleton | N/A | N/A |

### 4. Templates (`components/templates/`)

| Template | Estado | Entry point |
|----------|--------|-------------|
| `HomeTemplateV2` | ✅ ACTIVO | `app/page.tsx` |
| `MarketTemplate` | ⚠️ HUÉRFANO (sin ruta) | N/A |
| `ProductDetailTemplate` | ⚠️ HUÉRFANO (sin ruta) | N/A |
| `DebugTemplate` | 🛠️ DEBUG | `app/debug/` |

**Flujo de datos real:**
```
app/page.tsx (Server Component)
  → importa datos mock de @/lib/data
  → monta <HomeTemplateV2 {...props}> ("use client")
      ├── <HeroSplit>
      ├── <NavbarSticky>
      ├── <BentoCarousel>
      ├── <NewsSection>
      ├── <VideosSection>
      ├── <Testimonials>
      ├── <WorkWithUs>
      └── <Footer>
```

---

## 🎨 Sistema de Variantes (CVA) — Patrón Estándar

```
ComponentName/
├── ComponentName.tsx           # Lógica React
├── ComponentName.variants.ts   # Definición CVA (variantes, tamaños, estados)
└── index.ts                    # Barrel export
```

**Reglas:**
- El resultado de `cva()` se exporta nombrado: `componentVariants`, `componentSubPartVariants`
- En el componente: `cn(componentVariants({ variant, size }), className)`
- `className` siempre al final para permitir override desde el padre

---

## 🎨 Paleta de Colores (tailwind.config.ts — Estado Real)

```ts
primary:   { DEFAULT: "#00AEEF", dim: "#0284C7", subtle: "#E0F2FE" }
secondary: { DEFAULT: "#2D2B52", light: "#3E3C66" }
accent:    { DEFAULT: "#FF6B6B", vibrant: "#F97056", strong: "#E85D5D", subtle: "#FFE5E5" }
surface:   { DEFAULT: "#F1F5F9", container: "#F8FAFC", "container-low": "#FFFFFF", variant: "#E2E8F0" }
border:    { DEFAULT: "#CBD5E1", subtle: "#E2E8F0" }
muted:     { DEFAULT: "#E2E8F0", light: "rgba(241, 245, 249, 0.61)", foreground: "#64748B" }
success:   { DEFAULT: "#22C55E", subtle: "#DCFCE7" }
danger:    { DEFAULT: "#EF4444", subtle: "#FEE2E2" }
warning:   { DEFAULT: "#F59E0B", subtle: "#FEF3C7" }
background: var(--background) → #F8FAFC (globals.css)
foreground: var(--foreground) → #1A1832 (globals.css)
```

> ⚠️ **DISCREPANCIA CRÍTICA**: El SYMBOL-MAP anterior documentaba una paleta diferente (`primary: #241f43`, `secondary: #006496`). La paleta REAL está en `tailwind.config.ts` y es la indicada arriba.

---

## 📦 Tokens de Diseño (tailwind.config.ts)

| Categoría | Tokens |
|-----------|--------|
| **Border Radius** | `rounded-clay` (1rem), `rounded-clay-sm` (0.75rem), `rounded-clay-lg` (1.5rem) |
| **Box Shadow** | `shadow-clay`, `shadow-clay-sm`, `shadow-clay-active` |
| **Aspect Ratio** | `aspect-bento-large` (4/3), `aspect-bento-vertical` (3/4), `aspect-bento-horizontal` (16/9), `aspect-bento-small` (1/1), `aspect-bento-history` (1/1) |
| **Animación** | `animate-fade-in`, `ease-smooth` (cubic-bezier(0.25, 1, 0.5, 1)) |
| **Tipografía** | `font-body` (Inter), `font-headline` (Montserrat) |

---

## ⚛️ Server vs Client Components

| Nivel | Tipo | Razón |
|-------|------|-------|
| `app/page.tsx` | Server Component | Data fetching mock, props drilling a template |
| `app/layout.tsx` | Server Component | Fuentes, CSS global, metadata |
| `HomeTemplateV2` | `"use client"` | Único template activo; orquesta organismos |
| Todos los Organismos | `"use client"` | Usan Framer Motion, hooks de interacción |
| Algunas Moléculas | `"use client"` | ProductCard, TestimonialCard, VideoCard (motion) |
| Mayoría de Átomos | Server | Solo Avatar es client (useImageFallback) |

> **Impacto:** Todo el árbol bajo `HomeTemplateV2` se envía al cliente. No hay code splitting real por RSC boundaries.

---

## 🔤 Iconos — Regla Crítica

```typescript
// ✅ CORRECTO — Pasar ReactNode (JSX ejecutado)
<IconButton icon={<ShoppingCart className="w-5 h-5" />} />

// ❌ PROHIBIDO — Pasar ComponentType (referencia de función)
<IconButton icon={ShoppingCart} />  // CAUSA: Objects are not valid as a React child
```

> Los SVGs inline en `WorkWithUs.tsx` y `Footer.tsx` aún persisten como deuda técnica.
> Deben migrar a `lucide-react` o a un átomo `Icon`.

---

## 🎯 Convenciones de Scroll y Anclas

| `id` de sección | Organismo | `navItems` href |
|-----------------|-----------|-----------------|
| `#inicio` | HeroSplit | `#inicio` |
| `#productos` | BentoCarousel | `#productos` |
| `#journal` | NewsSection | `#journal` |
| `#videos` | VideosSection | `#videos` |
| `#testimonios` | Testimonials | `#testimonios` |
| `#contacto` | WorkWithUs | `#contacto` |

---

## 🦴 Sistema de Skeletons

Cada organismo tiene su `*Skeleton.tsx` companion. Usan clases CSS (`.skeleton-pulse`, `.skeleton-block`) definidas en `globals.css`, NO Framer Motion.

```
globals.css → .skeleton-block, .skeleton-pulse, .skeleton-text, .skeleton-circle, .skeleton-rect
             → @keyframes skeleton-pulse
```

---

## ⚠️ Deuda Técnica Activa (Post Refactor V3)

| Prioridad | Problema | Componente |
|-----------|----------|------------|
| 🔴 CRÍTICA | SVGs inline (Instagram, FB, WA) duplicados | `WorkWithUs.tsx`, `Footer.tsx` |
| 🔴 CRÍTICA | `"Maker Hub"` hardcodeado (no viene de `data`) | `WorkWithUs.tsx:111` |
| 🔴 CRÍTICA | `"Conecta con nosotros"` hardcodeado | `WorkWithUs.tsx:168` |
| 🔴 CRÍTICA | `window.open` inline en `HomeTemplateV2` | `HomeTemplateV2.tsx:39` |
| 🟡 MEDIA | `w-[500px] h-[500px]` en CVA (valor arbitrario en variants) | `ContactSection.variants.ts:124` |
| 🟡 MEDIA | `productCardArrowVariants` CVA 100% deprecated | `ProductCard.variants.ts` |
| 🟡 MEDIA | `useCart` y `useFavorites` no integrados en `HomeTemplateV2` | `HomeTemplateV2.tsx` |
| 🟡 MEDIA | `categories` comentado/sin uso real | `data.ts`, `page.tsx` |
| 🟢 BAJA | Templates huérfanos (`MarketTemplate`, `ProductDetailTemplate`) | `templates/` |
| 🟢 BAJA | news-004 y news-005 son duplicados exactos | `data.ts` |

---

## 📝 Notas para LLMs

1. **Paleta real:** Consultar `tailwind.config.ts`, no el SYMBOL-MAP anterior (estaba desactualizado).
2. **Template activo:** Solo `HomeTemplateV2`. `HomeTemplate` es legacy y no se usa.
3. **Icono siempre como JSX:** `icon={<Icon />}` nunca `icon={Icon}`.
4. **No hay Context API ni Zustand:** El estado es local a templates. `useCart`/`useFavorites` están disponibles pero sin conectar en `HomeTemplateV2`.
5. **Datos:** 100% mock en `src/lib/data.ts`. No hay fetch ni API real.
6. **Grid Bento:** Sistema de grid 16×9 definido en `globals.css` como clases custom (`.bento-grid-v4`, `.bento-slot-*`).
7. **`Section` es un átomo** (no un organism). Es un wrapper semántico que acepta `as`, `spacing`, `background`, `id`.
8. **Framer Motion en moléculas es deuda:** `ProductCard` importa `motion` — viola REGLA 9.
