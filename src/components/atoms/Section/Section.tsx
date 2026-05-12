import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { sectionVariants, type SectionSpacing, type SectionBackground } from "./Section.variants";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    as?: "section" | "header" | "footer" | "main" | "article";
    spacing?: SectionSpacing;
    background?: SectionBackground;
    className?: string;
    children: React.ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
    ({ id, as: Tag = "section", spacing, background, className, children, ...props }, ref) => {
        return (
            <Tag
                ref={ref}
                id={id}
                className={cn(sectionVariants({ spacing, background }), className)}
                {...props}
            >
                {children}
            </Tag>
        );
    }
);

Section.displayName = "Section";