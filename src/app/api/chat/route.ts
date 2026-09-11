import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { deepseek } from "@ai-sdk/deepseek";
import { prisma } from "@/lib/db";
import { buildKnowledgeBase, type NewsItem } from "@/lib/chat-knowledge";
import { siteConfig } from "@/lib/site";

export const maxDuration = 60;

export async function POST(req: Request) {
  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  // 只保留最近幾輪對話，控制 token 用量
  const messages = Array.isArray(body?.messages)
    ? body.messages.slice(-12)
    : [];

  // 最新消息（動態資料，讀取失敗也不影響聊天）
  let news: NewsItem[] = [];
  try {
    news = (await prisma.news.findMany({
      orderBy: { publishedAt: "desc" },
      take: 10,
    })) as unknown as NewsItem[];
  } catch {
    news = [];
  }

  const knowledge = buildKnowledgeBase(news);

  const system = `你是「${siteConfig.name}」的智能客服助手。请只根据下方网站资料回答用户问题，不要编造任何资料。

回答要求：
- 使用简体中文，语气亲切、简洁、口语化。
- 优先直接回答用户的问题；涉及维修时，可结合对应服务项目的内容说明。
- 若资料中没有相关信息，礼貌说明你暂时无法确定，并建议拨打 ${siteConfig.phoneDisplay} 或到 /contact 页面预约咨询。
- 回答尽量简洁，必要时用分点列出，不要过长。

${knowledge}`;

  try {
    const modelMessages = await convertToModelMessages(messages);
    const result = streamText({
      model: deepseek(process.env.DEEPSEEK_MODEL || "deepseek-chat"),
      system,
      messages: modelMessages,
    });
    return result.toUIMessageStreamResponse();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
