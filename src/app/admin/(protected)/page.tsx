import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [newsCount, totalBookings, newBookings, recentBookings] =
    await Promise.all([
      prisma.news.count(),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "NEW" } }),
      prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "最新消息", value: newsCount, href: "/admin/news" },
    { label: "预约总数", value: totalBookings, href: "/admin/bookings" },
    { label: "待处理预约", value: newBookings, href: "/admin/bookings", highlight: newBookings > 0 },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">概览</h1>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm text-slate-500">{s.label}</p>
            <p
              className={`mt-2 text-3xl font-bold ${
                s.highlight ? "text-brand-600" : "text-slate-900"
              }`}
            >
              {s.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 快捷操作 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">快捷操作</h2>
          <div className="mt-4 space-y-2">
            <Link
              href="/admin/news/new"
              className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
            >
              ＋ 发布最新消息
            </Link>
            <Link
              href="/admin/bookings"
              className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
            >
              处理预约申请
            </Link>
          </div>
        </div>

        {/* 最近預約 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">最近预约</h2>
            <Link href="/admin/bookings" className="text-sm font-medium text-brand-700 hover:underline">
              查看全部
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">暂无预约申请。</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {recentBookings.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {b.salutation} · {b.serviceType}
                    </p>
                    <p className="text-xs text-slate-400">{formatDateTime(b.createdAt)}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      b.status === "NEW"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {b.status === "NEW" ? "待处理" : "已处理"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
