import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import MiniKitProvider from "@/lib/providers/minikit-provider";
import NextAuthProvider from "@/lib/providers/next-auth-provider";

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

  return (
    <html lang="en">
      <NextAuthProvider>
        <MiniKitProvider>
          <UserProvider>
            <body className={inter.className}>{children}</body>
          </UserProvider>
        </MiniKitProvider>
      </NextAuthProvider>
    </html>
  );
}
