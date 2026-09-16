"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig, navLinks } from "@/lib/site";
import { services } from "@/lib/services";
import { ChevronDownIcon, MenuIcon, XIcon } from "@/components/icons";
import logoimg from "../../public/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo 左上角區塊 */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={logoimg}
            alt="网站logo"
            width={40}
            height={40}
            priority
            className="rounded object-contain"
          />
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-wide text-slate-900">
              {siteConfig.name}
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400">
              {siteConfig.nameEn}
            </span>
          </span>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-brand-700"
          >
            首页
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setSvcOpen((v) => !v)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-brand-700"
            >
              服务项目
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${svcOpen ? "rotate-180" : ""}`}
              />
            </button>
            {svcOpen && (
              <div className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/repair/${s.slug}`}
                    onClick={() => setSvcOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <span aria-hidden>{s.icon}</span>
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 右侧按钮 */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:block"
          >
            预约维修
          </Link>
          <button
            type="button"
            aria-label="打开菜单"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 移动版菜单 */}
      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            <Link
              href="/repair"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              首页
            </Link>
            <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              服务项目
            </p>
            <div className="grid grid-cols-2 gap-1">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/repair/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-brand-50"
                >
                  <span aria-hidden>{s.icon}</span>
                  {s.name}
                </Link>
              ))}
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              预约维修
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
