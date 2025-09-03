import type { Metadata } from "next";
import "./globals.css";
import { outfit } from "./fonts";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Portfolio | Hadayetullah",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} antialiased leading-8 overflow-x-hidden dark:bg-darktheme dark:text-white`}
      >
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
