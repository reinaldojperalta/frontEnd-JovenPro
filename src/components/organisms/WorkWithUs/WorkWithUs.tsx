"use client";

import React from "react";
import Image from "next/image";
import { m, LazyMotion } from "framer-motion";
import domAnimation from "@/lib/framer-features";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Typography";
import { Text } from "@/components/atoms/Typography";
import { IconButton } from "@/components/atoms/IconButton";
import { cn } from "@/lib/utils";
import type { WorkWithUsData } from "@/lib/data";
import { Section } from "@/components/atoms/Section";
import {
    workWithUsCardVariants,
    workWithUsContentVariants,
    workWithUsDecoVariants,
    workWithUsInnerVariants,
    workWithUsTitleVariants,
    workWithUsDescriptionVariants,
    workWithUsDividerVariants,
    workWithUsSocialsVariants,
    workWithUsMapVariants,
    workWithUsMapImageVariants,
    workWithUsMapOverlayVariants,
    workWithUsPinWrapperVariants,
    workWithUsPinButtonVariants,
    workWithUsPinPingVariants,
    workWithUsPinIconVariants,
    workWithUsLocationLabelVariants,
    workWithUsLocationSubVariants,
    workWithUsWhatsappLinkVariants,
} from "./WorkWithUs.variants";

/* ============================================================
 * WorkWithUs — Refactor V3 | Zero Inline Policy
 * ============================================================
 * • IconButton variant="social" reemplaza botones inline
 * • Heading reemplaza <h2> inline
 * • Text reemplaza spans de overline/label inline
 * • window.open extraído a prop onOpenLink
 * • "Madrid, España" hardcodeado → data.locationSubLabel
 * • shadow-ambient → shadow-clay
 * • Pin del mapa: variantes en .variants.ts (no componente separado)
 * • TODO: onOpenLink debe ser inyectada por Template
 * ============================================================ */

export interface WorkWithUsProps {
    data: WorkWithUsData;
    className?: string;
    /** Handler de navegación externa. Si no se provee, usa window.open. */
    onOpenLink?: (url: string) => void;
}

export function WorkWithUs({
    data,
    className,
    onOpenLink,
}: WorkWithUsProps) {
    const handleOpen = (url: string) => {
        if (onOpenLink) {
            onOpenLink(url);
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    const socialLinks = [
        {
            id: "instagram",
            url: data.instagramUrl,
            label: "Instagram",
            icon: <Instagram className="w-5 h-5" />,
        },
        {
            id: "facebook",
            url: data.facebookUrl,
            label: "Facebook",
            icon: <Facebook className="w-5 h-5" />,
        },
        {
            id: "whatsapp",
            url: `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(data.whatsappMessage)}`,
            label: "WhatsApp",
            icon: <MessageCircle className="w-5 h-5" />,
        },
    ];

    return (
        <Section id="contacto" spacing="lg" className={className}>
            <Container size="lg" padding="md">
                <div className={workWithUsCardVariants()}>
                    {/* Columna izquierda: contenido */}
                    <div className={workWithUsContentVariants()}>
                        <div className={workWithUsDecoVariants()} />
                        <div className={workWithUsInnerVariants()}>
                            <Text
                                variant="overline"
                                size="xs"
                                className="mb-4 block"
                            >
                                {data.sectionLabel}
                            </Text>

                            <LazyMotion features={domAnimation} strict>
                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                                >
                                    <Heading
                                        level="h2"
                                        variant="primary"
                                        className={workWithUsTitleVariants()}
                                    >
                                        {data.headline}
                                    </Heading>
                                </m.div>

                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.1,
                                        ease: [0.25, 1, 0.5, 1],
                                    }}
                                >
                                    <p className={workWithUsDescriptionVariants()}>
                                        {data.subheadline}
                                    </p>
                                </m.div>

                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.2,
                                        ease: [0.25, 1, 0.5, 1],
                                    }}
                                >
                                    <button
                                        onClick={() => handleOpen(data.membershipsUrl)}
                                        className={workWithUsWhatsappLinkVariants()}
                                    >
                                        {data.membershipsDisplayLabel}
                                    </button>
                                </m.div>

                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.3,
                                        ease: [0.25, 1, 0.5, 1],
                                    }}
                                >
                                    <button
                                        onClick={() => handleOpen(`https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(data.whatsappMessage)}`)}
                                        className={workWithUsWhatsappLinkVariants()}
                                    >
                                        {data.whatsappDisplayLabel}
                                    </button>
                                </m.div>
                            </LazyMotion>

                            <div className={workWithUsDividerVariants()}>
                                <Text
                                    variant="overline"
                                    size="xs"
                                    className="mb-4 block"
                                >
                                    {data.socialsLabel}
                                </Text>

                                <div className={workWithUsSocialsVariants()}>
                                    {socialLinks.map((social) => (
                                        <IconButton
                                            key={social.id}
                                            icon={social.icon}
                                            variant="social"
                                            size="lg"
                                            aria-label={social.label}
                                            onClick={() => handleOpen(social.url)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha: mapa */}
                    <div className={workWithUsMapVariants()}>
                        <Image
                            src={data.mapImageUrl}
                            alt="Mapa"
                            fill
                            className={workWithUsMapImageVariants()}
                        />
                        <div className={workWithUsMapOverlayVariants()} />

                        <div className={workWithUsPinWrapperVariants()}>
                            <div
                                className={workWithUsPinButtonVariants()}
                                onClick={() => handleOpen(data.mapUrl)}
                            >
                                <svg
                                    className={workWithUsPinIconVariants()}
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <div className={workWithUsPinPingVariants()} />
                            </div>

                            <div className={workWithUsLocationLabelVariants()}>
                                {data.locationLabel}
                                <br />
                                <span className={workWithUsLocationSubVariants()}>
                                    {data.locationSubLabel}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}