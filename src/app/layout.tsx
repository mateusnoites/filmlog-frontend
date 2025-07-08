import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filmlog"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`mx-13 my-8 font-filmlog`}>
        {children}
      </body>
    </html>
  );
}
