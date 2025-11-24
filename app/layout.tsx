import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/react-query/QueryProvider";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Orange Hotels",
  description: "Waan je in een oase van comfort en luxe bij Orange Hotels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
