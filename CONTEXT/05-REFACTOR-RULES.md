# 05 — REFACTOR RULES

> Reglas de oro extraídas del código real. Lo que se respeta, lo que se viola, y lo que debería ser ley.
> Auditoría: 2026-05-08

---

## REGLA 0 — ZERO INLINE POLICY (Ley Suprema)

**Estado**: ❌ VIOLADA MASIVAMENTE (159 clases inline detectadas)

> **TODA clase Tailwind que aparezca en un archivo `.tsx` DEBE estar en su correspondiente
> `.variants.ts`.** Sin excepciones. Sin "es solo un mb-4". Sin "es solo layout".

### Qué se permite en JSX

```tsx
// ✅ CORRECTO — Única forma aceptable
className={cn(myComponentVariants({ variant, size }), className)}

// ✅ CORRECTO — Composición desde padre (layout margin)
<Heading level="h2" className="mb-4">
```

### Qué está PROHIBIDO en JSX

```tsx
// ❌ PROHIBIDO — Clase de styling directo
className="font-headline text-2xl font-bold text-primary"

// ❌ PROHIBIDO — Layout inline en organismo
className="flex flex-col md:flex-row items-center gap-6"

// ❌ PROHIBIDO — Valores arbitrarios sin token
className="min-h-[280px] w-[500px]"

// ❌ PROHIBIDO — Override extenso de átomo via className
className="px-0 py-0 bg-transparent shadow-none"
```

### Dónde va cada tipo de clase

| Tipo de clase | Destino correcto |
| --- | --- |
| Color, tipografía, sombra | `.variants.ts` → `variant` prop |
| Tamaño, padding, spacing | `.variants.ts` → `size` prop |
| Layout (flex, grid) | `.variants.ts` → `layout` o `wrapper` variante |
| Estados (hover, focus, active) | `.variants.ts` → parte de cada variant |
| Animaciones/transiciones | `.variants.ts` → `animate` prop o base classes |
| Responsive (md:, lg:) | `.variants.ts` → integrado en cada variant |
| Decorativos (blur, gradients) | `.variants.ts` → `deco` variante |

### Aplicación

- Todo componente (átomo, molécula, organismo, template) DEBE tener `.variants.ts`
- Los organismos que hoy no tienen `.variants.ts` (HeroSplit, NavbarSticky, NewsSection,
  Testimonials, WorkWithUs, VideosSection, Footer, ContactSection) deben crearlo
- Ver `06-DEBT-LOG.md` para el inventario completo de 159 violaciones

---

## REGLA 1 — Iconos siempre como `ReactNode`, nunca `ComponentType`

**Estado**: ✅ RESPETADA en componentes activos

```typescript
// ✅ CORRECTO (HomeTemplate.tsx:174)
icon: <ArrowRight className="w-5 h-5" />

// ❌ PROHIBIDO
icon: ArrowRight  // ComponentType sin ejecutar
```

Todos los átomos (`IconButton`, `Button`, `CTAGroup`) esperan `icon?: ReactNode`.
El pattern está documentado explícitamente en `HomeTemplate.tsx` línea 19:
`// Tipos de props - TODOS los iconos como ReactNode (JSX ejecutado)`.

---

## REGLA 2 — Todo componente visual DEBE tener archivo `.variants.ts`

**Estado**: ⚠️ PARCIALMENTE RESPETADA

- ✅ Todos los átomos tienen `.variants.ts`
- ✅ Moléculas clave (ProductCard, Nav, Card, FormField, CTAGroup) tienen
- ❌ Organismos NO tienen `.variants.ts` (excepto BentoCarousel)
- ❌ HeroSplit, NewsSection, Testimonials, WorkWithUs, Footer → estilos 100% inline

**Regla derivada**: Si un organismo tiene más de 3 clases Tailwind repetidas, DEBE extraerlas a un `.variants.ts`.

---

## REGLA 3 — `cn()` como único merger de clases

**Estado**: ✅ RESPETADA globalmente

```typescript
import { cn } from "@/lib/utils";
className={cn(productCardVariants({ variant }), className)}
```

Nunca se usa `clsx` directo ni template literals para combinar clases.
`cn()` wrappea `clsx` + `twMerge`.

---

## REGLA 4 — Prohibido `margin-top` en átomos

**Estado**: ✅ RESPETADA en átomos

Los átomos (Button, Badge, Input, Avatar, etc.) NO definen márgenes externos.
Los márgenes se aplican desde el padre:
```tsx
<Heading level="h2" className="mb-4">  // ✅ margen desde el consumidor
```

**Excepción encontrada**: Skeletons usan `style={{ marginTop: "auto" }}` en `SkeletonCard.tsx`.

---

## REGLA 5 — Cada carpeta de componente tiene `index.ts` barrel

**Estado**: ⚠️ INCONSISTENTE

- ✅ Átomos: todos tienen `index.ts`
- ⚠️ Moléculas: la mayoría tiene, algunas no
- ❌ Organismos: importaciones directas al `.tsx` frecuentes

**Regla**: Todo componente DEBE exportar desde `ComponentName/index.ts`.

---

## REGLA 6 — Skeleton por cada organismo

**Estado**: ✅ RESPETADA

Cada organismo tiene su `*Skeleton.tsx` companion:
- `HeroSplitSkeleton`, `NavbarStickySkeleton`, `NewsSectionSkeleton`
- `VideosSectionSkeleton`, `TestimonialsSkeleton`, `WorkWithUsSkeleton`
- `FooterSkeleton`, `ProductGridSkeleton`, `HeaderSkeleton`

**Pattern**: Skeleton usa clases CSS (`.skeleton-pulse`, `.skeleton-block`) NO Framer Motion.

---

## REGLA 7 — `forwardRef` para componentes interactivos reutilizables

**Estado**: ⚠️ INCONSISTENTE

- ✅ `ProductCard` usa `forwardRef<HTMLDivElement>`
- ✅ `ContactSection` usa `forwardRef<HTMLElement>`
- ❌ `Button`, `Input` — no verificado si usan forwardRef
- ❌ `HeroSplit`, `Footer` — no usan forwardRef

**Regla**: Átomos y moléculas interactivos DEBEN usar `forwardRef`.

---

## REGLA 8 — Datos fluyen top-down desde Templates

**Estado**: ⚠️ PARCIAL

- ✅ `HomeTemplateV2` recibe TODA la data como props desde `page.tsx`
- ✅ Ningún organismo importa datos de `data.ts` directamente
- ❌ `useCart`/`useFavorites` se instancian en Template (correcto), pero `HomeTemplateV2` NO los usa

**Regla**: Los hooks de negocio se instancian SOLO en Templates, nunca en organismos o moléculas.

---

## REGLA 9 — Framer Motion SOLO en organismos y templates

**Estado**: ❌ VIOLADA

- ✅ Organismos: `HeroSplit`, `NewsSection`, `Testimonials`, `ContactSection` usan `motion.*`
- ❌ Molécula `ProductCard` importa y usa `motion.div` y `motion.img` — lógica de animación en nivel incorrecto
- ❌ Template `HomeTemplateV2` usa `AnimatePresence` (aceptable a nivel template)

**Regla**: Moléculas NO deberían importar `framer-motion`. Las animaciones se aplican desde el organismo/template wrapping.

---

## REGLA 10 — No hardcodear URLs ni textos en componentes

**Estado**: ❌ VIOLADA en múltiples sitios

| Archivo | Texto hardcodeado |
| --- | --- |
| `WorkWithUs.tsx:95` | `"Madrid, España"` duplicado |
| `WorkWithUs.tsx:80` | URL de unsplash hardcodeada para imagen del mapa |
| `Testimonials.tsx:43` | `"Community"` en inglés (resto es español) |
| `WorkWithUs.tsx:30` | `"Maker Hub"` hardcodeado |
| `Footer.tsx:20` | `"JovenPro"` hardcodeado en lugar de usar `data.brand` |
| `ProductCard.tsx:78` | `console.log("Click")` en onClick |

**Regla**: Todo texto visible al usuario debe venir de props o data layer. Nunca inline.

---

## REGLA 11 — Convención de `id` en secciones para scroll anchoring

**Estado**: ✅ RESPETADA

```tsx
<section id="inicio">     // HeroSplit
<section id="productos">  // BentoCarousel
<section id="journal">    // NewsSection
<section id="videos">     // VideosSection
<section id="testimonios">// Testimonials
<section id="contacto">   // WorkWithUs
```

Sincronizados con `navItems` en `data.ts`. El scroll se maneja con `scrollIntoView({ behavior: "smooth" })`.

---

## REGLA 12 — Nunca SVG inline en organismos — usar Lucide o átomo

**Estado**: ❌ VIOLADA gravemente

| Archivo | SVGs inline |
| --- | --- |
| `HeroSplit.tsx` | 1 SVG flecha (debería ser `<ArrowRight />`) |
| `WorkWithUs.tsx` | 4 SVGs (Instagram, Facebook, WhatsApp, MapPin) |
| `Footer.tsx` | 3 SVGs (Instagram, Facebook, WhatsApp) duplicados |

**Regla**: Todos los iconos deben venir de `lucide-react` o de un átomo `Icon`. Los SVGs inline generan duplicación y son imposibles de mantener.
