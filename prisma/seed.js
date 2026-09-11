// 種子資料：建立示範的「最新消息」（簡體中文）
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // 最新消息
  const news = [
    {
      title: "德昌五金｜新春营业时间安排",
      summary: "新春期间门市营业时间有所调整，请各位街坊朋友留意，提前预约维修服务。",
      publisher: "德昌五金",
      publishedAt: new Date("2026-01-20T10:00:00"),
      sections: [
        { subtitle: "营业时间调整", body: "年三十至年初三休息，年初四起照常营业，敬请留意。" },
        { subtitle: "维修预约", body: "假期期间如需维修，可先通过微信或网上表单留下资料，我们复工后会尽快回复。" },
      ],
      images: [],
    },
    {
      title: "水电维修小贴士｜如何应对跳闸",
      summary: "家中突然跳闸怎么办？师傅教你三步快速判断和处理，保障用电安全。",
      publisher: "德昌五金",
      publishedAt: new Date("2026-02-05T09:00:00"),
      sections: [
        { subtitle: "第一步：保持冷静", body: "先关掉主要电器，再检查电箱哪一路开关跳了，切勿反复强行推上。" },
        { subtitle: "第二步：排查电器", body: "逐样拔走大功率电器，再逐一推上开关，找出导致跳闸的源头。" },
        { subtitle: "第三步：求助专业", body: "如情况持续，切勿自行拆解，应立即联系持牌师傅上门检查。" },
      ],
      images: [],
    },
    {
      title: "深水埗门市新增小批量五金供货服务",
      summary: "为支援本地装修师傅与五金同行，门市新增小批量、多批次的零件供货服务，欢迎微信报料询价。",
      publisher: "德昌五金",
      publishedAt: new Date("2026-03-01T14:30:00"),
      sections: [
        { subtitle: "服务对象", body: "装修师傅、物业管理、五金店及 DIY 客户均可使用。" },
        { subtitle: "订购方式", body: "通过微信或电话报料，我们报价后备货，可门市自取或安排区域配送。" },
      ],
      images: [],
    },
  ];

  for (const n of news) {
    await prisma.news.create({ data: n });
  }

  console.log("种子数据建立完成 ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
