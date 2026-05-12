// ============================================================================
// SEARCH BAR — Molécula de búsqueda con autocomplete
// ============================================================================
// REFACTOR V3:
// - Zero inline classes:
//   • "relative" (wrapper Input) → searchBarInputWrapperVariants
//   • "w-5 h-5" (Search) → searchBarInputIconVariants
//   • "w-4 h-4" (X) → searchBarClearIconVariants
//   • "opacity-50 hover:opacity-100" (IconButton) → searchBarClearButtonVariants
//   • "w-full" (Input) → ELIMINADO. Input ya es w-full por defecto (CVA base).
//   • "flex items-center gap-4" (suggestion content) → searchBarSuggestionContentVariants
//   • "w-5 h-5 text-primary" (ShoppingBag) → searchBarSuggestionIconVariants
//   • "line-clamp-1" (Text) → Reemplazado por prop lineClamp={1} del átomo Text
//   • "w-4 h-4 text-primary opacity-60" (ArrowRight) → searchBarArrowIconVariants
//   • "p-4" (empty state) → searchBarEmptyStateVariants
//   • "italic" (empty Text) → searchBarEmptyTextVariants
//   • "fixed inset-0 z-50 pointer-events-none" (overlay) → searchBarOverlayVariants
// - Consumo de átomos validado:
//   • Input: variant="search", leftIcon/rightIcon via props. Correcto.
//   • IconButton: variant="ghost", size="sm". Correcto.
//   • Text: size, weight, variant, transform, lineClamp via props. Correcto.
//   • Badge: No se usa en este componente.
// - Tipos importados desde .variants.ts (derivados del CVA).
// ============================================================================

"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Search, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import { IconButton } from "@/components/atoms/IconButton";
import { Text } from "@/components/atoms/Typography";
import {
    searchBarVariants,
    suggestionsVariants,
    suggestionItemVariants,
    searchBarInputWrapperVariants,
    searchBarInputIconVariants,
    searchBarClearIconVariants,
    searchBarClearButtonVariants,
    searchBarSuggestionContentVariants,
    searchBarSuggestionIconVariants,
    searchBarArrowIconVariants,
    searchBarEmptyStateVariants,
    searchBarEmptyTextVariants,
    searchBarOverlayVariants,
    type SearchBarSize,
    type SuggestionsVariant,
} from "./SearchBar.variants";
import { cn } from "@/lib/utils";

export interface SearchSuggestion {
    id: string | number;
    label: string;
    category?: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
}

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSelect?: (suggestion: SearchSuggestion) => void;
    onSubmit?: (value: string) => void;
    onClear?: () => void;
    suggestions?: SearchSuggestion[];
    placeholder?: string;
    size?: SearchBarSize;
    suggestionsVariant?: SuggestionsVariant;
    showCategoryIcon?: boolean;
    emptyMessage?: string;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    autoFocus?: boolean;
    closeOnClickOutside?: boolean;
    minChars?: number;
}

const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
    (
        {
            value,
            onChange,
            onSelect,
            onSubmit,
            onClear,
            suggestions = [],
            placeholder = "Buscar...",
            size = "md",
            suggestionsVariant = "clay",
            showCategoryIcon = true,
            emptyMessage = "No se encontraron resultados...",
            isLoading = false,
            disabled = false,
            className,
            autoFocus = false,
            closeOnClickOutside = true,
            minChars = 1,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [highlightedIndex, setHighlightedIndex] = useState(-1);
        const containerRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);

        const showSuggestions = isOpen && value.length >= minChars && !disabled;
        const filteredSuggestions = suggestions.filter((s) =>
            s.label.toLowerCase().includes(value.toLowerCase())
        );

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
        };

        const handleClear = () => {
            onChange("");
            onClear?.();
            setIsOpen(false);
            setHighlightedIndex(-1);
            inputRef.current?.focus();
        };

        const handleSelect = (suggestion: SearchSuggestion) => {
            onSelect?.(suggestion);
            if (suggestion.onClick) {
                suggestion.onClick();
            }
            setIsOpen(false);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (!showSuggestions) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setHighlightedIndex((prev) =>
                        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                    break;
                case "Enter":
                    e.preventDefault();
                    if (
                        highlightedIndex >= 0 &&
                        filteredSuggestions[highlightedIndex]
                    ) {
                        handleSelect(filteredSuggestions[highlightedIndex]);
                    } else {
                        onSubmit?.(value);
                        setIsOpen(false);
                    }
                    break;
                case "Escape":
                    setIsOpen(false);
                    setHighlightedIndex(-1);
                    break;
            }
        };

        useEffect(() => {
            if (!closeOnClickOutside) return;

            const handleClickOutside = (e: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(e.target as Node)
                ) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [closeOnClickOutside]);

        useEffect(() => {
            if (autoFocus) {
                inputRef.current?.focus();
            }
        }, [autoFocus]);

        return (
            <div
                ref={containerRef}
                className={cn(
                    searchBarVariants({ size, isOpen: showSuggestions }),
                    className
                )}
            >
                <div className={cn(searchBarInputWrapperVariants())}>
                    <Input
                        ref={inputRef}
                        variant="search"
                        size="md"
                        leftIcon={
                            <Search className={cn(searchBarInputIconVariants())} />
                        }
                        rightIcon={
                            value ? (
                                <IconButton
                                    icon={<X className={cn(searchBarClearIconVariants())} />}
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Limpiar búsqueda"
                                    onClick={handleClear}
                                    className={cn(searchBarClearButtonVariants())}
                                />
                            ) : undefined
                        }
                        placeholder={placeholder}
                        value={value}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => value.length >= minChars && setIsOpen(true)}
                        disabled={disabled}
                        isLoading={isLoading}
                    />
                </div>

                {showSuggestions && (
                    <div
                        className={cn(
                            suggestionsVariants({ variant: suggestionsVariant })
                        )}
                    >
                        {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((suggestion, index) => (
                                <div
                                    key={suggestion.id}
                                    className={cn(
                                        suggestionItemVariants({
                                            variant: suggestionsVariant,
                                            isHighlighted: index === highlightedIndex,
                                        })
                                    )}
                                    onClick={() => handleSelect(suggestion)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                >
                                    <div
                                        className={cn(
                                            searchBarSuggestionContentVariants()
                                        )}
                                    >
                                        {showCategoryIcon &&
                                            (suggestion.icon || (
                                                <ShoppingBag
                                                    className={cn(
                                                        searchBarSuggestionIconVariants()
                                                    )}
                                                />
                                            ))}
                                        <div>
                                            <Text
                                                size="sm"
                                                weight="bold"
                                                lineClamp={1}
                                            >
                                                {suggestion.label}
                                            </Text>
                                            {suggestion.category && (
                                                <Text
                                                    size="xs"
                                                    variant="caption"
                                                    transform="uppercase"
                                                >
                                                    {suggestion.category}
                                                </Text>
                                            )}
                                        </div>
                                    </div>

                                    {index === highlightedIndex && (
                                        <ArrowRight
                                            className={cn(
                                                searchBarArrowIconVariants()
                                            )}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className={cn(searchBarEmptyStateVariants())}>
                                <Text
                                    variant="caption"
                                    className={cn(searchBarEmptyTextVariants())}
                                >
                                    {emptyMessage}
                                </Text>
                            </div>
                        )}
                    </div>
                )}

                {showSuggestions && (
                    <div
                        className={cn(searchBarOverlayVariants())}
                        aria-hidden="true"
                    />
                )}
            </div>
        );
    }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };