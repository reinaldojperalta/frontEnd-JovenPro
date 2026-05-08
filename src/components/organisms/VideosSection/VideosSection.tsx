"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import type { VideoItem } from "@/lib/data";

export interface VideosSectionProps {
    videos: VideoItem[];
    className?: string;
}

export function VideosSection({
    videos,
    className,
}: VideosSectionProps) {
    const [playingId, setPlayingId] = useState<string | null>(null);

    const getThumbnail = (youtubeId: string) => {
        return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    };

    const handlePlay = (id: string, youtubeId: string) => {
        setPlayingId(id);
    };

    return (
        <section className={cn("py-20 md:py-28", className)}>
            <Container size="lg" padding="md">
                <div className="hidden md:grid md:grid-cols-2 gap-8">
                    {videos.map((video, i) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.1,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                        >
                            <div className="group cursor-pointer">
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-4">
                                    {playingId === video.id ? (
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
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity"
                                            />
                                            <div
                                                className="absolute inset-0 flex items-center justify-center"
                                                onClick={() => handlePlay(video.id, video.youtubeId)}
                                            >
                                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                                                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <h4 className="font-headline text-lg font-semibold text-jp-navy">
                                    {video.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none]">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="snap-center shrink-0 w-[85vw] max-w-sm"
                            >
                                <div className="group cursor-pointer">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-4">
                                        {playingId === video.id ? (
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
                                                    className="w-full h-full object-cover opacity-80"
                                                />
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center"
                                                    onClick={() => handlePlay(video.id, video.youtubeId)}
                                                >
                                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <h4 className="font-headline text-lg font-semibold text-jp-navy">
                                        {video.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}