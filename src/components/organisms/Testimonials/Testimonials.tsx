"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Heading, Text } from "@/components/atoms/Typography";
import { IconButton } from "@/components/atoms/IconButton";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import type { Testimonial } from "@/lib/data";

export interface TestimonialsProps {
    testimonials: Testimonial[];
    title?: string;
    subtitle?: string;
    className?: string;
}

export function Testimonials({
    testimonials,
    title = "Voces de la Comunidad",
    subtitle = "Descubre cómo JovenPro está transformando la vida de creadores alrededor del mundo.",
    className,
}: TestimonialsProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const goNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const goPrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const active = testimonials[activeIndex];

    return (
        <section id="testimonios" className={cn("py-20 md:py-28 bg-surface-container-low/30", className)}>
            <Container size="lg" padding="md">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                    <div className="md:col-span-4">
                        <span className="font-body text-xs font-semibold tracking-widest text-secondary uppercase mb-2 block">
                            Community
                        </span>
                        <Heading level="h2" className="mb-4">
                            {title}
                        </Heading>
                        <Text variant="lead" size="base">
                            {subtitle}
                        </Text>
                    </div>

                    <div className="md:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                className="bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-border/20 relative min-h-[280px] flex flex-col justify-between"
                            >
                                <p className="font-body text-lg italic text-foreground leading-relaxed mb-8">
                                    "{active.text}"
                                </p>

                                <div className="flex items-center justify-between mt-8">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={active.avatar}
                                            alt={active.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-headline text-sm font-bold text-primary">
                                                {active.name}
                                            </p>
                                            <p className="font-body text-xs text-foreground/60 uppercase tracking-wider">
                                                {active.role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {active.productImage && (
                                            <img
                                                src={active.productImage}
                                                alt="Producto"
                                                className="w-12 h-12 rounded-lg object-cover hidden sm:block"
                                            />
                                        )}
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "w-4 h-4",
                                                        i < active.rating
                                                            ? "fill-primary text-primary"
                                                            : "fill-border text-border"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex items-center justify-between mt-6">
                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-300",
                                            i === activeIndex ? "bg-primary w-6" : "bg-surface-variant w-2 hover:bg-border"
                                        )}
                                        aria-label={`Testimonio ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-2">
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
        </section>
    );
}