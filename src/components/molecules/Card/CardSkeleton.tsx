// components/molecules/Card/CardSkeleton.tsx

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
    type CardFooterAlign,
} from "./Card.variants";
import { cn } from "@/lib/utils";

export interface CardSkeletonProps {
    variant?: CardVariant;
    radius?: CardRadius;
    padding?: CardPadding;
    width?: CardWidth;
    hasMedia?: boolean;
    mediaAspectRatio?: CardMediaAspectRatio;
    mediaPosition?: "top" | "background";
    headerLines?: number;
    contentLines?: number;
    hasFooter?: boolean;
    footerAlign?: CardFooterAlign;
    className?: string;
    children?: React.ReactNode;
    minHeight?: string | number;
}

export function CardSkeleton({
    variant = "surface",
    radius = "clay",
    padding = "md",
    width = "full",
    hasMedia = true,
    mediaAspectRatio = "square",
    mediaPosition = "top",
    headerLines = 0,
    contentLines = 3,
    hasFooter = true,
    footerAlign = "between",
    className,
    minHeight,
}: CardSkeletonProps) {

    return (
        <article
            style={{ minHeight }}
            className={cn(
                cardVariants({
                    variant,
                    radius,
                    padding,
                    width,
                    interactive: false,
                    isLoading: false,
                }),
                "group flex flex-col pointer-events-none select-none",
                className
            )}
            aria-hidden="true"
        >
            {/* Media top */}
            {hasMedia && mediaPosition === "top" && (
                <div
                    className={cn(
                        cardMediaVariants({ aspectRatio: mediaAspectRatio, radius: "none" }),
                        "relative w-full overflow-hidden"
                    )}
                >
                    <div className="absolute inset-0 skeleton-pulse" />
                </div>
            )}

            {/* Header */}
            {headerLines > 0 && (
                <header className={cn(cardHeaderVariants({ padding, border: false }))}>
                    <div className="space-y-2 w-full">
                        {Array.from({ length: headerLines }).map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-4 rounded-sm skeleton-block animate-pulse",
                                    i === headerLines - 1 && headerLines > 1 ? "w-3/5" : "w-full"
                                )}
                            />
                        ))}
                    </div>
                </header>
            )}

            {/* Content */}
            <div className={cn(cardContentVariants({ padding }), "flex-1")}>
                <div className="space-y-2 w-full">
                    {Array.from({ length: contentLines }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-4 rounded-sm skeleton-block animate-pulse",
                                i === contentLines - 1 && contentLines > 1 ? "w-3/4" : "w-full"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            {hasFooter && (
                <footer
                    className={cn(
                        cardFooterVariants({
                            padding,
                            border: false,
                            align: footerAlign,
                        })
                    )}
                >
                    <div className="h-8 w-20 rounded-clay skeleton-pulse" />
                    <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                </footer>
            )}
        </article>
    );
}