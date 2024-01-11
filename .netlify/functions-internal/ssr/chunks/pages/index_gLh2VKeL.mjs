;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="70504238-d40e-4505-8bf6-fcfaf6e00dfe",e._sentryDebugIdIdentifier="sentry-dbid-70504238-d40e-4505-8bf6-fcfaf6e00dfe")}catch(e){}}();import { $ as $$Image, a as $$Main, b as $$H1, c as $$BaseLayout } from './404_Lc-3aH9C.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, j as renderComponent } from '../astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$CategoryList, g as getCollection, a as getCategoriesFromPosts, c as $$PostsList } from './_slug__2dC7f6M1.mjs';

const $$Astro$1 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$FeaturedPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturedPost;
  const { post } = Astro2.props;
  const {
    slug,
    body,
    data: { title, cover, categories, date }
  } = post;
  return renderTemplate`${maybeRenderHead()}<article class="grid grid-cols-2 gap-x-12 gap-y-5 mb-28 max-lg:grid-cols-1 max-sm:mb-12"> <a${addAttribute(`/blog/${slug}`, "href")}> <span class="hidden assistive-text">${`Link to post ${title}`}</span> ${renderComponent($$result, "Image", $$Image, { "src": cover, "alt": `Link to post ${title}`, "width": 1024, "height": 1024 / 2, "format": "webp", "class": "rounded-2xl aspect-thumbnail object-cover" })} </a> <div> <div class="mb-4"> ${renderComponent($$result, "CategoryList", $$CategoryList, { "categories": categories })} </div> <a${addAttribute(`/blog/${slug}`, "href")} class="text-5xl text-zing-900 mb-4 font-bold inline-block"> <h2>${title}</h2> </a> <p class="text-zinc-500 text-2xl mb-9 line-clamp-3 max-xl:line-clamp-2"> ${body} </p> <span class="text-zinc-700 text-xl">${date}</span> </div> </article>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/FeaturedPost.astro", void 0);

const $$Astro = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const allPosts = await getCollection("posts");
  const recentPosts = allPosts.filter((p) => !p.data.featured).slice(0, 4);
  const featuredPosts = allPosts.filter((p) => p.data.featured);
  const categories = getCategoriesFromPosts(recentPosts);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog - Rhythm Nation", "description": "Read and learn from music producers and enthusiasts" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "H1", $$H1, { "text": "Rhythm Nation Blog" })} ${maybeRenderHead()}<p class="text-zinc-900 text-2xl mb-24 max-sm:mb-14">
Join the community and learn from Music Producers and Enthusiasts
</p> ${featuredPosts.map((p) => renderTemplate`${renderComponent($$result3, "FeaturedPost", $$FeaturedPost, { "post": p })}`)}<hr class="w-full border border-teal-900 mb-16 max-sm:mb-10"> ${renderComponent($$result3, "CategoryList", $$CategoryList, { "categories": categories, "title": "Recent Posts" })} <div class="mb-32"> ${renderComponent($$result3, "PostsList", $$PostsList, { "posts": recentPosts })} </div> <div class="flex justify-end mb-60 max-sm:mb-36"> <a href="/blog" class="bg-teal-900 text-white py-3 px-6 rounded-xl text-xl">Read More Posts</a> <button onclick="throw new Error('This is a test error')">
Throw test error
</button> </div> ` })} ` })}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/index.astro", void 0);

const $$file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
//# sourceMappingURL=index_gLh2VKeL.mjs.map
