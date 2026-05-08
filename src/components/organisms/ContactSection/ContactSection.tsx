// components/organisms/ContactSection/ContactSection.tsx

"use client";

import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { Heading, Text } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import { FormField } from "@/components/molecules/FormField";
import { CTAGroup } from "@/components/molecules/CTAGroup";
import { Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// TIPOS DE DATOS
// ============================================

export interface ContactSectionProps {
    /** Título principal (parte 1) */
    titleLine1?: string;

    /** Título principal (parte 2, con énfasis) */
    titleLine2?: string;

    /** Descripción */
    description?: string;

    /** Características/beneficios */
    features?: string[];

    /** Label del campo email */
    emailLabel?: string;

    /** Placeholder del email */
    emailPlaceholder?: string;

    /** Texto del botón submit */
    submitLabel?: string;

    /** Texto de éxito */
    successLabel?: string;

    /** Callback al enviar */
    onSubmit?: (email: string) => Promise<void> | void;

    /** Variante de layout */
    variant?: "split" | "centered";

    /** Clases adicionales */
    className?: string;
}

// ============================================
// ANIMACIONES
// ============================================

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

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

// ============================================
// COMPONENTE CONTACTSECTION
// ============================================

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

        // Validación de email
        const validateEmail = (val: string) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValid(regex.test(val) || val === "");
            setEmail(val);
        };

        // Handler de submit
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

        // Preparar acciones para CTAGroup
        const primaryAction = {
            label: status === "success" ? successLabel : submitLabel,
            icon: status === "success" ? <CheckCircle2 className="w-6 h-6" /> : <Send className="w-6 h-6" />,
            onClick: handleSubmit,
            disabled: status !== "idle" || !email || !isValid,
            isLoading: status === "loading",
        };

        const isSplit = variant === "split";

        return (
            <section ref={ref} className={cn("py-16 px-6", className)}>
                <Container size="lg" padding="md">
                    <Container
                        variant="clay"
                        radius="clay"
                        padding="2xl"
                        className={cn(
                            "relative overflow-hidden p-8 lg:p-20 lg:pb-28", // Añadimos pb-28 para dar mucho aire abajo
                            isSplit && "flex flex-col lg:flex-row items-center gap-6",
                            !isSplit && "flex flex-col items-center text-center max-w-4xl mx-auto"
                        )}
                    >
                        {/* Lado izquierdo: Contenido */}
                        <motion.div
                            {...fadeInLeft}
                            className={cn(
                                "flex-1 space-y-2 relative z-10",
                                isSplit ? "text-left" : "text-center"
                            )}
                        >
                            {/* Título */}
                            <Heading
                                level="h2"
                                variant="primary"
                                className="leading-tight lg:leading-[1.1] text-5xl lg:text-7xl tracking-tighter"
                            >
                                {titleLine1}
                                <br />
                                {titleLine2}
                            </Heading>

                            {/* Descripción */}
                            <Text
                                variant="lead"
                                className={cn(
                                    "max-w-md",
                                    isSplit && "mx-auto lg:mx-0",
                                    !isSplit && "mx-auto"
                                )}
                            >
                                {description}
                            </Text>

                            {/* Features */}
                            {features.length > 0 && (
                                <div
                                    className={cn(
                                        "flex flex-wrap gap-8 text-xs font-black uppercase tracking-[0.2em] opacity-80",
                                        isSplit && "justify-center lg:justify-start",
                                        !isSplit && "justify-center"
                                    )}
                                >
                                    {features.map((feature, i) => (
                                        <span key={i} className="flex items-center gap-3">
                                            <Badge
                                                variant="secondary"
                                                size="sm"
                                                indicator
                                                indicatorColor="secondary"
                                                className="px-0 py-0 bg-transparent shadow-none"
                                            >
                                                <span className="sr-only">{feature}</span>
                                            </Badge>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Lado derecho: Formulario */}
                        <motion.div
                            {...fadeInRight}
                            className={cn(
                                "flex-1 w-full max-w-lg lg:ml-auto relative z-10",
                                !isSplit && "max-w-xl"
                            )}
                        >
                            <Container
                                variant="surface-container"
                                radius="clay"
                                padding="xl"
                                className="shadow-clay-active"
                            >
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <FormField
                                        id="contact-email"
                                        type="email"
                                        label={emailLabel}
                                        value={email}
                                        onChange={(e) => validateEmail(e.target.value)}
                                        placeholder={emailPlaceholder}
                                        leftIcon={<Mail className="w-5 h-5" />}
                                        state={
                                            !isValid ? "error" : status === "success" ? "success" : "default"
                                        }
                                        errorMessage={!isValid ? "El formato del correo no es válido." : undefined}
                                        successMessage={status === "success" ? "¡Te contactaremos pronto!" : undefined}
                                        isLoading={status === "loading"}
                                        required
                                        showValidationIcon
                                    />

                                    <CTAGroup
                                        primaryAction={primaryAction}
                                        responsive={false}
                                        fullWidthMobile={true}
                                        align="center"
                                        gap="sm"
                                    />
                                </form>
                            </Container>
                        </motion.div>

                        {/* Background accents */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 blur-[100px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2" />
                    </Container>
                </Container>
            </section>
        );
    }
);

ContactSection.displayName = "ContactSection";

export { ContactSection };