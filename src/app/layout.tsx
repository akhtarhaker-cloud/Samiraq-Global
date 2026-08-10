import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://samiraqglobal.com"),
  title: "SAMIRAQ GLOBAL | Indian Spices Supplier & Exporter",
  description:
    "SAMIRAQ GLOBAL supplies premium Indian spices including Red Chilli, Turmeric, Cumin, Clove, Green Cardamom and Black Pepper from Sagar, Madhya Pradesh for domestic and international buyers.",
  openGraph: {
    title: "SAMIRAQ GLOBAL | Indian Spices Supplier & Exporter",
    description: "Premium Indian spices for domestic and international B2B buyers.",
    images: ["/images/whole-spices-hero.png"],
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
