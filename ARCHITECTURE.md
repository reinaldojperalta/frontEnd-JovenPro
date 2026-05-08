# 🏗️ Arquitectura de Componentes — JovenPro Next.js 14

> **Versión:** 1.0  
> **Stack:** Next.js 14.2.3 (App Router) + TypeScript estricto + Tailwind CSS + CVA + Framer Motion  
> **Patrón:** Atomic Design (Atoms → Molecules → Organisms → Templates)  
> **Propósito:** Contexto único de verdad para cualquier LLM que trabaje en este codebase.

---

## 📁 Estructura de Carpetas

```
src/
├── app/                          # Next.js App Router (Server Components por defecto)
│   ├── page.tsx                  # Páginas limpias: solo data fetching y props drilling
│   ├── layout.tsx                # Root layout: fuentes, metadata, globals.css
│   └── globals.css               # Directivas @tailwind + variables CSS
├── components/
│   ├── atoms/                    # 9 átomos base (sin lógica de negocio)
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Container/
│   │   ├── IconButton/
│   │   ├── Input/
│   │   ├── Logo/
│   │   ├── Price/
│   │   ├── Skeleton/
│   │   └── Typography/           # Heading, Text, GradientText
│   ├── molecules/                # 6 moléculas (combinación de átomos)
│   │   ├── Card/
│   │   ├── CTAGroup/
│   │   ├── FormField/
│   │   ├── Nav/
│   │   ├── ProductInfo/
│   │   └── SearchBar/
│   ├── organisms/                # 6 organismos (secciones de UI)
│   │   ├── ContactSection/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── ProductCard/
│   │   ├── ProductGrid/
│   │   └── Skeleton/             # ProductSkeleton, PageSkeleton
│   └── templates/                # 3 templates (orquestadores, únicos con "use client")
│       ├── HomeTemplate.tsx
│       ├── MarketplaceTemplate.tsx
│       └── ProductDetailTemplate.tsx
├── hooks/                        # Hooks globales reutilizables
│   ├── useCart.ts
│   ├── useDebounce.ts
│   ├── useFavorites.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── useScrollHeader.ts
└── lib/
    ├── api/                      # Server-side data fetching
    └── utils/
        └── cn.ts                 # clsx + tailwind-merge
```

---

## 🧩 Niveles de Atomic Design — Responsabilidades

### 1. Átomos (`components/atoms/`)
**Regla de oro:** Un átomo no decide su posición en el espacio. Solo sabe cómo se ve y qué hace.

| Átomo | Responsabilidad | NO debe hacer |
|-------|----------------|---------------|
| `Button` | Renderizar botón con variantes, icono, loading | Decidir su margen, padding externo, o posición en grid |
| `IconButton` | Botón circular con icono (ReactNode) + badge/loading | Aceptar `LucideIcon` como tipo de prop. Solo `React.ReactNode` |
| `Input` | Campo de texto con estados (error, success, loading) | Manejar labels, helper text, o validación |
| `Badge` | Pill de texto con colores predefinidos | Decidir cuándo mostrarse (eso es lógica de negocio) |
| `Typography` | Heading, Text, GradientText con escalas tipográficas | Añadir padding o margin propio |
| `Container` | Wrapper con max-width, padding, radius, variant | Contener lógica de negocio |

**Props de átomos:** Solo reciben props del DOM + variantes de CVA. Nunca reciben objetos de dominio (`Product`, `User`).

### 2. Moléculas (`components/molecules/`)
**Regla de oro:** Combinan 2+ átomos para formar un componente con significado funcional. Controlan el espaciado **interno** entre sus partes.

| Molécula | Átomos que combina | Responsabilidad de layout |
|----------|-------------------|---------------------------|
| `FormField` | `Input` + `Text` + `IconButton` | Espaciado entre label, input y helper text. Padding interno del label |
| `CTAGroup` | `Button` × N | Gap entre botones, dirección (horizontal/vertical), alineación |
| `Nav` | `Text`/`span` + `Badge` | Gap entre items, dirección, alineación de items |
| `Card` | `Image` + `SkeletonBlock` | Padding interno de header/content/footer. Aspect ratio de media |
| `SearchBar` | `Input` + `IconButton` | Posición relativa del input y el botón de búsqueda |

**Props de moléculas:** Combinan props de átomos + lógica de presentación. Ej: `CTAAction` tiene `label`, `icon`, `priority`, `onClick`.

### 3. Organismos (`components/organisms/`)
**Regla de oro:** Secciones completas de UI. Orquestan moléculas y átomos. Controlan el **layout de página** (padding de sección, grid, columnas, gaps grandes).

| Organismo | Contenido | Responsabilidad de layout |
|-----------|-----------|---------------------------|
| `Header` | `Logo` + `SearchBar` + `Nav` + `IconButton` × 3 | Fixed positioning, altura, padding del contenedor, layout flex |
| `Hero` | `Badge` + `Typography` + `CTAGroup` + `Card` | Grid de 2 columnas, min-height, padding de sección, animaciones |
| `ProductGrid` | `Nav` (pills) + `IconButton` + `ProductCard` × N | Padding vertical de sección, gap del grid, columnas responsive |
| `ContactSection` | `Typography` + `FormField` + `Button` | Grid de 2 columnas, padding, gap entre columnas |
| `ProductCard` | `Card` + `Badge` + `IconButton` × 2 | Overlay de badge, posición absoluta de botones favorito/carrito |

**Props de organismos:** Reciben datos de dominio (`Product[]`, `NavItem[]`) + callbacks. Son los que mapean datos a props de moléculas.

### 4. Templates (`components/templates/`)
**Regla de oro:** Únicos componentes con `"use client"`. Orquestan organismos. No tienen estilos propios (o mínimos).

| Template | Organismos que orquesta | Responsabilidad |
|----------|------------------------|-----------------|
| `HomeTemplate` | `Header` + `Hero` + `ProductGrid` + `ContactSection` + `Footer` | Estado global de página (categoría activa, loading), handlers, router |
| `MarketplaceTemplate` | (similar) | Estado de filtros, paginación, sorting |

**Flujo de datos:**
```
page.tsx (Server Component) → props
  ↓
Template ("use client") → estado + handlers
  ↓
Organismos → props de datos + callbacks
  ↓
Molecules → props de átomos + lógica de presentación
  ↓
Atoms → renderizado puro
```

---

## 🎨 Sistema de Variantes (CVA)

Cada componente tiene su archivo `.variants.ts` separado:

```
Button/
├── Button.tsx              # Lógica React
├── Button.variants.ts      # Definición CVA (variantes, tamaños, estados)
└── index.ts                # Barrel export
```

**Reglas:**
- El resultado de `cva()` se exporta como `componentVariants`.
- En el componente, se usa `cn(buttonVariants({ variant, size }), className)` para mergear.
- `className` siempre es la última para permitir override desde el padre.

**Ejemplo de interfaz:**
```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
          VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;        // ✅ JSX ejecutado
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  // ...
}
```

---

## ⚛️ Server vs Client Components

| Nivel | Tipo de Componente | Razón |
|-------|-------------------|-------|
| `app/page.tsx` | Server Component | Data fetching, SEO, metadata, no interactivity |
| `app/layout.tsx` | Server Component | Fuentes, CSS global, estructura HTML |
| Templates | `"use client"` | Hooks (`useState`, `useRouter`, `useCart`), event handlers |
| Organisms | Mixto | Si usan hooks de estado/efecto → `"use client"`. Si solo reciben props → Server |
| Molecules | Server por defecto | Solo si usan hooks específicos (ej: `useScrollHeader` en `Header`) |
| Atoms | Server por defecto | Nunca deben usar hooks de estado global |

**Regla:** Minimizar `"use client"`. Si un organismo necesita ser client, extrae el hook a un sub-componente o a `hooks/`.

---

## 🎨 Convenciones de Estilos

### Tailwind
- **NUNCA** usar `style={{}}`. Solo clases de Tailwind.
- Usar `cn()` de `lib/utils/cn.ts` (clsx + tailwind-merge) para mergear clases condicionales.
- Tokens custom definidos en `tailwind.config.ts`:
  - `rounded-clay`, `rounded-clay-sm`, `rounded-clay-lg`
  - `shadow-clay`, `shadow-clay-sm`, `shadow-clay-active`
  - `bg-surface`, `bg-surface-container`

### Iconos (REGLA CRÍTICA)
**Lucide React se importa y se ejecuta como JSX inmediatamente.**

```typescript
// ✅ CORRECTO — Pasar ReactNode (JSX ejecutado)
<IconButton icon={<ShoppingCart className="w-5 h-5" />} />
<Button icon={<ArrowRight className="w-5 h-5" />} />

// ❌ PROHIBIDO — Pasar ComponentType (referencia de función)
<IconButton icon={ShoppingCart} />           // CAUSA: Objects are not valid as a React child
<Button icon={ArrowRight} />                 // CAUSA: Error con keys {$$typeof, render}
```

**Por qué:** `IconButton` y `Button` esperan `icon?: React.ReactNode`. Un componente de React (función) no es un hijo válido. Debe ser un elemento React instanciado.

**En componentes condicionales:**
```typescript
// ✅ CORRECTO
icon={isFavorite ? <Heart className="w-5 h-5" /> : <Check className="w-5 h-5" />}

// ❌ PROHIBIDO
icon={isFavorite ? Heart : Check}
```

### Colores y Superficies
- `background` / `foreground` para tema base.
- `surface` / `surface-container` / `surface-container-low` para cards y contenedores.
- `primary` / `primary-dim` / `primary-light` para CTAs y acentos.
- `border` para divisores y bordes sutiles.

---

## 📦 Barrel Exports

Cada carpeta de componente tiene `index.ts`:

```typescript
export { Component } from "./Component";
export type { ComponentProps } from "./Component";
export { componentVariants } from "./Component.variants";
```

**Reglas:**
- Importar desde `@/components` usa los barrels.
- Importar desde `@/components/atoms/Button` es válido para acceso directo.
- No crear ciclos de importación (A importa B, B importa A).

---

## 🏷️ Nomenclatura

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes | PascalCase | `ProductCard.tsx`, `HomeTemplate.tsx` |
| Hooks | camelCase + `use` | `useCart.ts`, `useScrollHeader.ts` |
| Variantes CVA | camelCase | `buttonVariants`, `cardVariants` |
| Types/Interfaces | PascalCase + Props | `ButtonProps`, `ProductCardProps` |
| Archivos de variantes | `Component.variants.ts` | `Button.variants.ts` |

---

## 🐛 Debugging Guidelines

Cuando reportes un error, proporciona:
1. **Mensaje de error exacto** (stack trace completo).
2. **Archivo(s) involucrados** (código completo).
3. **Línea aproximada** donde ocurre.
4. **Comportamiento esperado vs actual.**

### Errores comunes y su origen

| Error | Causa probable | Dónde revisar |
|-------|---------------|---------------|
| `Objects are not valid as a React child` | Icono pasado como `ComponentType` en lugar de `ReactNode` | `IconButton`, `Button`, `FormField`, `ProductCard` |
| `Type 'X' is not assignable to type 'Y'` | Props drilling con tipos incompatibles entre niveles | Intermediario (molécula u organismo) que transforma props |
| Tailwind no aplica estilos | `content` en `tailwind.config.ts` no incluye la ruta de los archivos | `tailwind.config.ts` — asegurar `./src/**/*` |
| Imagen LCP sin `priority` | Next.js Image above the fold sin prop `priority` | Organismos que renderizan hero images |
| `fill` con parent `static` | El padre de `<Image fill>` necesita `relative`/`absolute`/`fixed` | Moléculas/Organismos con media (Card, Hero) |

---

## 🚫 Anti-Patterns Prohibidos

1. **No pasar componentes como iconos.** Siempre JSX: `<Icon />`, nunca `Icon`.
2. **No usar `any`.** El tipado es estricto. Si hay conflicto de tipos, resolver en el intermediario (molécula/organismo), no con `any`.
3. **No poner lógica de negocio en átomos.** Un `Button` no debe saber qué es "añadir al carrito".
4. **No poner layout de página en moléculas.** El padding de sección es del organismo. El gap entre label e input es de la molécula.
5. **No usar `style={{}}`.** Todo va por clases Tailwind.
6. **No tocar `.variants.ts` para cambiar layout.** Los archivos de variantes solo definen estilos visuales (colores, bordes, sombras). No grid, no flex, no margin.

---

## 🔗 Flujo de Datos Típico

```typescript
// 1. page.tsx — Server Component: define datos puros
const products = await fetchProducts();

// 2. Template — Client Component: estado y handlers
const [activeCategory, setActiveCategory] = useState("Todos");

// 3. Organismo: recibe datos + callbacks, mapea a moléculas
<ProductGrid
  products={filteredProducts}
  onCategoryChange={setActiveCategory}
/>

// 4. Molécula: recibe props de átomos + lógica de presentación
<CTAGroup
  primaryAction={{ label: "Comprar", icon: <ArrowRight /> }}
/>

// 5. Átomo: renderiza
<Button icon={<ArrowRight />}>Comprar</Button>
```

---

## 🦴 Sistema de Skeletons (Arquitectura Modular)

El proyecto implementa un sistema de Skeletons progresivo que sigue rigurosamente el patrón Atomic Design. Para evitar desincronizaciones, los Skeletons **viven en la misma carpeta que su componente real**.

### Niveles del Skeleton
1. **Átomos (`components/atoms/Skeleton/`)**:
   - `SkeletonBlock`: Bloques base para formas cuadradas/rectangulares.
   - `SkeletonCircle`: Círculos para avatares o botones.
2. **Moléculas (`components/molecules/[Molecula]/`)**:
   - Ej: `NavSkeleton` (utiliza átomos de skeleton para formar una barra de navegación con anchos determinísticos).
3. **Organismos (`components/organisms/[Organismo]/`)**:
   - Ej: `HeaderSkeleton.tsx` vive junto a `Header.tsx`.
   - Ej: `ProductGridSkeleton.tsx` vive junto a `ProductGrid.tsx`.
   - Estos componentes aceptan props para simular el layout exacto (ej. `productCount`, `columns`).
4. **Templates (`components/templates/`)**:
   - `HomeTemplateSkeleton` orquesta todos los skeletons de sus respectivos organismos para formar el layout visual de carga completo.

### CSS Tokens y Animación
Los estilos base del skeleton están definidos en `globals.css` para centralizar la animación y la gestión de color, evitando clases quemadas o variaciones indeseadas:
- `--skeleton-base`: 148 163 184 (slate-400)
- Clases utilitarias disponibles: `.skeleton-block`, `.skeleton-pulse`, `.skeleton-text`, `.skeleton-circle`.

**Regla de Oro:** NUNCA usar `style={{ backgroundColor: ... }}` para los skeletons. Utilizar siempre las clases utilitarias (`.skeleton-pulse`) o los átomos de Skeleton (`<SkeletonBlock />`).

---

## ⚠️ Carencias Actuales y Deuda Técnica (Estado del Proyecto)

Al 30 de Abril de 2026, el proyecto presenta las siguientes carencias conocidas que **no deben considerarse como bugs**, sino como funcionalidades pendientes de conexión backend o refactorización de lógica de negocio:

### 1. Estado Global (Hooks Funcionales pero sin contexto compartido)
- **`useCart`**: Actualmente gestiona el estado en memoria (`useState`) y se instancia por separado en cada template. No tiene persistencia compartida; el carrito se reinicia al navegar entre páginas.
- **`useFavorites`**: Utiliza `localStorage` directamente sin protección SSR (`typeof window !== "undefined"`), lo que podría causar "hydration mismatches".
- **Hooks sin uso**: `useLocalStorage`, `useDebounce` y `useMediaQuery` están implementados y exportados en `hooks/index.ts`, pero ningún componente los está utilizando actualmente.

### 2. Rutas y APIs Inexistentes (404)
- **APIs**: La ruta `/api/subscribe` no existe en el backend (actualmente el formulario en `ContactSection` simula una carga de 800ms exitosa).
- **Páginas**: Los enlaces en el UI hacia `/marketplace`, `/carrito`, `/producto/[id]`, `/login`, `/cuenta` y `/emprendedor/[brand]` devolverán un 404 natural porque sus archivos `page.tsx` correspondientes no han sido creados en `app/`.

### 3. Código Muerto o Incompleto
- En `MarketplaceTemplate`, el `<select>` de ordenamiento (`sortBy`) actualiza el estado interno pero la función no se aplica al array de `filteredProducts`.
- Las variantes visuales `rainbow`, `hologram`, `giant` e `iconGiant` están declaradas en el CVA de `Button` e `IconButton`, pero no se usan.
- `SkeletonCard` es una molécula que existe pero no es utilizada (el `ProductSkeleton` actualmente reconstruye la UI).

### 4. Estilos Inconsistentes
- El `defaultVariant` tanto de `Button` como de `IconButton` es `"liquid-glass"`. Este estilo está pensado estéticamente para fondos oscuros, pero el tema base actual del proyecto (`bg-background`) es un tono azul claro.
- La variante `"liquid-glass"` referencia el shadow `shadow-liquid-glass`, el cual fue eliminado del `tailwind.config.ts`, por lo que dicho shadow ahora es inválido (falla silenciosamente).
- El badge de notificaciones del `IconButton` (`notificationDotVariants`) tiene una clase `-z-10`, lo cual hace que quede oculto detrás del botón (problema visual en el carrito).

---

## 📝 Notas para LLMs

- **Siempre verificar el tipo de `icon` antes de sugerir código.** Debe ser `React.ReactNode` (JSX ejecutado).
- **Siempre verificar `tailwind.config.ts` si los estilos no se aplican.** El `content` debe incluir `./src/**/*`.
- **Siempre respetar la separación de responsabilidades:**
  - ¿Es layout de sección? → Organismo.
  - ¿Es espaciado entre partes de un componente compuesto? → Molécula.
  - ¿Es apariencia visual pura? → Átomo.
- **Si un componente necesita dropdowns o comportamientos complejos**, preferir composición en el organismo sobre extender la molécula `Nav`.
- **Si hay un error de tipado en props**, revisar la cadena: ¿el átomo define el tipo? ¿la molécula lo transforma? ¿el organismo lo pasa mal?
