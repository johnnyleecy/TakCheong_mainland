import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import NewsForm from "@/components/news-form";
import type { NewsSection } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) notFound();

  const sections = (news.sections as NewsSection[]) ?? [];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">编辑消息</h1>
        <Link
          href="/admin/news"
          className="text-sm font-medium text-slate-500 hover:text-brand-700"
        >
          ← 返回列表
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <NewsForm
          news={{
            id: news.id,
            title: news.title,
            summary: news.summary,
            publisher: news.publisher,
            publishedAt: news.publishedAt.toISOString(),
            sections,
          }}
        />
      </div>
    </div>
  );
}
