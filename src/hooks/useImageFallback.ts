"use client";

import { useState, useCallback } from "react";

export function useImageFallback() {
    const [hasError, setHasError] = useState(false);

    const onError = useCallback(() => {
        setHasError(true);
    }, []);

    const resetError = useCallback(() => {
        setHasError(false);
    }, []);

    return { hasError, onError, resetError };
}
