import Link from "next/link";
import NewsForm from "@/components/news-form";

export default function NewNewsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">发布最新消息</h1>
        <Link
          href="/admin/news"
          className="text-sm font-medium text-slate-500 hover:text-brand-700"
        >
          ← 返回列表
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <NewsForm />
      </div>
    </div>
  );
}
