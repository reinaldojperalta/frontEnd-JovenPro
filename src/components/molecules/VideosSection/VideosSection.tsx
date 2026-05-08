// components/organisms/VideosSection/VideosSection.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Heading, Text } from "@/components/atoms/Typography";
import { VideoCard } from "@/components/molecules/VideoCard";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/lib/data";

export interface VideosSectionProps {
    videos: VideoItem[];
    title?: string;
    subtitle?: string;
    className?: string;
}

export function VideosSection({
    videos,
    title = "Procesos artesanales",
    subtitle = "Descubre cómo nacen nuestras piezas únicas, de las manos de quienes las crean",
    className,
}: VideosSectionProps) {
    return (
        <section id="videos" className={cn("py-24 md:py-32", className)}>
            <Container size="lg" padding="md">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <Heading level="h2" className="mb-4">
                            {title}
                        </Heading>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <Text variant="lead" size="lg">
                            {subtitle}
                        </Text>
                    </motion.div>
                </div>

                {/* Desktop: Grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-6">
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
                            <VideoCard video={video} />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: Carousel */}
                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="snap-center shrink-0 w-[85vw] max-w-sm"
                            >
                                <VideoCard video={video} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}