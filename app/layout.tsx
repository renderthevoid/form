import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNeue = localFont({
  src: "./fonts/helveticaneue.woff",
  variable: "--font-helvetica-neue",
  weight: "400",
});

const interTight = Inter_Tight({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helveticaNeue.variable} ${interTight.className}`}>

        <main>{children}</main>
      </body>
    </html>
  );
}
