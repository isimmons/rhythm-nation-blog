;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="71477c88-5b0d-4bc2-ad6a-8aa540310224",e._sentryDebugIdIdentifier="sentry-dbid-71477c88-5b0d-4bc2-ad6a-8aa540310224")}catch(e){}}();import { a as $$Main, b as $$H1, c as $$BaseLayout } from './404_Lc-3aH9C.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getCollection, a as getCategoriesFromPosts, $ as $$CategoryList, b as $$PaginationLinks, c as $$PostsList } from './_slug__2dC7f6M1.mjs';

const $$Astro = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const page = Number(Astro2.url.searchParams.get("page")) || 1;
  const postsPerPage = Number("6");
  const start = postsPerPage * (page - 1);
  const end = start + postsPerPage;
  const allPosts = await getCollection("posts");
  const posts = allPosts.slice(start, end);
  const categories = getCategoriesFromPosts(posts);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog - Rhythm Nation", "description": "Read and learn from music producers and enthusiasts", "image": "images/drums.jpg" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "H1", $$H1, { "text": "Rhythm Nation Blog" })} ${maybeRenderHead()}<p class="text-zinc-900 text-2xl mb-24 max-sm:mb-14">
Join the community and learn from Music Producers and Enthusiasts
</p> ${renderComponent($$result3, "CategoryList", $$CategoryList, { "categories": categories, "title": "Tags" })} <div class="mb-12"> ${renderComponent($$result3, "PaginationLinks", $$PaginationLinks, { "page": page, "numberOfPosts": allPosts.length })} </div> ${renderComponent($$result3, "PostsList", $$PostsList, { "posts": posts })} <div class="mb-24"> ${renderComponent($$result3, "PaginationLinks", $$PaginationLinks, { "page": page, "numberOfPosts": allPosts.length })} </div> ` })} ` })}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/blog.astro", void 0);
const $$file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/blog.astro";
const $$url = "/blog";

export { $$Blog as default, $$file as file, $$url as url };
//# sourceMappingURL=blog_njhyzaXK.mjs.map
