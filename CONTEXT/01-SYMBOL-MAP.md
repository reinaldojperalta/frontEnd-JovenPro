# 01 — SYMBOL MAP

> Inventario exhaustivo de tokens de diseño extraídos de `tailwind.config.ts` y `globals.css`.
> Fecha de auditoría: 2026-05-08 | Codebase: jovenpro-next-appV2

---

## 1. CSS Custom Properties (`:root`)

| Variable                    | Valor                                              | Consumidor                    |
| --------------------------- | -------------------------------------------------- | ----------------------------- |
| `--background`              | `#aecbff`                                          | `body`, `bg-background`       |
| `--foreground`              | `#1a1833`                                          | `body`, `text-foreground`     |
| `--skeleton-base`           | `148 163 184`                                      | skeleton-* clases             |
| `--skeleton-opacity`        | `0.25`                                             | `.skeleton-bg`                |
| `--skeleton-opacity-dim`    | `0.15`                                             | `.skeleton-bg-dim`            |
| `--skeleton-bg`             | `rgb(var(--skeleton-base) / var(--skeleton-opacity))` | `.skeleton-block`, pulse   |
| `--skeleton-bg-dim`         | `rgb(var(--skeleton-base) / var(--skeleton-opacity-dim))` | keyframe `50%`          |
| `--font-manrope`            | *Declarada en config, NO cargada en layout.tsx*     | `font-body`                   |
| `--font-inter`              | *Declarada en config, NO cargada en layout.tsx*     | `font-headline`               |
| `--font-montserrat`         | Cargada via `next/font/google`                     | layout.tsx body class         |
| `--font-plus-jakarta`       | Cargada via `next/font/google`                     | layout.tsx body class         |
| `--font-public-sans`        | Cargada via `next/font/google`                     | layout.tsx body class         |

> **⚠ CONFLICTO CRÍTICO**: `tailwind.config.ts` define `font-body` como `var(--font-manrope)` y
> `font-headline` como `var(--font-inter)`, pero `layout.tsx` carga Montserrat, Plus Jakarta Sans,
> y Public Sans — NUNCA Manrope ni Inter. Las variables CSS quedan vacías.

---

## 2. Paleta de Colores (Tailwind Extend)

| Token Tailwind            | Valor Hex   | Uso semántico                     |
| ------------------------- | ----------- | --------------------------------- |
| `primary.DEFAULT`         | `#241f43`   | Fondos principales, texto primary |
| `primary.dim`             | `#3a355a`   | Hover states, gradientes          |
| `primary.light`           | `#e5deff`   | Avatar fallback bg                |
| `secondary.DEFAULT`       | `#006496`   | CTA secundarios, overlines        |
| `secondary.light`         | `#45b3fd`   | Acentos hover                     |
| `surface.DEFAULT`         | `#fcf8ff`   | Cards, inputs bg                  |
| `surface.container`       | `#f0ebff`   | Navbar, containers                |
| `surface.container-low`   | `#f6f1ff`   | Secciones alternas (Journal)      |
| `surface.variant`         | `#e4dfff`   | Borders, separadores              |
| `border`                  | `#c9c5cf`   | Bordes globales                   |
| `background`              | `var(--background)` → `#aecbff` | Body background          |
| `foreground`              | `var(--foreground)` → `#1a1833` | Texto principal          |

---

## 3. Custom Border Radius (`rounded-clay`)

| Clase Tailwind      | CSS                  | Uso                              |
| ------------------- | -------------------- | -------------------------------- |
| `rounded-clay`      | `border-radius: 1rem`    | Cards, buttons, inputs       |
| `rounded-clay-sm`   | `border-radius: 0.75rem` | Badges sm, elementos menores |
| `rounded-clay-lg`   | `border-radius: 1.5rem`  | Cards grandes, modales       |

---

## 4. Custom Shadows (`shadow-clay`)

| Clase Tailwind        | Propiedades CSS                                                    |
| --------------------- | ------------------------------------------------------------------ |
| `shadow-clay`         | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` |
| `shadow-clay-sm`      | `0 1px 2px 0 rgba(0,0,0,0.05)`                                    |
| `shadow-clay-active`  | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)`    |

> **NOTA**: `shadow-soft`, `shadow-ambient` se usan en Testimonials y WorkWithUs
> pero **NO están definidas** en `tailwind.config.ts`. Serán ignoradas por Tailwind.

---

## 5. Aspect Ratios Bento

| Clase Tailwind            | Valor   | Componente destino      |
| ------------------------- | ------- | ----------------------- |
| `aspect-bento-large`      | `4/3`   | CardFull (Hero)         |
| `aspect-bento-vertical`   | `3/4`   | CardMin (Vertical)      |
| `aspect-bento-horizontal` | `16/9`  | CardPreviewMax          |
| `aspect-bento-small`      | `1/1`   | CardPreview             |
| `aspect-bento-history`    | `1/1`   | HistorySlot             |

> `aspect-bento-square` y `aspect-bento-portrait` se usan en `BentoGrid.variants.ts`
> pero **NO están definidos** en `tailwind.config.ts`. Solo existen `large/vertical/horizontal/small/history`.

---

## 6. Animaciones y Transiciones

| Token                        | Valor                            | Origen              |
| ---------------------------- | -------------------------------- | -------------------- |
| `ease-smooth`                | `cubic-bezier(0.25, 1, 0.5, 1)` | tailwind.config.ts   |
| `animate-fade-in`            | `fadein 0.3s ease-in`           | tailwind.config.ts   |
| `skeleton-pulse` (keyframe)  | 2s cubic-bezier loop             | globals.css          |

---

## 7. Clases Custom en `globals.css` (`@layer components`)

| Clase                      | Propiedades clave                                    |
| -------------------------- | ---------------------------------------------------- |
| `.skeleton-block`          | `background-color: var(--skeleton-bg); border-radius: 0.25rem` |
| `.skeleton-pulse`          | animation: skeleton-pulse 2s                         |
| `.skeleton-text`           | `.skeleton-pulse` + `h-[0.8em] rounded-sm`           |
| `.skeleton-circle`         | `.skeleton-pulse` + `rounded-full`                   |
| `.skeleton-rect`           | `.skeleton-pulse` puro                               |
| `.touch-target`            | `min-w-[44px] min-h-[44px] flex items-center justify-center` |
| `.hero-title`              | `font-headline font-black tracking-tighter leading-[1.1]` + clamp |
| `.bento-grid-container`    | `grid 7×6, gap 1rem, min-h 600px, max-h 800px`      |
| `.bento-slot-history-{1-4}`| `grid-area` para columna 1, filas 1-4               |
| `.bento-slot-hero`         | `grid-area: 1/2/5/6` (4 cols × 4 rows)              |
| `.bento-slot-next`         | `grid-area: 1/6/5/8` (2 cols × 4 rows)              |
| `.bento-slot-prev-max`     | `grid-area: 5/1/7/4` (3 cols × 2 rows)              |
| `.bento-slot-prev-{1,2}`   | Slots preview inferiores                             |
| `.bento-history-inactive`  | `grayscale opacity-50 + hover reset`                 |
| `.bento-slot`              | `relative overflow-hidden rounded-clay h-full`       |
| `.bento-history-fade`      | Transición CSS para history sin Framer               |
| `.card-overlay-text`       | `text-white drop-shadow-md`                          |
| `.hide-scrollbar`          | Webkit + Firefox + IE scrollbar hide                 |

---

## 8. Tokens Fantasma (usados en código pero NO definidos)

| Clase/Token usado              | Archivo que lo usa              | Estado         |
| ------------------------------ | ------------------------------- | -------------- |
| `shadow-soft`                  | Testimonials.tsx                | ❌ NO DEFINIDO |
| `shadow-ambient`               | WorkWithUs.tsx, Footer.tsx      | ❌ NO DEFINIDO |
| `text-jp-navy`                 | NewsSection.tsx                 | ❌ NO DEFINIDO |
| `text-jp-sky`                  | NewsSection.tsx                 | ❌ NO DEFINIDO |
| `text-jp-text-secondary`       | NewsSection.tsx                 | ❌ NO DEFINIDO |
| `font-display`                 | Footer.tsx                      | ❌ NO DEFINIDO |
| `text-on-surface`              | Input.variants.ts               | ❌ NO DEFINIDO |
| `text-on-surface-variant`      | Typography.variants.ts          | ❌ NO DEFINIDO |
| `border-surface-variant`       | IconButton.variants.ts          | ❌ NO DEFINIDO |
| `aspect-bento-square`          | BentoGrid.variants.ts           | ❌ NO DEFINIDO |
| `aspect-bento-portrait`        | BentoGrid.variants.ts           | ❌ NO DEFINIDO |
