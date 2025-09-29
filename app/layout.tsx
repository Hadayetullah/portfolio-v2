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
  console.log("Node_ENV : ", process.env.NODE_ENV);
  console.log("BACKEND_API_PRODUCTION_URL : ", process.env.BACKEND_API_PRODUCTION_URL);
  console.log("NEXT_PUBLIC_BACKEND_API_PRODUCTION_URL : ", process.env.NEXT_PUBLIC_BACKEND_API_PRODUCTION_URL);
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
