import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { ImageIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "最新消息",
  description:
    "德昌五金最新动态、营业安排、维修小贴士及优惠信息，掌握第一手门店消息。",
  alternates: { canonical: "/news" },
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">最新消息</h1>
          <p className="mt-3 max-w-2xl text-brand-100">
            门店动态、营业安排、维修小贴士，第一时间为你送上。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {news.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <ImageIcon className="h-10 w-10 text-slate-300" />
            <p className="mt-4 font-medium text-slate-600">暂无消息</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <Link
                key={n.id}
                href={`/news/${n.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-medium text-brand-600">{n.publisher}</span>
                  <span>·</span>
                  <span>{formatDate(n.publishedAt)}</span>
                </div>
                <h3 className="mt-2 font-bold text-slate-900 group-hover:text-brand-700">
                  {n.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">{n.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
