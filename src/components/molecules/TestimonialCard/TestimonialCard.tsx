// components/molecules/TestimonialCard/TestimonialCard.tsx

"use client";

import React from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Text } from "@/components/atoms/Typography";
import { StarRating } from "@/components/atoms/StarRating";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/data";

export interface TestimonialCardProps {
    testimonial: Testimonial;
    className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
    return (
        <article
            className={cn(
                "flex flex-col h-full bg-surface-container rounded-clay shadow-clay p-6 md:p-8",
                className
            )}
        >
            {/* Header: Avatar + Info */}
            <div className="flex items-center gap-4 mb-6">
                <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fallback={testimonial.initials}
                    size="md"
                    variant="solid"
                />
                <div className="min-w-0">
                    <Text as="span" weight="semibold" size="base" className="block truncate">
                        {testimonial.name}
                    </Text>
                    <Text variant="muted" size="sm" className="block truncate">
                        {testimonial.role}
                    </Text>
                </div>
            </div>

            {/* Decorative quote */}
            <span
                className="text-primary/10 text-5xl font-serif leading-none mb-2 select-none"
                aria-hidden="true"
            >
                &ldquo;
            </span>

            {/* Content */}
            <Text variant="body" size="base" className="flex-1 leading-relaxed mb-6">
                {testimonial.content}
            </Text>

            {/* Footer: Rating + Optional Product Image */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-surface-variant/50">
                <StarRating value={testimonial.rating} size="sm" />
                {testimonial.productImage && (
                    <div className="relative w-12 h-12 rounded-clay-sm overflow-hidden shrink-0 bg-surface-variant">
                        <img
                            src={testimonial.productImage}
                            alt="Producto comprado"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
        </article>
    );
}