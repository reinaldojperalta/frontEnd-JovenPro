// components/molecules/SearchBar/SearchBar.tsx

import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Search, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import { IconButton } from "@/components/atoms/IconButton";
import { Text } from "@/components/atoms/Typography";
import {
    searchBarVariants,
    suggestionsVariants,
    suggestionItemVariants,
    type SearchBarSize,
    type SuggestionsVariant
} from "./SearchBar.variants";
import { cn } from "@/lib/utils";

// ============================================
// TIPOS DE DATOS
// ============================================

export interface SearchSuggestion {
    id: string | number;
    label: string;
    category?: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
}

// ============================================
// INTERFAZ DEL SEARCHBAR
// ============================================

export interface SearchBarProps {
    /** Valor del input */
    value: string;

    /** Callback al cambiar el input */
    onChange: (value: string) => void;

    /** Callback al seleccionar una sugerencia */
    onSelect?: (suggestion: SearchSuggestion) => void;

    /** Callback al enviar (Enter) */
    onSubmit?: (value: string) => void;

    /** Callback al limpiar */
    onClear?: () => void;

    /** Lista de sugerencias */
    suggestions?: SearchSuggestion[];

    /** Placeholder del input */
    placeholder?: string;

    /** Tamaño del componente */
    size?: SearchBarSize;

    /** Variante visual del dropdown */
    suggestionsVariant?: SuggestionsVariant;

    /** Mostrar icono de categoría en sugerencias */
    showCategoryIcon?: boolean;

    /** Mensaje cuando no hay resultados */
    emptyMessage?: string;

    /** Loading state */
    isLoading?: boolean;

    /** Deshabilitar */
    disabled?: boolean;

    /** Clases adicionales */
    className?: string;

    /** Auto-focus al montar */
    autoFocus?: boolean;

    /** Cerrar al hacer click fuera */
    closeOnClickOutside?: boolean;

    /** Mínimo de caracteres para mostrar sugerencias */
    minChars?: number;
}

// ============================================
// COMPONENTE SEARCHBAR
// ============================================

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

        // Determinar si mostrar sugerencias
        const showSuggestions = isOpen && value.length >= minChars && !disabled;

        // Filtrar sugerencias visibles
        const filteredSuggestions = suggestions.filter(s =>
            s.label.toLowerCase().includes(value.toLowerCase())
        );

        // Handlers
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
                    setHighlightedIndex(prev =>
                        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
                    break;
                case "Enter":
                    e.preventDefault();
                    if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
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

        // Click fuera para cerrar
        useEffect(() => {
            if (!closeOnClickOutside) return;

            const handleClickOutside = (e: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [closeOnClickOutside]);

        // Auto-focus
        useEffect(() => {
            if (autoFocus) {
                inputRef.current?.focus();
            }
        }, [autoFocus]);

        return (
            <div
                ref={containerRef}
                className={cn(searchBarVariants({ size, isOpen: showSuggestions }), className)}
            >
                {/* Input con iconos */}
                <div className="relative">
                    <Input
                        ref={inputRef}
                        variant="search"
                        size="md"
                        leftIcon={<Search className="w-5 h-5" />}
                        rightIcon={
                            value ? (
                                <IconButton
                                    icon={<X className="w-4 h-4" />}
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Limpiar búsqueda"
                                    onClick={handleClear}
                                    className="opacity-50 hover:opacity-100"
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
                        className="w-full"
                    />
                </div>

                {/* Dropdown de sugerencias */}
                {showSuggestions && (
                    <div className={cn(suggestionsVariants({ variant: suggestionsVariant }))}>
                        {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((suggestion, index) => (
                                <div
                                    key={suggestion.id}
                                    className={cn(
                                        suggestionItemVariants({
                                            variant: suggestionsVariant,
                                            isHighlighted: index === highlightedIndex
                                        })
                                    )}
                                    onClick={() => handleSelect(suggestion)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                >
                                    <div className="flex items-center gap-4">
                                        {showCategoryIcon && (
                                            suggestion.icon || <ShoppingBag className="w-5 h-5 text-primary" />
                                        )}
                                        <div>
                                            <Text size="sm" weight="bold" className="line-clamp-1">
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
                                        <ArrowRight className="w-4 h-4 text-primary opacity-60" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-4">
                                <Text variant="caption" className="italic">
                                    {emptyMessage}
                                </Text>
                            </div>
                        )}
                    </div>
                )}

                {/* Overlay para cerrar al hacer click fuera */}
                {showSuggestions && (
                    <div
                        className="fixed inset-0 z-50 pointer-events-none"
                        aria-hidden="true"
                    />
                )}
            </div>
        );
    }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };