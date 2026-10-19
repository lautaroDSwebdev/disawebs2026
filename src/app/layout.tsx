import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles-better.css";
// import "./stars.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DISAWebs | Desarrollo Web y Soluciones Digitales",
  description: "Desarrollo web totalmente personalizado para pequeños negocios, profesionales y emprendedores. Creamos experiencias digitales rápidas, modernas y optimizadas para potenciar tu marca.",
  keywords: ["desarrollo web", "creación de páginas web", "diseño web Tandil", "DISAWebs", "frontend developer", "sitios web personalizados"],
  authors: [{ name: "Lautaro Di Salvo", url: "https://www.linkedin.com/in/lautarodisalvofullstack/" }],
  creator: "Lautaro Di Salvo",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://www.disawebs.com",
    title: "DISAWebs | Desarrollo Web y Soluciones Digitales",
    description: "Desarrollo web totalmente personalizado para pequeños negocios, profesionales y emprendedores.",
    siteName: "DISAWebs",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "DISAWebs | Desarrollo Web y Soluciones Digitales",
  //   description: "Desarrollo web totalmente personalizado para potenciar tu negocio.",
  // },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
