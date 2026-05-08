// components/molecules/SearchBar/SearchBarSkeleton.tsx

import { InputSkeleton } from "@/components/atoms/Input";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import {
    searchBarVariants,
    suggestionsVariants,
    suggestionItemVariants,
    type SearchBarSize,
    type SuggestionsVariant,
} from "./SearchBar.variants";
import { cn } from "@/lib/utils";

export interface SearchBarSkeletonProps {
    size?: SearchBarSize;
    suggestionsVariant?: SuggestionsVariant;
    suggestionCount?: number;
    className?: string;
}

export function SearchBarSkeleton({
    size = "md",
    suggestionsVariant = "clay",
    suggestionCount = 3,
    className,
}: SearchBarSkeletonProps) {
    return (
        <div
            className={cn(searchBarVariants({ size, isOpen: true }), className)}
            aria-hidden="true"
        >
            <InputSkeleton variant="search" size="md" hasLeftIcon />

            {/* Dropdown skeleton */}
            <div
                className={cn(
                    suggestionsVariants({ variant: suggestionsVariant, animation: "fade" })
                )}
            >
                {Array.from({ length: suggestionCount }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            suggestionItemVariants({
                                variant: suggestionsVariant,
                                isHighlighted: false,
                            }),
                            "pointer-events-none"
                        )}
                    >
                        <div className="flex items-center gap-4 w-full">
                            {/* Icon skeleton */}
                            <SkeletonBlock className="w-5 h-5 rounded-sm shrink-0" />
                            <div className="flex-1 space-y-2">
                                <SkeletonBlock className="h-4 w-3/5 rounded-sm" />
                                <SkeletonBlock className="h-3 w-2/5 rounded-sm" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}