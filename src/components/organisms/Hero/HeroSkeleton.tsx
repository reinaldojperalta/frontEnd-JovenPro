// components/organisms/Hero/HeroSkeleton.tsx

import { ContainerSkeleton } from "@/components/atoms/Container";
import { BadgeSkeleton } from "@/components/atoms/Badge";
import { HeadingSkeleton } from "@/components/atoms/Typography";
import { TextSkeleton } from "@/components/atoms/Typography";
import { CTAGroupSkeleton } from "@/components/molecules/CTAGroup";
import { CardSkeleton } from "@/components/molecules/Card";
import { cn } from "@/lib/utils";

export interface HeroSkeletonProps {
    variant?: "split" | "centered" | "full";
    minHeight?: string;
    className?: string;
}

export function HeroSkeleton({
    variant = "split",
    minHeight = "95vh",
    className,
}: HeroSkeletonProps) {
    const isSplit = variant === "split";
    const isCentered = variant === "centered";

    return (
        <section
            className={cn(
                "relative flex items-center overflow-hidden bg-background",
                className
            )}
            style={{ minHeight }}
            aria-hidden="true"
        >
            <ContainerSkeleton
                size="lg"
                padding="md"
                paddingY="lg"
                className={cn(
                    "relative z-10 w-full",
                    isSplit && "flex flex-col lg:flex-row items-center gap-16",
                    isCentered && "flex flex-col items-center text-center"
                )}
            >
                {/* Contenido textual */}
                <div
                    className={cn(
                        "space-y-8",
                        isSplit && "lg:w-1/2 text-left",
                        isCentered && "max-w-3xl"
                    )}
                >
                    {/* Badge */}
                    <BadgeSkeleton size="md" />

                    {/* Título */}
                    <div className="space-y-2">
                        <HeadingSkeleton level="h1" width="70%" />
                        <HeadingSkeleton level="h1" width="50%" />
                    </div>

                    {/* Descripción */}
                    <TextSkeleton size="lg" lines={3} width="90%" />

                    {/* CTAs */}
                    <CTAGroupSkeleton
                        direction="horizontal"
                        align={isCentered ? "center" : "start"}
                        actionCount={2}
                        responsive
                        fullWidthMobile
                    />
                </div>

                {/* Imagen destacada (solo en split) */}
                {isSplit && (
                    <div className="lg:w-1/2 w-full relative">
                        <CardSkeleton
                            variant="surface"
                            radius="clay"
                            padding="none"
                            hasMedia
                            mediaAspectRatio="square"
                            mediaPosition="top"
                            contentLines={3}
                            hasFooter={false}
                            minHeight={500}
                        />
                    </div>
                )}
            </ContainerSkeleton>

            {/* Background decorativo */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
            </div>
        </section>
    );
}