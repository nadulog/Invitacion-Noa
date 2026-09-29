import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bloomdate-noa-xv.netlify.app"),
  title: "Noa XV | 27 de noviembre de 2026",
  description: "Con mucha alegría quiero invitarte a compartir conmigo una noche inolvidable: mis 15 años.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Noa XV | 27 de noviembre de 2026",
    description: "Con mucha alegría quiero invitarte a compartir conmigo una noche inolvidable: mis 15 años.",
    images: [{ url: "/og-noa.png", width: 1733, height: 907, alt: "Invitación a los XV de Noa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noa XV | 27 de noviembre de 2026",
    description: "Con mucha alegría quiero invitarte a compartir conmigo una noche inolvidable: mis 15 años.",
    images: ["/og-noa.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <Script src="/invitation-personalization.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
