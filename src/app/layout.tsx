import type { Metadata } from "next";
import { Inter } from "next/font/google";

import '/public/css/global.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPG Playground",
  description: "Um playground para jogar seu rpg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
