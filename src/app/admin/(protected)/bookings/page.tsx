import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import {
  deleteBookingAction,
  updateBookingStatusAction,
} from "@/app/admin/actions";
import DeleteButton from "@/components/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  const newCount = bookings.filter((b) => b.status === "NEW").length;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">预约申请</h1>
          <p className="mt-1 text-sm text-slate-500">
            共 {bookings.length} 条 · 待处理 {newCount} 条
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-slate-400">暂无预约申请。</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">
                      {b.salutation} · {b.serviceType}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        b.status === "NEW"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {b.status === "NEW" ? "待处理" : "已处理"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    提交于 {formatDateTime(b.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <form action={updateBookingStatusAction}>
                    <input type="hidden" name="id" value={b.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={b.status === "NEW" ? "DONE" : "NEW"}
                    />
                    <button
                      type="submit"
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {b.status === "NEW" ? "标记已处理" : "标记未处理"}
                    </button>
                  </form>
                  <DeleteButton id={b.id} action={deleteBookingAction} />
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="text-xs text-slate-400">电话号码</dt>
                  <dd className="mt-0.5 text-slate-800">
                    <a href={`tel:${b.phone}`} className="hover:text-brand-700">
                      {b.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">电邮</dt>
                  <dd className="mt-0.5 break-all text-slate-800">
                    <a href={`mailto:${b.email}`} className="hover:text-brand-700">
                      {b.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">WeChat ID</dt>
                  <dd className="mt-0.5 text-slate-800">{b.wechat || "—"}</dd>
                </div>
                <div className="lg:col-span-2">
                  <dt className="text-xs text-slate-400">理想服务日期或时段</dt>
                  <dd className="mt-0.5 text-slate-800">{b.preferredTime}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
