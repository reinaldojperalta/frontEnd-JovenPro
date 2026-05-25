"use client";

import React, { useState, useEffect } from "react";
import { m, LazyMotion } from "framer-motion";
import Image from "next/image";
import domAnimation from "@/lib/framer-features";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import type { VideoItem } from "@/lib/data";
import { Section } from "@/components/atoms/Section";
import {
    videosSectionGridVariants,
    videosSectionItemVariants,
    videosSectionCardVariants,
    videosSectionMediaVariants,
    videosSectionThumbnailVariants,
    videosSectionPlayOverlayVariants,
    videosSectionPlayButtonVariants,
    videosSectionPlayIconVariants,
    videosSectionTitleVariants,
    videosSectionMobileScrollVariants,
    videosSectionMobileItemVariants,
    videosSectionMobileThumbnailVariants,
    videosSectionMobilePlayButtonVariants,
} from "./VideosSection.variants";

/* ============================================================
 * VideosSection — Refactor V5 | next/image + Zero Inline
 * ============================================================ */

export interface VideosSectionProps {
    videos: VideoItem[];
    title?: string;
    className?: string;
}

/** Hook simple para detectar breakpoint */
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const mql = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mql.addEventListener("change", handler);
        setMatches(mql.matches);
        return () => mql.removeEventListener("change", handler);
    }, [query]);

    if (!mounted) return true;
    return matches;
}

export function VideosSection({
    videos,
    title,
    className,
}: VideosSectionProps) {
    const [playingId, setPlayingId] = useState<string | null>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const getThumbnail = (youtubeId: string) => {
        return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    };

    const handlePlay = (id: string) => {
        setPlayingId(id);
    };

    const renderVideoCard = (video: VideoItem, index: number, isMobile: boolean) => {
        const isPlaying = playingId === video.id;
        const thumbnailUrl = getThumbnail(video.youtubeId);

        return (
            <div
                key={`${isMobile ? "m" : "d"}-${video.id}`}
                className={isMobile ? videosSectionMobileItemVariants() : videosSectionItemVariants()}
            >
                <m.div
                    initial={isMobile ? undefined : { opacity: 0, y: 20 }}
                    whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                    viewport={isMobile ? undefined : { once: true }}
                    transition={
                        isMobile
                            ? undefined
                            : { duration: 0.5, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }
                    }
                    className={videosSectionCardVariants()}
                >
                    <div className={videosSectionMediaVariants()}>
                        {isPlaying ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                                title={video.title}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                <Image
                                    src={thumbnailUrl}
                                    alt={video.title}
                                    fill
                                    sizes={isMobile ? "85vw" : "(max-width: 768px) 100vw, 50vw"}
                                    className={
                                        isMobile
                                            ? videosSectionMobileThumbnailVariants()
                                            : videosSectionThumbnailVariants()
                                    }
                                    unoptimized // YouTube thumbnails no están en next.config.ts
                                />
                                <div
                                    className={videosSectionPlayOverlayVariants()}
                                    onClick={() => handlePlay(video.id)}
                                >
                                    <div
                                        className={
                                            isMobile
                                                ? videosSectionMobilePlayButtonVariants()
                                                : videosSectionPlayButtonVariants()
                                        }
                                    >
                                        <Play className={videosSectionPlayIconVariants()} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <h4 className={videosSectionTitleVariants()}>{video.title}</h4>
                </m.div>
            </div>
        );
    };

    return (
        <Section id="videos" spacing="lg" className={className}>
            <Container size="lg" padding="md">
                {title && (
                    <Heading level="h2" className="mb-8 md:mb-12">
                        {title}
                    </Heading>
                )}

                <LazyMotion features={domAnimation} strict>
                    {isDesktop ? (
                        <div className={videosSectionGridVariants()}>
                            {videos.map((video, i) => renderVideoCard(video, i, false))}
                        </div>
                    ) : (
                        <div className={videosSectionMobileScrollVariants()}>
                            {videos.map((video, i) => renderVideoCard(video, i, true))}
                        </div>
                    )}
                </LazyMotion>
            </Container>
        </Section>
    );
}