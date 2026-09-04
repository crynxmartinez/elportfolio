import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog — Raphael Martinez",
  description: "Notes on premium website design, GHL systems, and building for real brands.",
  path: "/blog",
});

export default function Blog() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-300/80">Blog</p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl">Notes on the craft.</h1>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-teal-300/30 hover:bg-white/[0.04]"
          >
            {post.coverImage && (
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-7">
              <p className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                {" · "}
                {post.readTime}
              </p>
              <h2 className="font-display mt-3 text-2xl transition group-hover:text-teal-300">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{post.excerpt}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-wide text-teal-300 opacity-0 transition group-hover:opacity-100">
                Read more &rarr;
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
