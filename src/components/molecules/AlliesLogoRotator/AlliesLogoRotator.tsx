"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ALLIES_LOGO_PATHS } from "./AlliesLogoRotator.constants";
import {
    alliesRotatorVariants,
    alliesRotatorInnerVariants,
    alliesRotatorImageVariants,
} from "./AlliesLogoRotator.variants";

export interface AlliesLogoRotatorProps {
    intervalMs?: number;
    className?: string;
}

export function AlliesLogoRotator({ intervalMs = 4000, className }: AlliesLogoRotatorProps) {
    const [index, setIndex] = useState(0);
    const logos = ALLIES_LOGO_PATHS;

    useEffect(() => {
        if (logos.length <= 1) return;
        const id = window.setInterval(() => {
            setIndex((prev) => (prev + 1) % logos.length);
        }, intervalMs);
        return () => window.clearInterval(id);
    }, [logos.length, intervalMs]);

    return (
        <div className={cn(alliesRotatorVariants(), className)} aria-hidden>
            <div className={alliesRotatorInnerVariants()}>
                <AnimatePresence mode="wait">
                    <m.img
                        key={logos[index]}
                        src={logos[index]}
                        alt=""
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className={alliesRotatorImageVariants()}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
}
