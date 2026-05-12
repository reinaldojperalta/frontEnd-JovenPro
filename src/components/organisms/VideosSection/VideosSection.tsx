"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
 * VideosSection — Refactor V3 | Zero Inline Policy
 * ============================================================
 * FIX: Bug de audio fantasma (doble reproducción)
 * • Antes: Desktop y Mobile renderizaban simultáneamente en el DOM,
 *   ocultos por CSS. Al hacer play, ambos layouts creaban un iframe
 *   con autoplay=1. El layout oculto seguía reproduciendo audio.
 * • Ahora: Solo el layout activo se renderiza (useMediaQuery).
 *   Cuando cambia el breakpoint, el layout anterior se desmonta
 *   completamente, destruyendo su iframe.
 * ============================================================ */

export interface VideosSectionProps {
    videos: VideoItem[];
    title?: string;
    className?: string;
}

/** Hook simple para detectar breakpoint sin dependencias externas */
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

    // Durante SSR/hidratación, asumimos desktop para evitar mismatch
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

        return (
            <div
                key={`${isMobile ? "m" : "d"}-${video.id}`}
                className={isMobile ? videosSectionMobileItemVariants() : videosSectionItemVariants()}
            >
                <motion.div
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
                                <img
                                    src={getThumbnail(video.youtubeId)}
                                    alt={video.title}
                                    className={
                                        isMobile
                                            ? videosSectionMobileThumbnailVariants()
                                            : videosSectionThumbnailVariants()
                                    }
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
                </motion.div>
            </div>
        );
    };

    return (
        <Section id="videos" background="background" spacing="lg" className={className}>
            <Container size="lg" padding="md">
                {title && (
                    <Heading level="h2" className="mb-8 md:mb-12">
                        {title}
                    </Heading>
                )}

                {/* Solo se renderiza UN layout a la vez */}
                {isDesktop ? (
                    <div className={videosSectionGridVariants()}>
                        {videos.map((video, i) => renderVideoCard(video, i, false))}
                    </div>
                ) : (
                    <div className={videosSectionMobileScrollVariants()}>
                        {videos.map((video, i) => renderVideoCard(video, i, true))}
                    </div>
                )}
            </Container>
        </Section>
    );
}