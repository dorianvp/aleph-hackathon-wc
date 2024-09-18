import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/lib/providers/minikit-provider";
import NextAuthProvider from "@/lib/providers/next-auth-provider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patronix",
  description: "Fund your way to a bright future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../lib/providers/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );

  return (
    <html lang="en">
      <NextAuthProvider>
        <ErudaProvider>
          <MiniKitProvider>
            <body className={`${inter.className} flex flex-col min-h-screen`}>
              <main className="flex-grow">{children}</main>
            </body>
          </MiniKitProvider>
        </ErudaProvider>
      </NextAuthProvider>
    </html>
  );
}
