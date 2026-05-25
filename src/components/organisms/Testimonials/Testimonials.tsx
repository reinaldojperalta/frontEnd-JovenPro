"use client";

import React, { useState } from "react";
import { m, AnimatePresence, LazyMotion } from "framer-motion";
import domAnimation from "@/lib/framer-features";
import { Container } from "@/components/atoms/Container";
import { Heading, Text } from "@/components/atoms/Typography";
import { IconButton } from "@/components/atoms/IconButton";
import { Avatar } from "@/components/atoms/Avatar";
import { StarRating } from "@/components/atoms/StarRating";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/lib/data";
import { Section } from "@/components/atoms/Section";
import {
    testimonialsGridVariants,
    testimonialsHeaderVariants,
    testimonialsOverlineVariants,
    testimonialsCardWrapperVariants,
    testimonialsCardVariants,
    testimonialsQuoteVariants,
    testimonialsFooterVariants,
    testimonialsAuthorVariants,
    testimonialsAuthorInfoVariants,
    testimonialsNameVariants,
    testimonialsRoleVariants,
    testimonialsProductVariants,
    testimonialsProductImageVariants,
    testimonialsControlsVariants,
    testimonialsDotsWrapperVariants,
    testimonialsDotVariants,
    testimonialsArrowsWrapperVariants,
} from "./Testimonials.variants";

/* ============================================================
 * Testimonials — Refactor V3 | Zero Inline Policy
 * ============================================================
 * • Avatar átomo reemplaza <img> inline del autor
 * • StarRating átomo reemplaza estrellas inline
 * • shadow-soft → shadow-clay
 * • "Community" hardcodeado → prop overline (default "Comunidad")
 * • Dots inline → testimonialsDotVariants
 * • TODO: goNext/goPrev pueden extraerse a hook useSlider en próxima iteración
 * ============================================================ */

export interface TestimonialsProps {
    testimonials: Testimonial[];
    title?: string;
    subtitle?: string;
    overline?: string;
    className?: string;
}

export function Testimonials({
    testimonials,
    title = "Voces de la Comunidad",
    subtitle = "Descubre cómo JovenPro está transformando la vida de creadores alrededor del mundo.",
    overline = "Comunidad",
    className,
}: TestimonialsProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const goNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const goPrev = () => {
        setActiveIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    const active = testimonials[activeIndex];

    return (
        <Section id="testimonios" spacing="lg" background="background" className={className}>
            <Container size="lg" padding="md">
                <div className={testimonialsGridVariants()}>
                    {/* Header */}
                    <div className={testimonialsHeaderVariants()}>
                        <Text
                            variant="overline"
                            size="xs"
                            className={testimonialsOverlineVariants()}
                        >
                            {overline}
                        </Text>
                        <Heading level="h2" className="mb-4">
                            {title}
                        </Heading>
                        <Text variant="lead" size="base">
                            {subtitle}
                        </Text>
                    </div>

                    {/* Card */}
                    <div className={testimonialsCardWrapperVariants()}>
                        <LazyMotion features={domAnimation} strict>
                            <AnimatePresence mode="wait">
                                <m.div
                                    key={active.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                    className={testimonialsCardVariants()}
                                >
                                    <p className={testimonialsQuoteVariants()}>
                                        &ldquo;{active.text}&rdquo;
                                    </p>

                                    <div className={testimonialsFooterVariants()}>
                                        <div className={testimonialsAuthorVariants()}>
                                            <Avatar
                                                src={active.avatar}
                                                alt={active.name}
                                                size="lg"
                                            />
                                            <div className={testimonialsAuthorInfoVariants()}>
                                                <p className={testimonialsNameVariants()}>
                                                    {active.name}
                                                </p>
                                                <p className={testimonialsRoleVariants()}>
                                                    {active.role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={testimonialsProductVariants()}>
                                            {active.productImage && (
                                                <img
                                                    src={active.productImage}
                                                    alt="Producto"
                                                    className={testimonialsProductImageVariants()}
                                                />
                                            )}
                                            <StarRating
                                                value={active.rating}
                                                size="sm"
                                            />
                                        </div>
                                    </div>
                                </m.div>
                            </AnimatePresence>
                        </LazyMotion>

                        {/* Controles */}
                        <div className={testimonialsControlsVariants()}>
                            <div className={testimonialsDotsWrapperVariants()}>
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={cn(
                                            testimonialsDotVariants({
                                                state:
                                                    i === activeIndex ? "active" : "inactive",
                                            })
                                        )}
                                        aria-label={`Testimonio ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <div className={testimonialsArrowsWrapperVariants()}>
                                <IconButton
                                    icon={<ArrowLeft className="w-5 h-5" />}
                                    variant="outline"
                                    size="md"
                                    onClick={goPrev}
                                    aria-label="Anterior"
                                />
                                <IconButton
                                    icon={<ArrowRight className="w-5 h-5" />}
                                    variant="default"
                                    size="md"
                                    onClick={goNext}
                                    aria-label="Siguiente"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}