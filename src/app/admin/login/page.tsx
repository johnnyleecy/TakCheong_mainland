"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/admin/actions";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await loginAction(fd);
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.message);
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
            德
          </span>
          <h1 className="mt-4 text-xl font-bold text-slate-900">后台管理登录</h1>
          <p className="mt-1 text-sm text-slate-500">德昌五金 · 内容管理系统</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              管理密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              placeholder="请输入管理密码"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? "登录中…" : "登录"}
          </button>
        </form>

        {/* <p className="mt-6 text-center text-xs text-slate-400">
          密码请参阅项目 .env 中的 ADMIN_PASSWORD
        </p> */}
      </div>
    </div>
  );
}
