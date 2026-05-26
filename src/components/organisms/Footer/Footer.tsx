"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Facebook, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { IconButton } from "@/components/atoms/IconButton";
import { Heading } from "@/components/atoms/Typography";
import { Text } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import type { FooterData } from "@/lib/data";
import { teamMembers } from "@/lib/data/team";
import { entrepreneurs } from "@/lib/data/entrepreneurs";
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
    footerTeamSectionVariants,
    footerTeamTitleVariants,
    footerTeamCarouselWrapperVariants,
    footerTeamTrackVariants,
    footerTeamCardVariants,
    footerTeamImageVariants,
    footerTeamInfoVariants,
    footerTeamNameVariants,
    footerTeamRoleVariants,
    footerEntrepreneursSectionVariants,
    footerEntrepreneursTitleVariants,
    footerEntrepreneursSubtitleVariants,
    footerEntrepreneursGridVariants,
    footerEntrepreneurCardVariants,
    footerEntrepreneurImageVariants,
    footerEntrepreneurOverlayVariants,
    footerEntrepreneurNameVariants,
    footerEntrepreneurBusinessVariants,
} from "./Footer.variants";

export interface FooterProps {
    data: FooterData;
    className?: string;
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
        Facebook: <Facebook className="w-5 h-5" />,
        WhatsApp: <MessageCircle className="w-5 h-5" />,
        Telegram: <Send className="w-5 h-5" />,
    };

    return (
        <Section as="footer" spacing="none" background="surface-container-low" className={cn(footerVariants(), className)}>

            {/* ============================================================
          1. GRID COMPACTO — EQUIPO JOVENPRO
          ============================================================ */}
            <div className={footerTeamSectionVariants()}>
                <Container size="full" padding="md">
                    <Heading level="h3" variant="default" className={footerTeamTitleVariants()}>
                        El equipo que hace crecer el sueño
                    </Heading>

                    <div className={footerTeamCarouselWrapperVariants()}>
                        <div className={footerTeamTrackVariants()}>
                            {teamMembers.map((member) => (
                                <div key={member.id} className={footerTeamCardVariants()}>
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        className={footerTeamImageVariants()}
                                        width={300}
                                        height={400}
                                    />
                                    <div className={footerTeamInfoVariants()}>
                                        <span className={footerTeamNameVariants()}>{member.name}</span>
                                        <span className={footerTeamRoleVariants()}>{member.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>

            {/* ============================================================
          2. CINTA HORIZONTAL — EMPRENDEDORES
          ============================================================ */}
            <div className={footerEntrepreneursSectionVariants()}>
                <Container size="lg" padding="md">
                    <Heading level="h3" variant="default" className={footerEntrepreneursTitleVariants()}>
                        JovenPro ¡Es comunidad!
                    </Heading>
                </Container>

                {/* Grid full-bleed — sin Container para ir borde a borde */}
                <div className={footerEntrepreneursGridVariants()}>
                    {entrepreneurs.map((emp) => (
                        <div key={emp.id} className={footerEntrepreneurCardVariants()}>
                            <Image
                                src={emp.image}
                                alt={emp.name}
                                className={footerEntrepreneurImageVariants()}
                                width={600}
                                height={600}
                            />
                            <div className={footerEntrepreneurOverlayVariants()}>
                                <span className={footerEntrepreneurNameVariants()}>{emp.name}</span>
                                <span className={footerEntrepreneurBusinessVariants()}>{emp.business}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <Container size="lg" padding="md">
                    <Text size="md" variant="muted" className={footerEntrepreneursSubtitleVariants()}>
                        ¡En familia haz el recorrido y conoce los Emprendedores &amp; Empresarios locales!
                    </Text>
                </Container>
            </div>

            {/* ============================================================
          FOOTER BASE EXISTENTE
          ============================================================ */}
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