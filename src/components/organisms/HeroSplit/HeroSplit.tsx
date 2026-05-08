"use client";

import React from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";

export interface HeroSplitSide {
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    image: string;
}

export interface HeroSplitProps {
    left: HeroSplitSide;
    right: HeroSplitSide;
    logoSrc?: string;
    className?: string;
}

export function HeroSplit({ left, right, logoSrc, className }: HeroSplitProps) {
    const handleClick = (href: string) => {
        if (href.startsWith("#")) {
            const el = document.querySelector(href);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.open(href, "_blank");
        }
    };

    return (
        <section
            id="inicio"
            className={cn(
                "relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden",
                className
            )}
        >
            <HeroSide
                data={left}
                position="left"
                onClick={() => handleClick(left.href)}
            />

            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 z-10" />

            <HeroSide
                data={right}
                position="right"
                onClick={() => handleClick(right.href)}
            />

            {/* Logo Centrado Flotante */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="">
                    {logoSrc ? (
                        <img src={logoSrc} alt="JovenPro" className="h-32 md:h-48 w-auto object-contain " />
                    ) : (
                        <Logo variant="default" size="lg" className="h-32 md:h-48 w-auto" />
                    )}
                </div>
            </div>
        </section>
    );
}

interface HeroSideProps {
    data: HeroSplitSide;
    position: "left" | "right";
    onClick: () => void;
}

function HeroSide({ data, position, onClick }: HeroSideProps) {
    const isLeft = position === "left";

    return (
        <motion.div
            className={cn(
                "relative flex-1 min-h-[50vh] md:min-h-screen",
                "cursor-pointer group overflow-hidden"
            )}
            onClick={onClick}
            initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1],
                delay: isLeft ? 0.2 : 0.4,
            }}
        >
            <div className="absolute inset-0">
                <img
                    src={data.image}
                    alt={data.title}
                    className="h-full w-full object-cover 
        grayscale brightness-200 contrast-50 saturate-0
        group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100
        transition-all duration-500 ease-smooth group-hover:scale-105"
                />
                <div
                    className={cn(
                        "absolute inset-0",
                        isLeft
                            ? "bg-gradient-to-l from-primary/90 via-primary/30 to-transparent"
                            : "bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"
                    )}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            <div
                className={cn(
                    "absolute bottom-10 z-20",
                    isLeft ? "left-10 text-left" : "right-10 text-right"
                )}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: isLeft ? 0.5 : 0.7, ease: [0.25, 1, 0.5, 1] }}
                    className="font-headline text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-3"
                >
                    {data.title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: isLeft ? 0.7 : 0.9, ease: [0.25, 1, 0.5, 1] }}
                    className={cn(
                        "font-body text-white/90 text-lg mb-6",
                        isLeft ? "max-w-sm" : "max-w-sm ml-auto"
                    )}
                >
                    {data.subtitle}
                </motion.p>

                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: isLeft ? 0.9 : 1.1, ease: [0.25, 1, 0.5, 1] }}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white group-hover:gap-3 transition-all duration-300"
                >
                    {data.cta}
                    <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </motion.span>
            </div>
        </motion.div>
    );
}