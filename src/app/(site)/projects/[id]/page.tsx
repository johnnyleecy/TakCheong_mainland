import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description.slice(0, 160),
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 160),
      images: project.images[0] ? [{ url: project.images[0] }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    image: project.images,
    dateCreated: project.date,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav className="text-sm text-slate-500">
          <Link href="/projects" className="hover:text-brand-700">
            ← 返回项目列表
          </Link>
        </nav>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">{project.title}</h1>
        <p className="mt-2 text-sm text-slate-400">更新于 {formatDate(project.date)}</p>

        {project.images.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={img}
                alt={`${project.title} 图片 ${i + 1}`}
                className="w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        )}

        <div className="rich-text mt-8">
          <p className="whitespace-pre-line">{project.description}</p>
        </div>

        <div className="mt-12 rounded-2xl bg-slate-50 p-6 text-center">
          <p className="font-semibold text-slate-900">有类似的维修需要？</p>
          <p className="mt-1 text-sm text-slate-500">欢迎联系我们，安排师傅上门报价。</p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            预约维修
          </Link>
        </div>
      </div>
    </>
  );
}
