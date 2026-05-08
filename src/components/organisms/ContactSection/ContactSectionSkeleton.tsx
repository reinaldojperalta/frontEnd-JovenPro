// components/organisms/ContactSection/ContactSectionSkeleton.tsx

import { ContainerSkeleton } from "@/components/atoms/Container";
import { HeadingSkeleton } from "@/components/atoms/Typography";
import { TextSkeleton } from "@/components/atoms/Typography";
import { FormFieldSkeleton } from "@/components/molecules/FormField";
import { ButtonSkeleton } from "@/components/atoms/Button";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { cn } from "@/lib/utils";

export interface ContactSectionSkeletonProps {
    className?: string;
}

export function ContactSectionSkeleton({
    className,
}: ContactSectionSkeletonProps) {
    return (
        <section className={cn("bg-background", className)} aria-hidden="true">
            <ContainerSkeleton size="lg" padding="lg" paddingY="xl">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Texto */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-2">
                            <HeadingSkeleton level="h2" width="60%" />
                            <HeadingSkeleton level="h2" width="40%" />
                        </div>

                        <TextSkeleton size="lg" lines={2} width="85%" />

                        {/* Features */}
                        <div className="space-y-4">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <SkeletonBlock width={24} height={24} radius="full" />
                                    <TextSkeleton size="base" width={160} lines={1} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:w-1/2 w-full max-w-md">
                        <div className="bg-surface-container rounded-clay p-8 shadow-clay space-y-6">
                            <FormFieldSkeleton
                                showLabel
                                showHelper={false}
                                hasLeftIcon={false}
                            />
                            <ButtonSkeleton variant="primary" size="lg" isFullWidth />
                        </div>
                    </div>
                </div>
            </ContainerSkeleton>
        </section>
    );
}