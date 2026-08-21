import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA | Luxury Interior Architecture & Design Studio",
  description:
    "Bespoke interior architecture, refined materiality, and turnkey spatial transformations for discerning residences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="font-body bg-cream text-charcoal antialiased selection:bg-gold/20 selection:text-deep-warm">
        {children}
      </body>
    </html>
  );
}
