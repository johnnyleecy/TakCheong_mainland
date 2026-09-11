"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createNews,
  updateNews,
  type NewsSection,
} from "@/app/admin/actions";
import { PlusIcon, TrashIcon } from "@/components/icons";

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

type NewsData = {
  id: string;
  title: string;
  summary: string;
  publisher: string;
  publishedAt: string;
  sections: NewsSection[];
};

function toLocalInput(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export default function NewsForm({ news }: { news?: NewsData }) {
  const router = useRouter();
  const [title, setTitle] = useState(news?.title ?? "");
  const [summary, setSummary] = useState(news?.summary ?? "");
  const [publisher, setPublisher] = useState(news?.publisher ?? "");
  const [publishedAt, setPublishedAt] = useState(
    news ? toLocalInput(news.publishedAt) : "",
  );
  const [sections, setSections] = useState<NewsSection[]>(
    news?.sections?.length ? news.sections : [{ subtitle: "", body: "" }],
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  function updateSection(i: number, key: keyof NewsSection, val: string) {
    setSections((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)),
    );
  }
  function addSection() {
    setSections((prev) => [...prev, { subtitle: "", body: "" }]);
  }
  function removeSection(i: number) {
    setSections((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const payload = { title, summary, publisher, publishedAt, sections };
    const res = news
      ? await updateNews({ id: news.id, ...payload })
      : await createNews(payload);
    setPending(false);
    if (res.ok) {
      router.push("/admin/news");
      router.refresh();
    } else {
      setError(res.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          标题 <span className="text-brand-600">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="例如：德昌五金｜新春营业时间安排"
          className={inputCls}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          简介 <span className="text-brand-600">*</span>
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          rows={3}
          placeholder="一句或一段话概括这条消息…"
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            发布者 <span className="text-brand-600">*</span>
          </label>
          <input
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
            placeholder="例如：德昌五金"
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            发布时间 <span className="text-brand-600">*</span>
          </label>
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            required
            className={inputCls}
          />
        </div>
      </div>

      {/* 內容：小標題 + 內文 */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">
            内容介绍（小标题＋内文为一组）
          </label>
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            新增一组
          </button>
        </div>
        <div className="space-y-4">
          {sections.map((sec, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  第 {i + 1} 组
                </span>
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(i)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    删除
                  </button>
                )}
              </div>
              <input
                value={sec.subtitle}
                onChange={(e) => updateSection(i, "subtitle", e.target.value)}
                placeholder="小标题（可留空）"
                className={`${inputCls} mt-3`}
              />
              <textarea
                value={sec.body}
                onChange={(e) => updateSection(i, "body", e.target.value)}
                rows={3}
                placeholder="内文…"
                className={`${inputCls} mt-3`}
              />
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "保存中…" : news ? "保存修改" : "发布消息"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/news")}
          className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          取消
        </button>
      </div>
    </form>
  );
}
