"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";
import type { WorkWithUsData } from "@/lib/data";

export interface WorkWithUsProps {
    data: WorkWithUsData;
    className?: string;
}

export function WorkWithUs({
    data,
    className,
}: WorkWithUsProps) {
    const handleOpen = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <section id="contacto" className={cn("py-20 md:py-28", className)}>
            <Container size="lg" padding="md">
                <div className="bg-white rounded-3xl overflow-hidden shadow-ambient border border-border/20 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-surface-container-low/50 rounded-full blur-3xl z-0" />
                        <div className="relative z-10">
                            <span className="text-secondary font-body text-xs font-bold uppercase tracking-widest mb-4 block">
                                Maker Hub
                            </span>
                            <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                                {data.headline}
                            </h2>
                            <p className="font-body text-foreground/70 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                                {data.subheadline}
                            </p>
                            <div className="border-t border-border/30 pt-8">
                                <p className="font-body text-xs text-foreground/60 uppercase tracking-widest mb-4 font-semibold">
                                    Conecta con nosotros
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleOpen(data.instagramUrl)}
                                        className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors shadow-sm"
                                        aria-label="Instagram"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleOpen(data.facebookUrl)}
                                        className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors shadow-sm"
                                        aria-label="Facebook"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => {
                                            const url = `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(data.whatsappMessage)}`;
                                            handleOpen(url);
                                        }}
                                        className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors shadow-sm"
                                        aria-label="WhatsApp"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.711.927 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative min-h-[400px] bg-surface">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                            alt="Mapa"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply filter grayscale contrast-125"
                        />
                        <div className="absolute inset-0 bg-primary/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-full shadow-ambient flex items-center justify-center relative mb-4 cursor-pointer"
                                onClick={() => handleOpen(data.mapUrl)}>
                                <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-ping" />
                            </div>
                            <div className="bg-primary text-white px-5 py-3 rounded-xl font-body text-sm font-bold shadow-lg text-center">
                                {data.locationLabel}<br />
                                <span className="font-normal text-xs opacity-80">Madrid, España</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}