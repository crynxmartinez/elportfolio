import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPost } from "@/lib/posts";
import { pageMetadata, SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/seo";
import FAQ, { faqJsonLd } from "@/components/FAQ";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title} — Raphael Martinez`,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: SITE_NAME },
    image: `${SITE_URL}${OG_IMAGE}`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <article className="mx-auto max-w-2xl px-6 pt-40 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(post.faqs)) }}
        />
      )}

      <p className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        {" · "}
        {post.readTime}
      </p>
      <h1 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">{post.title}</h1>
      <p className="mt-4 text-sm text-neutral-500">{post.excerpt}</p>

      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.faqs.length > 0 && (
        <>
          <h2 className="font-display mt-14 text-2xl text-neutral-50">Frequently asked questions</h2>
          <FAQ items={post.faqs} title="" />
        </>
      )}

      <div className="mt-16 rounded-2xl border border-white/10 bg-neutral-900/50 p-8 text-center">
        <p className="text-neutral-300">
          Want a second opinion on whether your current site is carrying that weight, or working
          against it?
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-full border border-teal-300/40 bg-teal-400/10 px-7 py-3 font-mono text-xs uppercase tracking-wide text-teal-200 hover:bg-teal-400/20"
        >
          Get an honest look
        </Link>
      </div>
    </article>
  );
}
