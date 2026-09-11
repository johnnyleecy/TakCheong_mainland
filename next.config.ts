import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 讓 Prisma Client 與 nodemailer 以外部套件執行，避免被 Turbopack 打包
  serverExternalPackages: ["@prisma/client", "nodemailer"],
};

export default nextConfig;
