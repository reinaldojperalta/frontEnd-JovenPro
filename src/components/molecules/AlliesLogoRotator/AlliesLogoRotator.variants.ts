import { cva } from "class-variance-authority";

export const alliesRotatorVariants = cva(
    "relative w-full h-full overflow-hidden rounded-clay bg-white"
);

export const alliesRotatorInnerVariants = cva("absolute inset-0 p-4 md:p-6");

export const alliesRotatorImageVariants = cva(
    "max-w-[70%] max-h-[70%] object-contain pointer-events-none select-none"
);
