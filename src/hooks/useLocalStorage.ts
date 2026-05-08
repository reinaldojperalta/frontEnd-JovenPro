// hooks/useLocalStorage.ts
"use client";

import { useState, useEffect, useCallback } from "react";

export interface UseLocalStorageOptions<T> {
    key: string;
    initialValue: T;
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
}

export function useLocalStorage<T>({
    key,
    initialValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
}: UseLocalStorageOptions<T>) {
    // Estado con lazy initialization para evitar hydration mismatch
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? deserialize(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Setter que persiste en localStorage
    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        try {
            setStoredValue((prev) => {
                const valueToStore = value instanceof Function ? value(prev) : value;
                window.localStorage.setItem(key, serialize(valueToStore));
                return valueToStore;
            });
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, serialize]);

    // Remover del localStorage
    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue] as const;
}