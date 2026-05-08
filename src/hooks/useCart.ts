// hooks/useCart.ts
"use client";

import { useState, useCallback } from "react";

export interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface UseCartReturn {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

export function useCart(): UseCartReturn {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = useCallback((product: Omit<CartItem, "quantity">, quantity: number = 1) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
                );
            }
            return [...prev, { ...product, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((id: number) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const updateQuantity = useCallback((id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prev) =>
            prev.map((p) => (p.id === id ? { ...p, quantity } : p))
        );
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        count,
    };
}