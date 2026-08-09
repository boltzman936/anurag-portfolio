import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anurag Kumar — Full-Stack Developer",
  description:
    "Anurag Kumar builds digital products, interfaces and systems that actually ship. Full-stack developer working across the web and AI.",
  metadataBase: new URL("https://anuragkumar.dev"),
  openGraph: {
    title: "Anurag Kumar — Full-Stack Developer",
    description:
      "Anurag Kumar builds digital products, interfaces and systems that actually ship.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
