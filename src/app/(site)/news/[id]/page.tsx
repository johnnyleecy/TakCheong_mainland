import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Section = { subtitle: string; body: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) return {};
  return {
    title: news.title,
    description: news.summary.slice(0, 160),
    alternates: { canonical: `/news/${news.id}` },
    openGraph: {
      title: news.title,
      description: news.summary.slice(0, 160),
      type: "article",
      publishedTime: news.publishedAt.toISOString(),
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) notFound();

  const sections = (news.sections as Section[]) ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: news.summary,
    datePublished: news.publishedAt.toISOString(),
    dateModified: news.updatedAt.toISOString(),
    author: { "@type": "Organization", name: news.publisher },
    publisher: { "@type": "Organization", name: news.publisher },
    mainEntityOfPage: `${SITE_URL}/news/${news.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav className="text-sm text-slate-500">
          <Link href="/news" className="hover:text-brand-700">
            ← 返回消息列表
          </Link>
        </nav>

        <article className="mt-4">
          <h1 className="text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
            {news.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
            <span className="font-medium text-brand-600">{news.publisher}</span>
            <span>·</span>
            <span>{formatDateTime(news.publishedAt)}</span>
          </div>

          <p className="mt-6 rounded-2xl bg-slate-50 p-5 text-slate-600">{news.summary}</p>

          <div className="rich-text mt-8">
            {sections.map((sec, i) => (
              <section key={i}>
                {sec.subtitle && <h3>{sec.subtitle}</h3>}
                <p className="whitespace-pre-line">{sec.body}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
