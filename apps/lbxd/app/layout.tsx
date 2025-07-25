import "./globals.css";
import {JetBrains_Mono } from "next/font/google";

const JBM= JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${JBM.variable} font-main`}>
        {children}
      </body>
    </html>
  );
}
