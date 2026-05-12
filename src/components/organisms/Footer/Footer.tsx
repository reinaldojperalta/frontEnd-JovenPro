"use client";

import React from "react";
import { Container } from "@/components/atoms/Container";
import { IconButton } from "@/components/atoms/IconButton";
import { cn } from "@/lib/utils";
import type { FooterData } from "@/lib/data";
import { Section } from "@/components/atoms/Section";
import {
    footerInnerVariants,
    footerBrandVariants,
    footerLogoVariants,
    footerCopyrightVariants,
    footerNavVariants,
    footerNavItemVariants,
    footerSocialsVariants,
} from "./Footer.variants";

/* ============================================================
 * Footer — Refactor V3 | Zero Inline Policy
 * ============================================================
 * • font-display → font-headline
 * • "JovenPro" hardcodeado → data.brand
 * • window.open extraído a prop onOpenLink
 * • Botones sociales inline → IconButton variant="social"
 * • TODO: onOpenLink debe ser inyectada por Template
 * ============================================================ */

export interface FooterProps {
    data: FooterData;
    className?: string;
    /** Handler de navegación externa. Si no se provee, usa window.open. */
    onOpenLink?: (url: string) => void;
}

export function Footer({ data, className, onOpenLink }: FooterProps) {
    const handleOpen = (url: string) => {
        if (onOpenLink) {
            onOpenLink(url);
        } else {
            window.open(url, "_blank");
        }
    };

    const socialIcons: Record<string, React.ReactNode> = {
        Instagram: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        Facebook: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
        ),
        WhatsApp: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.711.927 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z" />
            </svg>
        ),
    };

    return (
        <Section as="footer" spacing="none" background="surface-container-low" className={cn("border-t border-border/20", className)}>
            <Container size="lg" padding="md">
                <div className={footerInnerVariants()}>
                    {/* Brand */}
                    <div className={footerBrandVariants()}>
                        <span className={footerLogoVariants()}>
                            {data.brand || "JovenPro"}
                        </span>
                        <p className={footerCopyrightVariants()}>
                            {data.copyright}
                        </p>
                    </div>

                    {/* Nav links */}
                    <ul className={footerNavVariants()}>
                        {data.links.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleOpen(link.href);
                                    }}
                                    className={footerNavItemVariants()}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Socials */}
                    <div className={footerSocialsVariants()}>
                        {data.socials.map((social) => (
                            <IconButton
                                key={social.label}
                                icon={socialIcons[social.label] || null}
                                variant="social"
                                size="sm"
                                aria-label={social.label}
                                onClick={() => handleOpen(social.href)}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}