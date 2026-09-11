// 過往工作參考項目（靜態資料，不讀取資料庫）
// 圖片請直接放在 public/uploads/images/projects/ 目錄下，
// 並在下方 images 陣列填入相對路徑，例如：
//   images: ["/uploads/images/projects/xxx-1.jpg", "/uploads/images/projects/xxx-2.jpg"]

export interface Project {
  slug: string;
  title: string;
  description: string;
  images: string[];
  date: string; // ISO 日期（yyyy-mm-dd），用於顯示「更新於」
}

export const projects: Project[] = [
  {
    slug: "sham-shui-po-rewiring",
    title: "深水埗唐楼全屋水电翻新工程",
    description:
      "为一幢楼龄逾 40 年的唐楼进行全屋水电翻新，包括重新布线、更换老化水管、升级电箱及安装漏电保护装置，并通过验收。",
    images: [],
    date: "2026-03-10",
  },
  {
    slug: "restaurant-kitchen-plumbing",
    title: "餐厅厨房水管改造工程",
    description:
      "协助本地餐厅重新规划厨房给排水，更换高压水管与隔油设备，解决长期漏水及去水堵塞问题，减少停业时间。",
    images: [],
    date: "2026-02-18",
  },
  {
    slug: "residential-tile-repair",
    title: "住宅瓷砖爆裂修补工程",
    description:
      "为多个单位处理墙身及地砖爆裂、空鼓问题，铲除旧砖、重做防水层并更换新瓷砖，兼顾美观与耐用。",
    images: [],
    date: "2026-01-25",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
