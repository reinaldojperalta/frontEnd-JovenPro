# 05 — REFACTOR RULES

> Reglas de oro extraídas del código real. Lo que se respeta, lo que se viola, y lo que debería ser ley.
> Auditoría: **2026-05-12** | Refactor V3 completado

---

## REGLA 0 — ZERO INLINE POLICY (Ley Suprema)

**Estado**: ✅ ~90% RESPETADA (post Refactor V3)

> **TODA clase Tailwind que aparezca en un archivo `.tsx` DEBE estar en su correspondiente
> `.variants.ts`.** Sin excepciones. Sin "es solo un mb-4". Sin "es solo layout".

### Qué se permite en JSX

```tsx
// ✅ CORRECTO — Única forma aceptable
className={cn(myComponentVariants({ variant, size }), className)}

// ✅ CORRECTO — Override dimensional de átomo desde padre (caso de borde documentado)
<Logo size="lg" className="h-20 md:h-28 w-auto" />

// ✅ CORRECTO — Margen de sección desde el consumidor
<Heading level="h2" className="mb-4">
```

### Qué está PROHIBIDO en JSX

```tsx
// ❌ PROHIBIDO — Styling directo en componente
className="font-headline text-2xl font-bold text-primary"

// ❌ PROHIBIDO — Layout inline en organismo
className="flex flex-col md:flex-row items-center gap-6"

// ❌ PROHIBIDO — Valores arbitrarios sin token (fuera de .variants.ts)
className="min-h-[280px] w-[500px]"

// ❌ PROHIBIDO — Override extenso de átomo via className
className="px-0 py-0 bg-transparent shadow-none"

// ❌ PROHIBIDO — Styling en elemento que no es un átomo
<button className="text-xl text-primary-dim underline font-bold block mt-4 hover:opacity-80 transition-opacity">
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

### Violaciones activas post-Refactor V3

| Archivo | Línea | Violación | Severidad |
| --- | --- | --- | --- |
| `WorkWithUs.tsx` | 156 | `className="text-xl text-primary-dim underline font-bold block mt-4 hover:opacity-80 transition-opacity"` en `<button>` nativo | 🔴 CRÍTICA |
| `HomeTemplateV2.tsx` | 76 | `className="min-h-screen bg-background"` en div wrapper | 🟡 MEDIA |
| `ProductCard.tsx` | ~78 | `text-xs font-semibold text-foreground` en artisan span | 🟡 MEDIA |
| `FormField.tsx` | ~238 | `text-[10px]` | 🟡 MEDIA |

---

## REGLA 1 — Iconos siempre como `ReactNode`, nunca `ComponentType`

**Estado**: ✅ RESPETADA en todos los componentes activos

```typescript
// ✅ CORRECTO
icon={<ShoppingCart className="w-5 h-5" />}  // JSX ejecutado
icon={isFav ? <Heart className="w-5 h-5" /> : <HeartOff className="w-5 h-5" />}

// ❌ PROHIBIDO
icon={ShoppingCart}      // ComponentType sin ejecutar
icon={isFav ? Heart : HeartOff}  // Referencia de función
```

> **Único consumidor de Lucide en el flujo activo**: `ContactSection.tsx` (`Mail`, `Send`, `CheckCircle2`).
> WorkWithUs y Footer usan SVGs inline (deuda técnica pendiente).

---

## REGLA 2 — Todo componente visual DEBE tener archivo `.variants.ts`

**Estado**: ✅ 100% RESPETADA post-Refactor V3

- ✅ Todos los átomos (13/13) tienen `.variants.ts`
- ✅ Todas las moléculas (12/12) tienen `.variants.ts`
- ✅ Todos los organismos activos (9/9) tienen `.variants.ts`
- ⚠️ Organismos legacy (`Header`, `Hero`, `ProductGrid`): estado de `.variants.ts` no verificado

**Regla derivada**: Si un organismo tiene más de 3 clases Tailwind, DEBE extraerlas a `.variants.ts`.

---

## REGLA 3 — `cn()` como único merger de clases

**Estado**: ✅ RESPETADA globalmente

```typescript
import { cn } from "@/lib/utils";
className={cn(productCardVariants({ variant }), className)}
```

- `cn()` wrappea `clsx` + `twMerge`
- Nunca usar template literals: `` `clase1 ${condition ? 'clase2' : ''}` ``
- Nunca importar `clsx` directamente en componentes

---

## REGLA 4 — Prohibido `margin-top` externo en átomos

**Estado**: ✅ RESPETADA en átomos activos

Los átomos NO definen márgenes externos (`mt-*`, `mb-*`, `mx-*`, `my-*`).
Los márgenes se aplican desde el consumidor:

```tsx
<Heading level="h2" className="mb-4">  // ✅ margen desde el consumidor
```

**Excepción documentada**: `SkeletonCard.tsx` usa `style={{ marginTop: "auto" }}` — pendiente de resolver.

---

## REGLA 5 — Cada carpeta de componente tiene `index.ts` barrel

**Estado**: ✅ RESPETADA (verificado en átomos, moléculas, organismos, templates)

```typescript
// Patrón estándar de index.ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
export { componentNameVariants } from "./ComponentName.variants";
```

**Barrel raíz**:
- `components/atoms/index.ts` → ✅
- `components/molecules/index.ts` → ✅
- `components/organisms/index.ts` → ✅
- `components/templates/index.ts` → ✅
- `components/index.ts` → ✅ (re-exporta todos los niveles)

---

## REGLA 6 — Skeleton por cada organismo (y componente complejo)

**Estado**: ✅ RESPETADA

Cada organismo tiene su `*Skeleton.tsx` companion que vive en la misma carpeta:

```
HeroSplit/
├── HeroSplit.tsx
├── HeroSplitSkeleton.tsx    ← companion
├── HeroSplit.variants.ts
└── index.ts
```

**Pattern**: Skeleton usa clases CSS (`.skeleton-pulse`, `.skeleton-block`) NO Framer Motion.
**Token base**: `--skeleton-base: 203 213 225` (slate-300) con `opacity: 0.6`.

---

## REGLA 7 — `forwardRef` para componentes interactivos reutilizables

**Estado**: ⚠️ INCONSISTENTE

| Componente | `forwardRef` | Comentario |
| --- | --- | --- |
| `ProductCard` | ✅ `forwardRef<HTMLDivElement>` | Correcto |
| `ContactSection` | ✅ `forwardRef<HTMLElement>` | Correcto |
| `Button` | ❓ No verificado | Debería tener `forwardRef<HTMLButtonElement>` |
| `Input` | ❓ No verificado | Debería tener `forwardRef<HTMLInputElement>` |
| `HeroSplit` | ❌ No usa forwardRef | Aceptable para organismos |
| `Footer` | ❌ No usa forwardRef | Aceptable para organismos |

**Regla**: Átomos interactivos (`Button`, `Input`, `IconButton`) DEBEN usar `forwardRef`.

---

## REGLA 8 — Datos fluyen top-down desde Templates

**Estado**: ✅ RESPETADA en estructura, ⚠️ PARCIAL en integración de hooks

- ✅ `HomeTemplateV2` recibe TODA la data como props desde `page.tsx`
- ✅ Ningún organismo importa datos de `data.ts` directamente
- ✅ Ningún organismo importa de `@/lib/data` directamente
- ❌ `useCart`/`useFavorites` están disponibles pero **NO integrados** en `HomeTemplateV2`

**Regla**: Los hooks de negocio se instancian SOLO en Templates, nunca en organismos o moléculas.

---

## REGLA 9 — Framer Motion SOLO en organismos y templates

**Estado**: ❌ VIOLADA

| Nivel | Componente | Usa `framer-motion` | ¿Correcto? |
| --- | --- | --- | --- |
| Organismo | `HeroSplit` | ✅ `motion.*` | ✅ Correcto |
| Organismo | `NewsSection` | ✅ `motion.*` | ✅ Correcto |
| Organismo | `Testimonials` | ✅ `motion.*` | ✅ Correcto |
| Organismo | `ContactSection` | ✅ `motion.*` | ✅ Correcto |
| Organismo | `WorkWithUs` | ✅ `motion.*` | ✅ Correcto |
| Molécula | `ProductCard` | ✅ `motion.div`, `motion.img` | ❌ VIOLA REGLA |
| Molécula | `TestimonialCard` | ✅ `motion.*` | ❌ VIOLA REGLA |
| Template | `HomeTemplateV2` | ✅ `AnimatePresence` (si aplica) | ✅ Correcto |

**Acción requerida**: Mover las animaciones de `ProductCard` y `TestimonialCard` al organismo que las envuelve (`BentoCarousel`, `Testimonials`).

---

## REGLA 10 — No hardcodear URLs ni textos en componentes

**Estado**: ⚠️ PARCIALMENTE RESPETADA

| Archivo | Texto hardcodeado | Estado |
| --- | --- | --- |
| `WorkWithUs.tsx:111` | `"Maker Hub"` | 🔴 PENDIENTE — no en `WorkWithUsData` |
| `WorkWithUs.tsx:168` | `"Conecta con nosotros"` | 🔴 PENDIENTE — no en `WorkWithUsData` |
| `WorkWithUs.tsx:158` | `"Whatsapp: +57-3024840101"` | 🔴 PENDIENTE — debería venir de `data.whatsappNumber` |
| `HomeTemplateV2.tsx:48` | `"https://jovenpro.com/producto/${p.slug}/"` | 🟡 MEDIA — URL base debería ser configurable |
| `HomeTemplateV2.tsx:52` | `"https://jovenpro.com/?s=..."` | 🟡 MEDIA — URL base hardcodeada |
| `HomeTemplateV2.tsx:89` | `"https://jovenpro.com/carrito/"` | 🟡 MEDIA — URL hardcodeada |
| `Footer.tsx:70` | `data.brand \|\| "JovenPro"` | ✅ RESUELTO — fallback a `data.brand` |
| `HeroSplit.tsx:104` | `alt="JovenPro"` | 🟢 BAJA — hardcodeado pero semánticamente correcto |

---

## REGLA 11 — Convención de `id` en secciones para scroll anchoring

**Estado**: ✅ RESPETADA

```tsx
<Section id="inicio">      // HeroSplit
<Section id="productos">   // BentoCarousel (via Container interno)
<Section id="journal">     // NewsSection
<Section id="videos">      // VideosSection
<Section id="testimonios"> // Testimonials
<Section id="contacto">    // WorkWithUs
```

Sincronizados con `navItems` en `data.ts`.
El scroll se maneja con `scrollIntoView({ behavior: "smooth" })` en `HeroSplit.defaultNavigate()`.

---

## REGLA 12 — Nunca SVG inline en organismos — usar Lucide o átomo

**Estado**: ❌ VIOLADA — DEUDA ACTIVA IMPORTANTE

| Archivo | SVGs inline | Descripción |
| --- | --- | --- |
| `WorkWithUs.tsx` | 3 SVGs en `const socialLinks[]` | Instagram, Facebook, WhatsApp |
| `Footer.tsx` | 3 SVGs en `const socialIcons{}` | Instagram, Facebook, WhatsApp |

> **Total**: 6 bloques de SVG inline que son **DUPLICADOS EXACTOS** entre sí.
> Crean ~200 líneas de código duplicado.

**Solución recomendada**:
```tsx
// Opción A — Átomo SocialIcon
<SocialIcon platform="instagram" className="w-5 h-5" />

// Opción B — Lucide (no tiene estas redes sociales)
// No aplicable para redes sociales

// Opción C — Import de assets SVG
import { InstagramIcon } from "@/components/atoms/SocialIcons";
```

---

## REGLA 13 — Nuevos organismos DEBEN usar el átomo `Section`

**Estado**: ✅ RESPETADA en todos los organismos del Refactor V3

```tsx
// ✅ CORRECTO — Uso del átomo Section
<Section id="contacto" spacing="lg" background="background" className={className}>

// ❌ OBSOLETO — Uso directo de <section> nativo
<section className="py-16 px-6 bg-background">
```

El átomo `Section` acepta: `as` (section/footer/header/div), `spacing`, `background`, `id`, `className`.

---

## Resumen de Cumplimiento

| Regla | Estado | Prioridad de fix |
| --- | --- | --- |
| 0 — Zero Inline Policy | ✅ 90% | 🟡 WorkWithUs:156, HomeTemplateV2:76 |
| 1 — Iconos como ReactNode | ✅ | — |
| 2 — `.variants.ts` por componente | ✅ | ⚠️ Verificar legacy |
| 3 — `cn()` único merger | ✅ | — |
| 4 — Sin márgenes en átomos | ✅ | — |
| 5 — `index.ts` barrel | ✅ | — |
| 6 — Skeleton companion | ✅ | — |
| 7 — `forwardRef` interactivos | ⚠️ | 🟡 Button, Input |
| 8 — Datos top-down | ⚠️ | 🟡 Integrar useCart/useFavorites |
| 9 — Framer Motion en org+ | ❌ | 🟡 ProductCard, TestimonialCard |
| 10 — Sin textos hardcodeados | ⚠️ | 🔴 WorkWithUs (3 textos) |
| 11 — IDs para scroll | ✅ | — |
| 12 — Sin SVG inline | ❌ | 🔴 WorkWithUs + Footer (6 SVGs) |
| 13 — Usar átomo Section | ✅ | — |
