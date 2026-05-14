# 01 — SYMBOL MAP

> Inventario exhaustivo de tokens de diseño extraídos de `tailwind.config.ts` y `globals.css`.
> Fecha de auditoría: **2026-05-12** | Codebase: jovenpro-next-appV2

---

## ⚠️ CORRECCIÓN CRÍTICA (vs versión anterior)

La versión anterior de este documento documentaba una paleta de colores INCORRECTA
(`primary: #241f43`, `secondary: #006496`, `background: #aecbff`).
La paleta real —verificada en `tailwind.config.ts`— es completamente diferente.
Esta versión ha sido re-auditada directamente desde el código fuente.

---

## 1. CSS Custom Properties (`:root` en `globals.css`)

| Variable | Valor real | Consumidor |
| --- | --- | --- |
| `--background` | `#F8FAFC` | `body`, `bg-background` |
| `--foreground` | `#1A1832` | `body`, `text-foreground` |
| `--skeleton-base` | `203 213 225` (slate-300) | skeleton-* clases |
| `--skeleton-opacity` | `0.6` | `.skeleton-bg` |
| `--skeleton-opacity-dim` | `0.3` | `.skeleton-bg-dim` |
| `--skeleton-bg` | `rgb(var(--skeleton-base) / 0.6)` | `.skeleton-block`, `.skeleton-pulse` |
| `--skeleton-bg-dim` | `rgb(var(--skeleton-base) / 0.3)` | keyframe `50%` |
| `--font-Inter` | Cargada via `next/font/google` | `font-body` (Tailwind) |
| `--font-montserrat` | Cargada via `next/font/google` | `font-headline` (Tailwind) |

> ✅ **Fuentes sincronizadas**: `layout.tsx` carga Inter + Montserrat. `tailwind.config.ts` las mapea correctamente.

---

## 2. Paleta de Colores (Tailwind Extend — `tailwind.config.ts`)

### Colores Primarios y Secundarios

| Token Tailwind | Valor Hex | Uso semántico |
| --- | --- | --- |
| `primary.DEFAULT` | `#00AEEF` | Texto primary, iconos activos, CTA principal |
| `primary.dim` | `#0284C7` | Hover states de primary, links activos |
| `primary.subtle` | `#E0F2FE` | Fondos sutiles, chips de categoría |
| `secondary.DEFAULT` | `#2D2B52` | Fondos oscuros, texto secundario navy |
| `secondary.light` | `#3E3C66` | Hover de secondary |

### Colores de Acento

| Token Tailwind | Valor Hex | Uso semántico |
| --- | --- | --- |
| `accent.DEFAULT` | `#FF6B6B` | Alertas, badges de error visual |
| `accent.vibrant` | `#F97056` | Gradientes de acento |
| `accent.strong` | `#E85D5D` | Hover de accent |
| `accent.subtle` | `#FFE5E5` | Fondos de chips de accent |

### Superficies y Bordes

| Token Tailwind | Valor Hex | Uso semántico |
| --- | --- | --- |
| `surface.DEFAULT` | `#F1F5F9` | Cards, inputs bg |
| `surface.container` | `#F8FAFC` | Navbar, containers |
| `surface.container-low` | `#FFFFFF` | Secciones de máximo contraste |
| `surface.variant` | `#E2E8F0` | Bordes internos, separadores |
| `border.DEFAULT` | `#CBD5E1` | Bordes globales |
| `border.subtle` | `#E2E8F0` | Bordes sutiles |

### Estados y Feedback

| Token Tailwind | Valor Hex | Uso semántico |
| --- | --- | --- |
| `muted.DEFAULT` | `#E2E8F0` | Elementos deshabilitados |
| `muted.light` | `rgba(241,245,249,0.61)` | Overlays sutiles |
| `muted.foreground` | `#64748B` | Texto muted / placeholder |
| `success.DEFAULT` | `#22C55E` | Estados de éxito |
| `success.subtle` | `#DCFCE7` | Fondos de éxito |
| `danger.DEFAULT` | `#EF4444` | Estados de error |
| `danger.subtle` | `#FEE2E2` | Fondos de error |
| `warning.DEFAULT` | `#F59E0B` | Advertencias |
| `warning.subtle` | `#FEF3C7` | Fondos de advertencia |

---

## 3. Custom Border Radius (`rounded-clay`)

| Clase Tailwind | CSS | Uso |
| --- | --- | --- |
| `rounded-clay` | `border-radius: 1rem` | Cards, buttons, inputs |
| `rounded-clay-sm` | `border-radius: 0.75rem` | Badges sm, elementos menores |
| `rounded-clay-lg` | `border-radius: 1.5rem` | Cards grandes, modales |

---

## 4. Custom Shadows (`shadow-clay`)

| Clase Tailwind | Propiedades CSS |
| --- | --- |
| `shadow-clay` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` |
| `shadow-clay-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` |
| `shadow-clay-active` | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)` |

> ✅ **RESUELTO**: `shadow-soft`, `shadow-ambient`, `shadow-liquid-glass` eliminados. Todos los componentes usan `shadow-clay-*`.

---

## 5. Aspect Ratios Bento

| Clase Tailwind | Valor | Componente destino |
| --- | --- | --- |
| `aspect-bento-large` | `4/3` | CardFull (Hero) |
| `aspect-bento-vertical` | `3/4` | CardMin (Vertical) |
| `aspect-bento-horizontal` | `16/9` | CardPreviewMax |
| `aspect-bento-small` | `1/1` | CardPreview |
| `aspect-bento-history` | `1/1` | HistorySlot |

> ✅ **RESUELTO**: `aspect-bento-square` y `aspect-bento-portrait` ya están integrados en `BentoGrid.variants.ts` y sincronizados en `tailwind.config.ts`.

---

## 6. Animaciones y Transiciones

| Token | Valor | Origen |
| --- | --- | --- |
| `ease-smooth` | `cubic-bezier(0.25, 1, 0.5, 1)` | `tailwind.config.ts` |
| `animate-fade-in` | `fadein 0.3s ease-in` | `tailwind.config.ts` |
| `skeleton-pulse` (keyframe) | `2s cubic-bezier(0.4, 0, 0.6, 1) infinite` | `globals.css` |

---

## 7. Clases Custom en `globals.css` (`@layer components`)

### Skeleton System

| Clase | Propiedades clave |
| --- | --- |
| `.skeleton-block` | `background-color: var(--skeleton-bg); border-radius: 0.25rem` |
| `.skeleton-pulse` | `animation: skeleton-pulse 2s infinite + bg` |
| `.skeleton-text` | `.skeleton-pulse` + `h-[0.8em] rounded-sm` |
| `.skeleton-circle` | `.skeleton-pulse` + `rounded-full` |
| `.skeleton-rect` | `.skeleton-pulse` puro |

### Utilidades Globales

| Clase | Propiedades clave |
| --- | --- |
| `.touch-target` | `min-w-[44px] min-h-[44px] flex items-center justify-center` |
| `.hero-title` | `font-headline font-black tracking-tighter leading-[1.1]` + clamp(3rem, 8vw, 5rem) |
| `.hide-scrollbar` | Webkit + Firefox + IE scrollbar hide |
| `.card-overlay-text` | `text-white drop-shadow-md` |

### Grid Bento V4 (Sistema activo — 16×9)

| Clase | Descripción |
| --- | --- |
| `.bento-grid-v4` | Grid 16×9 en desktop, 2 columnas en mobile |
| `.bento-slot-subtitle2` | col 1/4, row 1/2 |
| `.bento-slot-subtitle` | col 1/4, row 2/3 |
| `.bento-slot-history-{1-4}` | col 1/4, rows 3-8 |
| `.bento-slot-hero` | col 4/11, row 1/8 |
| `.bento-slot-title` | col 11/17, row 1/3 |
| `.bento-slot-next` | col 11/17, row 3/8 |
| `.bento-slot-dots` | col 1/4, row 8/9 |
| `.bento-slot-catalogo` | col 1/4, row 9/10 |
| `.bento-slot-preview-{1,2}` | cols medias, rows 8/10 |
| `.bento-slot-preview-max` | col 11/17, row 8/10 |

### Grid Bento Legacy (7×6 — deprecated, aún presente)

| Clase | Descripción |
| --- | --- |
| `.bento-grid-container` | `grid 7×6, gap 1rem, min-h 600px, max-h 800px` |
| `.bento-slot-*-legacy` | Slots del grid 7×6 anterior |
| `.bento-history-inactive` | `grayscale opacity-50 + hover reset` |
| `.bento-slot` | `relative overflow-hidden rounded-clay h-full` |
| `.bento-history-fade` | Transición CSS para history |

### Grid News (6×6)

| Clase | Descripción |
| --- | --- |
| `.news-grid-container` | `grid 6×6, gap 1.5rem, min-h 600px` |
| `.news-slot-featured` | `1/1 / 7/5` (ocupa 4 cols × 6 rows) |
| `.news-slot-preview-{1-3}` | col 5/7, rows 1-2, 3-4, 5-6 |
| `.news-slot` | `relative overflow-hidden rounded-clay h-full` |

---

## 8. Tokens Fantasma (Usados en código pero NO definidos)

| Clase/Token usado | Archivo que lo usa | Estado |
| --- | --- | --- |
| `aspect-bento-square` | `BentoGrid.variants.ts` | ✅ DEFINIDO |
| `aspect-bento-portrait` | `BentoGrid.variants.ts` | ✅ DEFINIDO |
| `text-on-surface` | `Input.variants.ts` | ❌ NO DEFINIDO |
| `text-on-surface-variant` | `Typography.variants.ts` | ❌ NO DEFINIDO |
| `border-surface-variant` | `IconButton.variants.ts` | ❌ NO DEFINIDO |
| `shadow-soft` | — | ✅ RESUELTO (usa shadow-clay) |
| `shadow-ambient` | — | ✅ RESUELTO (usa shadow-clay) |
| `shadow-liquid-glass` | — | ✅ RESUELTO (eliminado) |
| `font-display` | — | ✅ RESUELTO → `font-headline` |
| `text-jp-navy/sky` | — | ✅ RESUELTO (CVA) |

> **Acción requerida**: Los 5 tokens `❌ NO DEFINIDO` deben añadirse a `tailwind.config.ts`
> o reemplazarse por tokens existentes en sus respectivos `.variants.ts`.
