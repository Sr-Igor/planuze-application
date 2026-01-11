import localFont from "next/font/local";

// O caminho "src" aqui é relativo a ESTE arquivo index.ts
export const geistSans = localFont({
  src: "./typography/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = localFont({
  src: "./typography/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});
