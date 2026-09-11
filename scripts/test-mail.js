// 快速測試 SMTP 寄信：node scripts/test-mail.js
// 會讀取 .env 的 SMTP_* 設定，先驗證登入，再寄一封測試信給自己。
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

// 簡易 .env 解析（避免額外依賴 dotenv）
function loadEnv() {
  const file = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*["']?(.*?)["']?\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}
loadEnv();

async function main() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM } =
    process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.log("❌ 尚未設定 SMTP_USER / SMTP_PASS，請先編輯 .env");
    process.exit(1);
  }

  const host = SMTP_HOST || "smtp.gmail.com";
  const port = Number(SMTP_PORT || 465);
  const secure = SMTP_SECURE !== "false";

  console.log(
    `連線測試 → ${host}:${port}（${secure ? "SSL" : "STARTTLS"}）帳號 ${SMTP_USER}`,
  );

  const t = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await t.verify();
    console.log("✅ SMTP 連線與登入成功");
  } catch (e) {
    console.log("❌ SMTP 連線／登入失敗：", e.message);
    if (e.code === "EAUTH") {
      console.log("\n可能的原因與解法：");
      console.log("1. Gmail 未開啟「兩步驗證」→ 到 Google 帳戶開啟後，再產生應用程式密碼。");
      console.log("2. SMTP_PASS 填的不是「應用程式密碼」→ 要用 16 碼應用程式密碼，不是 Gmail 登入密碼。");
      console.log("3. 應用程式密碼打錯或已過期 → 到 myaccount.google.com/apppasswords 重新產生。");
      console.log("4. Google 有安全提示 → 到 Gmail 收件匣確認「是本人」後再試。");
    }
    process.exit(1);
  }

  try {
    const info = await t.sendMail({
      from: MAIL_FROM || SMTP_USER,
      to: SMTP_USER,
      subject: "✅ 德昌五金 SMTP 測試信",
      html: "<p>這是一封測試信，收到代表電郵寄送正常。</p>",
    });
    console.log("✅ 測試信已寄出 →", info.accepted.join(", "));
    console.log("（請到 Gmail 收件匣／垃圾郵件確認是否收到）");
  } catch (e) {
    console.log("❌ 寄送測試信失敗：", e.message);
    process.exit(1);
  }
}

main();
