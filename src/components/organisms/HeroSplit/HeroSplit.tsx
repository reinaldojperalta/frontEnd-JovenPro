"use client";

import React from "react";
import { m, LazyMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import domAnimation from "@/lib/framer-features";
import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";
import { Section } from "@/components/atoms/Section";
import {
    heroSplitDividerVariants,
    heroSplitLogoWrapperVariants,
    heroSplitLogoContainerVariants,
    heroSplitLogoImageVariants,
    heroSplitSideVariants,
    heroSplitImageContainerVariants,
    heroSplitImageVariants,
    heroSplitGradientOverlayVariants,
    heroSplitDarkOverlayVariants,
    heroSplitContentVariants,
    heroSplitTitleVariants,
    heroSplitSubtitleVariants,
    heroSplitCTAVariants,
    heroSplitArrowVariants,
} from "./HeroSplit.variants";

/* ============================================================
 * HeroSplit.tsx  —  Refactor V5 | Zero Inline Policy + next/image
 * ============================================================
 * • Todas las clases Tailwind migradas a HeroSplit.variants.ts
 * • Lógica de navegación expuesta vía prop onNavigate
 * • next/image con priority para LCP crítico
 * • SVG inline reemplazado por lucide-react ArrowRight
 * ============================================================ */

export interface HeroSplitSide {
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    image: string;
}

export interface HeroSplitProps {
    left: HeroSplitSide;
    right: HeroSplitSide;
    logoSrc?: string;
    className?: string;
    onNavigate?: (href: string) => void;
}

export function HeroSplit({
    left,
    right,
    logoSrc,
    className,
    onNavigate,
}: HeroSplitProps) {
    const defaultNavigate = (href: string) => {
        if (onNavigate) onNavigate(href);
        else {
            if (href.startsWith("#")) {
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            } else {
                window.open(href, "_blank");
            }
        }
    };

    return (
        <Section id="inicio" spacing="hero" className={className}>
            <HeroSide
                data={left}
                position="left"
                onClick={() => defaultNavigate(left.href)}
            />

            <div className={heroSplitDividerVariants()} />

            <HeroSide
                data={right}
                position="right"
                onClick={() => defaultNavigate(right.href)}
            />

            {/* Logo Centrado Flotante con Glass Effect */}
            <LazyMotion features={domAnimation} strict>
                <div className={heroSplitLogoWrapperVariants()}>
                    <m.div
                        className={heroSplitLogoContainerVariants()}
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.8,
                            ease: [0.23, 1, 0.32, 1],
                        }}
                    >
                        {logoSrc ? (
                            <Image
                                src={logoSrc}
                                alt="JovenPro"
                                fill
                                priority
                                sizes="200px"
                                className={heroSplitLogoImageVariants()}
                            />
                        ) : (
                            <Logo
                                variant="default"
                                size="lg"
                                className="h-20 md:h-28 w-auto"
                            />
                        )}
                    </m.div>
                </div>
            </LazyMotion>
        </Section>
    );
}

/* ------------------------------------------------------------------ */

interface HeroSideProps {
    data: HeroSplitSide;
    position: "left" | "right";
    onClick: () => void;
}

function HeroSide({ data, position, onClick }: HeroSideProps) {
    const isLeft = position === "left";

    return (
        <LazyMotion features={domAnimation} strict>
            <m.div
                className={heroSplitSideVariants()}
                onClick={onClick}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.25, 1, 0.5, 1],
                    delay: isLeft ? 0.2 : 0.4,
                }}
            >
                <div className={heroSplitImageContainerVariants()}>
                    <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        priority
                        sizes="50vw"
                        className={heroSplitImageVariants()}
                    />
                    <div
                        className={heroSplitGradientOverlayVariants({
                            direction: isLeft ? "left" : "right",
                        })}
                    />
                    <div className={heroSplitDarkOverlayVariants()} />
                </div>

                <div
                    className={heroSplitContentVariants({
                        align: isLeft ? "left" : "right",
                    })}
                >
                    <m.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: isLeft ? 0.5 : 0.7,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                        className={heroSplitTitleVariants()}
                    >
                        {data.title}
                    </m.h2>

                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: isLeft ? 0.7 : 0.9,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                        className={heroSplitSubtitleVariants({
                            align: isLeft ? "left" : "right",
                        })}
                    >
                        {data.subtitle}
                    </m.p>

                    <m.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: isLeft ? 0.9 : 1.1,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                        className={heroSplitCTAVariants()}
                    >
                        {data.cta}
                        <ArrowRight className={heroSplitArrowVariants({ direction: isLeft ? "left" : "right" })} />
                    </m.span>
                </div>
            </m.div>
        </LazyMotion>
    );
}