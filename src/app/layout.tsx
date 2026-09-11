import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/jsonld";
import { SITE_URL, siteConfig, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} | 香港水电维修专家 · 20 年老字号`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "水电维修",
    "水管维修",
    "瓷砖维修",
    "门窗维修",
    "墙面油漆",
    "商业装修",
    "香港维修",
    "深水埗五金",
    "德昌五金",
    "上门维修",
    "维修师傅",
    "五金零售",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | 香港水电维修专家`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | 香港水电维修专家`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  formatDetection: { telephone: true, email: true, address: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  description: siteConfig.description,
  url: SITE_URL,
  telephone: "+85265063277",
  email: siteConfig.email,
  image: `${SITE_URL}/icon.svg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "九龙深水埗大南街67号地下B铺",
    addressLocality: "深水埗",
    addressRegion: "九龙",
    addressCountry: "HK",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  areaServed: { "@type": "Place", name: "香港" },
  sameAs: socialLinks.map((s) => s.url),
};

const mainlandOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business-mainland`,
  name: `${siteConfig.name}（内地门店）`,
  alternateName: siteConfig.nameEn,
  url: SITE_URL,
  hasMap: siteConfig.mapUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "永春县桃坡镇城南街36号一楼",
    addressLocality: "泉州市",
    addressRegion: "福建省",
    addressCountry: "CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-sans">
        <JsonLd data={orgJsonLd} />
        <JsonLd data={mainlandOrgJsonLd} />
        {children}
      </body>
    </html>
  );
}
