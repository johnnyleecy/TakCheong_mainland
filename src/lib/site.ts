// 站點全域設定（靜態、可安全用於 Client 元件）

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.takcheong.cn";

export const siteConfig = {
  name: "德昌五金",
  nameEn: "Tak Cheong Hardware",
  tagline: "香港水电维修专家 · 20 年老字号",
  description:
    "德昌五金扎根香港深水埗逾 20 年，提供水电维修、水管维修、瓷砖维修、门窗维修、墙面油漆及商业装修维修等一站式服务，持牌师傅快速上门，欢迎微信或电话预约。",
  phoneDisplay: "+852 6506 3277",
  phoneHref: "tel:+85265063277",
  address: "香港九龙深水埗大南街67号地下B铺",
  mainlandAddress: "福建省泉州市永春县桃坡镇城南街36号一楼",
  mainlandSince: "2026",
  mapUrl: "https://j.map.baidu.com/ca/7nDM",
  email: "takcheonghw@gmail.com",
  since: "2003",
} as const;

// 門市地址（香港 + 內地）
export type StoreAddress = {
  label: string;
  address: string;
  note?: string;
  mapUrl?: string;
};

export const storeAddresses: StoreAddress[] = [
  { label: "香港门店", address: siteConfig.address, note: "2003 年开业" },
  {
    label: "内地门店",
    address: siteConfig.mainlandAddress,
    note: `${siteConfig.mainlandSince} 年新开业`,
    mapUrl: siteConfig.mapUrl,
  },
];

// 社群／聯絡管道（Footer 圖示連結）
export const socialLinks = [
  {
    key: "wechat",
    label: "微信公众号",
    url: "https://mp.weixin.qq.com/s/baUXDAjHet5oQ5ZqpFSIww",
  },
  {
    key: "douyin",
    label: "抖音",
    url: "https://v.douyin.com/ibKIqmV9whs/",
  },
  {
    key: "xiaohongshu",
    label: "小红书",
    url: "https://xhslink.cn/m/1VtV99tJdlb",
  },
] as const;

// 導覽列
export const navLinks = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "过往项目" },
  { href: "/news", label: "最新消息" },
  { href: "/hardware-order", label: "五金零售" },
  { href: "/about", label: "关于我们" },
] as const;
