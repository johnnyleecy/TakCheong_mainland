'use client'
// import type { Metadata } from "next";
import Image from "next/image";
import { useState } from "react";
import { SearchIcon, ImageIcon } from "@/components/icons";
// ========== 圖片 import (public 內圖片) ==========
import dwelling1 from "../../public/uploads/images/projects/dwelling_pic/1.jpg";
import dwelling2 from "../../public/uploads/images/projects/dwelling_pic/2.jpg";
import gate1 from "../../public/uploads/images/projects/gate_pic/1.jpg";
import gate2 from "../../public/uploads/images/projects/gate_pic/2.jpg";
import gate3 from "../../public/uploads/images/projects/gate_pic/3.jpg";
import gate4 from "../../public/uploads/images/projects/gate_pic/4.jpg";
import gate5 from "../../public/uploads/images/projects/gate_pic/5.jpg";
import walltile1 from "../../public/uploads/images/projects/walltile_pic/1.jpg";
// ========== 項目數據 ==========
const projects = [
  {
    slug: "dwelling-renovation",
    title: "家居装修工程",
    description: "全屋基础装修改造，包含墙面翻新、地面处理、空间规划，适合住宅单位翻新，做工细致耐用。",
    images: [dwelling1, dwelling2],
  },
  {
    slug: "gate-install",
    title: "闸门安装工程",
    description: "住宅大门、电动闸门安装与维修，配套五金调校，提升家居安保，安装稳固安全。",
    images: [gate1, gate2, gate3, gate4, gate5],
  },
  {
    slug: "wall-tile-repair",
    title: "墙身砖维修工程",
    description: "墙身松动瓷砖检查、修补及重贴，处理空鼓、剥落问题，还原墙面美观与防水性能。",
    images: [walltile1],
  },
];

export default function Projects() {
  const [keyword, setKeyword] = useState("");
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
          {/* 前端即時搜尋 */}
          <div className="mt-8 flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon className="h-5 w-5" />
              </span>
              <input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索项目关键词，例如：裝修、門閘、瓷磚…"
                className="w-full rounded-xl border-0 bg-white py-3.5 pl-12 pr-4 text-slate-800 shadow-sm outline-none ring-brand-300 placeholder:text-slate-400 focus:ring-2"
              />
            </div>
            {keyword && (
              <button
                onClick={() => setKeyword("")}
                className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-sm hover:bg-brand-50"
              >
                清除
              </button>
            )}
          </div>
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
        </div>
        {filteredProjects.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <ImageIcon className="h-10 w-10 text-slate-300" />
            <p className="mt-4 font-medium text-slate-600">没有找到相关项目</p>
            <p className="mt-1 text-sm text-slate-400">换个关键词再试试吧。</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filteredProjects.map((p) => (
              <div
                key={p.slug}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* 多圖片網格：自動適應 1~5張圖 */}
                <div className="p-3 pb-0">
                  <div className={`grid gap-2 ${
                    p.images.length === 1 ? "grid-cols-1"
                    : p.images.length === 2 ? "grid-cols-1"
                    : p.images.length === 3 ? "grid-cols-2"
                    : "grid-cols-2"
                  }`}>
                    {p.images.map((img, imgIdx) => {
                      // 3張圖：第一張佔2格
                      const spanClass = p.images.length === 3 && imgIdx === 0 ? "col-span-2" : "";
                      // 5張圖：第一張佔2格
                      const span5Class = p.images.length === 5 && imgIdx === 0 ? "col-span-2" : "";
                      return (
                        <div key={imgIdx} className={`aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 ${spanClass} ${span5Class}`}>
                          <Image
                            src={img}
                            alt={`${p.title} 圖片${imgIdx+1}`}
                            className="h-full w-full object-cover transition group-hover:scale-105"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="p-5 pt-3">
                  <h3 className="font-bold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
