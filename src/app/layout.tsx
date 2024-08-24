import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import MiniKitProvider from "@/lib/providers/minikit-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Hey there",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <MiniKitProvider>
        <UserProvider>
          <body className={inter.className}>{children}</body>
        </UserProvider>
      </MiniKitProvider>
    </html>
  );
}
