// components/atoms/Typography/index.ts

// Componentes
export { Heading } from "./Heading";
export { Text } from "./Text";
export { GradientText } from "./GradientText";

// Tipos
export type { HeadingProps } from "./Heading";
export type { TextProps } from "./Text";
export type { GradientTextProps } from "./GradientText";

// Variantes (para uso avanzado)
export { headingVariants, textVariants } from "./Typography.variants";
export type {
    HeadingLevel,
    HeadingVariant,
    TextSize,
    TextVariant,
    FontWeight,
    TextAlign,
    LineClamp,
} from "./Typography.variants";

export { HeadingSkeleton } from "./HeadingSkeleton";
export type { HeadingSkeletonProps } from "./HeadingSkeleton";
export { TextSkeleton } from "./TextSkeleton";
export type { TextSkeletonProps } from "./TextSkeleton";
export { GradientTextSkeleton } from "./GradientTextSkeleton";
export type { GradientTextSkeletonProps } from "./GradientTextSkeleton";
