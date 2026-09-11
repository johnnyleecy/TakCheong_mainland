"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { logoutAction } from "@/app/admin/actions";
import { MenuIcon, XIcon } from "@/components/icons";

const items = [
  { href: "/admin", label: "概览" },
  { href: "/admin/news", label: "最新消息" },
  { href: "/admin/bookings", label: "预约申请" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* 桌面侧边栏 */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
            德
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900">德昌五金</p>
            <p className="text-xs text-slate-400">后台管理</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${
                isActive(it.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <Link
            href="/"
            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            target="_blank"
          >
            查看网站 ↗
          </Link>
          <button
            type="button"
            disabled={pending}
            onClick={() => startTransition(() => logoutAction())}
            className="mt-1 block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            退出登录
          </button>
        </div>
      </aside>

      {/* 移动版顶栏 */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            德
          </span>
          <span className="text-sm font-bold text-slate-900">后台管理</span>
        </div>
        <button
          type="button"
          aria-label="菜单"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </header>
      {open && (
        <nav className="border-b border-slate-200 bg-white p-3 lg:hidden">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${
                isActive(it.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {it.label}
            </Link>
          ))}
          <button
            type="button"
            disabled={pending}
            onClick={() => startTransition(() => logoutAction())}
            className="mt-1 block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            退出登录
          </button>
        </nav>
      )}
    </>
  );
}
