// components/organisms/Header/HeaderSkeleton.tsx

import { LogoSkeleton } from "@/components/atoms/Logo";
import { IconButtonSkeleton } from "@/components/atoms/IconButton";
import { NavSkeleton } from "@/components/molecules/Nav";
import { SearchBarSkeleton } from "@/components/molecules/SearchBar";
import { cn } from "@/lib/utils";

export interface HeaderSkeletonProps {
    navItems?: number;
    showSearch?: boolean;
    showCart?: boolean;
    className?: string;
}

export function HeaderSkeleton({
    navItems = 3,
    showSearch = true,
    showCart = true,
    className,
}: HeaderSkeletonProps) {
    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5",
                className
            )}
            aria-hidden="true"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
                {/* Logo */}
                <LogoSkeleton size="md" />

                {/* Nav (desktop) */}
                <div className="hidden md:flex flex-1 justify-center">
                    <NavSkeleton
                        items={navItems}
                        direction="horizontal"
                        size="md"
                        itemSize="md"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {showSearch && (
                        <div className="hidden lg:block w-[300px]">
                            <SearchBarSkeleton size="sm" suggestionCount={0} />
                        </div>
                    )}
                    {showCart && (
                        <IconButtonSkeleton variant="default" size="md" />
                    )}
                </div>
            </div>
        </header>
    );
}