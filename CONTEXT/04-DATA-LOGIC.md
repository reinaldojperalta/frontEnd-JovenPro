# 04 — DATA & LOGIC

> Flujo de datos, hooks, directivas "use client" y tipos TypeScript.
> Auditoría: 2026-05-08

---

## 1. Fuente de Datos

**Archivo único**: `src/lib/data.ts` — Datos 100% mock, sin fetch ni API.

### Tipos exportados

| Interface          | Campos clave                                          | Consumidores                    |
| ------------------ | ----------------------------------------------------- | ------------------------------- |
| `Product`          | id, slug, name, price, oldPrice, discountPrice, currency, image, category, artisan{}, badge, status, rating, reviewCount | ProductCard, BentoCarousel, ProductGrid, HomeTemplateV2 |
| `NewsItem`         | id, title, excerpt, category, image, date, readTime, href | NewsSection                     |
| `Testimonial`      | id, name, role, avatar, initials, text, rating, productImage | Testimonials                    |
| `VideoItem`        | id, title, thumbnail, youtubeId, duration, artisan    | VideosSection                   |
| `NavItem`          | label, href                                           | NavbarSticky, Header            |
| `Category`         | id, name, icon, count                                 | HomeTemplate (legacy)           |
| `HeroSplitSide`    | title, subtitle, cta, href, image                     | HeroSplit                       |
| `HeroSplitData`    | left, right, logoSrc                                  | HomeTemplateV2                  |
| `WorkWithUsData`   | headline, subheadline, instagram/facebook/whatsapp URLs, mapUrl, locationLabel | WorkWithUs  |
| `FooterData`       | brand, tagline, links[], socials[], copyright         | Footer                          |

### Datos exportados (constantes)

| Constante          | Tipo              | Items | Usado en page.tsx |
| ------------------ | ----------------- | ----- | ----------------- |
| `navItems`         | `NavItem[]`       | 6     | ✅                |
| `categories`       | `Category[]`      | 6     | ❌ comentado      |
| `products`         | `Product[]`       | 9     | ✅                |
| `newsItems`        | `NewsItem[]`      | 4     | ✅                |
| `testimonials`     | `Testimonial[]`   | 4     | ✅                |
| `videos`           | `VideoItem[]`     | 2     | ✅                |
| `heroSplitData`    | `HeroSplitData`   | 1     | ✅                |
| `workWithUsData`   | `WorkWithUsData`  | 1     | ✅                |
| `footerData`       | `FooterData`      | 1     | ✅                |

> ⚠ **Datos duplicados**: `products` contiene prod-007, prod-008, prod-009 que son
> copias exactas de "Hamaca Santandereana" con distinto id.

> ⚠ **Campo redundante**: `Product.discountPrice` es un alias de `oldPrice`.
> Ambos coexisten con valores idénticos. Solo `oldPrice` se usa en los componentes.

---

## 2. Flujo de Datos (Server → Client)

```
app/page.tsx (Server Component)
│  Importa datos mock directamente de src/lib/data.ts
│  NO hay fetch, getServerSideProps, ni API calls
│
└── <HomeTemplateV2 {...allProps} />  ("use client")
    ├── <HeroSplit left={} right={} logoSrc={} />
    ├── <NavbarSticky items={navItems} />
    ├── <BentoCarousel products={products} />
    ├── <NewsSection items={newsItems} />
    ├── <VideosSection videos={videos} />
    ├── <Testimonials testimonials={testimonials} />
    ├── <WorkWithUs data={workWithUsData} />
    └── <Footer data={footerData} />
```

> Todo el árbol es client-side porque `HomeTemplateV2` lleva `"use client"`.
> No hay beneficio de RSC; la serialización de props cruza el boundary innecesariamente.

---

## 3. Custom Hooks

### Estado de negocio

| Hook            | Archivo              | `"use client"` | State      | Persistencia     | Consumidores                |
| --------------- | -------------------- | -------------- | ---------- | ---------------- | --------------------------- |
| `useCart`        | `hooks/useCart.ts`   | ✅             | `useState` | ❌ Ninguna (RAM) | HomeTemplate, MarketTemplate, ProductDetailTemplate |
| `useFavorites`   | `hooks/useFavorites.ts` | ✅          | `useState` | ✅ localStorage  | HomeTemplate, MarketTemplate, ProductDetailTemplate |

> ⚠ `useCart` NO persiste en localStorage. Se pierde al recargar.
> `useFavorites` SÍ persiste pero con acceso directo a `localStorage`
> (no usa el hook genérico `useLocalStorage`).

> ⚠ **Tipado inconsistente**: `useCart.removeFromCart(id: number)` pero
> `CartItem.id` es `string | number` y `Product.id` es `string`.

### Utilidades UI

| Hook                | Archivo                   | `"use client"` | Propósito                    |
| ------------------- | ------------------------- | -------------- | ---------------------------- |
| `useLocalStorage`   | `hooks/useLocalStorage.ts`| ✅             | Generic localStorage wrapper |
| `useDebounce`       | `hooks/useDebounce.ts`    | ✅             | Debounce genérico            |
| `useMediaQuery`     | `hooks/useMediaQuery.ts`  | ✅             | Media query reactivo         |
| `useImageFallback`  | `hooks/useImageFallback.ts`| ✅            | Error handler de imágenes    |
| `usePasswordToggle` | `hooks/usePasswordToggle.ts`| ❌            | Toggle password visibility   |

> ⚠ `usePasswordToggle` NO tiene directiva `"use client"` pero usa `useState`.
> Funciona porque sus consumidores son client components, pero es incorrecto.

> ⚠ `useLocalStorage` existe pero `useFavorites` NO lo usa — implementa
> su propia lógica de localStorage directamente.

---

## 4. Mapa de `"use client"` en Componentes

### Átomos con `"use client"` (1 de 12)

| Componente | Tiene `"use client"` | ¿Necesario? |
| --- | --- | --- |
| `Avatar` | ✅ | ✅ usa `useImageFallback` |
| Todos los demás | ❌ | ✅ Correcto |

### Moléculas con `"use client"` (8 de 13)

`ProductCard`, `ProductCardSkeleton`, `PaginationDots`, `TestimonialCard`,
`TestimonialCardSkeleton`, `VideoCard`, `VideoCardSkeleton`, `HeroSideSkeleton`

### Organismos — TODOS tienen `"use client"` (13/13)

Cada organismo marca `"use client"` incluyendo los Skeletons.

### Templates — TODOS tienen `"use client"` (4/4)

> ⚠ **Bundle impact**: Al marcar `HomeTemplateV2` como `"use client"`, TODO
> el árbol de componentes se envía al cliente. El Server Component `page.tsx`
> solo serializa props. No hay code splitting real por RSC boundaries.

---

## 5. Consumo de useCart / useFavorites

| Template              | useCart | useFavorites | Nivel correcto |
| --------------------- | ------ | ------------ | -------------- |
| `HomeTemplate`        | ✅     | ✅           | ✅ Template    |
| `MarketTemplate`      | ✅     | ✅           | ✅ Template    |
| `ProductDetailTemplate`| ✅    | ✅           | ✅ Template    |
| `HomeTemplateV2`      | ❌     | ❌           | ⚠ No integrado|

> **CRÍTICO**: `HomeTemplateV2` (el template activo) NO consume `useCart`
> ni `useFavorites`. Los hooks de negocio están huérfanos en producción.
