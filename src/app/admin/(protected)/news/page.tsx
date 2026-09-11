import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { deleteNewsAction } from "@/app/admin/actions";
import DeleteButton from "@/components/delete-button";
import { PencilIcon, PlusIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">最新消息</h1>
          <p className="mt-1 text-sm text-slate-500">共 {news.length} 条消息</p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <PlusIcon className="h-4 w-4" />
          发布消息
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-slate-400">暂无消息，点击右上角「发布消息」开始。</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {news.map((n) => (
            <div
              key={n.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              {/* <div className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:block">
                {n.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={n.images[0]} alt={n.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">无图</div>
                )}
              </div> */}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900">{n.title}</p>
                <p className="mt-1 line-clamp-1 text-sm text-slate-500">{n.summary}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {n.publisher} · {formatDateTime(n.publishedAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/admin/news/${n.id}/edit`}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                  编辑
                </Link>
                <DeleteButton id={n.id} action={deleteNewsAction} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
