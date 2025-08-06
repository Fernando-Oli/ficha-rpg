import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Ficha de RPG",
  description:
    "App for you to create your first RPG sheet made by Fernando Oliveira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mcd0tkl.css"
        ></link>
      </head>
      <body className="bg-primary">
        <React.StrictMode>{children}</React.StrictMode>
      </body>
    </html>
  );
}
