// components/molecules/Card/Card.tsx

import React, { forwardRef } from "react";
import Image from "next/image";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import {
    cardVariants,
    cardHeaderVariants,
    cardContentVariants,
    cardFooterVariants,
    cardMediaVariants,
    type CardVariant,
    type CardRadius,
    type CardPadding,
    type CardWidth,
    type CardMediaAspectRatio,
    type CardFooterAlign
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

        // Detectar si es ruta local (empieza con /) o externa
        const isLocalImage = media?.src.startsWith("/");

        const renderMedia = () => {
            if (!media) return null;

            const mediaContent = (
                <div className={cn(
                    cardMediaVariants({
                        aspectRatio: media.aspectRatio || "square",
                        radius: mediaPosition === "background" ? radius : "none"
                    }),
                    "relative w-full"
                )}>
                    {isLoading ? (
                        <SkeletonBlock className="absolute inset-0" radius="none" />
                    ) : (
                        <Image
                            src={media.src}
                            alt={media.alt}
                            fill={media.fill !== false}
                            priority={media.priority}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            // Rutas locales no necesitan unconfigured host
                            unoptimized={isLocalImage}
                        />
                    )}

                    {media.overlay && (
                        <div className="absolute inset-0 flex items-end p-6">
                            {media.overlay}
                        </div>
                    )}
                </div>
            );

            if (mediaPosition === "top") {
                return (
                    <div className={cn(
                        "overflow-hidden",
                        radius === "clay" && "rounded-t-clay",
                        radius === "lg" && "rounded-t-2xl",
                        radius === "md" && "rounded-t-xl",
                    )}>
                        {mediaContent}
                    </div>
                );
            }

            return (
                <div className="absolute inset-0 -z-10">
                    {mediaContent}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
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
                        isLoading
                    }),
                    mediaPosition === "background" && "relative",
                    "group flex flex-col",
                    className
                )}
                {...props}
            >
                {media && mediaPosition === "top" && renderMedia()}
                {media && mediaPosition === "background" && renderMedia()}

                {header && (
                    <header className={cn(
                        cardHeaderVariants({
                            padding: effectiveHeaderPadding,
                            border: headerBorder
                        })
                    )}>
                        {header}
                    </header>
                )}

                <div className={cn(
                    cardContentVariants({ padding: effectiveContentPadding }),
                    "flex-1"
                )}>
                    {children}
                </div>

                {footer && (
                    <footer className={cn(
                        cardFooterVariants({
                            padding: effectiveFooterPadding,
                            border: footerBorder,
                            align: footerAlign
                        })
                    )}>
                        {footer}
                    </footer>
                )}
            </article>
        );
    }
);

Card.displayName = "Card";

export { Card };