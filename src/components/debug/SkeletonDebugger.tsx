// components/debug/SkeletonDebugger.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface Metrics {
    width: number;
    height: number;
    padding: string;
    margin: string;
    gap: string;
    borderRadius: string;
}

export function SkeletonDebugger() {
    const [skeletonMetrics, setSkeletonMetrics] = useState<Record<string, Metrics>>({});
    const [realMetrics, setRealMetrics] = useState<Record<string, Metrics>>({});

    useEffect(() => {
        const extract = (prefix: string) => {
            const result: Record<string, Metrics> = {};
            document.querySelectorAll(`[data-debug="${prefix}"]`).forEach((el, i) => {
                const style = window.getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                result[`${prefix}-${i}`] = {
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                    padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
                    margin: `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`,
                    gap: style.gap,
                    borderRadius: style.borderRadius,
                };
            });
            return result;
        };

        setSkeletonMetrics(extract("skeleton"));
        setRealMetrics(extract("real"));
    }, []);

    const compare = () => {
        const keys = new Set([...Object.keys(skeletonMetrics), ...Object.keys(realMetrics)]);
        const diffs: string[] = [];

        keys.forEach(key => {
            const s = skeletonMetrics[key];
            const r = realMetrics[key.replace("skeleton", "real")];
            if (s && r) {
                if (Math.abs(s.width - r.width) > 2) diffs.push(`${key}: width ${s.width} vs ${r.width}`);
                if (Math.abs(s.height - r.height) > 2) diffs.push(`${key}: height ${s.height} vs ${r.height}`);
            }
        });

        return diffs;
    };

    return (
        <div className="fixed bottom-4 left-4 z-[9999] bg-black/90 text-green-400 p-4 rounded-lg font-mono text-xs max-w-md max-h-96 overflow-auto">
            <h3 className="font-bold mb-2 text-white">Skeleton Debug</h3>
            <div className="space-y-1">
                {compare().map((d, i) => (
                    <div key={i} className="text-yellow-400">⚠ {d}</div>
                ))}
                {compare().length === 0 && <div className="text-green-400">✅ All metrics match</div>}
            </div>
        </div>
    );
}