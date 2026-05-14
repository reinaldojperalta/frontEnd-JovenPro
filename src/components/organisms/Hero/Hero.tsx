// components/organisms/Hero/Hero.tsx

"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Heading, Text, GradientText } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import { CTAGroup, type CTAAction } from "@/components/molecules/CTAGroup";
import { Card } from "@/components/molecules/Card";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// TIPOS DE DATOS
// ============================================

export interface HeroCTA {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    priority?: "primary" | "secondary";
}

export interface HeroFeaturedItem {
    image: string;
    title: string;
    subtitle?: string;
    author?: string;
    href?: string;
}

export interface HeroProps {
    /** Badge superior (opcional) */
    badge?: {
        text: string;
        indicator?: boolean;
    };

    /** Título principal (parte antes del gradiente) */
    title: string;

    /** Título con gradiente (parte destacada) */
    gradientTitle?: string;

    /** Descripción */
    description: string;

    /** Acciones CTA */
    primaryAction: HeroCTA;
    secondaryAction?: HeroCTA;

    /** Item destacado (imagen lateral) */
    featuredItem?: HeroFeaturedItem;

    /** Variante de layout */
    variant?: "split" | "centered" | "full";

    /** Altura mínima */
    minHeight?: string;

    /** Clases adicionales */
    className?: string;
}

// ============================================
// ANIMACIONES
// ============================================

const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
};

const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
};

const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1, ease: "easeOut", delay: 0.2 },
};

// ============================================
// COMPONENTE HERO
// ============================================

const Hero = forwardRef<HTMLElement, HeroProps>(
    (
        {
            badge,
            title,
            gradientTitle,
            description,
            primaryAction,
            secondaryAction,
            featuredItem,
            variant = "split",
            minHeight = "95vh",
            className,
        },
        ref
    ) => {
        // ✅ CORREGIDO: Usar iconos del padre o defaults como JSX
        const primaryCTA: CTAAction = {
            label: primaryAction.label,
            onClick: primaryAction.onClick,
            href: primaryAction.href,
            priority: "primary",
            // Si el padre no envió icono, usar default como JSX ejecutado
            icon: primaryAction.icon ?? <ArrowRight className="w-5 h-5" />,
        };

        const secondaryCTA: CTAAction | undefined = secondaryAction ? {
            label: secondaryAction.label,
            onClick: secondaryAction.onClick,
            href: secondaryAction.href,
            priority: "secondary",
            icon: secondaryAction.icon ?? <Play className="w-5 h-5" />,
        } : undefined;

        // Layout: split (2 columnas) o centered (1 columna)
        const isSplit = variant === "split" && featuredItem;
        const isCentered = variant === "centered";
        const isFull = variant === "full";

        return (
            <section
                ref={ref}
                className={cn(
                    "relative flex items-center overflow-hidden bg-background",
                    className
                )}
                style={{ minHeight }}
            >
                <Container
                    size="lg"
                    padding="lg"
                    paddingY="2xl"
                    className={cn(
                        "relative z-10 w-full",
                        isSplit && "flex flex-col lg:flex-row items-center gap-8 lg:gap-16",
                        isCentered && "flex flex-col items-center text-center",
                        isFull && "flex flex-col justify-end h-full pb-20"
                    )}
                >
                    {/* Contenido textual */}
                    <motion.div
                        {...(isCentered ? fadeInUp : fadeInLeft)}
                        className={cn(
                            "space-y-8",
                            isSplit && "lg:w-1/2 text-left",
                            isCentered && "max-w-3xl",
                            isFull && "max-w-4xl"
                        )}
                    >
                        {/* Badge */}
                        {badge && (
                            <Badge
                                variant="default"
                                size="md"
                                indicator={badge.indicator}
                                indicatorColor="primary"
                                className="shadow-clay-sm rounded-clay px-6 py-2 w-fit"
                            >
                                {badge.text}
                            </Badge>
                        )}

                        {/* Título */}
                        <Heading
                            level={isFull ? "h1" : "h1"}
                            className={cn(
                                "leading-[0.9]",
                                isCentered && "mx-auto"
                            )}
                        >
                            {title}
                            {gradientTitle && (
                                <>
                                    <br />
                                    <GradientText
                                        from="primary-dim"
                                        to="primary"
                                        className="italic text-[0.8em] leading-tight block"
                                    >
                                        {gradientTitle}
                                    </GradientText>
                                </>
                            )}
                        </Heading>

                        {/* Descripción */}
                        <Text
                            variant="lead"
                            className={cn(
                                "max-w-lg",
                                isCentered && "mx-auto"
                            )}
                        >
                            {description}
                        </Text>

                        {/* CTAs */}
                        <CTAGroup
                            primaryAction={primaryCTA}
                            secondaryAction={secondaryCTA}
                            responsive={true}
                            fullWidthMobile={true}
                            align={isCentered ? "center" : "start"}
                            gap="sm"
                            className="pt-4"
                        />
                    </motion.div>

                    {/* Imagen destacada (solo en split) */}
                    {isSplit && featuredItem && (
                        <motion.div
                            {...scaleIn}
                            className="lg:w-1/2 w-full relative"
                        >
                            <Card
                                variant="ghost"
                                radius="clay"
                                padding="none"
                                interactive={false}
                                className="min-h-[300px] sm:min-h-[500px] border-4 md:border-8 border-surface-container overflow-hidden"
                                media={{
                                    src: featuredItem.image,
                                    alt: featuredItem.title,
                                    aspectRatio: "square",
                                    overlay: (
                                        <div className="p-6 bg-surface-container/95 rounded-clay shadow-clay-sm m-6">
                                            {featuredItem.subtitle && (
                                                <Text variant="overline" className="mb-1">
                                                    {featuredItem.subtitle}
                                                </Text>
                                            )}
                                            <Heading level="h3">{featuredItem.title}</Heading>
                                            {featuredItem.author && (
                                                <Text variant="caption" className="mt-2">
                                                    Por: {featuredItem.author}
                                                </Text>
                                            )}
                                        </div>
                                    ),
                                }}
                            />
                        </motion.div>
                    )}
                </Container>

                {/* Background decorativo opcional */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>
            </section>
        );
    }
);

Hero.displayName = "Hero";

export { Hero };