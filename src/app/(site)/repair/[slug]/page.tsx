import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/jsonld";
import { SITE_URL, siteConfig } from "@/lib/site";
import { getService, services, serviceProcess } from "@/lib/services";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} | 快速上门报价`,
    description: service.summary,
    alternates: { canonical: `/repair/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.summary,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: `${SITE_URL}/repair` },
      {
        "@type": "ListItem",
        position: 2,
        name: service.name,
        item: `${SITE_URL}/repair/${service.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Place", name: "香港" },
    url: `${SITE_URL}/repair/${service.slug}`,
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={serviceJsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <nav className="text-sm text-brand-200">
            <Link href="/repair" className="hover:text-white">
              首页
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.name}</span>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              {service.icon}
            </span>
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">{service.name}</h1>
              <p className="mt-1 text-brand-100">{service.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="overflow-hidden rounded-2xl shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.name}
            className="h-56 w-full object-cover sm:h-72"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* 左：內容 */}
          <div className="lg:col-span-2">
            <div className="rich-text">
              {service.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">服务内容</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.points.map((pt) => (
                <li
                  key={pt}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-700">{pt}</span>
                </li>
              ))}
            </ul>

            {/* 流程 */}
            <h2 className="mt-10 text-2xl font-bold text-slate-900">维修流程</h2>
            <ol className="mt-5 space-y-4">
              {serviceProcess.map((p) => (
                <li key={p.step} className="flex gap-4 rounded-xl border border-slate-200 p-5">
                  <span className="text-2xl font-bold text-brand-200">{p.step}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* FAQ */}
            <h2 className="mt-10 text-2xl font-bold text-slate-900">常见问题</h2>
            <div className="mt-5 space-y-4">
              {service.faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-slate-200 p-5"
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

          {/* 右：聯絡卡片 */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">需要 {service.name}？</h3>
              <p className="mt-2 text-sm text-slate-500">
                即日预约，师傅尽快上门，先报价后施工。
              </p>
              <Link
                href="/contact"
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                立即预约
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <PhoneIcon className="h-4 w-4 text-brand-600" />
                {siteConfig.phoneDisplay}
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-bold text-slate-900">其他服务</h3>
              <ul className="mt-3 space-y-2">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/repair/${s.slug}`}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-700"
                      >
                        <span aria-hidden>{s.icon}</span>
                        {s.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
