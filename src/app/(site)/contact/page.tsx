import type { Metadata } from "next";
import BookingForm from "@/components/booking-form";
import JsonLd from "@/components/jsonld";
import { SITE_URL, siteConfig, storeAddresses } from "@/lib/site";
import { ClockIcon, ExternalLinkIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "预约维修服务",
  description:
    "在线预约德昌五金的维修服务，填写联系资料与服务需求，我们会尽快安排持牌师傅上门报价。",
  alternates: { canonical: "/contact" },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "预约维修服务",
  url: `${SITE_URL}/contact`,
  mainEntity: { "@id": `${SITE_URL}/#business` },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />

      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">预约维修服务</h1>
          <p className="mt-3 max-w-2xl text-brand-100">
            填写以下资料，我们会尽快与您联系，安排持牌师傅上门报价。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* 表單 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">填写预约资料</h2>
            <p className="mt-1 text-sm text-slate-500">
              带 <span className="text-brand-600">*</span> 为必填栏位
            </p>
            <div className="mt-6">
              <BookingForm />
            </div>
          </div>

          {/* 聯絡資訊 */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">联系方式</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-brand-600" />
                  <a href={siteConfig.phoneHref} className="hover:text-brand-700">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4 shrink-0 text-brand-600" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-700">
                    {siteConfig.email}
                  </a>
                </li>
                {storeAddresses.map((a) => (
                  <li key={a.label} className="flex items-start gap-2">
                    <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span>
                      <span className="font-medium text-slate-900">{a.label}</span>
                      {a.note && (
                        <span className="ml-2 text-xs text-brand-600">（{a.note}）</span>
                      )}
                      <span className="block text-slate-600">{a.address}</span>
                      {a.mapUrl && (
                        <a
                          href={a.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700"
                        >
                          查看地图
                          <ExternalLinkIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 shrink-0 text-brand-600" />
                  周一至周六 09:00–19:00
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="font-bold text-slate-900">温馨提示</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                提交预约后，系统会向您的电邮发送自动回复确认。如需即日上门，
                建议直接致电，师傅会尽快为您安排。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
