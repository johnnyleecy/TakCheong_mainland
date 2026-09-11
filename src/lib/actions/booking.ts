"use server";

import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { siteConfig } from "@/lib/site";

export type BookingState = {
  ok: boolean;
  message: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function submitBooking(formData: FormData): Promise<BookingState> {
  const salutation = String(formData.get("salutation") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const wechat = String(formData.get("wechat") ?? "").trim();
  const serviceType = String(formData.get("serviceType") ?? "").trim();
  const preferredTime = String(formData.get("preferredTime") ?? "").trim();

  // 基本验证
  if (!salutation || !phone || !email || !serviceType || !preferredTime) {
    return { ok: false, message: "请填写所有必填栏位。" };
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return { ok: false, message: "请输入正确的电邮地址。" };
  }

  // 保存预约
  await prisma.booking.create({
    data: {
      salutation,
      phone,
      email,
      wechat: wechat || null,
      serviceType,
      preferredTime,
    },
  });

  // 自动回复邮件（给客人）+ 通知管理员
  const rows = [
    ["称呼", salutation],
    ["电话号码", phone],
    ["电邮", email],
    ["WeChat ID", wechat || "—"],
    ["维修服务类型", serviceType],
    ["理想服务日期或时段", preferredTime],
  ];

  const detailRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#6b7280;white-space:nowrap;">${escapeHtml(
          k,
        )}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#111827;">${escapeHtml(
          v,
        )}</td></tr>`,
    )
    .join("");

  const customerHtml = `
    <div style="font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#c8452c;color:#fff;padding:20px 24px;">
        <h2 style="margin:0;font-size:20px;">感谢您的预约</h2>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 16px;">${escapeHtml(salutation)}您好：</p>
        <p style="margin:0 0 16px;color:#374151;">
          感谢您预约<strong>${escapeHtml(siteConfig.name)}</strong>的维修服务，我们已收到您的申请，
          会尽快与您联系确认上门时间。以下是您的预约资料：
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${detailRows}
        </table>
        <p style="margin:16px 0 0;color:#6b7280;font-size:14px;">
          如需紧急协助，可致电 <a href="${siteConfig.phoneHref}" style="color:#c8452c;">${escapeHtml(
            siteConfig.phoneDisplay,
          )}</a>。
        </p>
        <p style="margin:24px 0 0;color:#6b7280;">${escapeHtml(siteConfig.name)} 敬上</p>
      </div>
    </div>`;

  const adminHtml = `
    <div style="font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#111827;color:#fff;padding:20px 24px;">
        <h2 style="margin:0;font-size:20px;">收到新的维修预约</h2>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${detailRows}</table>
      </div>
    </div>`;

  try {
    await sendMail({
      to: email,
      subject: `【${siteConfig.name}】已收到您的维修预约`,
      html: customerHtml,
    });

    if (process.env.ADMIN_EMAIL) {
      await sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: `【${siteConfig.name}】新维修预约通知（${serviceType}）`,
        html: adminHtml,
      });
    }
  } catch (e) {
    console.error("[booking] 寄信失败", e);
  }

  return {
    ok: true,
    message: "预约成功！我们已收到您的资料，会尽快与您联系。",
  };
}
