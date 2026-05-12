# 06 — DEBT LOG (Audit Driven)

> Escaneo exhaustivo de TODAS las deudas técnicas activas por componente.
> Auditoría: **2026-05-12** | Norma: **ZERO INLINE POLICY + REFACTOR RULES**
> Post-Refactor V3: ~85% de deuda eliminada. Este log refleja el 15% restante.

---

## A. MOCKED TAGS — Texto/valores estáticos que deberían ser dinámicos

| Componente | Línea | Texto hardcodeado | Estado | Corrección recomendada |
| --- | --- | --- | --- | --- |
| `WorkWithUs.tsx` | 111 | `"Maker Hub"` | 🔴 PENDIENTE | Añadir campo `sectionLabel` a `WorkWithUsData` |
| `WorkWithUs.tsx` | 158 | `"Whatsapp: +57-3024840101"` | 🔴 PENDIENTE | Usar `data.whatsappNumber` (ya disponible en datos) |
| `WorkWithUs.tsx` | 168 | `"Conecta con nosotros"` | 🔴 PENDIENTE | Añadir campo `socialsLabel` a `WorkWithUsData` |
| `HeroSplit.tsx` | 104 | `alt="JovenPro"` | 🟢 BAJA | Derivar de `logoSrc` metadata o añadir `logoAlt?` a `HeroSplitData` |
| `data.ts` | 693-694 | `subtitle: "texto"` en heroSplitData | 🔴 PENDIENTE | Reemplazar con copy real de la landing |
| `data.ts` | 609-615 | `news-005` = copia exacta de `news-004` | 🟡 MEDIA | Eliminar o reemplazar con noticia real |
| `HomeTemplateV2.tsx` | 48 | `"https://jovenpro.com/producto/${p.slug}/"` | 🟡 MEDIA | Extraer URL base a constante de configuración |
| `HomeTemplateV2.tsx` | 52-53 | `"https://jovenpro.com/?s=..."` | 🟡 MEDIA | Extraer URL base a constante |
| `HomeTemplateV2.tsx` | 89 | `"https://jovenpro.com/carrito/"` | 🟡 MEDIA | Recibir como prop o config |

**Resueltos en V3:**
- ✅ `Testimonials.tsx` → `"Community"` → prop `overline`
- ✅ `WorkWithUs.tsx` → `"Madrid, España"` → `data.locationSubLabel`
- ✅ `WorkWithUs.tsx` → URL unsplash mapa → `data.mapImageUrl`
- ✅ `Footer.tsx` → `"JovenPro"` hardcodeado → `data.brand || "JovenPro"` (fallback)
- ✅ `NewsSection.tsx` → `"Leer artículo"` → handler

---

## B. INLINE HACKS — `style={{}}` y Tailwind arbitrario en JSX

### Uso de `style={{}}` en JSX

| Componente | Línea | Código | Impacto | Estado |
| --- | --- | --- | --- | --- |
| `SkeletonCard.tsx` | ~29 | `style={{ borderRadius, ... }}` | 🟡 Media | 🟡 PENDIENTE |

> ✅ `ProductGrid.tsx` usa `style={{ gridTemplateColumns }}` — justificado (valor dinámico calculado).
> ✅ `Hero.tsx` usa `style={{ minHeight }}` — justificado (valor dinámico).

### Clases Tailwind arbitrarias en JSX (`w-[Xpx]`, `text-[Xpx]`)

| Componente | Línea | Clase arbitraria | Corrección | Estado |
| --- | --- | --- | --- | --- |
| `WorkWithUs.tsx` | 156 | Full `className` inline en `<button>` nativo | Migrar a `.variants.ts` + usar `Button` átomo | 🔴 PENDIENTE |
| `FormField.tsx` | ~238 | `text-[10px]` | Definir en `Typography.variants.ts` variante `nano` | 🟡 PENDIENTE |
| `HomeTemplateV2.tsx` | 76 | `"min-h-screen bg-background"` en div wrapper | Crear `homeTemplateV2Variants()` | 🟡 PENDIENTE |

### Clases arbitrarias en `.variants.ts` (aceptable pero monitorear)

| Archivo | Línea | Clase | Justificación |
| --- | --- | --- | --- |
| `ContactSection.variants.ts` | 124 | `w-[500px] h-[500px]` blur accent | Decorativo único, no se repite. Aceptable en CVA. |
| `ContactSection.variants.ts` | 129 | `w-[300px] h-[300px]` blur accent | Igual al anterior. |

---

## C. INCONSISTENCIAS CVA

| Problema | Archivo | Detalle | Estado |
| --- | --- | --- | --- |
| **Variante deprecada** | `ProductCard.variants.ts` | `productCardArrowVariants` — 100% dead code. Todas las variantes son `hidden`. Se importa pero no se consume. | 🟡 PENDIENTE (eliminar) |
| **Tipo incompleto** | `Badge.variants.ts` | `BadgeVariant` type no incluye `success`, `danger`, `warning`, `new`, `sale`, `featured` que SÍ existen como variantes CVA | 🟡 PENDIENTE |
| **Props vacías** | `Input.variants.ts` | `hasIcon` e `iconPosition` tienen todas sus variantes como `""`. No producen CSS. | 🟡 PENDIENTE (eliminar o implementar) |
| **Token fantasma** | `Input.variants.ts` | Usa `text-on-surface` — NO definido en `tailwind.config.ts` | 🔴 PENDIENTE |
| **Token fantasma** | `Typography.variants.ts` | Usa `text-on-surface-variant` — NO definido | 🔴 PENDIENTE |
| **Token fantasma** | `IconButton.variants.ts` | Usa `border-surface-variant` — NO definido | 🔴 PENDIENTE |
| **Token fantasma** | `BentoGrid.variants.ts` | Usa `aspect-bento-square` y `aspect-bento-portrait` — NO definidos | 🔴 PENDIENTE |
| **Color hardcoded** | `IconButton.variants.ts` | `whatsapp` variant usa `bg-[#25D366]` — no es token | 🟡 PENDIENTE |
| **CVA vacío** | `ContactSection.variants.ts:120` | `contactSectionCTAVariants = cva("")` — sin clases. Dead code. | 🟢 BAJA |

---

## D. SVG INLINE — Deuda de Iconos

| Componente | SVGs inline | Plataformas | Líneas de código | Estado |
| --- | --- | --- | --- | --- |
| `WorkWithUs.tsx` | 3 bloques SVG en `const socialLinks[]` | Instagram, Facebook, WhatsApp | ~30 líneas | 🔴 PENDIENTE |
| `Footer.tsx` | 3 bloques SVG en `const socialIcons{}` | Instagram, Facebook, WhatsApp | ~30 líneas | 🔴 PENDIENTE |
| `HeroSplit.tsx` | 1 SVG flecha en `<HeroSide>` | Arrow → | ~8 líneas | 🟡 PENDIENTE — debería ser `<ArrowRight />` de Lucide |

> **Total**: ~68 líneas de SVG duplicado entre `WorkWithUs` y `Footer`.
> Los SVGs de Instagram, Facebook y WhatsApp son **IDÉNTICOS** en ambos archivos.
> **Solución recomendada**: Crear `atoms/SocialIcon/` con los SVGs centralizados.

---

## E. LÓGICA DE NEGOCIO FILTRADA

| Componente | Nivel | Lógica encontrada | Estado |
| --- | --- | --- | --- |
| `HomeTemplateV2.tsx` | Template | `handleProductClick = (href) => window.open(href)` — función de navegación inline | 🟡 PENDIENTE (debería ser prop o hook) |
| `HomeTemplateV2.tsx` | Template | `window.open` inline en `onCartClick` | 🟡 PENDIENTE |
| `HeroSplit.tsx` | Organismo | `defaultNavigate()` con `scrollIntoView` + `window.open` — lógica residual en organismo | 🟡 PENDIENTE (TODO documentado en código) |
| `WorkWithUs.tsx` | Organismo | `handleOpen()` — fallback a `window.open` si no se inyecta `onOpenLink` | ✅ ACEPTABLE (prop expuesta) |
| `Footer.tsx` | Organismo | `handleOpen()` — igual que WorkWithUs | ✅ ACEPTABLE (prop expuesta) |
| `ContactSection.tsx` | Organismo | `validateEmail()`, `handleSubmit()` — lógica de formulario inline | 🟡 MEDIA — aceptable mientras no haya hook `useContactForm` |

**Resueltos en V3:**
- ✅ `NewsSection.tsx` → `window.open()` extraído a prop
- ✅ `HeroSplit.tsx` → `scrollIntoView` extraído a prop `onNavigate`
- ✅ `WorkWithUs.tsx` → `window.open()` extraído a prop `onOpenLink`

---

## F. DATOS — Inconsistencias en `data.ts`

| Problema | Detalle | Impacto | Estado |
| --- | --- | --- | --- |
| `Product.discountPrice` redundante | Alias de `oldPrice` con valores idénticos. Solo `oldPrice` se usa en componentes. | 🟢 Baja | 🟡 PENDIENTE (eliminar `discountPrice`) |
| `news-004` y `news-005` duplicados | Misma noticia ("Plata y esmeraldas") con IDs distintos | 🟡 Media | 🔴 PENDIENTE (reemplazar con noticia real) |
| `Product.rating: 0` en todos | Sin datos reales de rating/review | 🟢 Baja | Pendiente de conexión a API real |
| `Product.artisan.verified: false` en todos | Campo sin uso real | 🟢 Baja | Pendiente de conexión a API |
| `heroSplitData.left.subtitle: "texto"` | Placeholder sin reemplazar | 🔴 CRÍTICA | 🔴 PENDIENTE (copy real urgente) |
| `heroSplitData.right.subtitle: "texto"` | Igual | 🔴 CRÍTICA | 🔴 PENDIENTE |
| `FooterData.socials` incluye TikTok | `Footer.tsx` no tiene SVG para TikTok | 🟡 Media | 🔴 PENDIENTE |
| `categories` sin consumidor | Definida en `data.ts`, comentada en `page.tsx` | 🟢 Baja | Activar para `MarketTemplate` o eliminar |

---

## G. HOOKS — Deuda de Integración

| Hook | Problema | Impacto | Estado |
| --- | --- | --- | --- |
| `useCart` | No integrado en `HomeTemplateV2`. Solo en templates legacy inactivos. | 🔴 CRÍTICA | 🔴 PENDIENTE |
| `useFavorites` | No integrado en `HomeTemplateV2`. Solo en templates legacy inactivos. | 🔴 CRÍTICA | 🔴 PENDIENTE |
| `useLocalStorage` | Existe como wrapper SSR-safe pero `useFavorites` no lo usa. Duplicación de lógica. | 🟡 Media | 🟡 PENDIENTE |
| `useDebounce` | Implementado y exportado, sin consumidor activo. | 🟢 Baja | Activar en `SearchBar` |
| `useMediaQuery` | Implementado y exportado, sin consumidor activo. | 🟢 Baja | Activar donde sea necesario |
| `usePasswordToggle` | Usa `useState` sin directiva `"use client"`. Error latente. | 🟡 Media | 🟡 PENDIENTE (añadir directiva) |
| `useScrollHeader` | Referenciado en `ARCHITECTURE.md` anterior pero NO existe en `hooks/` | 🔴 CRÍTICA | ❓ Verificar si fue eliminado o renombrado |

---

## H. ESTADO DE COMPONENTES — Zero Inline Policy

| Nivel | Componente | Inline en JSX | `.variants.ts` | Estado |
| --- | --- | --- | --- | --- |
| Átomo | `Section` | 0 | ✅ | ✅ LIMPIO |
| Átomo | `Button` | ~4 (menores) | ✅ | 🟡 Menor |
| Átomo | `Input` | 0 | ✅ (hasIcon vacío) | 🟡 Props vacías |
| Átomo | `IconButton` | 0 | ✅ (bg hardcoded WA) | 🟡 Color hardcoded |
| Molécula | `ProductCard` | ~5 | ✅ | 🟡 Parcial |
| Molécula | `FormField` | ~2 (text-[10px]) | ✅ | 🟡 Menor |
| Organismo | `HeroSplit` | 1 (className en Logo) | ✅ | ✅ Justificado |
| Organismo | `NavbarSticky` | 0 | ✅ | ✅ LIMPIO |
| Organismo | `BentoCarousel` | 0 | ✅ | ✅ LIMPIO |
| Organismo | `NewsSection` | 0 | ✅ | ✅ LIMPIO |
| Organismo | `VideosSection` | 0 | ✅ | ✅ LIMPIO |
| Organismo | `Testimonials` | 0 | ✅ | ✅ LIMPIO |
| Organismo | `WorkWithUs` | 3 (button, Maker Hub, label) | ✅ | 🔴 PENDIENTE |
| Organismo | `ContactSection` | 0 | ✅ | ✅ LIMPIO |
| Organismo | `Footer` | 0 (SVGs son const, no className) | ✅ | 🟡 SVGs pendientes |
| Template | `HomeTemplateV2` | 1 (min-h-screen bg-background) | ❌ | 🟡 PENDIENTE |

---

## I. RESUMEN DE SEVERIDAD (Post-Refactor V3)

| Categoría | 🔴 Crítica | 🟡 Media | 🟢 Baja | Total |
| --- | --- | --- | --- | --- |
| Mocked Tags / Placeholders | 3 | 4 | 2 | 9 |
| Inline Hacks (JSX) | 1 | 3 | 0 | 4 |
| CVA Inconsistencias | 4 | 4 | 1 | 9 |
| SVG Inline | 2 | 1 | 0 | 3 |
| Lógica filtrada | 0 | 3 | 0 | 3 |
| Datos (`data.ts`) | 2 | 2 | 4 | 8 |
| Hooks sin integrar | 2 | 3 | 2 | 7 |
| **TOTAL** | **14** | **20** | **9** | **43** |

---

## J. BACKLOG DE ACCIONES PRIORIZADAS

### 🔴 Sprint inmediato (Críticas)

1. **Reemplazar `heroSplitData.subtitle: "texto"`** → copy real de la landing
2. **Añadir TikTok SVG a `Footer.tsx`** o reemplazar con `SocialIcon` átomo
3. **`useCart` / `useFavorites` → integrar en `HomeTemplateV2`**
4. **Reemplazar tokens fantasma** en `Input.variants.ts`, `Typography.variants.ts`, `IconButton.variants.ts`, `BentoGrid.variants.ts`
5. **Refactorizar `<button>` inline de WorkWithUs:156** → usar átomo `Button` con variante apropiada + mover texto a `WorkWithUsData`
6. **Verificar si `useScrollHeader` fue eliminado** — el ARCHITECTURE.md anterior lo referenciaba

### 🟡 Sprint siguiente (Medias)

7. **Centralizar SVGs sociales** en `atoms/SocialIcon/` (elimina 68 líneas duplicadas)
8. **Añadir `sectionLabel`, `socialsLabel` a `WorkWithUsData`** → eliminar hardcodes en WorkWithUs
9. **Eliminar `productCardArrowVariants`** — dead code 100%
10. **Completar tipo `BadgeVariant`** con todas las variantes reales
11. **Eliminar props vacías** `hasIcon`/`iconPosition` en `Input.variants.ts` o implementarlas
12. **Eliminar duplicado `news-005`** de `data.ts`
13. **Añadir `"use client"` a `usePasswordToggle`**
14. **Refactorizar `useFavorites`** para usar el hook genérico `useLocalStorage`

### 🟢 Backlog largo plazo (Bajas)

15. Eliminar `Product.discountPrice` (alias redundante de `oldPrice`)
16. Activar `useDebounce` en `SearchBar`
17. Mover animaciones de `ProductCard` / `TestimonialCard` al organismo (Regla 9)
18. Crear `app/marketplace/page.tsx` para activar `MarketTemplate`
19. Eliminar directorio `src/components/pages/` (vacío, residuo de migración)
20. Auditar y limpiar directorio `src/legacy/`
