

import React from "react";
import { Instagram, Facebook, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { IconButton } from "@/components/atoms/IconButton";
import { cn } from "@/lib/utils";
import type { FooterData } from "@/lib/data";
import { Section } from "@/components/atoms/Section";
import {
    footerVariants,
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
        }
    };

    const socialIcons: Record<string, React.ReactNode> = {
        Instagram: <Instagram className="w-5 h-5" />,
        Facebook:  <Facebook className="w-5 h-5" />,
        WhatsApp:  <MessageCircle className="w-5 h-5" />,
        Telegram:  <Send className="w-5 h-5" />,
    };

    return (
        <Section as="footer" spacing="none" background="surface-container-low" className={cn(footerVariants(), className)}>
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
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                                    <IconButton
                                        icon={socialIcons[social.label] || null}
                                        variant="social"
                                        size="sm"
                                        aria-label={social.label}
                                    />
                                </a>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}