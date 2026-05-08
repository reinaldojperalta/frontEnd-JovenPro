// components/molecules/VideoCard/VideoCard.tsx

"use client";

import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Text } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/lib/data";

export interface VideoCardProps {
    video: VideoItem;
    className?: string;
}

export function VideoCard({ video, className }: VideoCardProps) {
    return (
        <article className={cn("flex flex-col", className)}>
            <div className="relative rounded-clay overflow-hidden shadow-clay bg-foreground/5 aspect-video">
                <LiteYouTubeEmbed
                    id={video.youtubeId}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    wrapperClass="yt-lite-custom"
                />
                <span className="absolute bottom-3 right-3 z-10 bg-foreground/80 text-background text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm">
                    {video.duration}
                </span>
            </div>
            <div className="mt-4 space-y-1">
                <Text as="label" weight="semibold" size="base" className="line-clamp-2">
                    {video.title}
                </Text>
                <Text variant="muted" size="sm">
                    por {video.artisan}
                </Text>
            </div>
        </article>
    );
}