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
  title: "Share a Flower",
  description: "Send a personalized flower message to someone special",
  themeColor: "#ffa7c4",
  openGraph: {
    title: "Share a Flower",
    description: "Send a personalized flower message to someone special",
    images: [
      {
        url: "https://flowers.fractalfable.com/public/images/preview.png",
        width: 1200,
        height: 630,
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
    images: ["https://flowers.fractalfable.com/public/images/preview.png"],
    site: "@fractalfable",
  },
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
