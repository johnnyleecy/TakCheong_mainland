import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { SearchIcon, ImageIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "过往工作参考项目",
  description:
    "查看德昌五金过往的水电、水管、瓷砖、门窗、油漆及商业装修等维修工程案例，了解我们的施工水平与口碑。",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const keyword = (q ?? "").trim();

  const filteredProjects = keyword
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword.toLowerCase()) ||
          p.description.toLowerCase().includes(keyword.toLowerCase()),
      )
    : projects;

  return (
    <>
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">过往工作参考项目</h1>
          <p className="mt-3 max-w-2xl text-brand-100">
            多年维修经验累积的工程案例，见证我们的工艺与口碑。
          </p>

          {/* 搜尋工具 */}
          <form
            method="get"
            action="/projects"
            className="mt-8 flex max-w-xl items-center gap-2"
          >
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon className="h-5 w-5" />
              </span>
              <input
                type="search"
                name="q"
                defaultValue={keyword}
                placeholder="搜索项目关键词，例如：水电、瓷砖、餐厅…"
                className="w-full rounded-xl border-0 bg-white py-3.5 pl-12 pr-4 text-slate-800 shadow-sm outline-none ring-brand-300 placeholder:text-slate-400 focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-sm hover:bg-brand-50"
            >
              搜索
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {keyword ? (
              <>
                与「<span className="font-semibold text-brand-700">{keyword}</span>
                」相关的项目共{" "}
                <span className="font-semibold text-slate-900">{filteredProjects.length}</span> 个
              </>
            ) : (
              <>共 <span className="font-semibold text-slate-900">{filteredProjects.length}</span> 个参考项目</>
            )}
          </p>
          {keyword && (
            <Link href="/projects" className="text-sm font-medium text-brand-700 hover:underline">
              清除搜索
            </Link>
          )}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <ImageIcon className="h-10 w-10 text-slate-300" />
            <p className="mt-4 font-medium text-slate-600">没有找到相关项目</p>
            <p className="mt-1 text-sm text-slate-400">换个关键词再试试吧。</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50 text-brand-300">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-700">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
