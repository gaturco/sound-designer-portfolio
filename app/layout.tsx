import type { Metadata } from "next";
import { Providers } from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gabriel Turco - Sound Designer",
  description: "Portfólio profissional de Gabriel Turco, Sound Designer",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
