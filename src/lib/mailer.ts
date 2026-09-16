import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export type SendResult = { ok: boolean; skipped?: boolean; error?: string };

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<SendResult> {
  const t = getTransporter();
  const from =
    process.env.MAIL_FROM || process.env.SMTP_USER || "德昌五金 <takcheonghw@gmail.com>";

  if (!t) {
    console.warn("[mailer] SMTP 未设置，跳过寄信（请在 .env 填写 Gmail 账号与应用程式密码）");
    return { ok: true, skipped: true };
  }

  try {
    await t.sendMail({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return { ok: true };
  } catch (e) {
    const err = e as Error & { code?: string };
    console.error("[mailer] 寄信失败：", err.message || err);
    if (err.code === "EAUTH") {
      console.error(
        "[mailer] Gmail 登入被拒（535 用户名或密码错误）。请确认：\n" +
          "  1. Gmail 已开启「两步验证」；\n" +
          "  2. SMTP_PASS 是「应用程式密码」（16 码，非 Gmail 登入密码）；\n" +
          "  3. 应用程式密码无空格、未过期（可到 myaccount.google.com/apppasswords 重新生成）；\n" +
          "  4. 到 Gmail 收件匣确认是否有 Google 安全提示需点「是本人」。\n" +
          "  可在项目目录执行 npm run test:mail 快速测试。",
      );
    }
    return { ok: false, error: err.message || String(e) };
  }
}
