import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-7xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">页面找不到了</h1>
      <p className="mt-2 max-w-md text-slate-500">
        您访问的页面可能已被移除或链接有误，请返回首页或查看其他服务。
      </p>
      <Link
        href="/repair"
        className="mt-6 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        返回首页
      </Link>
    </div>
  );
}
