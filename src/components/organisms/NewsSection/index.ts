// components/organisms/NewsSection/index.ts

// ============================================================================
// NEWS SECTION — Barrel export
// ============================================================================

export { NewsSection } from "./NewsSection";
export type { NewsSectionProps } from "./NewsSection";

export {
    newsSectionVariants,
    newsSectionHeaderVariants,
    newsSectionTitleVariants,
    newsSectionSubtitleVariants,
    newsSectionGridVariants,
    newsSectionSlotVariants,
    newsSectionPaginationVariants,
    newsSectionMobileScrollVariants,
    newsSectionMobileItemVariants,
    newsSectionMobileCardVariants,
    newsSectionMobileMediaVariants,
    newsSectionMobileContentVariants,
    NEWS_SPRING,
    NEWS_DIRECTIONS,
    NEWS_SLOTS,
    type NewsSlotConfig,
    type NewsSlotVariant,
} from "./NewsSection.variants";

export { NewsSectionSkeleton } from "./NewsSectionSkeleton";
export type { NewsSectionSkeletonProps } from "./NewsSectionSkeleton";