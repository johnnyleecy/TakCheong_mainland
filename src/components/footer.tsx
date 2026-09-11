import Link from "next/link";
import { siteConfig, navLinks, socialLinks, storeAddresses } from "@/lib/site";
import { services } from "@/lib/services";
import {
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

const brandStyle: Record<string, { bg: string; char: string; name: string }> = {
  wechat: { bg: "#07C160", char: "微", name: "微信公众号" },
  douyin: { bg: "#000000", char: "抖", name: "抖音" },
  xiaohongshu: { bg: "#FF2442", char: "红", name: "小红书" },
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-lg font-bold text-white">
                德
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-bold text-white">
                  {siteConfig.name}
                </span>
                <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  {siteConfig.nameEn}
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {siteConfig.tagline}。持牌师傅快速上门，报价透明，让维修变简单。
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={siteConfig.phoneHref} className="hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              {storeAddresses.map((a) => (
                <li key={a.label} className="flex items-start gap-2">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span>
                    <span className="font-medium text-slate-300">{a.label}</span>
                    {a.note && (
                      <span className="ml-2 text-xs text-brand-400">（{a.note}）</span>
                    )}
                    <span className="block text-slate-400">{a.address}</span>
                    {a.mapUrl && (
                      <a
                        href={a.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 font-medium text-brand-400 hover:text-white"
                      >
                        查看地图
                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* 快速連結 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              快速链接
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="hover:text-white">
                  预约维修
                </Link>
              </li>
            </ul>
          </div>

          {/* 服務項目 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              服务项目
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/repair/${s.slug}`} className="hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 關注我們 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              关注我们
            </h3>
            <p className="mt-4 text-sm text-slate-400">
              扫码关注，获取最新优惠与维修小贴士。
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {socialLinks.map((s) => {
                const style = brandStyle[s.key];
                return (
                  <li key={s.key}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 p-2.5 transition hover:border-slate-500 hover:bg-slate-800"
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                        style={{ backgroundColor: style.bg }}
                      >
                        {style.char}
                      </span>
                      <span className="flex-1 text-sm font-medium text-slate-200 group-hover:text-white">
                        {style.name}
                      </span>
                      <ExternalLinkIcon className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}（{siteConfig.nameEn}）版权所有
          </p>
          <p>本网站内容仅供信息参考，详情请以门店为准。</p>
        </div>
      </div>
    </footer>
  );
}
