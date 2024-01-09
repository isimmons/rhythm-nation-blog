import rss from "@astrojs/rss";
import markdownIt from "markdown-it";
import sanitizeHTML from "sanitize-html";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

const parser = markdownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  return rss({
    title: "Rhythm Nation",
    description: "A community of music producers and enthusiasts",
    site: context.site || "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      content: sanitizeHTML(parser.render(post.body)),
      image: post.data.cover.src,
    })),
  });
}
