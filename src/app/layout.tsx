import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { ScrollRestoration } from "@/components/atoms/ScrollRestoration";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-Inter",
  weight: ["400", "600", "700", "800"],
});

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | JovenPro",
    default: "JovenPro by ZonaPro - Marketplace para el talento emprendedor",
  },
  description: "Descubre productos únicos, apoya emprendedores locales y conecta con el mejor talento en nuestro marketplace premium.",
  keywords: ["marketplace", "emprendedores", "Colombia", "productos locales", "artesanías", "innovación", "JovenPro"],
  authors: [{ name: "ZonaPro" }],
  creator: "ZonaPro",
  metadataBase: new URL("https://jovenpro.com"), // Ajusta la URL a la final
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://jovenpro.com",
    siteName: "JovenPro",
    title: "JovenPro by ZonaPro | Marketplace de Emprendedores",
    description: "Marketplace premium para el talento emprendedor. Descubre productos y servicios de alta calidad.",
    images: [
      {
        url: "/images/logo/JovenPro-by-ZonaPro.png",
        width: 1200,
        height: 630,
        alt: "JovenPro by ZonaPro Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JovenPro by ZonaPro",
    description: "Marketplace premium para el talento emprendedor.",
    images: ["/images/logo/JovenPro-by-ZonaPro.png"],
  },
  icons: {
    icon: [{ url: "/images/iconpro.png", type: "image/png" }],
    apple: [{ url: "/images/iconpro.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <body className={`${montserrat.variable} ${inter.variable} font-body bg-background text-foreground antialiased`}>
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}