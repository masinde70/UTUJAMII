import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans-editorial",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif-editorial",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Utu Jamii | Stakeholder Engagement & Social Impact",
  description: "Beyond profits, building a brighter future. Utu Jamii provides premium training, facilitation, and stakeholder engagement services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${fraunces.variable} antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
