# 03 — CVA DICTIONARY

> Tabla exhaustiva de variantes CVA por componente.
> Auditoría: **2026-05-12** | Refactor V3 completado

---

## CONVENCIÓN GLOBAL

- Función CVA exportada como: `componentNameVariants` (camelCase)
- Importación desde: `./ComponentName.variants`
- Re-export en: `ComponentName/index.ts`
- Uso en JSX: `cn(componentNameVariants({ prop }), className)`

---

## 1. ÁTOMOS

### `Button` — `Button.variants.ts`

| Prop | Valores | Clases Tailwind (resumen) |
| --- | --- | --- |
| `variant` | `primary` | `bg-primary text-white shadow-clay hover:bg-primary-dim` |
| | `secondary` | `bg-surface-container text-foreground shadow-clay border` |
| | `ghost` | `bg-transparent text-foreground hover:bg-surface-container/50` |
| | `icon` | `bg-surface text-foreground rounded-full shadow-clay` |
| | `success` | `bg-success/10 text-success border border-success/30` |
| | `liquidGlass` | `bg-white/20 backdrop-blur-md border border-white/30` |
| `size` | `sm` / `md` / `lg` / `icon` / `iconLg` | h-10 → h-16, px-4 → px-10 |
| `isLoading` | `true/false` | `cursor-wait opacity-80` |
| `isFullWidth` | `true/false` | `w-full` |

---

### `Badge` — `Badge.variants.ts`

| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `variant` | `default` | `bg-surface-variant text-foreground/70` |
| | `primary` | `bg-primary text-white` |
| | `secondary` | `bg-secondary text-white` |
| | `success` | `bg-success/10 text-success border border-success/30` |
| | `danger` | `bg-danger/10 text-danger border border-danger/30` |
| | `warning` | `bg-warning/10 text-warning border border-warning/30` |
| | `liquidGlass` | `bg-white/20 backdrop-blur-md border border-white/30` |
| | `new` | Badge estilo "nuevo" |
| | `sale` | Badge estilo "oferta" |
| | `featured` | Badge estilo "destacado" |
| `size` | `sm` / `md` / `lg` / `xl` | px-2 → px-6, text-[10px] → text-sm |
| `uppercase` | `true/false` | `uppercase tracking-[0.2em]` |
| `indicator` | `true/false` | `pl-2` |

> ⚠️ **DEUDA**: El tipo exportado `BadgeVariant` debe incluir `success`, `danger`, `warning`, `new`, `sale`, `featured` que SÍ existen como variantes reales.

---

### `Input` — `Input.variants.ts`

| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `variant` | `default` / `filled` / `outline` / `ghost` / `search` / `error` / `success` / `liquidGlass` | bg-* + shadow-* + border-* |
| `size` | `sm` / `md` / `lg` | h-10 → h-14 |
| `state` | `default` / `error` / `success` / `disabled` / `loading` | opacity/cursor overrides |
| `hasIcon` | `true/false` | ⚠️ VACÍO — sin efecto CSS real |
| `iconPosition` | `left/right` | ⚠️ VACÍO — sin efecto CSS real |

> ⚠️ `hasIcon` e `iconPosition` tienen todas sus variantes como `""`. No producen CSS.
> ⚠️ `text-on-surface` usado en `Input.variants.ts` → token no definido en tailwind.config.ts.

---

### `IconButton` — `IconButton.variants.ts`

| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `variant` | `default` / `primary` / `secondary` / `ghost` / `outline` / `circular` / `danger` / `social` / `whatsapp` / `success` / `liquidGlass` | bg-* + shadow-* + rounded-* |
| `size` | `xs` / `sm` / `md` / `lg` / `xl` | w-8 → w-16 |
| `isLoading` | `true/false` | `cursor-wait opacity-80` |
| `hasNotification` | `true/false` | `relative` |

> ⚠️ `whatsapp` usa color hardcoded `bg-[#25D366]` — rompe diseño atómico (debería ser token).
> ✅ **NUEVO**: `social` variant añadida en Refactor V3 para reemplazar botones inline en WorkWithUs y Footer.

---

### `Typography` — `Typography.variants.ts`

#### `Heading`
| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `level` | `h1` → `h6` | `text-5xl` → `text-lg` (responsive) |
| `variant` | `default` / `primary` / `secondary` / `gradient` / `muted` / `inverted` / `liquidGlass` | text-* / bg-clip-text |
| `italic` | `true/false` | `italic` |
| `tracking` | `tighter` → `widest` | `tracking-*` |
| `transform` | `uppercase` / `lowercase` / `capitalize` / `normal` | text-transform |

> ⚠️ `text-on-surface-variant` usado en variante `muted` → token no definido en tailwind.config.ts.

#### `Text`
| Prop | Valores | Clases Tailwind |
| --- | --- | --- |
| `size` | `xs` → `2xl` | `text-[10px]` → `text-2xl` |
| `variant` | `default` / `body` / `lead` / `caption` / `overline` / `label` / `muted` / `inverted` / `link` / `success` / `error` / `warning` / `liquidGlass` | text-* + font-* |
| `weight` | `light` → `black` | `font-*` |
| `align` | `left` / `center` / `right` | text-align |
| `truncate` | `true/false` | `truncate` |
| `lineClamp` | `none` / `1` → `4` | `line-clamp-*` |

---

### Otros Átomos

| Componente | Variantes clave |
| --- | --- |
| `Avatar` | `size`: sm/md/lg/xl; `variant`: default/solid/outline |
| `Logo` | `variant`: default/inverted/monochrome/gradient; `size`: sm→xl; `interactive`: true/false |
| `Container` | `size`: xs→full; `padding`/`paddingY`; `variant`: transparent→bordered/clay/surface-container; `align`; `minHeight`; `flex`; `centered`; `radius` |
| `Price` | `variant`: default→success; `size`: xs→2xl; `weight` |
| `BentoGrid` | `cols`: 1-4 |
| `BentoItem` | `colSpan`; `rowSpan`; `ratio`: large/square/portrait/auto |
| `Section` | `as`: section/footer/header/div/main/article; `spacing`: none/sm/md/lg/hero; `background`: background/surface/surface-container/surface-container-low; `flex`; `centered` |
| `StarRating` | `size`: sm/md/lg; `variant`: default/muted |
| `Skeleton` — `SkeletonBlock` | `size`: sm/md/lg/full; `rounded`: sm/md/lg/full |

---

## 2. MOLÉCULAS

### `ProductCard` — `ProductCard.variants.ts` (12 funciones CVA)

| Función CVA | Variantes | `card-full` | `card-min` | `card-preview-max` | `card-preview` | `history-slot` |
| --- | --- | --- | --- | --- | --- | --- |
| `productCardVariants` | wrapper | flex justify-end h-full | flex justify-end h-full | flex justify-end h-full | flex justify-end h-full | aspect-bento-history |
| `productCardOverlayVariants` | overlay | from-black via-black/60 | from-black/80 | from-primary/90 | from-primary/90 | (vacío) |
| `productCardContentVariants` | content | p-6 gap-2 | p-4 gap-1.5 | p-7 | p-7 | hidden |
| `productCardTitleVariants` | título | text-2xl lg:text-3xl | text-lg | text-lg | text-md | hidden |
| `productCardDescriptionVariants` | desc | text-md line-clamp-2 | text-sm line-clamp-1 | hidden | hidden | hidden |
| `productCardPriceVariants` | precio | text-xl | text-base | hidden | hidden | hidden |
| `productCardOldPriceVariants` | tachado | text-sm | text-xs | hidden | hidden | hidden |
| `productCardLinkVariants` | link | visible | visible | hidden | hidden | hidden |
| `productCardStatusBadgeVariants` | badge | block | hidden | hidden | hidden | hidden |
| `productCardAvatarVariants` | avatar | flex | hidden | hidden | hidden | hidden |
| `productCardCornerIconVariants` | icono | hidden | hidden | top-3 w-8 | top-2.5 w-7 | hidden |
| `productCardArrowVariants` | flecha | **hidden** | **hidden** | **hidden** | **hidden** | **hidden** |

> 🗑️ **`productCardArrowVariants` 100% DEPRECATED** — Todas las variantes son `hidden`.
> Se importa pero NO se consume en `ProductCard.tsx`. Debe eliminarse.

---

### `Card` — `Card.variants.ts`

5 funciones CVA: `cardVariants`, `cardHeaderVariants`, `cardContentVariants`, `cardFooterVariants`, `cardMediaVariants`.

---

### `Nav` — `Nav.variants.ts`

3 funciones: `navVariants`, `navItemVariants`, `navIndicatorVariants`.

---

### `FormField` — `FormField.variants.ts`

Variantes para: wrapper, label, input state, helper text, icon position.

> ⚠️ `text-[10px]` usado inline en JSX de `FormField.tsx` — viola Zero Inline Policy.

---

### `TestimonialCard` — `TestimonialCard.variants.ts`

Variantes para: card wrapper, content, avatar area, rating, text, quote icon.

---

### `VideoCard` — `VideoCard.variants.ts`

Variantes para: card wrapper, thumbnail, overlay, title, badge, play button.

---

## 3. ORGANISMOS — CVA (Refactor V3)

| Organismo | `.variants.ts` | Funciones CVA exportadas |
| --- | --- | --- |
| `HeroSplit` | ✅ | `heroSplitDividerVariants`, `heroSplitLogoWrapperVariants`, `heroSplitLogoContainerVariants`, `heroSplitLogoImageVariants`, `heroSplitSideVariants`, `heroSplitImageContainerVariants`, `heroSplitImageVariants`, `heroSplitGradientOverlayVariants`, `heroSplitDarkOverlayVariants`, `heroSplitContentVariants`, `heroSplitTitleVariants`, `heroSplitSubtitleVariants`, `heroSplitCTAVariants`, `heroSplitArrowVariants` |
| `NavbarSticky` | ✅ | navbarStickyVariants, header/content/logo/nav variants |
| `BentoCarousel` | ✅ | bentoCarouselVariants y slots |
| `NewsSection` | ✅ | newsSectionVariants y slots |
| `VideosSection` | ✅ | videosSectionVariants y slots |
| `Testimonials` | ✅ | testimonialsVariants y slots |
| `WorkWithUs` | ✅ | `workWithUsCardVariants`, `workWithUsContentVariants`, `workWithUsDecoVariants`, `workWithUsInnerVariants`, `workWithUsTitleVariants`, `workWithUsDescriptionVariants`, `workWithUsDividerVariants`, `workWithUsSocialsVariants`, `workWithUsMapVariants`, `workWithUsMapImageVariants`, `workWithUsMapOverlayVariants`, `workWithUsPinWrapperVariants`, `workWithUsPinButtonVariants`, `workWithUsPinPingVariants`, `workWithUsPinIconVariants`, `workWithUsLocationLabelVariants`, `workWithUsLocationSubVariants` |
| `ContactSection` | ✅ | `contactSectionCardVariants`, `contactSectionContentVariants`, `contactSectionTitleVariants`, `contactSectionDescriptionVariants`, `contactSectionFeaturesVariants`, `contactSectionFeatureItemVariants`, `contactSectionFeatureIndicatorVariants`, `contactSectionFormVariants`, `contactSectionFormCardVariants`, `contactSectionFormWrapperVariants`, `contactSectionCTAVariants`, `contactSectionAccentTopVariants`, `contactSectionAccentBottomVariants` |
| `Footer` | ✅ | `footerInnerVariants`, `footerBrandVariants`, `footerLogoVariants`, `footerCopyrightVariants`, `footerNavVariants`, `footerNavItemVariants`, `footerSocialsVariants` |

---

## 4. ESTILOS FUERA DE `.variants.ts` (Inline Restante)

| Archivo | Clases inline en JSX | Severidad | Estado |
| --- | --- | --- | --- |
| `WorkWithUs.tsx:111` | `"Maker Hub"` hardcodeado + className en `<Text>` con `mb-4 block` | 🟡 MEDIA | 🔴 PENDIENTE |
| `WorkWithUs.tsx:156` | `className="text-xl text-primary-dim underline font-bold block mt-4 hover:opacity-80 transition-opacity"` en `<button>` | 🔴 ALTA | 🔴 PENDIENTE |
| `WorkWithUs.tsx:168` | `"Conecta con nosotros"` hardcodeado | 🟡 MEDIA | 🔴 PENDIENTE |
| `ContactSection.variants.ts:124` | `w-[500px] h-[500px]` en variante de accent | 🟡 MEDIA | 🟡 EN CVA (aceptable como decorativo único) |
| `HomeTemplateV2.tsx:76` | `className="min-h-screen bg-background"` inline en div wrapper | 🟡 MEDIA | 🟡 PENDIENTE |
| `HomeTemplateV2.tsx:89` | `window.open(...)` inline en `onCartClick` | 🔴 ALTA | 🔴 PENDIENTE |
| `Footer.tsx` | SVGs inline (Instagram, FB, WA) como `const socialIcons` | 🔴 ALTA | 🔴 PENDIENTE |
| `WorkWithUs.tsx` | SVGs inline (Instagram, FB, WA) en `const socialLinks` | 🔴 ALTA | 🔴 PENDIENTE |
| `ProductCard.tsx` | `text-xs font-semibold text-foreground` en artisan span | 🟡 MEDIA | 🟡 PENDIENTE |
| `HeroSplit.tsx:111` | `className="h-20 md:h-28 w-auto"` en `<Logo>` override | 🟢 BAJA | 🟢 Justificable (dimensión de hero) |

> **IMPORTANTE**: Los SVGs inline en `WorkWithUs.tsx` y `Footer.tsx` son DUPLICADOS EXACTOS entre sí.
> Crean 6 bloques de SVG idénticos. La solución es un átomo `SocialIcon` o usar `lucide-react`.
