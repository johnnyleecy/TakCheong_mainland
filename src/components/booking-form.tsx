"use client";

import { useState } from "react";
import { submitBooking } from "@/lib/actions/booking";
import { services } from "@/lib/services";
import { CheckIcon } from "@/components/icons";

const salutations = ["先生", "女士", "小姐", "其他"];

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export default function BookingForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null,
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await submitBooking(fd);
    setResult(res);
    setPending(false);
    if (res.ok) form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="salutation" className="mb-1.5 block text-sm font-medium text-slate-700">
            称呼 <span className="text-brand-600">*</span>
          </label>
          <select id="salutation" name="salutation" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              请选择
            </option>
            {salutations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
            电话号码 <span className="text-brand-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="例如：+852 6506 3277"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            电邮 <span className="text-brand-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="用于接收自动回复邮件"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="wechat" className="mb-1.5 block text-sm font-medium text-slate-700">
            WeChat ID <span className="text-slate-400">（选填）</span>
          </label>
          <input
            id="wechat"
            name="wechat"
            type="text"
            placeholder="方便我们微信联系您"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="mb-1.5 block text-sm font-medium text-slate-700">
            维修服务类型 <span className="text-brand-600">*</span>
          </label>
          <select id="serviceType" name="serviceType" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              请选择
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="其他">其他</option>
          </select>
        </div>

        <div>
          <label htmlFor="preferredTime" className="mb-1.5 block text-sm font-medium text-slate-700">
            理想的服务日期或时段 <span className="text-brand-600">*</span>
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="text"
            required
            placeholder="例如：2026-09-10 上午／周一至周五下午"
            className={inputCls}
          />
        </div>
      </div>

      {result && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            result.ok
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {result.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "提交中…" : "提交预约"}
      </button>

      <p className="flex items-start gap-2 text-xs text-slate-400">
        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
        提交后我们会以电邮发送自动回复确认，并尽快与您联系安排师傅上门。
      </p>
    </form>
  );
}
