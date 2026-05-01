import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SunCart – Summer Essentials Store",
  description:
    "Shop premium summer essentials – sunglasses, swimwear, skincare, beach accessories, and more at unbeatable prices. Your one-stop summer store.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="summer">
      <body>
        <Toaster position="top-right" />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
