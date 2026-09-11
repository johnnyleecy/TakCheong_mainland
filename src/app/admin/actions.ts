"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, destroySession, isAdmin } from "@/lib/auth";

export type ActionResult = { ok: boolean; message: string };

async function requireAdmin(): Promise<boolean> {
  return isAdmin();
}

// ===== 登入 / 登出 =====
export async function loginAction(
  formData: FormData,
): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { ok: false, message: "请输入密码。" };
  if (password === process.env.ADMIN_PASSWORD) {
    await createSession();
    return { ok: true, message: "登录成功" };
  }
  return { ok: false, message: "密码错误，请重试。" };
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

// ===== 最新消息 =====
export type NewsSection = { subtitle: string; body: string };

export async function createNews(input: {
  title: string;
  summary: string;
  publisher: string;
  publishedAt: string;
  sections: NewsSection[];
}): Promise<ActionResult> {
  if (!(await requireAdmin()))
    return { ok: false, message: "登录已过期，请重新登录。" };
  const title = (input.title ?? "").trim();
  const summary = (input.summary ?? "").trim();
  const publisher = (input.publisher ?? "").trim();
  if (!title || !summary || !publisher)
    return { ok: false, message: "请填写标题、简介与发布者。" };

  const sections = (input.sections ?? [])
    .map((s) => ({
      subtitle: (s.subtitle ?? "").trim(),
      body: (s.body ?? "").trim(),
    }))
    .filter((s) => s.subtitle || s.body);

  let publishedAt = new Date(input.publishedAt);
  if (isNaN(publishedAt.getTime())) publishedAt = new Date();

  await prisma.news.create({
    data: {
      title,
      summary,
      publisher,
      publishedAt,
      sections,
    },
  });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { ok: true, message: "消息已发布。" };
}

export async function updateNews(input: {
  id: string;
  title: string;
  summary: string;
  publisher: string;
  publishedAt: string;
  sections: NewsSection[];
}): Promise<ActionResult> {
  if (!(await requireAdmin()))
    return { ok: false, message: "登录已过期，请重新登录。" };
  const title = (input.title ?? "").trim();
  const summary = (input.summary ?? "").trim();
  const publisher = (input.publisher ?? "").trim();
  if (!input.id) return { ok: false, message: "缺少消息编号。" };
  if (!title || !summary || !publisher)
    return { ok: false, message: "请填写标题、简介与发布者。" };

  const sections = (input.sections ?? [])
    .map((s) => ({
      subtitle: (s.subtitle ?? "").trim(),
      body: (s.body ?? "").trim(),
    }))
    .filter((s) => s.subtitle || s.body);

  let publishedAt = new Date(input.publishedAt);
  if (isNaN(publishedAt.getTime())) publishedAt = new Date();

  await prisma.news.update({
    where: { id: input.id },
    data: {
      title,
      summary,
      publisher,
      publishedAt,
      sections,
    },
  });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${input.id}`);
  return { ok: true, message: "消息已更新。" };
}

export async function deleteNewsAction(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.news.delete({ where: { id } }).catch(() => {});
    revalidatePath("/admin/news");
    revalidatePath("/news");
  }
}

// ===== 預約申請 =====
export async function updateBookingStatusAction(
  formData: FormData,
): Promise<void> {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "NEW");
  if (id) {
    await prisma.booking
      .update({ where: { id }, data: { status } })
      .catch(() => {});
    revalidatePath("/admin/bookings");
  }
}

export async function deleteBookingAction(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.booking.delete({ where: { id } }).catch(() => {});
    revalidatePath("/admin/bookings");
  }
}
