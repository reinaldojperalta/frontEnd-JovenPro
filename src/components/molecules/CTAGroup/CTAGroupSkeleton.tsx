// components/molecules/CTAGroup/CTAGroupSkeleton.tsx

import { ButtonSkeleton } from "@/components/atoms/Button";
import {
    ctaGroupVariants,
    type CTAGroupDirection,
    type CTAGroupAlign,
    type CTAGroupGap,
    type CTAGroupVerticalAlign,
} from "./CTAGroup.variants";
import { cn } from "@/lib/utils";

export interface CTAGroupSkeletonProps {
    direction?: CTAGroupDirection;
    align?: CTAGroupAlign;
    gap?: CTAGroupGap;
    verticalAlign?: CTAGroupVerticalAlign;
    responsive?: boolean;
    fullWidthMobile?: boolean;
    reverseOnMobile?: boolean;
    actionCount?: number;
    className?: string;
}

export function CTAGroupSkeleton({
    direction = "horizontal",
    align = "start",
    gap = "sm",
    verticalAlign = "center",
    responsive = true,
    fullWidthMobile = true,
    reverseOnMobile = false,
    actionCount = 2,
    className,
}: CTAGroupSkeletonProps) {
    return (
        <div
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
            aria-hidden="true"
        >
            {Array.from({ length: actionCount }).map((_, i) => (
                <ButtonSkeleton
                    key={i}
                    variant={i === 0 ? "primary" : "secondary"}
                    size="lg"
                    isFullWidth={responsive && fullWidthMobile}
                />
            ))}
        </div>
    );
}