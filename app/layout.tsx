import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "flex flex-col"}>
        <nav className="p-6">
          <p className="text-2xl">
            <span className="text-red-200 font-semibold">drm</span>world
          </p>
        </nav>
        <main className="min-h-[calc(100svh-80px)] flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
