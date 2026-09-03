import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import type { FAQItem } from "@/components/FAQ";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  faqs: FAQItem[];
};

export type Post = PostMeta & { html: string };

function readFrontmatter(slug: string) {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  return matter(raw);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const { data } = readFrontmatter(slug);
      return {
        slug,
        title: data.title as string,
        excerpt: data.excerpt as string,
        date: data.date as string,
        readTime: data.readTime as string,
        faqs: (data.faqs as FAQItem[]) ?? [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = readFrontmatter(slug);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    readTime: data.readTime as string,
    faqs: (data.faqs as FAQItem[]) ?? [],
    html: String(result),
  };
}
