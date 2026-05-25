import { cva } from "class-variance-authority";

export const alliesRotatorVariants = cva(
    "relative w-full h-full overflow-hidden rounded-clay bg-primary flex items-center justify-center"
);

export const alliesRotatorInnerVariants = cva("relative w-full h-full flex items-center justify-center p-2 md:p-2.5");

/** ~40% más que 88%×72%: 88×1.4≈123 → 100%, 72×1.4≈101 → 100% */
export const alliesRotatorImageVariants = cva(
    "max-w-full max-h-full w-auto h-auto object-contain pointer-events-none select-none"
);
