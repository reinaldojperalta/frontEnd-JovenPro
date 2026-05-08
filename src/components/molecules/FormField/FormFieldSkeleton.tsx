// components/molecules/FormField/FormFieldSkeleton.tsx

import { InputSkeleton } from "@/components/atoms/Input";
import {
    formFieldVariants,
    labelVariants,
    helperTextVariants,
    type FormFieldState,
    type FormFieldLayout,
    type FormFieldSize,
} from "./FormField.variants";
import { cn } from "@/lib/utils";

export interface FormFieldSkeletonProps {
    state?: FormFieldState;
    layout?: FormFieldLayout;
    size?: FormFieldSize;
    showLabel?: boolean;
    showHelper?: boolean;
    hasLeftIcon?: boolean;
    hasRightAction?: boolean;
    className?: string;
}

export function FormFieldSkeleton({
    state = "default",
    layout = "vertical",
    size = "md",
    showLabel = true,
    showHelper = true,
    hasLeftIcon = false,
    hasRightAction = false,
    className,
}: FormFieldSkeletonProps) {
    return (
        <div
            className={cn(formFieldVariants({ state, layout, size }), className)}
            aria-hidden="true"
        >
            {/* Label */}
            {showLabel && (
                <div
                    className={cn(
                        labelVariants({ size, state: "default", required: false }),
                        "block"
                    )}
                >
                    <div className="h-3 w-24 rounded-sm skeleton-block animate-pulse" />
                </div>
            )}

            {/* Input */}
            <div className="w-full">
                <InputSkeleton
                    variant="default"
                    size="md"
                    hasLeftIcon={hasLeftIcon}
                    hasRightIcon={hasRightAction}
                />
            </div>

            {/* Helper */}
            {showHelper && (
                <div className={cn(helperTextVariants({ variant: "hint" }), "block")}>
                    <div className="h-3 w-32 rounded-sm skeleton-block animate-pulse" />
                </div>
            )}
        </div>
    );
}