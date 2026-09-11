import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/jsonld";
import { siteConfig } from "@/lib/site";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "本地零散五金订单 · 小批量灵活供货",
  description:
    "德昌五金提供本地零散五金订单服务，支持零件销售、门市自取、区域灵活配送，以及五金店小批量、多批次供货，欢迎微信报料询价。",
  alternates: { canonical: "/hardware-order" },
};

const features = [
  {
    icon: "🔩",
    title: "零件销售",
    desc: "螺丝、螺母、锁具、水管配件、电工配件、五金工具等一应俱全，种类齐全、明码实价。",
  },
  {
    icon: "🏬",
    title: "门市自取",
    desc: "到店即买即取，现货充足无需久等，深水埗大南街门店欢迎光临。",
  },
  {
    icon: "🚚",
    title: "区域灵活配送",
    desc: "深水埗及周边区域提供灵活配送，量多更可安排送达，方便省心。",
  },
  {
    icon: "📦",
    title: "小批量 · 多批次",
    desc: "支持五金店、装修团队小批量、多批次下单，随订随补，库存灵活。",
  },
];

const audience = ["装修师傅", "物业管理", "五金店", "DIY 爱好者", "维修团队"];

const steps = [
  { title: "微信／电话报料", desc: "把需要的零件清单发给我们，说明数量与规格。" },
  { title: "快速报价", desc: "我们尽快报价，价格透明实惠。" },
  { title: "备货", desc: "确认订单后即安排备货，常用零件基本现货。" },
  { title: "自取或配送", desc: "可选择门市自取，或安排区域灵活配送。" },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "本地零散五金订单",
  description:
    "零件销售、门市自取、区域灵活配送、五金店小批量多批次供货。",
  provider: { "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.takcheong.cn"}/#business` },
  areaServed: { "@type": "Place", name: "香港深水埗及周边区域" },
};

export default function HardwareOrderPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">本地零散五金订单</h1>
          <p className="mt-3 max-w-2xl text-brand-100">
            面向装修师傅、物业、五金同行及 DIY 客户，小批量、多批次灵活供货，随订随取。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              <PhoneIcon className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              网上预约咨询
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 特色 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                {f.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 適用對象 */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900">适用对象</h2>
          <p className="mt-3 text-center text-slate-500">
            无论大批采购还是零散补货，我们都能灵活配合
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {audience.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700"
              >
                <CheckIcon className="h-4 w-4 text-brand-600" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-slate-900">订购流程</h2>
        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-slate-200 p-6">
              <span className="text-3xl font-bold text-brand-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-bold text-slate-900">{s.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-700 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">现在就来报料询价</h2>
          <p className="mt-3 text-brand-50">
            微信或电话把清单发给我们，快速报价、随订随取。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              电话联系：{siteConfig.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              网上预约咨询
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
