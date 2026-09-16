import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/jsonld";
import { SITE_URL, siteConfig, storeAddresses } from "@/lib/site";
import { CheckIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import Map from "@/components/Map"; // 引入地图组件

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "德昌五金扎根香港深水埗逾 20 年，是一家集五金零售与水电维修于一体的老字号门店，持牌师傅团队经验丰富、口碑载道。",
  alternates: { canonical: "/about" },
};

const milestones = [
  { year: "2003", text: "德昌五金在深水埗大南街开业，主营五金零售。" },
  { year: "2008", text: "拓展上门维修服务，组建持牌师傅团队。" },
  { year: "2015", text: "服务覆盖香港全境，累积大量街坊与商业客户。" },
  { year: "2024", text: "开设网上预约，让内地及大湾区客户更方便联系。" },
  { year: siteConfig.mainlandSince, text: "内地泉州门店开业，服务更贴近内地客户。" },
];

const values = [
  { title: "诚信经营", desc: "童叟无欺，明码标价，先报价后施工。" },
  { title: "工艺扎实", desc: "师傅经验老到，施工细致，追求一次做好。" },
  { title: "以客为先", desc: "急客户所急，尽快安排上门，减少不便。" },
  { title: "口碑传承", desc: "二十年老字号，靠街坊口碑口耳相传。" },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `关于${siteConfig.name}`,
  url: `${SITE_URL}/about`,
  mainEntity: { "@id": `${SITE_URL}/#business` },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />

      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">关于德昌五金</h1>
          <p className="mt-3 max-w-2xl text-brand-100">
            深水埗老字号五金行，二十年来一直陪伴街坊，从零售五金到上门维修，始终如一。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rich-text">
              <p>
                德昌五金于 2003 年在香港深水埗大南街开业，是一家集五金零售与上门维修于一体的老字号门店。
                二十多年来，我们见证着社区变迁，也凭着实惠的价格与扎实的手艺，赢得一代又一代街坊的信赖。
              </p>
              <p>
                除了门市零售各类五金零件，我们更组建了一支经验丰富、持牌专业的维修师傅团队，
                提供水电维修、水管维修、瓷砖维修、门窗维修、墙面油漆及商业装修维修等一站式服务。
                无论是家居小修小补，还是商铺翻新工程，我们都认真对待每一单工作。
              </p>
              <p>
                我们深明「街坊生意」讲的是信誉与口碑，因此坚持先报价、后施工，绝不加收隐藏费用，
                完工后更提供售后跟进，让每位客户用得安心。今天，我们亦积极拥抱互联网，
                透过微信、抖音及小红书与大家保持联系，欢迎随时咨询。
              </p>
              <p>
                {siteConfig.mainlandSince} 年，我们在福建泉州永春开设内地门店，
                将二十年老字号的工艺与口碑带到内地，服务更贴近内地客户。
              </p>
            </div>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">发展历程</h2>
            <ol className="mt-6 space-y-6 border-l-2 border-brand-200 pl-6">
              {milestones.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-brand-600" />
                  <span className="text-sm font-bold text-brand-700">{m.year}</span>
                  <p className="mt-1 text-sm text-slate-600">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">门店信息</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
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
                  <PhoneIcon className="h-4 w-4 shrink-0 text-brand-600" />
                  <p>
                    {siteConfig.phoneDisplay}
                  </p>
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-5 block rounded-lg bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700"
              >
                预约维修
              </Link>
            </div>
          </aside>
        </div>

        {/* 地圖模組：滿版，放在grid外面，6:4響應 */}
        <div className="mt-12">
          <Map />
        </div>

        {/* 價值 */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-bold text-slate-900">我们的坚持</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{v.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
