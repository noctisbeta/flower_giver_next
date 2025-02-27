import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flower Giver",
  description: "Send a personalized virtual flower to someone special",

  icons: {
    icon: { url: "/favicon.ico", sizes: "32x32" },
  },

  openGraph: {
    title: "Share a Flower",
    description: "Send a personalized flower message to someone special",
    images: [
      {
        url: "https://flowers.fractalfable.com/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Flower Giver - Send a personalized flower message",
      },
    ],
    url: "https://flowers.fractalfable.com",
    siteName: "Flower Giver",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Share a Flower",
    description: "Send a personalized flower message to someone special",
    images: ["https://flowers.fractalfable.com/images/preview.png"],
    site: "@fractalfable",
  },
};

export const viewport = {
  themeColor: "#ff69b4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Explicit favicon links */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
