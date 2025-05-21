import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEDxUW 2025 | Waterloo, ON",
  description: "TEDxUW speaker events | TEDx affiliated with University of Waterloo talks",
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
      <NavBar />
        {children}
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer /> {/* for testing */}
      </footer>
      </body>
    </html>
  );
}
