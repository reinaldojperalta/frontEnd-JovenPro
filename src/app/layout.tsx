import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "JovenPro by ZonaPro",
  description: "Marketplace premium para el talento emprendedor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <body className={`${montserrat.variable} ${inter.variable} font-body bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}