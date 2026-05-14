// ============================================================================
// VIDEO CARD — Molécula de tarjeta de video
// ============================================================================
// REFACTOR V3:
// - Archivo .variants.ts creado (no existía).
// - Zero inline classes:
//   • "flex flex-col" → videoCardVariants
//   • "relative rounded-clay overflow-hidden shadow-clay bg-foreground/5 aspect-video"
//     → videoCardPlayerVariants
//   • "absolute bottom-3 right-3 z-10 bg-foreground/80 text-background text-xs
//     font-semibold px-2 py-1 rounded-md backdrop-blur-sm"
//     → videoCardDurationVariants
//   • "mt-4 space-y-1" → videoCardMetaVariants
//   • "line-clamp-2" (Text className) → Reemplazado por prop lineClamp={2}
//     del átomo Text.
// - Consumo de átomos validado:
//   • Text: as, weight, size, variant, lineClamp via props. Correcto.
// - LiteYouTubeEmbed: componente externo, no es parte del design system.
//   Su wrapperClass "yt-lite-custom" se mantiene (CSS de la librería).
// ============================================================================

"use client";

import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Text } from "@/components/atoms/Typography";
import {
    videoCardVariants,
    videoCardPlayerVariants,
    videoCardDurationVariants,
    videoCardMetaVariants,
} from "./VideoCard.variants";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/lib/data";

export interface VideoCardProps {
    video: VideoItem;
    className?: string;
}

export function VideoCard({ video, className }: VideoCardProps) {
    return (
        <article className={cn(videoCardVariants(), className)}>
            <div className={cn(videoCardPlayerVariants())}>
                <LiteYouTubeEmbed
                    id={video.youtubeId}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    wrapperClass="yt-lite-custom"
                />
                <span className={cn(videoCardDurationVariants())}>
                    {video.duration}
                </span>
            </div>
            <div className={cn(videoCardMetaVariants())}>
                <Text
                    as="label"
                    weight="semibold"
                    size="base"
                    lineClamp={2}
                >
                    {video.title}
                </Text>
                <Text variant="muted" size="sm">
                    por {video.emprendedor}
                </Text>
            </div>
        </article>
    );
}