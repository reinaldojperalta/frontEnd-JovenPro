# 04 — DATA & LOGIC

> Flujo de datos, hooks, directivas "use client" y tipos TypeScript.
> Auditoría: **2026-05-12** | Refactor V3 completado

---

## 1. Fuente de Datos

**Archivo único:** `src/lib/data.ts` — 743 líneas, 26KB. 100% mock, sin fetch ni API real.

### Tipos exportados (Interfaces)

| Interface | Campos clave | Consumidores directos |
| --- | --- | --- |
| `Product` | `id` (string), `slug`, `name`, `description`, `price`, `oldPrice?`, `discountPrice?` (alias de oldPrice ⚠️), `currency: "COP"\|"USD"`, `image`, `category`, `artisan{name, avatar, initials, verified}`, `badge?`, `status?: 'new'\|'sale'\|'featured'\|'none'`, `rating`, `reviewCount` | `ProductCard`, `BentoCarousel`, `HomeTemplateV2` |
| `NewsItem` | `id`, `title`, `excerpt`, `category`, `image`, `date`, `readTime`, `href?` | `NewsSection`, `NewsCard` |
| `Testimonial` | `id`, `name`, `role`, `avatar`, `initials`, `text`, `rating`, `productImage?` | `Testimonials`, `TestimonialCard` |
| `VideoItem` | `id`, `title`, `thumbnail`, `youtubeId`, `duration`, `artisan` | `VideosSection`, `VideoCard` |
| `NavItem` | `label`, `href` | `NavbarSticky` |
| `Category` | `id`, `name`, `icon`, `count` | ⚠️ SIN CONSUMIDOR ACTIVO (comentado en page.tsx) |
| `HeroSplitSide` | `title`, `subtitle`, `cta`, `href`, `image` | `HeroSplit` |
| `HeroSplitData` | `left: HeroSplitSide`, `right: HeroSplitSide`, `logoSrc?` | `HomeTemplateV2` |
| `WorkWithUsData` | `headline`, `subheadline`, `instagramUrl`, `facebookUrl`, `whatsappNumber`, `whatsappMessage`, `mapUrl`, `locationLabel`, `mapImageUrl`, `locationSubLabel` | `WorkWithUs` |
| `FooterData` | `brand`, `tagline`, `links[]`, `socials[]`, `copyright` | `Footer` |

### Constantes exportadas

| Constante | Tipo | Cantidad | Usado en `page.tsx` | Observaciones |
| --- | --- | --- | --- | --- |
| `navItems` | `NavItem[]` | 6 items | ✅ | hrefs: `#inicio`, `#productos`, `#journal`, `#videos`, `#testimonios`, `#contacto` |
| `categories` | `Category[]` | 6 items | ❌ comentado | Sin consumidor activo. Legacy de `HomeTemplate` |
| `products` | `Product[]` | **18 productos** | ✅ | Actualizado: productos reales de JovenPro (antes 9 mock genéricos) |
| `newsItems` | `NewsItem[]` | 5 items | ✅ | ⚠️ news-004 y news-005 son DUPLICADOS exactos |
| `testimonials` | `Testimonial[]` | 4 items | ✅ | |
| `videos` | `VideoItem[]` | 2 items | ✅ | |
| `heroSplitData` | `HeroSplitData` | 1 | ✅ | `logoSrc: "/images/logo/JovenPro-by-ZonaPro.png"` |
| `workWithUsData` | `WorkWithUsData` | 1 | ✅ | `whatsappNumber: "573024840101"` |
| `footerData` | `FooterData` | 1 | ✅ | `socials` incluye TikTok (no hay SVG para TikTok en Footer) |

### Inconsistencias en datos

| Problema | Detalle |
| --- | --- |
| ⚠️ `Product.discountPrice` | Alias semántico de `oldPrice`. Tienen valores idénticos. Solo `oldPrice` se usa en componentes. Candidato a eliminar. |
| ⚠️ `newsItems` duplicados | `news-004` y `news-005` son copias exactas (mismo título, imagen, href). |
| ⚠️ `Product.artisan.verified: false` | Todos los productos tienen `verified: false`. El campo existe pero nunca es `true`. |
| ⚠️ `Product.rating: 0` | Todos los productos tienen `rating: 0` y `reviewCount: 0`. Sin datos reales. |
| ⚠️ `HeroSplitSide.subtitle: "texto"` | El subtítulo de ambos lados del Hero es literalmente `"texto"`. Placeholder sin reemplazar. |
| ⚠️ `FooterData.socials` contiene TikTok | `Footer.tsx` solo tiene SVGs para Instagram, FB y WhatsApp. TikTok queda sin ícono. |
| ⚠️ `categories` sin uso | La constante está definida pero comentada en `page.tsx`. No se pasa a ningún organismo. |

---

## 2. Flujo de Datos (Server → Client)

```
src/app/page.tsx (Server Component — ÚNICO entry point)
│
│  Importa datos mock directamente de @/lib/data
│  NO hay: fetch, getServerSideProps, API routes, Context, Zustand
│
└── <HomeTemplateV2 {...allProps} />  ("use client")
    │
    ├── <HeroSplit left right logoSrc />
    ├── <NavbarSticky items searchSuggestions onSearchSubmit onSearchSelect onCartClick />
    │       └── searchSuggestions = products.map(p => {id, label, category, href})
    ├── <BentoCarousel products onProductClick />
    │       └── onProductClick = (href) => window.open(href, "_blank")
    ├── <NewsSection items />
    ├── <VideosSection videos />
    ├── <Testimonials testimonials />
    ├── <WorkWithUs data />
    └── <Footer data />
```

> **Problema estructural**: Todo el árbol es client-side porque `HomeTemplateV2` tiene `"use client"`.
> No hay beneficio de RSC. La serialización de props cruza el boundary sin hidratación diferida.
> Los datos mock se "serializan" desde Server → Client en cada request.

---

## 3. Custom Hooks — Inventario Completo

### Hooks de negocio

| Hook | Archivo | `"use client"` | State | Persistencia | Consumidores actuales |
| --- | --- | --- | --- | --- | --- |
| `useCart` | `hooks/useCart.ts` | ✅ | `useState` | ❌ RAM (pierde al recargar) | ⚠️ NINGUNO en flujo activo |
| `useFavorites` | `hooks/useFavorites.ts` | ✅ | `useState` | ✅ `localStorage` (directo) | ⚠️ NINGUNO en flujo activo |

> ⚠️ **CRÍTICO**: `HomeTemplateV2` (template activo) **NO usa** `useCart` ni `useFavorites`.
> Los hooks de negocio están disponibles pero **huérfanos en producción**.
> Los templates legacy (`HomeTemplate`, `MarketTemplate`) los usan, pero no están activos.

### Hooks utilitarios UI

| Hook | Archivo | `"use client"` | Propósito | Consumidores actuales |
| --- | --- | --- | --- | --- |
| `useLocalStorage` | `hooks/useLocalStorage.ts` | ✅ | Generic localStorage wrapper SSR-safe | ⚠️ NINGUNO (useFavorites no lo usa) |
| `useDebounce` | `hooks/useDebounce.ts` | ✅ | Debounce genérico | ⚠️ NINGUNO |
| `useMediaQuery` | `hooks/useMediaQuery.ts` | ✅ | Media query reactivo | ⚠️ NINGUNO |
| `useImageFallback` | `hooks/useImageFallback.ts` | ✅ | Error handler de imágenes | ✅ `Avatar` |
| `usePasswordToggle` | `hooks/usePasswordToggle.ts` | ❌ | Toggle password visibility | ⚠️ NECESITA `"use client"` |

> ⚠️ `usePasswordToggle`: Usa `useState` pero le falta la directiva `"use client"`. Error latente.
> ⚠️ `useLocalStorage`: Existe como wrapper SSR-safe, pero `useFavorites` implementa su propia lógica de localStorage directamente. Inconsistencia de patrón.

---

## 4. Mapa de `"use client"` en Componentes

### Átomos (1 de 13 tiene `"use client"`)

| Componente | `"use client"` | ¿Necesario? |
| --- | --- | --- |
| `Avatar` | ✅ | ✅ usa `useImageFallback` |
| Todos los demás (12) | ❌ | ✅ Correcto |

### Moléculas (5 de 12 tienen `"use client"`)

| Componente | `"use client"` | Razón |
| --- | --- | --- |
| `ProductCard` | ✅ | `framer-motion` (⚠️ viola REGLA 9) |
| `PaginationDots` | ✅ | Event handlers de click |
| `TestimonialCard` | ✅ | `framer-motion` |
| `VideoCard` | ✅ | `react-lite-youtube-embed` (requiere DOM) |
| `HeroSideSkeleton` | ✅ | — |
| `NewsCard` | ✅ | — |

### Organismos (TODOS tienen `"use client"` — 13/13)

Cada organismo activo y sus skeletons companión tienen `"use client"`.

### Templates (TODOS tienen `"use client"` — 4/4)

> ⚠️ **Bundle impact significativo**: Al marcar `HomeTemplateV2` como `"use client"`,
> TODO el árbol de componentes se envía al cliente. No hay code splitting por RSC boundaries.

---

## 5. Manejo de Navegación y Efectos Secundarios

| Componente | Lógica de navegación | Estado |
| --- | --- | --- |
| `HeroSplit.tsx` | `defaultNavigate(href)`: scroll suave para `#`, `window.open` para externos | ✅ Prop `onNavigate` expuesta |
| `WorkWithUs.tsx` | `handleOpen(url)`: `onOpenLink` prop o fallback a `window.open` | ✅ Prop `onOpenLink` expuesta |
| `Footer.tsx` | `handleOpen(url)`: `onOpenLink` prop o fallback a `window.open` | ✅ Prop `onOpenLink` expuesta |
| `HomeTemplateV2.tsx` | `handleProductClick`, `handleSearchSubmit`, `handleSearchSelect` como funciones locales; `window.open` inline en `onCartClick` | 🟡 PARCIAL — `onCartClick` inline |
| `NavbarSticky.tsx` | `onSearchSubmit`, `onSearchSelect` como props (inyectadas por Template) | ✅ Correcto |

---

## 6. Tipado — Inconsistencias TypeScript

| Problema | Detalle | Impacto |
| --- | --- | --- |
| `useCart.removeFromCart(id: number)` | Pero `CartItem.id` es `string \| number` y `Product.id` es `string` | Error de tipado latente |
| `BadgeVariant` type incompleto | No incluye `success`, `danger`, `warning`, `new`, `sale`, `featured` que SÍ existen en CVA | Falsa seguridad de tipos |
| `usePasswordToggle` sin `"use client"` | Usa `useState` sin directiva | Error en runtime si se usa en Server Component |
| `HeroSplitSide` duplicada | Definida en `HeroSplit.tsx` Y en `data.ts`. Dos fuentes de verdad | Posibles divergencias futuras |

---

## 7. Dependencias de npm (Relevantes para datos/lógica)

| Paquete | Versión | Uso |
| --- | --- | --- |
| `next` | 14.2.3 | App Router, Server Components, Image optimization |
| `react` / `react-dom` | ^18 | Componentes, hooks |
| `class-variance-authority` | ^0.7.1 | CVA para variantes |
| `clsx` | ^2.1.1 | Conditional class merging |
| `tailwind-merge` | ^2.6.1 | Tailwind class deduplication |
| `framer-motion` | ^11.2.10 | Animaciones en organismos y moléculas |
| `lucide-react` | ^0.378.0 | Iconos (solo en ContactSection actualmente) |
| `react-lite-youtube-embed` | ^3.5.1 | Player de YouTube en VideoCard |
| `@radix-ui/react-slot` | ^1.2.4 | `asChild` pattern (disponible pero uso no verificado) |
