"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    avatarVariants,
    avatarImageVariants,
    avatarFallbackVariants,
    type AvatarSize,
    type AvatarVariant,
} from "./Avatar.variants";
import { useImageFallback } from "@/hooks/useImageFallback";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: AvatarSize;
    variant?: AvatarVariant;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, src, alt, fallback, size, variant, ...props }, ref) => {
        const { hasError, onError } = useImageFallback();

        return (
            <div
                ref={ref}
                className={cn(avatarVariants({ size, variant }), className)}
                {...props}
            >
                {src && !hasError ? (
                    <Image
                        src={src}
                        alt={alt || "Avatar"}
                        fill
                        className={cn(avatarImageVariants())}
                        onError={onError}
                        sizes="80px"
                    />
                ) : (
                    <span className={cn(avatarFallbackVariants())}>
                        {fallback || alt?.charAt(0) || "?"}
                    </span>
                )}
            </div>
        );
    }
);

Avatar.displayName = "Avatar";