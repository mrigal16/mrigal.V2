import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { getUser } from "@/lib/plugin";
import { UserProvider } from "@/lib/context";
import { Footer } from "./(dashboard)/layout";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Mrigal",
  description: "shkhsdhskjhdkjshk",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"], // or as needed
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="flex flex-col min-h-screen">
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
      <GoogleAnalytics gaId="G-SCQ8VZFG85" />
    </html>
  );
}
