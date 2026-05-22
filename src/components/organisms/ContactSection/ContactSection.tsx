"use client";

import React, { useState, forwardRef } from "react";
import { m, LazyMotion } from "framer-motion";
import domAnimation from "@/lib/framer-features";
import { Container } from "@/components/atoms/Container";
import { Heading, Text } from "@/components/atoms/Typography";
import { FormField } from "@/components/molecules/FormField";
import { CTAGroup } from "@/components/molecules/CTAGroup";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/atoms/Section";
import { cn } from "@/lib/utils";
import {
    contactSectionCardVariants,
    contactSectionContentVariants,
    contactSectionTitleVariants,
    contactSectionDescriptionVariants,
    contactSectionFeaturesVariants,
    contactSectionFeatureItemVariants,
    contactSectionFeatureIndicatorVariants,
    contactSectionFormVariants,
    contactSectionFormCardVariants,
    contactSectionFormWrapperVariants,
    contactSectionCTAVariants,
    contactSectionAccentTopVariants,
    contactSectionAccentBottomVariants,
    type ContactSectionLayout,
} from "./ContactSection.variants";

/* ============================================================
 * ContactSection — Refactor V3 | Zero Inline Policy
 * ============================================================
 * • Badge abuse corregido: indicador visual simple en vez de
 *   Badge con override masivo.
 * • Background accents: migrados a .variants.ts
 * • Heading override: migrado a contactSectionTitleVariants
 * • Framer Motion: SIN CAMBIOS
 * ============================================================ */

export interface ContactSectionProps {
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    features?: string[];
    emailLabel?: string;
    emailPlaceholder?: string;
    submitLabel?: string;
    successLabel?: string;
    onSubmit?: (email: string) => Promise<void> | void;
    variant?: ContactSectionLayout;
    className?: string;
}

const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
};

const ContactSection = forwardRef<HTMLElement, ContactSectionProps>(
    (
        {
            titleLine1 = "¿Eres un",
            titleLine2 = "Emprendedor?",
            description = "Únete a la mayor red de talento joven y lleva tus creaciones a todo el mundo.",
            features = ["Visibilidad Global", "Soporte Logístico"],
            emailLabel = "Tu Canal Directo",
            emailPlaceholder = "hola@tuproyecto.com",
            submitLabel = "Postular Mi Proyecto",
            successLabel = "¡Registro Exitoso!",
            onSubmit,
            variant = "split",
            className,
        },
        ref
    ) => {
        const [email, setEmail] = useState("");
        const [isValid, setIsValid] = useState(true);
        const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

        const validateEmail = (val: string) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValid(regex.test(val) || val === "");
            setEmail(val);
        };

        const handleSubmit = async (e?: React.FormEvent) => {
            e?.preventDefault();
            if (!email || !isValid) return;

            setStatus("loading");
            try {
                await onSubmit?.(email);
                setStatus("success");
                setEmail("");
            } catch (error) {
                setStatus("idle");
                console.error("Error:", error);
            }
        };

        const primaryAction = {
            label: status === "success" ? successLabel : submitLabel,
            icon:
                status === "success" ? (
                    <CheckCircle2 className="w-6 h-6" />
                ) : (
                    <Send className="w-6 h-6" />
                ),
            onClick: handleSubmit,
            disabled: status !== "idle" || !email || !isValid,
            isLoading: status === "loading",
        };

        return (
            <Section ref={ref} spacing="md" className={className}>
                <Container size="lg" padding="md">
                    <Container
                        variant="clay"
                        radius="clay"
                        padding="2xl"
                        className={cn(
                            contactSectionCardVariants({ layout: variant })
                        )}
                    >
                        <LazyMotion features={domAnimation} strict>
                        {/* Contenido */}
                        <m.div
                            {...fadeInLeft}
                            className={contactSectionContentVariants({
                                layout: variant,
                            })}
                        >
                            <Heading
                                level="h2"
                                variant="primary"
                                className={contactSectionTitleVariants()}
                            >
                                {titleLine1}
                                <br />
                                {titleLine2}
                            </Heading>

                            <Text
                                variant="lead"
                                className={contactSectionDescriptionVariants({
                                    layout: variant,
                                })}
                            >
                                {description}
                            </Text>

                            {features.length > 0 && (
                                <div
                                    className={contactSectionFeaturesVariants({
                                        layout: variant,
                                    })}
                                >
                                    {features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className={contactSectionFeatureItemVariants()}
                                        >
                                            <span
                                                className={contactSectionFeatureIndicatorVariants()}
                                                aria-hidden="true"
                                            />
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </m.div>

                        {/* Formulario */}
                        <m.div
                            {...fadeInRight}
                            className={contactSectionFormVariants({
                                layout: variant,
                            })}
                        >
                            <Container
                                variant="surface-container"
                                radius="clay"
                                padding="xl"
                                className={contactSectionFormCardVariants()}
                            >
                                <form
                                    onSubmit={handleSubmit}
                                    className={contactSectionFormWrapperVariants()}
                                >
                                    <FormField
                                        id="contact-email"
                                        type="email"
                                        label={emailLabel}
                                        value={email}
                                        onChange={(e) => validateEmail(e.target.value)}
                                        placeholder={emailPlaceholder}
                                        leftIcon={<Mail className="w-5 h-5" />}
                                        state={
                                            !isValid
                                                ? "error"
                                                : status === "success"
                                                    ? "success"
                                                    : "default"
                                        }
                                        errorMessage={
                                            !isValid
                                                ? "El formato del correo no es válido."
                                                : undefined
                                        }
                                        successMessage={
                                            status === "success"
                                                ? "¡Te contactaremos pronto!"
                                                : undefined
                                        }
                                        isLoading={status === "loading"}
                                        required
                                        showValidationIcon
                                    />

                                    <div className={contactSectionCTAVariants()}>
                                        <CTAGroup
                                            primaryAction={primaryAction}
                                            responsive={false}
                                            fullWidthMobile={true}
                                            align="center"
                                            gap="sm"
                                        />
                                    </div>
                                </form>
                            </Container>
                        </m.div>
                        </LazyMotion>

                        {/* Background accents */}
                        <div className={contactSectionAccentTopVariants()} />
                        <div className={contactSectionAccentBottomVariants()} />
                    </Container>
                </Container>
            </Section>
        );
    }
);

ContactSection.displayName = "ContactSection";

export { ContactSection };