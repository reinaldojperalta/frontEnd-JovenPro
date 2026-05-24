import { cva } from "class-variance-authority";

export const carouselSectionVariants = cva("w-full bg-surface py-10 md:py-20 overflow-hidden");
export const carouselContainerVariants = cva("max-w-[1280px] mx-auto px-4 md:px-12 flex items-stretch gap-0");

export const carouselEditorialVariants = cva("hidden md:flex w-[320px] flex-shrink-0 pr-12 flex-col justify-center");
export const carouselCategoryVariants = cva("text-[11px] font-headline font-semibold tracking-[0.12em] uppercase text-primary mb-4");
export const carouselTitleVariants = cva("text-4xl font-headline font-bold leading-[1.15] text-secondary mb-5 tracking-tight");
export const carouselDescriptionVariants = cva("text-[15px] font-body text-muted-foreground leading-relaxed mb-8");
export const carouselCtaVariants = cva("inline-flex items-center gap-2 px-6 py-3 border-[1.5px] border-secondary text-secondary text-sm font-body font-medium transition-all duration-200 hover:bg-secondary hover:text-white w-fit");

export const carouselDividerVariants = cva("hidden md:block w-px bg-border flex-shrink-0 mx-12");

export const carouselRightVariants = cva("flex-1 flex items-center relative min-w-0 w-full");
export const carouselTrackWrapperVariants = cva("w-full overflow-hidden relative touch-pan-y");
export const carouselTrackVariants = cva("flex gap-6 w-max will-change-transform animate-scroll-carousel");

export const carouselArrowVariants = cva(
    "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-[1.5px] border-secondary bg-white/90 backdrop-blur-md text-secondary flex items-center justify-center cursor-pointer z-20 transition-all duration-200 hover:bg-secondary hover:text-white",
    {
        variants: {
            direction: {
                prev: "left-2 md:-left-[22px]",
                next: "right-2 md:-right-[22px]",
            }
        }
    }
);
