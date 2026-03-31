import type { Metadata } from "next";
import { Syne, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Harsh Shah | Software Engineer",
  description:
    "Software Engineer & Graduate Student at Stony Brook University. Passionate about building exceptional digital experiences with React, Next.js, and Machine Learning.",
  keywords: [
    "Harsh Shah",
    "Software Engineer",
    "Full Stack Developer",
    "Stony Brook University",
    "React",
    "Next.js",
    "Machine Learning",
  ],
  authors: [{ name: "Harsh Shah" }],
  creator: "Harsh Shah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harsh.software",
    siteName: "Harsh Shah Portfolio",
    title: "Harsh Shah | Software Engineer",
    description:
      "Software Engineer & Graduate Student at Stony Brook University. Building exceptional digital experiences.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Harsh Shah Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Shah | Software Engineer",
    description:
      "Software Engineer & Graduate Student at Stony Brook University. Building exceptional digital experiences.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/favicon-h.png",
    apple: "/images/logo192.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
