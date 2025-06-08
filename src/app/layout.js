// 'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/NavBar";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: "Suspended Meal Map",
  description: "let's grow together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={`${inter.className} min-h-screen`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
