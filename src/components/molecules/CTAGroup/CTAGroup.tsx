// components/molecules/CTAGroup/CTAGroup.tsx

import React, { forwardRef } from "react";
import { Button, type ButtonProps } from "@/components/atoms/Button";
import {
    ctaGroupVariants,
    type CTAGroupDirection,
    type CTAGroupAlign,
    type CTAGroupGap,
    type CTAGroupVerticalAlign
} from "./CTAGroup.variants";
import { cn } from "@/lib/utils";

// ============================================
// TIPOS DE DATOS
// ============================================

// ✅ CORREGIDO: No extender ButtonProps, definir explícitamente
// para evitar conflictos de tipos con 'icon'
export interface CTAAction {
    /** Texto del botón */
    label: string;

    /** Icono como ReactNode (JSX ejecutado) */
    icon?: React.ReactNode;

    /** Handler click */
    onClick?: () => void;

    /** Link href */
    href?: string;

    /** Prioridad del botón */
    priority?: "primary" | "secondary" | "tertiary";

    /** Variante del botón (opcional, para override) */
    variant?: ButtonProps["variant"];

    /** Tamaño del botón */
    size?: ButtonProps["size"];

    /** Posición del icono */
    iconPosition?: "left" | "right";

    /** Estado de loading */
    isLoading?: boolean;

    /** Deshabilitado */
    disabled?: boolean;

    /** Clases adicionales */
    className?: string;

    /** Posición en el grupo (para orden) */
    order?: "first" | "last";
}

// ============================================
// INTERFAZ DEL CTAGROUP
// ============================================

export interface CTAGroupProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /** Acción principal (botón izquierda/arriba) */
    primaryAction: CTAAction;

    /** Acción secundaria (botón derecha/abajo) */
    secondaryAction?: CTAAction;

    /** Acción terciaria (opcional) */
    tertiaryAction?: CTAAction;

    /** Dirección del layout */
    direction?: CTAGroupDirection;

    /** Alineación horizontal */
    align?: CTAGroupAlign;

    /** Espaciado entre botones */
    gap?: CTAGroupGap;

    /** Alineación vertical de los botones */
    verticalAlign?: CTAGroupVerticalAlign;

    /** Responsive: apilar en móvil */
    responsive?: boolean;

    /** Botones full width en móvil */
    fullWidthMobile?: boolean;

    /** Invertir orden en móvil (cuando responsive=true) */
    reverseOnMobile?: boolean;
}

// ============================================
// COMPONENTE CTAGROUP
// ============================================

const CTAGroup = forwardRef<HTMLDivElement, CTAGroupProps>(
    (
        {
            primaryAction,
            secondaryAction,
            tertiaryAction,
            direction = "horizontal",
            align = "start",
            gap = "sm",

            verticalAlign = "center",
            responsive = true,
            fullWidthMobile = true,
            reverseOnMobile = false,
            className,
            ...props
        },
        ref
    ) => {
        // Preparar acciones en array
        const actions = [
            { ...primaryAction, key: "primary", defaultPriority: "primary" as const },
            secondaryAction && { ...secondaryAction, key: "secondary", defaultPriority: "secondary" as const },
            tertiaryAction && { ...tertiaryAction, key: "tertiary", defaultPriority: "tertiary" as const },
        ].filter((action): action is NonNullable<typeof action> => Boolean(action));

        // Ordenar según prop order
        const sortedActions = actions.sort((a, b) => {
            if (a.order === "first") return -1;
            if (b.order === "first") return 1;
            if (a.order === "last") return 1;
            if (b.order === "last") return -1;
            return 0;
        });

        // Determinar variant de cada botón según prioridad
        const getButtonVariant = (action: typeof sortedActions[0]): ButtonProps["variant"] => {
            const priority = action.priority || action.defaultPriority;

            switch (priority) {
                case "primary":
                    return action.variant || "primary";
                case "secondary":
                    return action.variant || "secondary";
                case "tertiary":
                    return action.variant || "ghost";
                default:
                    return "primary";
            }
        };

        return (
            <div
                ref={ref}
                className={cn(
                    ctaGroupVariants({
                        direction,
                        align,
                        gap,
                        verticalAlign,
                        responsive,
                        fullWidthMobile,
                    }),
                    reverseOnMobile && "flex-col-reverse sm:flex-row",
                    className
                )}
                {...props}
            >
                {sortedActions.map((action) => (
                    <Button
                        key={action.key}
                        variant={getButtonVariant(action)}
                        size={action.size || "lg"}
                        icon={action.icon}
                        iconPosition={action.iconPosition || "right"}
                        isLoading={action.isLoading}
                        disabled={action.disabled}
                        onClick={action.onClick}
                        className={cn(
                            // Si es responsive y fullWidthMobile, ajustar
                            responsive && fullWidthMobile && "w-full sm:w-auto",
                            action.className
                        )}
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        );
    }
);

CTAGroup.displayName = "CTAGroup";

export { CTAGroup };