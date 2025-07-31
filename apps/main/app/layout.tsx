import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const JBM = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${JBM.variable} font-main`}>{children}</body>
    </html>
  );
}
