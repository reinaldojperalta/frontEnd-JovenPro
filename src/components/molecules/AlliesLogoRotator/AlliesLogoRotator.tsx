"use client";

import React, { useState, useEffect, useCallback } from "react";
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

/**
 * AlliesLogoRotator — CSS-only cross-fade rotator.
 * Replaces Framer Motion AnimatePresence to avoid the bug where
 * `display:none` parent containers prevent the animate state from firing.
 */
export function AlliesLogoRotator({ intervalMs = 4000, className }: AlliesLogoRotatorProps) {
    const logos = ALLIES_LOGO_PATHS;
    const [activeIndex, setActiveIndex] = useState(0);

    const advance = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % logos.length);
    }, [logos.length]);

    useEffect(() => {
        if (logos.length <= 1) return;
        const id = window.setInterval(advance, intervalMs);
        return () => window.clearInterval(id);
    }, [logos.length, intervalMs, advance]);

    return (
        <div className={cn(alliesRotatorVariants(), className)} aria-hidden>
            <div className={alliesRotatorInnerVariants()}>
                {logos.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt=""
                        className={cn(
                            alliesRotatorImageVariants(),
                            "absolute inset-0 m-auto transition-opacity duration-500 ease-out",
                            i === activeIndex ? "opacity-100" : "opacity-0"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
