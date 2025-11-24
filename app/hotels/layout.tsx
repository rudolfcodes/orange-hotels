import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Orange Hotels - Hotel Resultaten",
  description: "Ervaar ultiem comfort en luxe bij Orange Hotels.",
};

export default function HotelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
