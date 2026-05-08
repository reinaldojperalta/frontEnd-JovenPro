# 03 — CVA DICTIONARY

> Tabla exhaustiva de variantes CVA por componente.
> Auditoría: 2026-05-08

---

## 1. ÁTOMOS

### Button (`Button.variants.ts`)

| Prop | Valores | Clases Tailwind (resumen) |
| --- | --- | --- |
| `variant` | `primary` | `bg-primary text-white shadow-clay hover:shadow-clay-sm` |
| | `secondary` | `bg-surface-container text-foreground shadow-clay border` |
| | `ghost` | `bg-transparent text-foreground hover:bg-surface-container/50` |
| | `icon` | `bg-surface text-foreground rounded-full shadow-clay` |
| | `success` | `bg-green-100 text-green-700` |
| | `liquidGlass` | `bg-white/20 backdrop-blur-md animate-pulse` |
| `size` | `sm` / `md` / `lg` / `icon` / `iconLg` | h-10→h-16, px-4→px-10 |
| `isLoading` | `true/false` | `cursor-wait opacity-80` |
| `isFullWidth` | `true/false` | `w-full` |

### Badge (`Badge.variants.ts`)

| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `variant` | `default` / `primary` / `secondary` / `success` / `danger` / `warning` / `liquidGlass` / `new` / `sale` / `featured` | bg-* + text-* + shadow-* |
| `size` | `sm` / `md` / `lg` / `xl` | px-2→px-6, text-[10px]→text-sm |
| `uppercase` | `true/false` | `uppercase tracking-[0.2em]` |
| `indicator` | `true/false` | `pl-2` |

> ⚠ **TIPO INCOMPLETO**: El tipo exportado `BadgeVariant` NO incluye `success`, `danger`, `warning`, `new`, `sale`, `featured` que SÍ existen como variantes reales.

### Input (`Input.variants.ts`)

| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `variant` | `default` / `filled` / `outline` / `ghost` / `search` / `error` / `success` / `liquidGlass` | bg-* + shadow-* + border-* |
| `size` | `sm` / `md` / `lg` | h-10→h-14 |
| `state` | `default` / `error` / `success` / `disabled` / `loading` | opacity/cursor overrides |
| `hasIcon` | `true/false` | (vacío — sin efecto real) |
| `iconPosition` | `left/right` | (vacío — sin efecto real) |

> ⚠ `hasIcon` y `iconPosition` tienen TODAS sus variantes vacías `""`. No producen ningún CSS.

### IconButton (`IconButton.variants.ts`)

| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `variant` | `default` / `primary` / `secondary` / `ghost` / `outline` / `circular` / `danger` / `whatsapp` / `success` / `liquidGlass` | bg-* + shadow-* + rounded-* |
| `size` | `xs` / `sm` / `md` / `lg` / `xl` | w-8→w-16 |
| `isLoading` | `true/false` | `cursor-wait opacity-80` |
| `hasNotification` | `true/false` | `relative` |

> ⚠ `whatsapp` usa color hardcoded `bg-[#25D366]` — rompe diseño atómico.

### Typography — Heading (`Typography.variants.ts`)

| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `level` | `h1`→`h6` | text-5xl→text-lg (responsive) |
| `variant` | `default` / `primary` / `secondary` / `gradient` / `muted` / `inverted` / `liquidGlass` | text-* / bg-clip-text |
| `italic` | `true/false` | `italic` |
| `tracking` | `tighter`→`widest` | tracking-* |
| `transform` | `uppercase` / `lowercase` / `capitalize` / `normal` | text-transform |

### Typography — Text (`Typography.variants.ts`)

| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `size` | `xs`→`2xl` | text-[10px]→text-2xl |
| `variant` | `default` / `body` / `lead` / `caption` / `overline` / `label` / `muted` / `inverted` / `link` / `success` / `error` / `warning` / `liquidGlass` | text-* + font-* |
| `weight` | `light`→`black` | font-* |
| `align` | `left` / `center` / `right` | text-align |
| `truncate` | `true/false` | `truncate` |
| `lineClamp` | `none` / `1`→`4` | line-clamp-* |

### Otros átomos

| Componente | Variantes clave |
| --- | --- |
| `Avatar` | size: sm/md/lg/xl, variant: default/solid/outline |
| `Logo` | variant: default/inverted/monochrome/gradient, size: sm→xl, interactive |
| `Container` | size: xs→full, padding/paddingY, variant: transparent→bordered, align, minHeight, flex, centered, radius |
| `Price` | variant: default→success, size: xs→2xl, weight |
| `BentoGrid` | cols: 1-4 |
| `BentoItem` | colSpan, rowSpan, ratio: large/square/portrait/auto |

---

## 2. MOLÉCULAS

### ProductCard (`ProductCard.variants.ts`) — 12 funciones CVA

| Función CVA | Variante prop | card-full | card-min | card-preview-max | card-preview | history-slot |
| --- | --- | --- | --- | --- | --- | --- |
| `productCardVariants` | wrapper | flex justify-end h-full | flex justify-end h-full | flex justify-end h-full | flex justify-end h-full | aspect-bento-history |
| `productCardOverlayVariants` | overlay | from-black via-black/60 | from-black/80 | from-primary/90 | from-primary/90 | (vacío) |
| `productCardContentVariants` | content | p-6 gap-2 | p-4 gap-1.5 | p-7 | p-7 | hidden |
| `productCardTitleVariants` | título | text-2xl lg:text-3xl | text-lg | text-lg | text-md | hidden |
| `productCardDescriptionVariants` | desc | text-md line-clamp-2 | text-sm line-clamp-1 | hidden | hidden | hidden |
| `productCardPriceVariants` | precio | text-xl | text-base | hidden | hidden | hidden |
| `productCardOldPriceVariants` | tachado | text-sm | text-xs | hidden | hidden | hidden |
| `productCardLinkVariants` | link | (visible) | (visible) | hidden | hidden | hidden |
| `productCardStatusBadgeVariants` | badge | block | hidden | hidden | hidden | hidden |
| `productCardAvatarVariants` | avatar | flex | hidden | hidden | hidden | hidden |
| `productCardCornerIconVariants` | icono | hidden | hidden | top-3 w-8 | top-2.5 w-7 | hidden |
| `productCardArrowVariants` | flecha | hidden | hidden | hidden | hidden | hidden |

> ⚠ `productCardArrowVariants` está **100% DEPRECADA** — todas las variantes son `hidden`. Se importa pero NO se consume en ProductCard.tsx.

### Card (`Card.variants.ts`)

5 funciones CVA: `cardVariants`, `cardHeaderVariants`, `cardContentVariants`, `cardFooterVariants`, `cardMediaVariants`.

### Nav (`Nav.variants.ts`)

3 funciones: `navVariants`, `navItemVariants`, `navIndicatorVariants`.

---

## 3. ESTILOS FUERA DE .variants.ts

| Archivo | Clases inline (NO en CVA) | Severidad |
| --- | --- | --- |
| `HeroSplit.tsx` | `font-headline text-4xl md:text-6xl font-bold text-white drop-shadow-lg` | 🔴 ALTA |
| `HeroSplit.tsx` | `grayscale brightness-200 contrast-50 saturate-0` en img | 🟡 MEDIA |
| `NewsSection.tsx` | `font-headline text-2xl font-bold text-jp-navy` (usa tokens fantasma) | 🔴 ALTA |
| `NewsSection.tsx` | `text-[10px]` inline badge sin usar Badge atom | 🔴 ALTA |
| `Testimonials.tsx` | `shadow-soft` (token no definido) | 🔴 ALTA |
| `Testimonials.tsx` | `min-h-[280px]` arbitrario | 🟡 MEDIA |
| `WorkWithUs.tsx` | Botones sociales con clases inline completas | 🔴 ALTA |
| `Footer.tsx` | `font-display` (token fantasma) | 🔴 ALTA |
| `ContactSection.tsx` | `w-[500px] h-[500px]` blur decorativo | 🟡 MEDIA |
| `ProductCard.tsx` | `text-xs font-semibold text-foreground` inline en artisan span | 🟡 MEDIA |
