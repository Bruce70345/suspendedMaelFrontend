// 'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Free meal map",
  description: "let's grow together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 min-h-screen`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
