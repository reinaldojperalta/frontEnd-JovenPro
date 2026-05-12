"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Badge } from "@/components/atoms/Badge";
import { Input } from "@/components/atoms/Input";
import { Heading } from "@/components/atoms/Typography/Heading";
import { Text } from "@/components/atoms/Typography/Text";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Avatar } from "@/components/atoms/Avatar";
import { StarRating } from "@/components/atoms/StarRating";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SearchBar } from "@/components/molecules/SearchBar";
import { PaginationDots } from "@/components/molecules/PaginationDots";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import { VideoCard } from "@/components/molecules/VideoCard";
import { NewsCard } from "@/components/molecules/NewsCard";
import { cn } from "@/lib/utils";
import {
    ArrowRight,
    Star,
    Search,
    Menu,
    X,
    ShoppingCart,
    Play,
} from "lucide-react";
import { products, testimonials, videos, newsItems } from "@/lib/data";

/* ============================================================
 * V2 ATOM + MOLECULE PLAYGROUND
 * ============================================================
 * Scope: Átomos y moléculas consumidos por HomeTemplateV2
 * Patrón: Cada componente tiene su propio panel con useState local.
 * Futuro: Extender a organismos y templates.
 * ============================================================ */

export function DebugTemplate() {
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    <h1 className="font-headline text-xl font-black tracking-tighter text-foreground">
                        V2 Playground
                    </h1>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                        Atoms + Molecules
                    </span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16">
                {/* ÁTOMOS */}
                <div className="space-y-4">
                    <h2 className="font-headline text-2xl font-black text-foreground tracking-tighter">
                        Átomos
                    </h2>
                    <div className="w-16 h-1 bg-primary rounded-full" />
                </div>
                <ButtonPlayground />
                <IconButtonPlayground />
                <BadgePlayground />
                <InputPlayground />
                <HeadingPlayground />
                <TextPlayground />
                <ContainerPlayground />
                <AvatarPlayground />
                <StarRatingPlayground />
                <SectionPlayground />

                {/* MOLÉCULAS */}
                <div className="space-y-4 pt-8">
                    <h2 className="font-headline text-2xl font-black text-foreground tracking-tighter">
                        Moléculas
                    </h2>
                    <div className="w-16 h-1 bg-secondary rounded-full" />
                </div>
                <ProductCardPlayground />
                <SearchBarPlayground />
                <PaginationDotsPlayground />
                <TestimonialCardPlayground />
                <VideoCardPlayground />
                <NewsCardPlayground />
            </main>

            <footer className="border-t border-border py-8">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                    <p className="text-xs text-muted-foreground">
                        V2 Playground — {new Date().toISOString().split("T")[0]}
                    </p>
                </div>
            </footer>
        </div>
    );
}

/* ============================================================
 * PLAYGROUND PANEL — Wrapper reutilizable
 * ============================================================ */

function PlaygroundPanel({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="border border-border rounded-clay overflow-hidden">
            <div className="bg-surface-container border-b border-border px-6 py-4">
                <h3 className="font-headline text-lg font-bold text-foreground">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {children}
            </div>
        </div>
    );
}

function Controls({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-6 border-r border-border space-y-5 bg-surface-container/30">
            {children}
        </div>
    );
}

function Preview({ children }: { children: React.ReactNode }) {
    return (
        <div className="lg:col-span-2 p-6 bg-background flex items-center justify-center min-h-[280px]">
            {children}
        </div>
    );
}

/* ============================================================
 * CONTROLES REUTILIZABLES
 * ============================================================ */

function Select({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: readonly string[];
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10 px-3 bg-surface border border-border rounded-clay text-sm text-foreground focus:border-primary focus:outline-none"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

function Toggle({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <label className="flex items-center justify-between cursor-pointer h-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {label}
            </span>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={cn(
                    "w-10 h-5 rounded-full transition-colors duration-200 relative shrink-0 ml-4",
                    checked ? "bg-primary" : "bg-border"
                )}
            >
                <span
                    className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm",
                        checked ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </button>
        </label>
    );
}

function TextInput({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10 px-3 bg-surface border border-border rounded-clay text-sm text-foreground focus:border-primary focus:outline-none"
            />
        </div>
    );
}

function NumberInput({
    label,
    value,
    onChange,
    min,
    max,
}: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {label}
            </label>
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-10 px-3 bg-surface border border-border rounded-clay text-sm text-foreground focus:border-primary focus:outline-none"
            />
        </div>
    );
}

/* ============================================================
 * ÁTOMOS
 * ============================================================ */

function ButtonPlayground() {
    const [variant, setVariant] = useState("primary");
    const [size, setSize] = useState("md");
    const [isLoading, setIsLoading] = useState(false);
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [hasIcon, setHasIcon] = useState(false);
    const [iconPosition, setIconPosition] = useState<"left" | "right">("right");
    const [children, setChildren] = useState("Button");

    return (
        <PlaygroundPanel title="Button" subtitle="Variant × Size × State × Icon">
            <Controls>
                <Select
                    label="variant"
                    value={variant}
                    onChange={setVariant}
                    options={[
                        "primary",
                        "secondary",
                        "ghost",
                        "outline",
                        "success",
                        "glass",
                        "skeleton",
                    ]}
                />
                <Select label="size" value={size} onChange={setSize} options={["sm", "md", "lg"]} />
                <Toggle label="isLoading" checked={isLoading} onChange={setIsLoading} />
                <Toggle label="isFullWidth" checked={isFullWidth} onChange={setIsFullWidth} />
                <Toggle label="hasIcon" checked={hasIcon} onChange={setHasIcon} />
                {hasIcon && (
                    <Select
                        label="iconPosition"
                        value={iconPosition}
                        onChange={(v) => setIconPosition(v as "left" | "right")}
                        options={["left", "right"]}
                    />
                )}
                <TextInput label="children" value={children} onChange={setChildren} />
            </Controls>
            <Preview>
                <div className={cn("w-full", isFullWidth ? "max-w-none" : "max-w-xs")}>
                    <Button
                        variant={variant as any}
                        size={size as any}
                        isLoading={isLoading}
                        isFullWidth={isFullWidth}
                        icon={hasIcon ? <ArrowRight className="w-5 h-5" /> : undefined}
                        iconPosition={iconPosition}
                    >
                        {children}
                    </Button>
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function IconButtonPlayground() {
    const [variant, setVariant] = useState("default");
    const [size, setSize] = useState("md");
    const [isLoading, setIsLoading] = useState(false);
    const [hasNotification, setHasNotification] = useState(false);
    const [notificationColor, setNotificationColor] = useState("secondary");
    const [iconName, setIconName] = useState("Star");

    const icons: Record<string, React.ReactNode> = {
        Star: <Star className="w-5 h-5" />,
        Search: <Search className="w-5 h-5" />,
        Menu: <Menu className="w-5 h-5" />,
        X: <X className="w-5 h-5" />,
        ShoppingCart: <ShoppingCart className="w-5 h-5" />,
        Play: <Play className="w-5 h-5" />,
    };

    return (
        <PlaygroundPanel title="IconButton" subtitle="Variant × Size × State × Notification × Icon">
            <Controls>
                <Select
                    label="variant"
                    value={variant}
                    onChange={setVariant}
                    options={[
                        "default",
                        "primary",
                        "secondary",
                        "ghost",
                        "outline",
                        "circular",
                        "social",
                        "danger",
                        "whatsapp",
                        "success",
                        "skeleton",
                    ]}
                />
                <Select label="size" value={size} onChange={setSize} options={["xs", "sm", "md", "lg", "xl"]} />
                <Toggle label="isLoading" checked={isLoading} onChange={setIsLoading} />
                <Toggle label="hasNotification" checked={hasNotification} onChange={setHasNotification} />
                {hasNotification && (
                    <Select
                        label="notificationColor"
                        value={notificationColor}
                        onChange={setNotificationColor}
                        options={["primary", "secondary", "danger", "success"]}
                    />
                )}
                <Select label="icon" value={iconName} onChange={setIconName} options={Object.keys(icons)} />
            </Controls>
            <Preview>
                <IconButton
                    icon={icons[iconName] || icons.Star}
                    variant={variant as any}
                    size={size as any}
                    isLoading={isLoading}
                    hasNotification={hasNotification}
                    notificationColor={notificationColor as any}
                    aria-label="Debug"
                />
            </Preview>
        </PlaygroundPanel>
    );
}

function BadgePlayground() {
    const [variant, setVariant] = useState("default");
    const [size, setSize] = useState("md");
    const [uppercase, setUppercase] = useState(true);
    const [indicator, setIndicator] = useState(false);
    const [indicatorColor, setIndicatorColor] = useState("primary");
    const [children, setChildren] = useState("Badge");

    return (
        <PlaygroundPanel title="Badge" subtitle="Variant × Size × State × Indicator">
            <Controls>
                <Select
                    label="variant"
                    value={variant}
                    onChange={setVariant}
                    options={[
                        "default",
                        "primary",
                        "secondary",
                        "success",
                        "danger",
                        "warning",
                        "glass",
                        "new",
                        "sale",
                        "featured",
                    ]}
                />
                <Select label="size" value={size} onChange={setSize} options={["sm", "md", "lg", "xl"]} />
                <Toggle label="uppercase" checked={uppercase} onChange={setUppercase} />
                <Toggle label="indicator" checked={indicator} onChange={setIndicator} />
                {indicator && (
                    <Select
                        label="indicatorColor"
                        value={indicatorColor}
                        onChange={setIndicatorColor}
                        options={["primary", "secondary", "danger", "success"]}
                    />
                )}
                <TextInput label="children" value={children} onChange={setChildren} />
            </Controls>
            <Preview>
                <Badge
                    variant={variant as any}
                    size={size as any}
                    uppercase={uppercase}
                    indicator={indicator}
                    indicatorColor={indicatorColor as any}
                >
                    {children}
                </Badge>
            </Preview>
        </PlaygroundPanel>
    );
}

function InputPlayground() {
    const [variant, setVariant] = useState("default");
    const [size, setSize] = useState("md");
    const [state, setState] = useState("default");
    const [hasLeftIcon, setHasLeftIcon] = useState(false);
    const [hasRightIcon, setHasRightIcon] = useState(false);
    const [placeholder, setPlaceholder] = useState("Type here...");

    return (
        <PlaygroundPanel title="Input" subtitle="Variant × Size × State × Icons">
            <Controls>
                <Select
                    label="variant"
                    value={variant}
                    onChange={setVariant}
                    options={[
                        "default",
                        "filled",
                        "outline",
                        "ghost",
                        "search",
                        "error",
                        "success",
                        "skeleton",
                    ]}
                />
                <Select label="size" value={size} onChange={setSize} options={["sm", "md", "lg"]} />
                <Select label="state" value={state} onChange={setState} options={["default", "disabled", "loading"]} />
                <Toggle label="leftIcon" checked={hasLeftIcon} onChange={setHasLeftIcon} />
                <Toggle label="rightIcon" checked={hasRightIcon} onChange={setHasRightIcon} />
                <TextInput label="placeholder" value={placeholder} onChange={setPlaceholder} />
            </Controls>
            <Preview>
                <div className="w-full max-w-md">
                    <Input
                        variant={variant as any}
                        size={size as any}
                        state={state as any}
                        placeholder={placeholder}
                        leftIcon={hasLeftIcon ? <Search className="w-5 h-5" /> : undefined}
                        rightIcon={hasRightIcon ? <X className="w-5 h-5" /> : undefined}
                        disabled={state === "disabled"}
                        isLoading={state === "loading"}
                    />
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function HeadingPlayground() {
    const [level, setLevel] = useState("h2");
    const [variant, setVariant] = useState("default");
    const [italic, setItalic] = useState(false);
    const [tracking, setTracking] = useState("tighter");
    const [transform, setTransform] = useState("normal");
    const [children, setChildren] = useState("Heading");

    return (
        <PlaygroundPanel title="Heading" subtitle="Level × Variant × Style × Transform">
            <Controls>
                <Select label="level" value={level} onChange={setLevel} options={["h1", "h2", "h3", "h4", "h5", "h6"]} />
                <Select
                    label="variant"
                    value={variant}
                    onChange={setVariant}
                    options={["default", "primary", "secondary", "gradient", "muted", "inverted", "skeleton"]}
                />
                <Toggle label="italic" checked={italic} onChange={setItalic} />
                <Select label="tracking" value={tracking} onChange={setTracking} options={["tighter", "tight", "normal", "wide", "wider", "widest"]} />
                <Select label="transform" value={transform} onChange={setTransform} options={["uppercase", "lowercase", "capitalize", "normal"]} />
                <TextInput label="children" value={children} onChange={setChildren} />
            </Controls>
            <Preview>
                <div className="w-full max-w-2xl">
                    <Heading
                        level={level as any}
                        variant={variant as any}
                        italic={italic}
                        tracking={tracking as any}
                        transform={transform as any}
                    >
                        {children}
                    </Heading>
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function TextPlayground() {
    const [size, setSize] = useState("base");
    const [variant, setVariant] = useState("default");
    const [weight, setWeight] = useState("medium");
    const [align, setAlign] = useState("left");
    const [transform, setTransform] = useState("normal");
    const [truncate, setTruncate] = useState(false);
    const [lineClamp, setLineClamp] = useState("none");
    const [children, setChildren] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );

    return (
        <PlaygroundPanel title="Text" subtitle="Size × Variant × Weight × Align × Clamp">
            <Controls>
                <Select label="size" value={size} onChange={setSize} options={["xs", "sm", "md", "base", "lg", "xl", "2xl"]} />
                <Select
                    label="variant"
                    value={variant}
                    onChange={setVariant}
                    options={[
                        "default",
                        "body",
                        "lead",
                        "caption",
                        "overline",
                        "label",
                        "muted",
                        "inverted",
                        "link",
                        "success",
                        "error",
                        "warning",
                    ]}
                />
                <Select label="weight" value={weight} onChange={setWeight} options={["light", "normal", "medium", "semibold", "bold", "black"]} />
                <Select label="align" value={align} onChange={setAlign} options={["left", "center", "right"]} />
                <Select label="transform" value={transform} onChange={setTransform} options={["uppercase", "lowercase", "capitalize", "normal"]} />
                <Toggle label="truncate" checked={truncate} onChange={setTruncate} />
                <Select label="lineClamp" value={lineClamp} onChange={setLineClamp} options={["none", "1", "2", "3", "4"]} />
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        children
                    </label>
                    <textarea
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-surface border border-border rounded-clay text-sm text-foreground focus:border-primary focus:outline-none resize-none"
                    />
                </div>
            </Controls>
            <Preview>
                <div className="w-full max-w-lg">
                    <Text
                        size={size as any}
                        variant={variant as any}
                        weight={weight as any}
                        align={align as any}
                        transform={transform as any}
                        truncate={truncate}
                        lineClamp={lineClamp as any}
                    >
                        {children}
                    </Text>
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function ContainerPlayground() {
    const [size, setSize] = useState("lg");
    const [variant, setVariant] = useState("transparent");
    const [padding, setPadding] = useState("md");
    const [radius, setRadius] = useState("none");
    const [flex, setFlex] = useState(false);
    const [centered, setCentered] = useState(false);

    return (
        <PlaygroundPanel title="Container" subtitle="Size × Variant × Padding × Radius × Layout">
            <Controls>
                <Select label="size" value={size} onChange={setSize} options={["xs", "sm", "md", "lg", "xl", "full"]} />
                <Select
                    label="variant"
                    value={variant}
                    onChange={setVariant}
                    options={["transparent", "surface", "surface-container", "background", "clay", "clay-active", "bordered"]}
                />
                <Select label="padding" value={padding} onChange={setPadding} options={["none", "xs", "sm", "md", "lg", "xl", "2xl"]} />
                <Select label="radius" value={radius} onChange={setRadius} options={["none", "sm", "md", "lg", "clay", "full"]} />
                <Toggle label="flex" checked={flex} onChange={setFlex} />
                <Toggle label="centered" checked={centered} onChange={setCentered} />
            </Controls>
            <Preview>
                <div className="w-full">
                    <Container
                        size={size as any}
                        variant={variant as any}
                        padding={padding as any}
                        radius={radius as any}
                        flex={flex}
                        centered={centered}
                        className="min-h-[120px] border-2 border-dashed border-border"
                    >
                        <span className="text-sm font-semibold">Container</span>
                    </Container>
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function AvatarPlayground() {
    const [size, setSize] = useState("md");
    const [variant, setVariant] = useState("default");
    const [hasImage, setHasImage] = useState(true);
    const [fallback, setFallback] = useState("JP");

    return (
        <PlaygroundPanel title="Avatar" subtitle="Size × Variant × Image vs Fallback">
            <Controls>
                <Select label="size" value={size} onChange={setSize} options={["sm", "md", "lg", "xl"]} />
                <Select label="variant" value={variant} onChange={setVariant} options={["default", "solid", "outline"]} />
                <Toggle label="hasImage" checked={hasImage} onChange={setHasImage} />
                <TextInput label="fallback" value={fallback} onChange={setFallback} />
            </Controls>
            <Preview>
                <Avatar
                    size={size as any}
                    variant={variant as any}
                    src={hasImage ? "/images/artisans/placeholder_author.png" : undefined}
                    alt="Debug"
                    fallback={fallback}
                />
            </Preview>
        </PlaygroundPanel>
    );
}

function StarRatingPlayground() {
    const [value, setValue] = useState(3);
    const [max, setMax] = useState(5);
    const [size, setSize] = useState("sm");

    return (
        <PlaygroundPanel title="StarRating" subtitle="Value × Max × Size">
            <Controls>
                <NumberInput label="value" value={value} onChange={setValue} min={0} max={10} />
                <NumberInput label="max" value={max} onChange={setMax} min={1} max={10} />
                <Select label="size" value={size} onChange={setSize} options={["sm", "md", "lg"]} />
            </Controls>
            <Preview>
                <StarRating value={value} max={max} size={size as any} />
            </Preview>
        </PlaygroundPanel>
    );
}

function SectionPlayground() {
    const [spacing, setSpacing] = useState("lg");
    const [background, setBackground] = useState("transparent");

    return (
        <PlaygroundPanel title="Section" subtitle="Spacing × Background">
            <Controls>
                <Select label="spacing" value={spacing} onChange={setSpacing} options={["none", "sm", "md", "lg", "xl", "hero"]} />
                <Select
                    label="background"
                    value={background}
                    onChange={setBackground}
                    options={["transparent", "background", "surface", "surface-container", "surface-container-low"]}
                />
            </Controls>
            <Preview>
                <div className="w-full">
                    <Section
                        spacing={spacing as any}
                        background={background as any}
                        className="border-2 border-dashed border-border flex items-center justify-center"
                    >
                        <span className="text-sm font-semibold">
                            spacing="{spacing}" background="{background}"
                        </span>
                    </Section>
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

/* ============================================================
 * MOLÉCULAS
 * ============================================================ */

function ProductCardPlayground() {
    const [variant, setVariant] = useState("card-preview");
    const [animate, setAnimate] = useState(false);

    const product = products[0];

    return (
        <PlaygroundPanel title="ProductCard" subtitle="Variant × Animate × Product Data">
            <Controls>
                <Select
                    label="variant"
                    value={variant}
                    onChange={setVariant}
                    options={[
                        "card-full",
                        "card-min",
                        "card-preview-max",
                        "card-preview",
                        "history-slot",
                    ]}
                />
                <Toggle label="animate" checked={animate} onChange={setAnimate} />
                <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block">
                        product
                    </span>
                    <div className="text-xs text-muted-foreground space-y-1">
                        <p>
                            <span className="font-semibold text-foreground">{product.name}</span>
                        </p>
                        <p>${product.price.toLocaleString()} COP</p>
                        <p className="truncate">Status: {product.status}</p>
                    </div>
                </div>
            </Controls>
            <Preview>
                <div
                    className={cn(
                        "w-full",
                        variant === "history-slot" ? "max-w-[120px]" : "max-w-sm",
                        variant === "card-full" && "max-w-md",
                        variant === "card-min" && "max-w-xs"
                    )}
                >
                    <ProductCard
                        product={product}
                        variant={variant as any}
                        animate={animate}
                    />
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function SearchBarPlayground() {
    const [value, setValue] = useState("");
    const [variant, setVariant] = useState("clay");
    const [size, setSize] = useState("md");
    const [isOpen, setIsOpen] = useState(false);

    const suggestions = products.slice(0, 4).map((p) => ({
        id: p.id,
        label: p.name,
        category: p.category,
    }));

    return (
        <PlaygroundPanel title="SearchBar" subtitle="Variant × Size × Suggestions">
            <Controls>
                <Select
                    label="suggestionsVariant"
                    value={variant}
                    onChange={setVariant}
                    options={["default", "clay"]}
                />
                <Select
                    label="size"
                    value={size}
                    onChange={setSize}
                    options={["sm", "md", "lg", "full"]}
                />
                <Toggle label="forceOpen" checked={isOpen} onChange={setIsOpen} />
                <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block">
                        suggestions
                    </span>
                    <p className="text-xs text-muted-foreground">{suggestions.length} items from products</p>
                </div>
            </Controls>
            <Preview>
                <div className="w-full max-w-md relative z-10">
                    <SearchBar
                        value={value}
                        onChange={setValue}
                        suggestions={suggestions}
                        suggestionsVariant={variant as any}
                        size={size as any}
                        placeholder="Buscar productos..."
                        closeOnClickOutside={false}
                    />
                    {isOpen && value.length === 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                            Escribe para ver sugerencias o activa forceOpen
                        </p>
                    )}
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function PaginationDotsPlayground() {
    const [size, setSize] = useState("standard");
    const [total, setTotal] = useState(9);
    const [currentIndex, setCurrentIndex] = useState(4);

    const handleOffsetChange = (offset: number) => {
        const newIndex = ((currentIndex + offset) % total + total) % total;
        setCurrentIndex(newIndex);
    };

    return (
        <PlaygroundPanel title="PaginationDots" subtitle="Size × Total × CurrentIndex">
            <Controls>
                <Select label="size" value={size} onChange={setSize} options={["compact", "standard"]} />
                <NumberInput label="total" value={total} onChange={setTotal} min={3} max={20} />
                <NumberInput label="currentIndex" value={currentIndex} onChange={setCurrentIndex} min={0} max={total - 1} />
            </Controls>
            <Preview>
                <PaginationDots
                    size={size as any}
                    currentOffset={0}
                    onOffsetChange={handleOffsetChange}
                    total={total}
                    currentIndex={currentIndex}
                />
            </Preview>
        </PlaygroundPanel>
    );
}

function TestimonialCardPlayground() {
    const [size, setSize] = useState("default");

    const testimonial = testimonials[0];

    return (
        <PlaygroundPanel title="TestimonialCard" subtitle="Size × Testimonial Data">
            <Controls>
                <Select label="size" value={size} onChange={setSize} options={["default", "compact"]} />
                <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block">
                        testimonial
                    </span>
                    <div className="text-xs text-muted-foreground space-y-1">
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p>{testimonial.role}</p>
                        <p>Rating: {testimonial.rating}/5</p>
                    </div>
                </div>
            </Controls>
            <Preview>
                <div className="w-full max-w-md">
                    <TestimonialCard testimonial={testimonial} size={size as any} />
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function VideoCardPlayground() {
    const video = videos[0];

    return (
        <PlaygroundPanel title="VideoCard" subtitle="Video Data">
            <Controls>
                <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block">
                        video
                    </span>
                    <div className="text-xs text-muted-foreground space-y-1">
                        <p className="font-semibold text-foreground">{video.title}</p>
                        <p>Artisan: {video.artisan}</p>
                        <p>Duration: {video.duration}</p>
                        <p className="truncate">YouTube: {video.youtubeId}</p>
                    </div>
                </div>
            </Controls>
            <Preview>
                <div className="w-full max-w-md">
                    <VideoCard video={video} />
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}

function NewsCardPlayground() {
    const [variant, setVariant] = useState("featured");

    const news = newsItems[0];

    return (
        <PlaygroundPanel title="NewsCard" subtitle="Variant × News Data">
            <Controls>
                <Select label="variant" value={variant} onChange={setVariant} options={["featured", "preview"]} />
                <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block">
                        news
                    </span>
                    <div className="text-xs text-muted-foreground space-y-1">
                        <p className="font-semibold text-foreground">{news.title}</p>
                        <p>{news.category}</p>
                        <p>{news.date}</p>
                    </div>
                </div>
            </Controls>
            <Preview>
                <div className={cn("w-full", variant === "featured" ? "max-w-lg" : "max-w-md")}>
                    <NewsCard
                        data={{
                            id: news.id,
                            title: news.title,
                            excerpt: news.excerpt,
                            image: news.image,
                            category: news.category,
                            date: news.date,
                            readTime: news.readTime,
                            href: news.href,
                        }}
                        variant={variant as any}
                    />
                </div>
            </Preview>
        </PlaygroundPanel>
    );
}