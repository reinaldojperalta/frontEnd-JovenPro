// ============================================================================
// CARD — Molécula de contenedor de contenido
// ============================================================================
// REFACTOR V3:
// - Zero inline classes:
//   • "group flex flex-col" → cardVariants base
//   • "relative w-full" → cardMediaVariants base
//   • overflow-hidden + radius top condicional → cardMediaTopWrapperVariants
//   • "absolute inset-0 -z-10" → cardMediaBackgroundWrapperVariants
//   • "object-cover transition-transform..." → cardMediaImageVariants
//   • "absolute inset-0 flex items-end p-6" → cardMediaOverlayVariants
//   • gradiente de fondo → cardMediaGradientVariants
//   • "flex-1" redundante eliminado de content (ya está en cardContentVariants base)
// - Eliminado condicional mediaPosition === "background" && "relative"
//   (cardVariants ya incluye "relative" en el base).
// - Tipos importados desde .variants.ts (derivados del CVA).
// ============================================================================

import React, { forwardRef } from "react";
import Image from "next/image";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import {
    cardVariants,
    cardHeaderVariants,
    cardContentVariants,
    cardFooterVariants,
    cardMediaVariants,
    cardMediaTopWrapperVariants,
    cardMediaBackgroundWrapperVariants,
    cardMediaImageVariants,
    cardMediaOverlayVariants,
    cardMediaGradientVariants,
    type CardVariant,
    type CardRadius,
    type CardPadding,
    type CardWidth,
    type CardMediaAspectRatio,
    type CardFooterAlign,
} from "./Card.variants";
import { cn } from "@/lib/utils";

export interface CardProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
    variant?: CardVariant;
    radius?: CardRadius;
    padding?: CardPadding;
    width?: CardWidth;
    interactive?: boolean;
    isLoading?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    media?: {
        src: string;
        alt: string;
        aspectRatio?: CardMediaAspectRatio;
        fill?: boolean;
        priority?: boolean;
        overlay?: React.ReactNode;
    };
    mediaPosition?: "top" | "background";
    headerPadding?: CardPadding;
    contentPadding?: CardPadding;
    footerPadding?: CardPadding;
    headerBorder?: boolean;
    footerBorder?: boolean;
    footerAlign?: CardFooterAlign;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = "surface",
            radius = "clay",
            padding = "md",
            width = "full",
            interactive = true,
            isLoading = false,
            header,
            footer,
            media,
            mediaPosition = "top",
            headerPadding,
            contentPadding,
            footerPadding,
            headerBorder = false,
            footerBorder = false,
            footerAlign = "between",
            className,
            children,
            ...props
        },
        ref
    ) => {
        const effectiveHeaderPadding = headerPadding ?? padding;
        const effectiveContentPadding = contentPadding ?? (media ? "none" : padding);
        const effectiveFooterPadding = footerPadding ?? padding;
        const isLocalImage = media?.src.startsWith("/");

        const renderMedia = () => {
            if (!media) return null;

            const mediaContent = (
                <div
                    className={cn(
                        cardMediaVariants({
                            aspectRatio: media.aspectRatio || "square",
                            radius: mediaPosition === "background" ? radius : "none",
                        })
                    )}
                >
                    {isLoading ? (
                        <SkeletonBlock className="absolute inset-0" radius="none" />
                    ) : (
                        <Image
                            src={media.src}
                            alt={media.alt}
                            fill={media.fill !== false}
                            priority={media.priority}
                            className={cn(cardMediaImageVariants())}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized={isLocalImage}
                        />
                    )}

                    {media.overlay && (
                        <div className={cn(cardMediaOverlayVariants())}>
                            {media.overlay}
                        </div>
                    )}
                </div>
            );

            if (mediaPosition === "top") {
                return (
                    <div className={cn(cardMediaTopWrapperVariants({ radius }))}>
                        {mediaContent}
                    </div>
                );
            }

            return (
                <div className={cn(cardMediaBackgroundWrapperVariants())}>
                    {mediaContent}
                    <div className={cn(cardMediaGradientVariants())} />
                </div>
            );
        };

        return (
            <article
                ref={ref}
                className={cn(
                    cardVariants({
                        variant,
                        radius,
                        padding,
                        width,
                        interactive,
                        isLoading,
                    }),
                    className
                )}
                {...props}
            >
                {media && mediaPosition === "top" && renderMedia()}
                {media && mediaPosition === "background" && renderMedia()}

                {header && (
                    <header
                        className={cn(
                            cardHeaderVariants({
                                padding: effectiveHeaderPadding,
                                border: headerBorder,
                            })
                        )}
                    >
                        {header}
                    </header>
                )}

                <div
                    className={cn(
                        cardContentVariants({ padding: effectiveContentPadding })
                    )}
                >
                    {children}
                </div>

                {footer && (
                    <footer
                        className={cn(
                            cardFooterVariants({
                                padding: effectiveFooterPadding,
                                border: footerBorder,
                                align: footerAlign,
                            })
                        )}
                    >
                        {footer}
                    </footer>
                )}
            </article>
        );
    }
);

Card.displayName = "Card";

export { Card };