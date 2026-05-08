# Graph Report - jovenpro-next-appV2  (2026-05-08)

## Corpus Check
- 170 files · ~163,634 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 718 nodes · 1500 edges · 74 communities (44 shown, 30 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 56 edges
2. `HomeTemplate()` - 23 edges
3. `CardSkeleton()` - 15 edges
4. `ProductCard` - 15 edges
5. `Product` - 15 edges
6. `ProductInfo` - 14 edges
7. `productInfoVariants` - 14 edges
8. `🏗️ Arquitectura de Componentes — JovenPro Next.js 14` - 14 edges
9. `05 — REFACTOR RULES` - 14 edges
10. `CardVariant` - 13 edges

## Surprising Connections (you probably didn't know these)
- `TestimonialCardSkeleton()` --calls--> `cn()`  [INFERRED]
  src/components/molecules/TestimonialCard/TestimonialCardSkeleton.tsx → src/lib/utils/cn.ts
- `HomeTemplateV2()` --calls--> `cn()`  [INFERRED]
  src/components/templates/HomeTemplateV2/HomeTemplateV2.tsx → src/lib/utils/cn.ts
- `StatusIndicator()` --calls--> `cn()`  [INFERRED]
  src/components/atoms/Badge/Badge.tsx → src/lib/utils/cn.ts
- `BadgeSkeleton()` --calls--> `cn()`  [INFERRED]
  src/components/atoms/Badge/BadgeSkeleton.tsx → src/lib/utils/cn.ts
- `ButtonSkeleton()` --calls--> `cn()`  [INFERRED]
  src/components/atoms/Button/ButtonSkeleton.tsx → src/lib/utils/cn.ts

## Communities (74 total, 30 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (42): getCategories(), getFeaturedProduct(), getProducts(), Product, DebugPage(), HomeTemplateV2(), HomeTemplateV2Props, categories (+34 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (31): ContactSection, ContactSectionProps, fadeInLeft, fadeInRight, fadeInUp, fadeInLeft, fadeInRight, fadeInUp (+23 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (36): 1. Estado Global (Hooks Funcionales pero sin contexto compartido), 1. Átomos (`components/atoms/`), 2. Moléculas (`components/molecules/`), 2. Rutas y APIs Inexistentes (404), 3. Código Muerto o Incompleto, 3. Organismos (`components/organisms/`), 4. Estilos Inconsistentes, 4. Templates (`components/templates/`) (+28 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (33): 06 — DEBT LOG (Audit Driven), 06 — DEBT LOG (Audit Driven), A. MOCKED TAGS — Texto/valores estáticos que deberían ser dinámicos, A. ÁTOMOS — Clases inline en `.tsx`, B. INLINE HACKS — `style={{}}` y Tailwind arbitrario, B. MOLÉCULAS — Clases inline en `.tsx`, `Badge.tsx`, `BentoCarousel.tsx` (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (25): Badge, BadgeProps, StatusIndicator(), BadgeSize, BadgeVariant, badgeVariants, dotVariants, IndicatorColor (+17 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (20): Button, ButtonProps, buttonIconVariants, buttonLoaderVariants, ButtonSize, ButtonVariant, buttonVariants, ButtonSkeleton() (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (15): Header, HeaderProps, HeaderSkeletonProps, NavItem, NavbarStickyProps, SearchBar, SearchBarProps, SearchSuggestion (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (24): 05 — REFACTOR RULES, Aplicación, code:tsx (// ✅ CORRECTO — Única forma aceptable), code:tsx (// ❌ PROHIBIDO — Clase de styling directo), code:typescript (// ✅ CORRECTO (HomeTemplate.tsx:174)), code:typescript (import { cn } from "@/lib/utils";), code:tsx (<Heading level="h2" className="mb-4">  // ✅ margen desde el ), code:tsx (<section id="inicio">     // HeroSplit) (+16 more)

### Community 8 - "Community 8"
Cohesion: 0.19
Nodes (18): HeaderSkeleton(), Heading, HeadingProps, HeadingSkeleton(), HeadingSkeletonProps, Text, TextProps, TextSkeleton() (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (18): ProductCard, ProductCardProps, productCardArrowVariants, productCardAvatarVariants, productCardContentVariants, productCardCornerIconVariants, productCardDescriptionVariants, productCardLinkVariants (+10 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (13): Footer(), FooterProps, HeroSideSkeleton(), HeroSideSkeletonProps, StarRating(), StarRatingProps, Testimonials(), TestimonialsProps (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.31
Nodes (17): Nav, NavItemComponent(), NavItemComponentProps, NavProps, NavAlign, NavDirection, navIndicatorVariants, NavItemTransform (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.16
Nodes (15): CartItem, useCart(), UseCartReturn, useFavorites(), UseFavoritesReturn, Filter, MarketplaceTemplate(), MarketplaceTemplateProps (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.39
Nodes (15): Card, CardProps, cardContentVariants, CardFooterAlign, cardFooterVariants, cardHeaderVariants, CardMediaAspectRatio, cardMediaVariants (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.4
Nodes (14): FormField, FormFieldProps, FormFieldValidation, fieldContainerVariants, FormFieldLayout, FormFieldSize, FormFieldState, formFieldVariants (+6 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (15): 04 — DATA & LOGIC, 1. Fuente de Datos, 2. Flujo de Datos (Server → Client), 3. Custom Hooks, 4. Mapa de `"use client"` en Componentes, 5. Consumo de useCart / useFavorites, code:block1 (app/page.tsx (Server Component)), Datos exportados (constantes) (+7 more)

### Community 16 - "Community 16"
Cohesion: 0.4
Nodes (12): Container, ContainerProps, ContainerAlign, ContainerMinHeight, ContainerPadding, ContainerPaddingY, ContainerRadius, ContainerSize (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (14): 03 — CVA DICTIONARY, 1. ÁTOMOS, 2. MOLÉCULAS, 3. ESTILOS FUERA DE .variants.ts, Badge (`Badge.variants.ts`), Button (`Button.variants.ts`), Card (`Card.variants.ts`), IconButton (`IconButton.variants.ts`) (+6 more)

### Community 18 - "Community 18"
Cohesion: 0.43
Nodes (10): CTAAction, CTAGroup, CTAGroupProps, CTAGroupAlign, CTAGroupDirection, CTAGroupGap, ctaGroupVariants, CTAGroupVerticalAlign (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.25
Nodes (7): VideoItem, VideoCard(), VideoCardProps, VideosSection(), VideosSectionProps, VideosSectionSkeleton(), VideosSectionSkeletonProps

### Community 20 - "Community 20"
Cohesion: 0.41
Nodes (10): Input, InputProps, getIconPadding(), InputSize, InputState, InputVariant, inputVariants, inputWrapperVariants (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.32
Nodes (10): BentoCarousel(), BentoCarouselProps, BENTO_DIRECTIONS, BENTO_SLOTS, BENTO_SPRING, BentoDirectionAnimations, bentoPlaceholderVariants, BentoSlotConfig (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (4): ProductSkeleton(), ProductSkeletonProps, VideoCardSkeleton(), VideoCardSkeletonProps

### Community 23 - "Community 23"
Cohesion: 0.15
Nodes (12): 02 — COMPONENT REGISTRY, 1. Jerarquía de Directorios, 2. Molécula → Átomos, 3. Organismo → Moléculas → Átomos, 4. Template → Organismos, 5. Anomalías, code:block1 (src/components/), code:block2 (HomeTemplateV2) (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.45
Nodes (9): BentoGrid, BentoGridProps, BentoItem, BentoItemProps, BentoGridCols, bentoGridVariants, BentoItemRatio, BentoItemSpan (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.36
Nodes (8): Avatar, AvatarProps, avatarFallbackVariants, avatarImageVariants, AvatarSize, AvatarVariant, avatarVariants, useImageFallback()

### Community 26 - "Community 26"
Cohesion: 0.42
Nodes (7): Logo, LogoProps, LogoSize, LogoVariant, logoVariants, LogoSkeleton(), LogoSkeletonProps

### Community 27 - "Community 27"
Cohesion: 0.2
Nodes (9): 01 — SYMBOL MAP, 1. CSS Custom Properties (`:root`), 2. Paleta de Colores (Tailwind Extend), 3. Custom Border Radius (`rounded-clay`), 4. Custom Shadows (`shadow-clay`), 5. Aspect Ratios Bento, 6. Animaciones y Transiciones, 7. Clases Custom en `globals.css` (`@layer components`) (+1 more)

### Community 28 - "Community 28"
Cohesion: 0.52
Nodes (5): SkeletonCard(), SkeletonCardProps, SkeletonText(), SkeletonTextProps, widthMap

### Community 29 - "Community 29"
Cohesion: 0.38
Nodes (4): StarRatingSkeleton(), StarRatingSkeletonProps, TestimonialsSkeleton(), TestimonialsSkeletonProps

### Community 30 - "Community 30"
Cohesion: 0.43
Nodes (6): HeroSide(), HeroSideProps, HeroSplit(), HeroSplitProps, HeroSplitSide, HeroSplitSide

### Community 31 - "Community 31"
Cohesion: 0.43
Nodes (5): PaginationDots, PaginationDotsProps, paginationDotsContainerVariants, PaginationDotsSize, paginationDotVariants

### Community 32 - "Community 32"
Cohesion: 0.7
Nodes (4): useIsDesktop(), useIsMobile(), useIsTablet(), useMediaQuery()

### Community 36 - "Community 36"
Cohesion: 0.83
Nodes (3): SkeletonBlock, SkeletonBlockProps, skeletonBlockVariants

### Community 37 - "Community 37"
Cohesion: 0.83
Nodes (3): SkeletonCircle, SkeletonCircleProps, skeletonCircleVariants

## Knowledge Gaps
- **218 isolated node(s):** `nextConfig`, `config`, `montserrat`, `metadata`, `AvatarProps` (+213 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 10` to `Community 0`, `Community 1`, `Community 4`, `Community 5`, `Community 6`, `Community 8`, `Community 9`, `Community 11`, `Community 12`, `Community 13`, `Community 14`, `Community 16`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 26`, `Community 29`, `Community 30`, `Community 34`, `Community 35`, `Community 38`, `Community 39`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `HomeTemplate()` connect `Community 0` to `Community 1`, `Community 6`, `Community 10`, `Community 12`, `Community 19`, `Community 29`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `Product` connect `Community 0` to `Community 9`, `Community 12`, `Community 21`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 55 inferred relationships involving `cn()` (e.g. with `StatusIndicator()` and `BadgeSkeleton()`) actually correct?**
  _`cn()` has 55 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `HomeTemplate()` (e.g. with `useCart()` and `useFavorites()`) actually correct?**
  _`HomeTemplate()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `nextConfig`, `config`, `montserrat` to the rest of the system?**
  _218 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._