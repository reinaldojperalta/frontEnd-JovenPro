// components/molecules/SearchBar/SearchBarSkeleton.tsx

import React from "react";
import { searchBarVariants, type SearchBarSize } from "./SearchBar.variants";
import { cn } from "@/lib/utils";
import { InputSkeleton } from "@/components/atoms/Input";

export interface SearchBarSkeletonProps {
    size?: SearchBarSize;
    suggestionCount?: number;
    className?: string;
}

export function SearchBarSkeleton({
    size = "md",
    suggestionCount = 0,
    className,
}: SearchBarSkeletonProps) {
    return (
        <div className={cn(searchBarVariants({ size, isOpen: suggestionCount > 0 }), className)}>
            <InputSkeleton size={size === "full" ? "lg" : size} hasLeftIcon={true} variant="skeleton" />
        </div>
    );
}