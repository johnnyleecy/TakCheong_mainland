import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/jsonld";
import { SITE_URL, siteConfig } from "@/lib/site";
import { services, serviceProcess } from "@/lib/services";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "水电维修 · 水管瓷砖门窗油漆 · 快速上门",
  description:
    "德昌五金提供水电维修、水管维修、瓷砖维修、门窗维修、墙面油漆及商业装修维修等一站式上门服务，持牌师傅经验丰富、报价透明，欢迎预约。",
  alternates: { canonical: "/repair" },
};

const highlights = [
  { title: "持牌师傅", desc: "经验丰富，施工安全规范，放心委托。" },
  { title: "报价透明", desc: "先报价后施工，绝无隐藏收费。" },
  { title: "快速上门", desc: "一个电话，尽快安排师傅上门。" },
  { title: "售后保障", desc: "完工验收，售后跟进到底。" },
];

const generalFaq = [
  {
    q: "服务范围覆盖哪些地区？",
    a: "服务范围覆盖香港全境（九龙、新界、港岛），并欢迎内地及大湾区客户通过微信咨询。",
  },
  {
    q: "如何预约维修服务？",
    a: "可拨打我们的电话，或通过微信公众号及网站上的预约表单留下资料，我们会尽快与您联系确认时间。",
  },
  {
    q: "维修费用如何计算？",
    a: "师傅上门检查后会提供清晰报价，双方确认后再施工，报价含人工，材料费按实际用量另计或包工包料。",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: generalFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "德昌五金维修服务项目",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `${SITE_URL}/repair/${s.slug}`,
  })),
};

export default function RepairPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={servicesJsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
              20 年老字号 · 持牌师傅
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              水电维修，一个电话，快速上门
            </h1>
            <p className="mt-4 text-lg text-brand-50">
              德昌五金扎根香港深水埗逾 20 年，提供水电、水管、瓷砖、门窗、油漆及商业装修等一站式维修服务，
              报价透明、施工规范，让维修变简单。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm hover:bg-brand-50"
              >
                立即预约
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              {/* <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <PhoneIcon className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a> */}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-100">
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" /> 周一至周六 09:00–19:00
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="h-4 w-4" /> 香港：{siteConfig.address}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="h-4 w-4" /> 内地：{siteConfig.mainlandAddress}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 服務項目 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">一站式维修服务</h2>
          <p className="mt-3 text-slate-500">
            家居与商铺常见问题，我们都能帮您解决
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/repair/${s.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">
                    {s.name}
                  </h3>
                  <ArrowRightIcon className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                </div>
                <p className="mt-1 text-sm text-slate-500">{s.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 為何選擇我們 */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">为何选择德昌五金</h2>
            <p className="mt-3 text-slate-500">老字号口碑，值得信赖</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{h.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">预约维修流程</h2>
          <p className="mt-3 text-slate-500">简单五步，轻松搞定维修</p>
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {serviceProcess.map((p) => (
            <li key={p.step} className="relative rounded-2xl border border-slate-200 p-6">
              <span className="text-3xl font-bold text-brand-200">{p.step}</span>
              <h3 className="mt-2 font-bold text-slate-900">{p.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{p.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900">常见问题</h2>
          <div className="mt-8 space-y-4">
            {generalFaq.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                  {f.q}
                  <span className="ml-4 text-brand-600 transition group-open:rotate-45">
                    ＋
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-700 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">有维修需要？现在就预约</h2>
          <p className="mt-3 text-brand-50">
            填写预约表单，我们收到后会尽快与您联系，安排师傅上门。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              预约维修
            </Link>
            {/* <a
              href={siteConfig.phoneHref}
              className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              电话联系：{siteConfig.phoneDisplay}
            </a> */}
          </div>
        </div>
      </section>
    </>
  );
}
