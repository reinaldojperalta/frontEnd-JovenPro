// components/templates/ProductDetailTemplate.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Header,
    Footer,
    Container,
    Heading,
    Text,
    Price,
    Button,
    IconButton,
    Badge,
    Card,
} from "@/components";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import {
    Heart,
    Share2,
    Truck,
    Shield,
    RefreshCw,
    Minus,
    Plus,
    ChevronLeft,
    Star
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Review {
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

interface RelatedProduct {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number;
    description: string;
    images: string[];
    rating: number;
    reviewCount: number;
    stock: number;
    categories: string[];
    tags?: string[];
}

export interface ProductDetailTemplateProps {
    product: Product;
    reviews: Review[];
    relatedProducts: RelatedProduct[];
    navItems: Array<{
        id: string;
        label: string;
        href: string;
    }>;
    footerColumns: Array<{
        title: string;
        links: Array<{ id: string; label: string; href: string }>;
    }>;
}

export function ProductDetailTemplate({
    product,
    reviews,
    relatedProducts,
    navItems,
    footerColumns,
}: ProductDetailTemplateProps) {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);

    const { cart, addToCart } = useCart();
    const { toggleFavorite, isFavorite: checkIsFavorite } = useFavorites();
    const isFavorite = checkIsFavorite(product.id);

    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
            },
            quantity
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                navItems={navItems}
                cartCount={cart.length}
                onCartClick={() => router.push("/carrito")}
            />

            <main className="pt-32 pb-20">
                {/* Breadcrumb */}
                <Container size="lg" padding="md" className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Volver atrás
                    </button>
                </Container>

                {/* Producto principal */}
                <Container size="lg" padding="md">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Galería de imágenes */}
                        <div className="space-y-4">
                            <div
                                className="relative aspect-square bg-surface rounded-clay overflow-hidden shadow-clay cursor-zoom-in"
                                onClick={() => setIsZoomed(!isZoomed)}
                            >
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    fill
                                    className={cn(
                                        "object-cover transition-transform duration-500",
                                        isZoomed && "scale-150"
                                    )}
                                    priority
                                />
                                {discount > 0 && (
                                    <Badge variant="danger" size="md" className="absolute top-4 left-4">
                                        -{discount}% OFF
                                    </Badge>
                                )}
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={cn(
                                            "relative w-20 h-20 rounded-clay overflow-hidden shrink-0 transition-all",
                                            selectedImage === idx
                                                ? "ring-2 ring-primary shadow-clay"
                                                : "opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Información del producto */}
                        <div className="space-y-8">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Text variant="overline">{product.brand}</Text>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="font-bold">{product.rating}</span>
                                        <span className="text-on-surface-variant">({product.reviewCount})</span>
                                    </div>
                                </div>

                                <Heading level="h2">{product.name}</Heading>

                                <Price
                                    value={product.price}
                                    oldValue={product.oldPrice}
                                    size="xl"
                                    variant={product.oldPrice ? "sale" : "default"}
                                    showDiscountBadge
                                />
                            </div>

                            {/* Descripción */}
                            <Text variant="body" className="text-lg">
                                {product.description}
                            </Text>

                            {/* Tags */}
                            {product.tags && (
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" size="sm">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Cantidad y acciones */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Selector de cantidad */}
                                <div className="flex items-center bg-surface-container rounded-clay shadow-clay-sm p-1">
                                    <IconButton
                                        icon={<Minus className="w-4 h-4" />}
                                        variant="ghost"
                                        size="sm"
                                        aria-label="Disminuir cantidad"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    />
                                    <span className="w-12 text-center font-bold">{quantity}</span>
                                    <IconButton
                                        icon={<Plus className="w-4 h-4" />}
                                        variant="ghost"
                                        size="sm"
                                        aria-label="Aumentar cantidad"
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        disabled={quantity >= product.stock}
                                    />
                                </div>

                                {/* Botones principales */}
                                <div className="flex gap-4 flex-1">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="flex-1"
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                    >
                                        {product.stock === 0 ? "Agotado" : "Agregar al Carrito"}
                                    </Button>

                                    <IconButton
                                        icon={<Heart className={cn("w-6 h-6", isFavorite && "fill-current")} />}
                                        variant={isFavorite ? "primary" : "default"}
                                        size="lg"
                                        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                                        onClick={() => toggleFavorite(product.id, !isFavorite)}
                                    />

                                    <IconButton
                                        icon={<Share2 className="w-6 h-6" />}
                                        variant="ghost"
                                        size="lg"
                                        aria-label="Compartir"
                                        onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                                    />
                                </div>
                            </div>

                            {/* Info adicional */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-surface-variant">
                                <div className="flex items-center gap-3">
                                    <Truck className="w-5 h-5 text-primary" />
                                    <Text size="sm">Envío gratis</Text>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-primary" />
                                    <Text size="sm">Garantía de calidad</Text>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RefreshCw className="w-5 h-5 text-primary" />
                                    <Text size="sm">Devolución 30 días</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Reseñas */}
                <Container size="lg" padding="md" className="mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <Heading level="h3" className="mb-8">Reseñas de Clientes</Heading>
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <Card key={review.id} variant="surface" padding="md" className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold">
                                                    {review.author[0]}
                                                </div>
                                                <div>
                                                    <Text weight="bold">{review.author}</Text>
                                                    <div className="flex">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={cn(
                                                                    "w-4 h-4",
                                                                    i < review.rating
                                                                        ? "fill-amber-400 text-amber-400"
                                                                        : "text-surface-variant"
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <Text size="xs" variant="muted">{review.date}</Text>
                                        </div>
                                        <Text variant="body">{review.comment}</Text>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Resumen de reseñas */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <Card variant="surface-container" padding="lg">
                                <Heading level="h4" className="mb-4">Resumen</Heading>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-5xl font-black">{product.rating}</span>
                                    <div>
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "w-5 h-5",
                                                        i < Math.floor(product.rating)
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-surface-variant"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <Text size="sm" variant="muted">{product.reviewCount} reseñas</Text>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Container>

                {/* Productos relacionados */}
                {relatedProducts.length > 0 && (
                    <Container size="lg" padding="md" className="mt-20">
                        <Heading level="h3" className="mb-8">También te puede interesar</Heading>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    variant="surface"
                                    padding="md"
                                    interactive
                                    onClick={() => router.push(`/producto/${product.id}`)}
                                    className="cursor-pointer"
                                >
                                    <div className="aspect-square relative mb-4 rounded-clay overflow-hidden bg-surface-container">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <Text weight="bold" className="line-clamp-1">{product.name}</Text>
                                    <Price value={product.price} size="md" />
                                </Card>
                            ))}
                        </div>
                    </Container>
                )}
            </main>

            <Footer columns={footerColumns} />
        </div>
    );
}