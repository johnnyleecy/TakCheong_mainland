// 聊天機器人知識庫：將網站內容整理成純文字，供 DeepSeek 作為背景資料回答
import { siteConfig, storeAddresses, socialLinks } from "@/lib/site";
import { services, serviceProcess } from "@/lib/services";
import { projects } from "@/lib/projects";

export type NewsItem = {
  title: string;
  summary: string;
  publisher?: string;
  publishedAt?: Date | string;
  sections?: { subtitle?: string; body?: string }[];
};

export function buildKnowledgeBase(news: NewsItem[] = []): string {
  const out: string[] = [];
  const add = (s = "") => out.push(s);

  add("【德昌五金官方网站资料库】");
  add("");
  add("一、公司资料");
  add(`- 名称：${siteConfig.name}（${siteConfig.nameEn}）`);
  add(`- 定位：${siteConfig.tagline}`);
  add(`- 简介：${siteConfig.description}`);
  add(`- 电话：${siteConfig.phoneDisplay}`);
  add(`- 电邮：${siteConfig.email}`);
  add("- 营业时间：周一至周六 09:00–19:00");
  for (const a of storeAddresses) {
    add(`- ${a.label}：${a.address}${a.note ? `（${a.note}）` : ""}`);
  }
  add(`- 内地门店地图：${siteConfig.mapUrl}`);
  add("");

  add("二、预约维修流程");
  for (const p of serviceProcess) {
    add(`- ${p.step} ${p.title}：${p.desc}`);
  }
  add("");

  add("三、服务项目");
  for (const s of services) {
    add(`### ${s.name}`);
    add(`- 一句话：${s.tagline}`);
    add(`- 简介：${s.summary}`);
    add(`- 服务内容：${s.points.join("、")}`);
    if (s.faq.length) {
      add("- 常见问题：");
      for (const f of s.faq) add(`  · 问：${f.q}　答：${f.a}`);
    }
    add("");
  }

  add("四、过往工作参考项目");
  for (const p of projects) {
    add(`- ${p.title}：${p.description}`);
  }
  add("");

  if (news.length) {
    add("五、最新消息");
    for (const n of news) {
      add(`- ${n.title}：${n.summary}`);
      const sections = Array.isArray(n.sections) ? n.sections : [];
      for (const sec of sections) {
        if (sec?.subtitle) add(`  · ${sec.subtitle}`);
        if (sec?.body) add(`    ${sec.body}`);
      }
    }
    add("");
  }

  add("六、五金零售");
  add(
    "- 提供螺丝、螺母、锁具、水管配件、电工配件、五金工具等零件销售；支持门市自取、区域灵活配送，以及五金店小批量多批次供货，微信／电话报料询价。",
  );
  add("");

  add("七、预约与联系方式");
  add(`- 电话预约：${siteConfig.phoneDisplay}`);
  add("- 网上预约表单：/contact 页面");
  add(`- 社交媒体：${socialLinks.map((s) => s.label).join("、")}`);
  add("");

  return out.join("\n");
}
