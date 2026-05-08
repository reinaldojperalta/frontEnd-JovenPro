// components/index.ts

// ============================================
// ÁTOMOS
// ============================================

export { Button } from "./atoms/Button";
export type { ButtonProps } from "./atoms/Button";
export { buttonVariants } from "./atoms/Button/Button.variants";
export type { ButtonVariant, ButtonSize } from "./atoms/Button/Button.variants";

export { Badge } from "./atoms/Badge";
export type { BadgeProps } from "./atoms/Badge";
export { badgeVariants, indicatorVariants } from "./atoms/Badge/Badge.variants";
export type { BadgeVariant, BadgeSize, IndicatorColor } from "./atoms/Badge/Badge.variants";

export { Input } from "./atoms/Input";
export type { InputProps } from "./atoms/Input";
export { inputVariants, inputWrapperVariants } from "./atoms/Input/Input.variants";
export type { InputVariant, InputSize, InputState } from "./atoms/Input/Input.variants";

export { IconButton } from "./atoms/IconButton";
export type { IconButtonProps } from "./atoms/IconButton";
export { iconButtonVariants, notificationDotVariants } from "./atoms/IconButton/IconButton.variants";
export type { IconButtonVariant, IconButtonSize, NotificationColor } from "./atoms/IconButton/IconButton.variants";

export { Heading, Text, GradientText } from "./atoms/Typography";
export type { HeadingProps, TextProps, GradientTextProps } from "./atoms/Typography";
export { headingVariants, textVariants } from "./atoms/Typography/Typography.variants";
export type { HeadingLevel, HeadingVariant, TextSize, TextVariant } from "./atoms/Typography/Typography.variants";

export { Price } from "./atoms/Price";
export type { PriceProps } from "./atoms/Price";
export { priceVariants, oldPriceVariants, discountBadgeVariants } from "./atoms/Price/Price.variants";
export type { PriceVariant, PriceSize, DiscountVariant } from "./atoms/Price/Price.variants";

export { Container } from "./atoms/Container";
export type { ContainerProps } from "./atoms/Container";
export { containerVariants } from "./atoms/Container/Container.variants";
export type { ContainerSize, ContainerPadding, ContainerVariant } from "./atoms/Container/Container.variants";

export { SkeletonBlock, SkeletonCircle } from "./atoms/Skeleton";
export type { SkeletonBlockProps, SkeletonCircleProps } from "./atoms/Skeleton";

export { Logo } from "./atoms/Logo";
export type { LogoProps } from "./atoms/Logo";
export { logoVariants } from "./atoms/Logo/Logo.variants";
export type { LogoVariant, LogoSize } from "./atoms/Logo/Logo.variants";

export { Avatar } from "./atoms/Avatar";
export type { AvatarProps } from "./atoms/Avatar";
export { avatarVariants } from "./atoms/Avatar/Avatar.variants";
export type { AvatarSize, AvatarVariant } from "./atoms/Avatar/Avatar.variants";

export { BentoGrid, BentoItem } from "./atoms/BentoGrid";
export type { BentoGridProps, BentoItemProps } from "./atoms/BentoGrid";
export { bentoGridVariants, bentoItemVariants } from "./atoms/BentoGrid/BentoGrid.variants";

// ============================================
// MOLÉCULAS
// ============================================

export { SearchBar } from "./molecules/SearchBar";
export type { SearchBarProps, SearchSuggestion } from "./molecules/SearchBar";
export { searchBarVariants, suggestionsVariants } from "./molecules/SearchBar/SearchBar.variants";

export { Nav } from "./molecules/Nav";
export type { NavProps, NavItem } from "./molecules/Nav";
export { navVariants, navItemVariants } from "./molecules/Nav/Nav.variants";

export { Card } from "./molecules/Card";
export type { CardProps } from "./molecules/Card";
export { cardVariants, cardHeaderVariants, cardFooterVariants } from "./molecules/Card/Card.variants";

export { FormField } from "./molecules/FormField";
export type { FormFieldProps } from "./molecules/FormField";
export { formFieldVariants, labelVariants } from "./molecules/FormField/FormField.variants";

export { CTAGroup } from "./molecules/CTAGroup";
export type { CTAGroupProps, CTAAction } from "./molecules/CTAGroup";
export { ctaGroupVariants } from "./molecules/CTAGroup/CTAGroup.variants";

export { ProductInfo } from "./molecules/ProductInfo";
export type { ProductInfoProps, ProductInfoData } from "./molecules/ProductInfo";
export { productInfoVariants } from "./molecules/ProductInfo/ProductInfo.variants";

// ============================================
// ORGANISMOS
// ============================================

export { Header, useScrollHeader } from "./organisms/Header";
export type { HeaderProps, UseScrollHeaderOptions, UseScrollHeaderReturn } from "./organisms/Header";

export { Hero } from "./organisms/Hero";
export type { HeroProps, HeroCTA, HeroFeaturedItem } from "./organisms/Hero";

export { ProductCard } from "./organisms/ProductCard";
export type { ProductCardProps } from "./organisms/ProductCard";

export { ProductGrid } from "./organisms/ProductGrid";
export type { ProductGridProps } from "./organisms/ProductGrid";

export { ContactSection } from "./organisms/ContactSection";
export type { ContactSectionProps } from "./organisms/ContactSection";

export { Footer } from "./organisms/Footer";
export type { FooterProps, FooterColumn, SocialLink } from "./organisms/Footer";

// ============================================
// SKELETONS (Organismos especiales)
// ============================================

export { ProductSkeleton, HeroSkeleton, PageSkeleton } from "./organisms/Skeleton";
// ============================================
// TEMPLATES
// ============================================

export {
    HomeTemplate,
    MarketplaceTemplate,
    ProductDetailTemplate
} from "./templates";

export type {
    HomeTemplateProps,
    MarketplaceTemplateProps,
    ProductDetailTemplateProps
} from "./templates";