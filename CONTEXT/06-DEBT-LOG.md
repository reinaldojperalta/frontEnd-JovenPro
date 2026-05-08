# 06 — DEBT LOG (Audit Driven)

> Escaneo exhaustivo de TODAS las clases inline en cada componente. Cada clase que no
> viva en su `.variants.ts` es deuda técnica. Sin excepciones.
> Auditoría: 2026-05-08 | Norma: **ZERO INLINE POLICY**

---

# 06 — DEBT LOG (Audit Driven)

> Escaneo exhaustivo componente por componente. Cada hallazgo clasificado por tipo de deuda.
> Auditoría: 2026-05-08 | Severidad: 🔴 Crítica | 🟡 Media | 🟢 Baja

---

## A. MOCKED TAGS — Texto/valores estáticos que deberían ser dinámicos

| Componente | Línea | Texto hardcodeado | Corrección |
| --- | --- | --- | --- |
| `Testimonials.tsx` | 43 | `"Community"` (en inglés, app en español) | Debe ser prop `overline` |
| `WorkWithUs.tsx` | 30 | `"Maker Hub"` | Debe ser prop o campo en `WorkWithUsData` |
| `WorkWithUs.tsx` | 40 | `"Conecta con nosotros"` | Debe ser prop |
| `WorkWithUs.tsx` | 95 | `"Madrid, España"` duplicado del `locationLabel` | Eliminar, ya existe en `data.locationLabel` |
| `Footer.tsx` | 20 | `"JovenPro"` hardcodeado | Debe usar `data.brand` que ya recibe |
| `ProductCard.tsx` | 78 | `onClick={() => console.log("Click")}` | Handler vacío — debe ser prop `onClick` |
| `ProductCard.tsx` | 181 | `"Ver detalle"` | Debe ser prop `linkLabel` |
| `NewsSection.tsx` | 109 | `"Leer artículo"` | Debe ser prop |
| `NewsSection.tsx` | 134 | `"Leer más"` | Debe ser prop |
| `HomeTemplate.tsx` | 166 | `"¡Nueva Temporada JovenPro!"` | Debe venir de data layer |
| `HomeTemplate.tsx` | 169-170 | `"Propulsando"` / `"Tu Emprendimiento"` | Debe venir de data layer |
| `WorkWithUs.tsx` | 80 | URL unsplash hardcodeada para imagen mapa | Debe ser prop `mapImageUrl` en `WorkWithUsData` |
| `ContactSection.tsx` | 83-90 | Textos default en props con valores en español | ✅ Aceptable (defaults) |

---

## B. INLINE HACKS — `style={{}}` y Tailwind arbitrario

### Uso de `style={{}}`

| Componente | Línea | Código | Impacto |
| --- | --- | --- | --- |
| `SkeletonCard.tsx` | 29 | `style={{ borderRadius, overflow: "hidden", display: "flex" }}` | 🟡 Debería ser clases Tailwind |
| `SkeletonCard.tsx` | 43 | `style={{ flexShrink: 0, width: isHorizontal ? 120 : "100%" }}` | 🟡 Lógica CSS en JS |
| `SkeletonCard.tsx` | 47 | `style={{ flex: 1, display: "flex", flexDirection: "column" }}` | 🟡 Clases Tailwind disponibles |
| `SkeletonCard.tsx` | 51 | `style={{ marginTop: "auto" }}` | 🟡 Usar `mt-auto` |
| `SkeletonText.tsx` | 29 | `style={{ display: "flex", flexDirection: "column", gap }}` | 🟡 `flex flex-col gap-*` |
| `ProductGrid.tsx` | 139 | `style={{ gridTemplateColumns, gridTemplateRows }}` | 🟡 Dinámico, justificable |
| `ProductGrid.tsx` | 148 | `style={{ gridArea: getGridArea(i) }}` | 🟡 Dinámico, justificable |
| `ProductGrid.tsx` | 193 | `style={{ msOverflowStyle: "none" }}` | 🟢 Usar `.hide-scrollbar` |
| `ProductGridSkeleton.tsx` | 54 | `style={{ scrollbarWidth: "none" }}` | 🟢 Usar `.hide-scrollbar` |
| `Hero.tsx` | 146 | `style={{ minHeight }}` | 🟡 Dinámico, justificable |
| `ProductSkeleton.tsx` | 19 | `style={{ animationDelay }}` | 🟢 Dinámico, aceptable |

### Valores Tailwind arbitrarios (`w-[Xpx]`, `text-[Xpx]`)

| Componente | Línea | Clase arbitraria | Corrección |
| --- | --- | --- | --- |
| `HomeTemplateV2.tsx` | 129 | `h-[600px]` | 🟡 Usar token o `min-h-` |
| `WorkWithUs.tsx` | 78 | `min-h-[400px]` | 🟡 Crear token |
| `Testimonials.tsx` | 61 | `min-h-[280px]` | 🟡 Crear token |
| `Hero.tsx` | 238 | `min-h-[500px]` | 🟡 Crear token |
| `Hero.tsx` | 266 | `w-[500px] h-[500px]` (blur decorativo) | 🟡 Crear token |
| `Hero.tsx` | 267 | `w-[300px] h-[300px]` (blur decorativo) | 🟡 Crear token |
| `ContactSection.tsx` | 253 | `w-[500px] h-[500px]` (blur) | 🟡 Duplicado de Hero |
| `ContactSection.tsx` | 254 | `w-[300px] h-[300px]` (blur) | 🟡 Duplicado de Hero |
| `HeaderSkeleton.tsx` | 47 | `w-[300px]` | 🟡 Crear token |
| `BentoCarousel.tsx` | 270 | `min-w-[200px]` | 🟡 Usar token |
| `NewsSection.tsx` | 124 | `text-[10px]` | 🔴 Usar `Badge` atom |
| `NewsSection.tsx` | 194 | `text-[10px]` | 🔴 Usar `Badge` atom |
| `PaginationDots.tsx` | 74 | `text-[10px]` | 🟡 Definir en variants |
| `FormField.tsx` | 238 | `text-[10px] -translate-y-8` | 🟡 Definir en variants |
| `Badge.variants.ts` | 84 | `text-[10px]` en size sm/xl | 🟢 Aceptable (en variants) |
| `NewsSection.tsx` | 186 | `w-[80vw]` | 🟡 Mobile snap scroll |

---

## C. INCONSISTENCIAS CVA

| Problema | Archivo | Detalle |
| --- | --- | --- |
| **Variante deprecada activa** | `ProductCard.variants.ts:318` | `productCardArrowVariants` — TODAS las variantes son `hidden`. Exportada pero jamás importada en el componente. Dead code. |
| **Tipo incompleto** | `Badge.variants.ts:133` | `BadgeVariant` type NO incluye `success`, `danger`, `warning`, `new`, `sale`, `featured` que SÍ existen como variantes reales en el CVA. TypeScript no protege. |
| **Tipo incompleto** | `Badge.variants.ts:134` | `BadgeSize` type NO incluye `xl` que SÍ existe. |
| **Variantes vacías (no-op)** | `Input.variants.ts:122-130` | `hasIcon` y `iconPosition` tienen todas sus variantes como `""`. No producen ningún CSS. Dead code semántico. |
| **Token fantasma en variantes** | `BentoGrid.variants.ts:42-43` | Usa `aspect-bento-square` y `aspect-bento-portrait` — NO definidos en tailwind.config.ts. Solo existen `large/vertical/horizontal/small/history`. |
| **Clase inexistente** | `Testimonials.tsx:61` | Usa `shadow-soft` — NO definido en tailwind.config.ts ni globals.css |
| **Clase inexistente** | `WorkWithUs.tsx:86` | Usa `shadow-ambient` — NO definido |
| **Clase inexistente** | `Footer.tsx:19` | Usa `font-display` — NO definido. Solo existen `font-body` y `font-headline` |
| **Clases inexistentes** | `NewsSection.tsx` | Usa `text-jp-navy`, `text-jp-sky`, `text-jp-text-secondary` — NO definidos |
| **Clases inexistentes** | `Input.variants.ts` | Usa `text-on-surface`, `text-on-surface-variant` — NO definidos como colores en tailwind.config |
| **defaultVariant mismatch** | `productCardOverlayVariants` | Default es `card-full` pero `productCardVariants` default es `card-preview`. Inconsistente si se usan independientemente. |

---

## D. LÓGICA DE NEGOCIO FILTRADA (en nivel incorrecto)

| Componente | Nivel | Lógica encontrada | Nivel correcto |
| --- | --- | --- | --- |
| `ProductCard.tsx` (Molécula) | 🔴 | Calcula `discountPercent` y mapea `statusBadgeConfig` — lógica de presentación de negocio | Organismo o Template |
| `ProductCard.tsx` (Molécula) | 🔴 | `onClick={() => console.log("Click")}` — handler debería ser prop | N/A (remover) |
| `ProductCard.tsx` (Molécula) | 🟡 | Importa `framer-motion` y maneja `layoutId`, `animate` prop | Organismo (BentoCarousel) |
| `NewsSection.tsx` (Organismo) | 🟡 | `window.open(url, "_blank")` — navegación directa | Template |
| `HeroSplit.tsx` (Organismo) | 🟡 | `document.querySelector(href).scrollIntoView()` — DOM manipulation directa | Template o hook `useScrollTo` |
| `WorkWithUs.tsx` (Organismo) | 🟡 | `window.open(url, "_blank")` — 3 instancias | Template |
| `Footer.tsx` (Organismo) | 🟡 | `window.open(social.href, "_blank")` — navegación | Template |
| `HomeTemplate.tsx` (Template) | 🟡 | `window.location.href = "https://jovenpro.com/tienda"` — hardcoded URL | Data layer |
| `ContactSection.tsx` (Organismo) | ✅ | Email validation + submit — aceptable en organismo de formulario | Correcto |

---

## E. FONT MISMATCH (Deuda Arquitectónica Crítica)

| Capa | Define | Valor |
| --- | --- | --- |
| `tailwind.config.ts` | `font-body` | `var(--font-manrope)` |
| `tailwind.config.ts` | `font-headline` | `var(--font-inter)` |
| `layout.tsx` | Fonts cargadas | Montserrat, Plus Jakarta Sans, Public Sans |
| CSS Variables generadas | `--font-montserrat`, `--font-plus-jakarta`, `--font-public-sans` | — |

> 🔴 **RESULTADO**: `--font-manrope` y `--font-inter` NUNCA se definen.
> `font-body` y `font-headline` resuelven al stack de fallback del sistema.
> Las fuentes de Google cargadas en layout.tsx NO se conectan con los tokens de Tailwind.

---

## F. RESUMEN DE SEVERIDAD

| Categoría | 🔴 Crítica | 🟡 Media | 🟢 Baja |
| --- | --- | --- | --- |
| Mocked Tags | 5 | 3 | 4 |
| Inline Hacks (style) | 0 | 7 | 4 |
| Inline Hacks (arbitrary) | 2 | 12 | 2 |
| CVA Inconsistencias | 5 | 2 | 0 |
| Lógica Filtrada | 2 | 5 | 0 |
| Font Mismatch | 1 | 0 | 0 |
| **TOTAL** | **15** | **29** | **10** |


## NORMA: Zero Inline Policy

> **TODA clase Tailwind que aparezca en un archivo `.tsx` DEBE estar en su correspondiente
> `.variants.ts`.** No importa si es "solo un `mb-4`" o "solo layout". Si está en JSX,
> está mal. El único `className` aceptable en JSX es `cn(variantFunction({...}), className)`.
> Los componentes de `layout puro` (flex, grid) van en una variante `layout` o `wrapper`.

---

## A. ÁTOMOS — Clases inline en `.tsx`

### `Button.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 69 | `"group"` (wrapper) | `.variants.ts` base |
| 79 | `"w-5 h-5 animate-spin shrink-0"` (Loader2) | `buttonVariants` → variante `isLoading` |
| 84 | `"shrink-0"` (icon left span) | Nueva variante `iconWrapper` |
| 92 | `"shrink-0 group-hover:translate-x-1 transition-transform"` (icon right) | Nueva variante `iconWrapper` position=right |

### `Badge.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 38 | `"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"` | `indicatorVariants` → sub-variante `ping` |
| 40 | `"relative inline-flex rounded-full h-2 w-2 bg-current"` | `indicatorVariants` → sub-variante `dot` |

### `Input.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 69 | `"group"` | `inputWrapperVariants` base |
| 75 | `"absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 transition-colors group-focus-within:text-primary"` | Nueva `inputIconVariants` position=left |
| 76 | `"w-5 h-5 animate-spin"` (Loader2) | `inputIconVariants` → loading state |
| 103 | `"absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 flex items-center justify-center"` | `inputIconVariants` position=right |

---

## B. MOLÉCULAS — Clases inline en `.tsx`

### `ProductCard.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 59 | `"absolute inset-0 w-full h-full object-cover"` (img) | `productCardImageVariants` |
| 64 | `"absolute inset-0 bg-gradient-to-t pointer-events-none"` (overlay div) | Ya existe `productCardOverlayVariants` pero NO se usa aquí |
| 67 | `"absolute inset-0 flex flex-col justify-end p-6 z-10"` (content) | Debería usar `productCardContentVariants` |
| 72 | `"flex items-center gap-2 mb-auto"` (top bar) | Nueva variante `productCardTopBar` |
| 78 | `"text-xs font-semibold text-foreground"` (artisan span) | `productCardArtisanVariants` |
| 82 | `"w-full h-full flex items-center justify-center rounded-clay"` (history fallback) | `productCardFallbackVariants` |
| 83 | `"text-4xl"` (emoji) | `productCardFallbackVariants` → emoji |
| 90 | `"absolute top-3 right-3 z-20"` (corner icon) | Ya existe `productCardCornerIconVariants` — sincronizar |

### `CTAGroup.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 162 | `"flex-col-reverse sm:flex-row"` (reverseOnMobile) | `ctaGroupVariants` → nueva variante `reverseOnMobile` |
| 179 | `"w-full sm:w-auto"` (responsive buttons) | `ctaGroupVariants` → nueva variante `fullWidthMobile` (ya tiene prop pero mal implementada) |

### `FormField.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 156 | `"relative"` (icon wrapper) | `formFieldVariants` → icon container |
| 158 | `"absolute -top-1 -right-1"` (validation badge) | `formFieldValidationIconVariants` |
| 178 | `"opacity-50 hover:opacity-100"` (password toggle) | `formFieldActionVariants` |
| 191 | `"opacity-50 hover:opacity-100"` (clear button) | `formFieldActionVariants` (duplicado) |
| 224 | `"pt-6"` (label) | `labelVariants` → padding |
| 236-242 | `"absolute left-4 top-1/2 -translate-y-1/2 transition-all pointer-events-none"` + estados | `floatingLabelVariants` |
| 238 | `"text-[10px] -translate-y-8 text-foreground/60"` | `floatingLabelVariants` state=filled |
| 239 | `"text-base text-foreground/40"` | `floatingLabelVariants` state=empty |
| 240 | `"text-red-500"` | `floatingLabelVariants` state=error |
| 241 | `"text-green-600"` | `floatingLabelVariants` state=success |
| 245 | `"ml-1 text-red-500"` (required asterisk) | `labelVariants` → required |
| 255 | `"relative"` (floating layout) | `fieldContainerVariants` → layout=floating |

### `Nav.tsx` (si tiene inline)

Usa correctamente `navVariants`, `navItemVariants`, `navIndicatorVariants`. ✅ Sin deuda inline.

---

## C. ORGANISMOS — Clases inline en `.tsx`

### `HeroSplit.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| section | `"relative flex flex-col md:flex-row w-full min-h-screen overflow-hidden"` | Nuevo `heroSplitVariants` → layout |
| side div | `"relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden group cursor-pointer"` | `heroSplitSideVariants` |
| img | `"absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"` | `heroSplitImageVariants` |
| overlay | `"absolute inset-0 bg-black/40 transition-opacity duration-500"` | `heroSplitOverlayVariants` |
| content | `"absolute inset-0 flex flex-col justify-end items-start p-8 md:p-16 z-10"` | `heroSplitContentVariants` |
| title | `"font-headline text-4xl md:text-6xl font-bold text-white drop-shadow-lg"` | `heroSplitTitleVariants` |
| subtitle | `"font-body text-base md:text-xl text-white/80 max-w-md"` | `heroSplitSubtitleVariants` |
| CTA | `"inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-clay hover:bg-primary hover:text-white transition-all duration-300 shadow-clay"` | `heroSplitCTAVariants` |
| arrow SVG | `"w-5 h-5 group-hover:translate-x-1 transition-transform"` | `heroSplitCTAVariants` → icon |
| logo img | `"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 md:w-48 pointer-events-none"` | `heroSplitLogoVariants` |
| filter img | `"grayscale brightness-200 contrast-50 saturate-0"` | `heroSplitImageVariants` → filter state |

### `NavbarSticky.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 63 | `"z-50 w-full transition-all duration-500 ease-smooth"` | Nuevo `navbarStickyVariants` base |
| 65 | `"sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-clay"` | `navbarStickyVariants` state=solid |
| 66 | `"relative bg-transparent"` | `navbarStickyVariants` state=transparent |
| 74 | `"flex items-center justify-between h-16 md:h-20"` | `navbarStickyInnerVariants` |
| 81 | `"hidden md:flex items-center gap-8"` | `navbarStickyNavListVariants` |
| 91 | `"text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300"` | `navbarStickyLinkVariants` |
| 93 | `"text-foreground hover:text-primary"` | `navbarStickyLinkVariants` state=solid |
| 94 | `"text-white/90 hover:text-white"` | `navbarStickyLinkVariants` state=transparent |
| 103 | `"flex items-center gap-2"` | `navbarStickyActionsVariants` |
| 111 | `"text-foreground"` / `"text-white"` | `navbarStickyIconVariants` state |
| 122 | `"hidden sm:flex"` | `navbarStickyIconVariants` visibility |
| 144 | `"md:hidden"` | `navbarStickyIconVariants` mobile |
| 159 | `"md:hidden bg-background/95 backdrop-blur-md border-t border-surface-variant overflow-hidden"` | `navbarStickyMobileMenuVariants` |
| 162 | `"flex flex-col gap-4 py-4"` | `navbarStickyMobileListVariants` |
| 176 | `"text-base font-semibold text-foreground hover:text-primary transition-colors w-full block py-2"` | `navbarStickyMobileLinkVariants` |

### `BentoCarousel.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 196 | `"w-full h-full"` (motion.div wrapper) | `bentoSlotMotionVariants` |
| 211 | `"w-full h-full"` (placeholder) | `bentoPlaceholderVariants` (parcialmente hecho) |
| 223 | `"py-24 md:py-32"` (section) | `bentoCarouselSectionVariants` |
| 226 | `"flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"` | `bentoCarouselHeaderVariants` |
| 232 | `"uppercase tracking-[0.2em] text-primary mb-3"` (overline Text) | Usar `Text variant="overline"` directamente |
| 255 | `"flex items-center justify-center gap-4 md:gap-6 mt-10"` | `bentoCarouselControlsVariants` |
| 261-263 | `"touch-target rounded-full bg-surface shadow-clay text-foreground hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"` | Debe usar `<IconButton variant="circular">` |
| 270 | `"flex flex-col items-center gap-2 min-w-[200px]"` | `bentoCarouselInfoVariants` |
| 275 | `"uppercase tracking-[0.15em] font-semibold"` | Usar `Text variant="caption"` con override |
| 307 | `"flex justify-center mt-8"` | `bentoCarouselFooterVariants` |
| 311-314 | `"px-8 py-3 rounded-full border-2 border-foreground/20 font-body text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background transition-all duration-300"` | Debe usar `<Button variant="outline">` |

### `NewsSection.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 45 | `"py-24 md:py-32 bg-surface-container-low"` | Nuevo `newsSectionVariants` |
| 81 | `"grid grid-cols-3 gap-6"` | `newsSectionGridVariants` |
| 81 | `"col-span-2 row-span-2 group cursor-pointer rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-col"` | `newsCardVariants` variant=featured |
| 83 | `"h-72 sm:h-96 overflow-hidden relative"` | `newsCardImageVariants` variant=featured |
| 85 | `"w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"` | `newsCardImageVariants` |
| 87 | `"absolute top-4 left-4"` | `newsCardBadgePositionVariants` |
| 90 | `"p-8 flex-1 flex flex-col justify-between"` | `newsCardContentVariants` variant=featured |
| 92 | `"flex items-center gap-3 mb-3 text-sm text-foreground/60"` | `newsCardMetaVariants` |
| 96 | `"w-1 h-1 rounded-full bg-border"` | `newsCardMetaDotVariants` |
| 101 | `"font-headline text-2xl font-bold text-jp-navy mb-3 group-hover:text-jp-sky transition-colors"` | `newsCardTitleVariants` (¡usa tokens fantasma!) |
| 104 | `"font-body text-jp-text-secondary text-sm leading-relaxed"` | `newsCardDescriptionVariants` |
| 108 | `"inline-flex items-center gap-1 mt-6 text-jp-navy font-body text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all"` | `newsCardLinkVariants` |
| 117 | `"group cursor-pointer rounded-2xl overflow-hidden bg-white border border-border/30 flex flex-row flex-1"` | `newsCardVariants` variant=compact |
| 119 | `"w-2/5 overflow-hidden"` | `newsCardImageVariants` variant=compact |
| 123 | `"w-3/5 p-6 flex flex-col justify-center"` | `newsCardContentVariants` variant=compact |
| 124 | `"inline-block px-2 py-0.5 bg-surface-container-low text-jp-navy text-[10px] font-bold uppercase tracking-wider rounded mb-2 w-max"` | Debe usar `<Badge>` atom |
| 127 | `"font-headline text-base font-bold text-jp-navy leading-tight mb-2 group-hover:text-jp-sky transition-colors"` | `newsCardTitleVariants` variant=compact |
| 130 | `"font-body text-xs text-jp-text-secondary leading-relaxed line-clamp-2"` | `newsCardDescriptionVariants` variant=compact |
| 133 | `"font-body text-xs font-semibold text-jp-sky mt-3 hover:underline"` | `newsCardLinkVariants` variant=compact |
| 146-158 | Pagination dots inline | Debe usar `<PaginationDots>` molecule |
| 164-202 | Mobile layout completo inline | `newsCardVariants` + `newsCardImageVariants` mobile |

### `Testimonials.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 38 | `"py-20 md:py-28 bg-surface-container-low/30"` | `testimonialsSectionVariants` |
| 40 | `"grid grid-cols-1 md:grid-cols-12 gap-10 items-center"` | `testimonialsGridVariants` |
| 42 | `"font-body text-xs font-semibold tracking-widest text-secondary uppercase mb-2 block"` | Debe usar `<Text variant="overline">` |
| 61 | `"bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-border/20 relative min-h-[280px] flex flex-col justify-between"` | `testimonialCardVariants` |
| 63 | `"font-body text-lg italic text-foreground leading-relaxed mb-8"` | `testimonialQuoteVariants` |
| 68 | `"flex items-center gap-4"` | `testimonialAuthorVariants` |
| 70 | `"w-12 h-12 rounded-full object-cover"` | Debe usar `<Avatar>` atom |
| 75 | `"font-headline text-sm font-bold text-primary"` | `testimonialNameVariants` |
| 78 | `"font-body text-xs text-foreground/60 uppercase tracking-wider"` | `testimonialRoleVariants` |
| 89 | `"w-12 h-12 rounded-lg object-cover hidden sm:block"` | `testimonialProductImageVariants` |
| 117-122 | Dots inline | Debe usar `<PaginationDots>` molecule |

### `WorkWithUs.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 25 | `"bg-white rounded-3xl overflow-hidden shadow-ambient border border-border/20 flex flex-col lg:flex-row"` | `workWithUsCardVariants` |
| 26 | `"w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden"` | `workWithUsContentVariants` |
| 27 | `"absolute -left-20 -bottom-20 w-64 h-64 bg-surface-container-low/50 rounded-full blur-3xl z-0"` | `workWithUsDecoVariants` |
| 29 | `"text-secondary font-body text-xs font-bold uppercase tracking-widest mb-4 block"` | Usar `<Text variant="overline">` |
| 32 | `"font-headline text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight"` | `workWithUsTitleVariants` |
| 35 | `"font-body text-foreground/70 text-base md:text-lg mb-10 max-w-md leading-relaxed"` | `workWithUsDescriptionVariants` |
| 38 | `"border-t border-border/30 pt-8"` | `workWithUsDividerVariants` |
| 39 | `"font-body text-xs text-foreground/60 uppercase tracking-widest mb-4 font-semibold"` | Usar `<Text variant="label">` |
| 45 | `"w-12 h-12 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors shadow-sm"` (×3) | `workWithUsSocialButtonVariants` |
| 78 | `"w-full lg:w-1/2 relative min-h-[400px] bg-surface"` | `workWithUsMapVariants` |
| 82 | `"absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply filter grayscale contrast-125"` | `workWithUsMapImageVariants` |
| 84 | `"absolute inset-0 bg-primary/10"` | `workWithUsMapOverlayVariants` |
| 85 | `"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"` | `workWithUsMapPinVariants` |
| 86 | `"w-16 h-16 bg-white rounded-full shadow-ambient flex items-center justify-center relative mb-4 cursor-pointer"` | `workWithUsPinButtonVariants` |
| 91 | `"absolute inset-0 rounded-full border-2 border-secondary/30 animate-ping"` | `workWithUsPinPingVariants` |
| 93 | `"bg-primary text-white px-5 py-3 rounded-xl font-body text-sm font-bold shadow-lg text-center"` | `workWithUsLocationLabelVariants` |
| 95 | `"font-normal text-xs opacity-80"` | `workWithUsLocationSubVariants` |

### `ContactSection.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 138 | `"py-16 px-6"` | `contactSectionVariants` |
| 145 | `"relative overflow-hidden p-8 lg:p-20 lg:pb-28"` | `contactSectionCardVariants` |
| 146 | `"flex flex-col lg:flex-row items-center gap-6"` | `contactSectionCardVariants` variant=split |
| 147 | `"flex flex-col items-center text-center max-w-4xl mx-auto"` | `contactSectionCardVariants` variant=centered |
| 162 | `"leading-tight lg:leading-[1.1] text-5xl lg:text-7xl tracking-tighter"` | Debe usar `Heading level="h2"` sin override |
| 185 | `"flex flex-wrap gap-8 text-xs font-black uppercase tracking-[0.2em] opacity-80"` | `contactSectionFeaturesVariants` |
| 191 | `"flex items-center gap-3"` | `contactSectionFeatureItemVariants` |
| 197 | `"px-0 py-0 bg-transparent shadow-none"` | Abuse de `className` override — rediseñar |
| 253 | `"absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2"` | `contactSectionDecoVariants` position=topRight |
| 254 | `"absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 blur-[100px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2"` | `contactSectionDecoVariants` position=bottomLeft |

### `VideosSection.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 30 | `"py-20 md:py-28"` | `videosSectionVariants` |
| 32 | `"hidden md:grid md:grid-cols-2 gap-8"` | `videosSectionGridVariants` |
| 45 | `"group cursor-pointer"` | `videoCardWrapperVariants` |
| 46 | `"relative aspect-video rounded-2xl overflow-hidden bg-black mb-4"` | `videoCardImageVariants` |
| 51 | `"absolute inset-0 w-full h-full"` (iframe) | `videoCardIframeVariants` |
| 60 | `"w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity"` | `videoCardThumbnailVariants` |
| 63 | `"absolute inset-0 flex items-center justify-center"` | `videoCardPlayOverlayVariants` |
| 66 | `"w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform"` | `videoCardPlayButtonVariants` |
| 67 | `"w-6 h-6 text-white fill-white ml-1"` (Play icon) | `videoCardPlayIconVariants` |
| 73 | `"font-headline text-lg font-semibold text-jp-navy"` | `videoCardTitleVariants` (¡token fantasma!) |
| 82 | `"flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none]"` | `videosSectionMobileScrollVariants` |
| 86 | `"snap-center shrink-0 w-[85vw] max-w-sm"` | `videosSectionMobileItemVariants` |

### `Footer.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 15 | `"bg-surface-container-low border-t border-border/20"` | `footerVariants` |
| 17 | `"max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6"` | `footerInnerVariants` (duplica Container) |
| 19 | `"font-display text-xl font-bold text-primary block mb-1"` | `footerBrandVariants` (¡`font-display` no existe!) |
| 22 | `"font-body text-xs text-foreground/40"` | `footerCopyrightVariants` |
| 36 | `"font-body text-xs text-foreground/60 hover:text-primary uppercase tracking-wider transition-colors"` | `footerLinkVariants` |
| 49 | `"w-10 h-10 rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-surface transition-all"` | Debe usar `<IconButton variant="ghost" size="sm">` |

---

## D. TEMPLATES — Clases inline en `.tsx`

### `HomeTemplateV2.tsx`

| Línea | Clase inline | Debería estar en |
| --- | --- | --- |
| 76 | `"min-h-screen bg-background"` | `homeTemplateVariants` |
| 127 | `"skeleton-pulse h-8 w-64 rounded-lg mb-4"` | `homeTemplateSkeletonVariants` |
| 128 | `"skeleton-pulse h-4 w-96 rounded-lg mb-12"` | `homeTemplateSkeletonVariants` |
| 129 | `"grid grid-cols-7 grid-rows-6 gap-4 h-[600px]"` | `homeTemplateSkeletonGridVariants` |
| 131 | `"skeleton-pulse rounded-clay"` | `homeTemplateSkeletonItemVariants` |

---

## E. RESUMEN CUANTITATIVO

| Nivel | Componente | Inline classes | .variants.ts existe | Estado |
| --- | --- | --- | --- | --- |
| Átomo | Button | 4 | ✅ | 🟡 Menor |
| Átomo | Badge | 2 | ✅ | 🟡 Menor |
| Átomo | Input | 4 | ✅ | 🟡 Menor |
| Molécula | ProductCard | 8 | ✅ | 🟡 Parcial |
| Molécula | CTAGroup | 2 | ✅ | 🟡 Menor |
| Molécula | FormField | 12 | ✅ | 🔴 Severo |
| Organismo | HeroSplit | 11 | ❌ | 🔴 CRÍTICO |
| Organismo | NavbarSticky | 16 | ❌ | 🔴 CRÍTICO |
| Organismo | BentoCarousel | 12 | ✅ parcial | 🔴 CRÍTICO |
| Organismo | NewsSection | 25+ | ❌ | 🔴 CRÍTICO |
| Organismo | Testimonials | 12 | ❌ | 🔴 CRÍTICO |
| Organismo | WorkWithUs | 18 | ❌ | 🔴 CRÍTICO |
| Organismo | ContactSection | 10 | ❌ | 🔴 SEVERO |
| Organismo | VideosSection | 12 | ❌ | 🔴 CRÍTICO |
| Organismo | Footer | 6 | ❌ | 🔴 SEVERO |
| Template | HomeTemplateV2 | 5 | ❌ | 🟡 Media |
| **TOTAL** | | **~159** | 8 de 16 | — |

> **159 clases inline** que deben migrar a `.variants.ts`.
> **8 componentes** carecen completamente de archivo `.variants.ts`.
> **0 organismos activos** cumplen la Zero Inline Policy.
