// ============================================================================
// TYPOGRAPHY SYSTEM — Barrel export
// ============================================================================

// Componentes
export { Heading } from "./Heading";
export { Text } from "./Text";
export { GradientText } from "./GradientText";
export { HeadingSkeleton } from "./HeadingSkeleton";
export { TextSkeleton } from "./TextSkeleton";
export { GradientTextSkeleton } from "./GradientTextSkeleton";

// Tipos de Props
export type { HeadingProps } from "./Heading";
export type { TextProps } from "./Text";
export type { GradientTextProps } from "./GradientText";
export type { HeadingSkeletonProps } from "./HeadingSkeleton";
export type { TextSkeletonProps } from "./TextSkeleton";
export type { GradientTextSkeletonProps } from "./GradientTextSkeleton";

// Variantes y tipos de diseño (para uso avanzado)
export {
    headingVariants,
    textVariants,
    gradientTextVariants,
} from "./Typography.variants";

export type {
    HeadingLevel,
    HeadingVariant,
    HeadingTracking,
    HeadingTransform,
    TextSize,
    TextVariant,
    TextWeight as FontWeight,
    TextAlign,
    TextTransform,
    TextLineClamp as LineClamp,
    GradientTextDirection,
    GradientTextFrom,
    GradientTextTo,
} from "./Typography.variants";
