// ============================================================================
// TESTIMONIAL CARD — Molécula de tarjeta de testimonio
// ============================================================================
// REFACTOR V3:
// - Archivo .variants.ts creado (no existía).
// - Zero inline classes:
//   • Wrapper article → testimonialCardVariants
//   • Header flex → testimonialCardHeaderVariants
//   • Info container → testimonialCardInfoVariants
//   • "block truncate" (nombre/rol) → testimonialCardNameVariants / RoleVariants
//   • Comilla decorativa → testimonialCardQuoteVariants
//   • "flex-1 leading-relaxed mb-6" → testimonialCardContentVariants
//   • Footer flex → testimonialCardFooterVariants
//   • Product image container → testimonialCardProductImageVariants
//   • Product img → testimonialCardProductImgVariants
// - BUG CORREGIDO: testimonial.content → testimonial.text. El tipo Testimonial
//   en data.ts define el campo como "text", no "content".
// - Consumo de átomos validado:
//   • Avatar: src, alt, fallback, size, variant via props. Correcto.
//   • Text: as, weight, size, variant, lineClamp via props. Correcto.
//   • StarRating: value, size via props. Correcto.
// ============================================================================

"use client";

import React from "react";
import Image from "next/image";
import { Avatar } from "@/components/atoms/Avatar";
import { Text } from "@/components/atoms/Typography";
import { StarRating } from "@/components/atoms/StarRating";
import {
    testimonialCardVariants,
    testimonialCardHeaderVariants,
    testimonialCardInfoVariants,
    testimonialCardNameVariants,
    testimonialCardRoleVariants,
    testimonialCardQuoteVariants,
    testimonialCardContentVariants,
    testimonialCardFooterVariants,
    testimonialCardProductImageVariants,
    testimonialCardProductImgVariants,
    type TestimonialCardSize,
} from "./TestimonialCard.variants";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/data";

export interface TestimonialCardProps {
    testimonial: Testimonial;
    size?: TestimonialCardSize;
    className?: string;
}

export function TestimonialCard({
    testimonial,
    size = "default",
    className,
}: TestimonialCardProps) {
    return (
        <article
            className={cn(
                testimonialCardVariants({ size }),
                className
            )}
        >
            {/* Header: Avatar + Info */}
            <div className={cn(testimonialCardHeaderVariants())}>
                <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fallback={testimonial.initials}
                    size="md"
                    variant="solid"
                />
                <div className={cn(testimonialCardInfoVariants())}>
                    <Text
                        as="span"
                        weight="semibold"
                        size="base"
                        className={cn(testimonialCardNameVariants())}
                    >
                        {testimonial.name}
                    </Text>
                    <Text
                        variant="muted"
                        size="sm"
                        className={cn(testimonialCardRoleVariants())}
                    >
                        {testimonial.role}
                    </Text>
                </div>
            </div>

            {/* Decorative quote */}
            <span
                className={cn(testimonialCardQuoteVariants())}
                aria-hidden="true"
            >
                &ldquo;
            </span>

            {/* Content */}
            <Text
                variant="body"
                size="base"
                className={cn(testimonialCardContentVariants())}
            >
                {testimonial.text}
            </Text>

            {/* Footer: Rating + Optional Product Image */}
            <div className={cn(testimonialCardFooterVariants())}>
                <StarRating value={testimonial.rating} size="sm" />
                {testimonial.productImage && (
                    <div className={cn(testimonialCardProductImageVariants())}>
                        <Image
                            src={testimonial.productImage}
                            alt="Producto comprado"
                            fill
                            className={cn(testimonialCardProductImgVariants())}
                        />
                    </div>
                )}
            </div>
        </article>
    );
}