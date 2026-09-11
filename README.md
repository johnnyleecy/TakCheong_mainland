# 德昌五金（Tak Cheong Hardware）— 大陸版官網

一個專為 **中國內地市場** 打造的 Next.js 16 全端網站，內容全為簡體中文，
並針對 SEO／AEO 優化架構排版。含 Admin 後台（CRUD）、預約維修表單、
Gmail 自動回覆，以及基於 Vercel AI SDK + DeepSeek 的智能客服機器人。

## 技術棧

- **Next.js 16**（App Router、Turbopack）
- **TypeScript 5**
- **Tailwind CSS 4**
- **Prisma 6 + PostgreSQL**（本機）
- **nodemailer**（Gmail SMTP 自動回覆）
- **Vercel AI SDK + DeepSeek**（智能客服 Chatbot）

## 快速開始

```bash
# 1. 安裝依賴
npm install

# 2. 產生 Prisma Client
npx prisma generate

# 3. 建立資料表（本機 PostgreSQL，需先建立資料庫 takcheong_mainland）
npx prisma db push

# 4.（可選）寫入示範資料
npm run db:seed

# 5. 啟動開發伺服器
npm run dev
```

開啟 <http://localhost:3000> 即可預覽。

## 環境變數（.env）

| 變數 | 說明 |
| --- | --- |
| `DATABASE_URL` | 本機 PostgreSQL 連線字串 |
| `NEXT_PUBLIC_SITE_URL` | 網站正式域名（用於 canonical / sitemap） |
| `ADMIN_PASSWORD` | Admin 後台登入密碼 |
| `AUTH_SECRET` | 後台 Session 簽名金鑰 |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Gmail SMTP 設定（`smtp.gmail.com`、465 埠 SSL） |
| `SMTP_USER` / `SMTP_PASS` | Gmail 帳號與「應用程式密碼」 |
| `MAIL_FROM` | 寄件者信箱（應與 `SMTP_USER` 相同） |
| `ADMIN_EMAIL` | 接收預約通知的管理員信箱 |
| `DEEPSEEK_API_KEY` | DeepSeek API Key（用於智能客服機器人） |

> Gmail SMTP：`smtp.gmail.com`（465 埠 SSL）。`SMTP_PASS` 需使用「應用程式密碼」：
> 先開啟 Gmail 兩步驗證，再到「Google 帳戶 → 安全性 → 應用程式密碼」產生 16 碼密碼。
> 如無 `DEEPSEEK_API_KEY`，聊天機器人會回傳錯誤，但不影響其他功能。

## 頁面結構

- `/repair` 維修服務總覽（首頁）
- `/repair/...` 六大維修服務子頁
- `/about` 關於我們
- `/projects` 過往工作參考項目（含關鍵字搜尋）
- `/news` 最新消息
- `/hardware-order` 本地零散五金訂單
- `/contact` 預約維修表單（Gmail 自動回覆）
- 全站右下角浮動智能客服（基於網站內容回答）
- `/admin` 後台（登入後管理：消息、預約）

### Admin 後台

登入網址：`/admin/login`（密碼為 `.env` 的 `ADMIN_PASSWORD`）

- **最新消息**：標題、簡介、發佈者、發佈時間、內容（小標題＋內文為一組）之增刪改查（不含圖片）。
- **預約申請**：瀏覽所有客戶預約，標記「已處理」或刪除。

> 「過往工作參考項目」已改為靜態頁面，內容與圖片直接編輯
> `src/lib/projects.ts` 與 `public/uploads/images/projects/`，無需後台管理。

## 備註

- 「過往工作參考項目」為靜態頁面，圖片直接放在 `public/uploads/images/projects/`；
  六項服務項目圖片位於 `public/uploads/images/repair/`。
- 智能客服的 API 路由為 `/api/chat`，其回答背景資料由 `src/lib/chat-knowledge.ts`
  自動彙整網站內容（公司資料、服務、項目、最新消息），可依需要增改。
- 首頁 `/` 會重定向至 `/repair`。
