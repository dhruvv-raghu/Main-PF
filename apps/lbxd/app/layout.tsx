import "./globals.css";
import {JetBrains_Mono, Tektur } from "next/font/google";

const JBM= JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

const Tk= Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${JBM.variable } ${Tk.variable}`}>
        {children}
      </body>
    </html>
  );
}
