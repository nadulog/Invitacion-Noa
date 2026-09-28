import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://invitacion-noa.netlify.app"),
  title: "Noa XV | 27 de noviembre de 2026",
  description: "Te invito a compartir conmigo una noche inolvidable.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Noa XV | 27 de noviembre de 2026",
    description: "Te invito a compartir conmigo una noche inolvidable.",
    images: [{ url: "/og-noa.png", width: 1731, height: 909, alt: "Invitación a los XV de Noa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noa XV | 27 de noviembre de 2026",
    description: "Te invito a compartir conmigo una noche inolvidable.",
    images: ["/og-noa.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
