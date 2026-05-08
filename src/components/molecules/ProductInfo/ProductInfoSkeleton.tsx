// components/molecules/ProductInfo/ProductInfoSkeleton.tsx

import { HeadingSkeleton } from "@/components/atoms/Typography";
import { TextSkeleton } from "@/components/atoms/Typography";
import { PriceSkeleton } from "@/components/atoms/Price";
import { BadgeSkeleton } from "@/components/atoms/Badge";
import {
    productInfoVariants,
    type ProductInfoLayout,
    type ProductInfoAlign,
    type ProductInfoPricePosition,
} from "./ProductInfo.variants";
import { cn } from "@/lib/utils";

export interface ProductInfoSkeletonProps {
    layout?: ProductInfoLayout;
    align?: ProductInfoAlign;
    pricePosition?: ProductInfoPricePosition;
    showBrand?: boolean;
    showDescription?: boolean;
    showBadge?: boolean;
    showDiscount?: boolean;
    className?: string;
}

export function ProductInfoSkeleton({
    layout = "default",
    align = "left",
    pricePosition = "bottom",
    showBrand = true,
    showDescription = true,
    showBadge = true,
    showDiscount = true,
    className,
}: ProductInfoSkeletonProps) {
    return (
        <div
            className={cn(
                productInfoVariants({
                    layout,
                    align,
                    pricePosition,
                    showBrand,
                    showName: true,
                    showPrice: true,
                    showDescription,
                }),
                className
            )}
            aria-hidden="true"
        >
            {/* Brand */}
            {showBrand && <TextSkeleton size="xs" width={96} lines={1} />}

            {/* Name */}
            <HeadingSkeleton level="h4" width="85%" />

            {/* Description */}
            {showDescription && <TextSkeleton size="sm" lines={2} />}

            {/* Price row */}
            <div className="flex items-center gap-2 flex-wrap">
                <PriceSkeleton
                    showOldPrice={showDiscount}
                    showDiscountBadge={showDiscount}
                />
                {showBadge && <BadgeSkeleton size="sm" />}
            </div>
        </div>
    );
}