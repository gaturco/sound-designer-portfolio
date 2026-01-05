import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Sound Designer Portfolio",
  description: "Professional sound design portfolio",
};

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background: #ffffff;
  }
  
  a {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  a:hover {
    color: #1d4ed8;
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }
  
  section {
    padding: 4rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }
  
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; margin-bottom: 1.5rem; }
  h3 { font-size: 1.5rem; margin-bottom: 1rem; }
  
  p {
    margin-bottom: 1rem;
    color: #4b5563;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{styles}</style>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
