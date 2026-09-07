import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Little Date For Us ❤️",
  description: "A romantic date invitation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}