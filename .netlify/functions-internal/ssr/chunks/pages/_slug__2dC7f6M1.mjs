;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="84b8c55e-661b-4d91-9cd8-5ee9beefb8c6",e._sentryDebugIdIdentifier="sentry-dbid-84b8c55e-661b-4d91-9cd8-5ee9beefb8c6")}catch(e){}}();import { $ as $$Image, a as $$Main, b as $$H1, c as $$BaseLayout, g as getImage } from './404_Lc-3aH9C.mjs';
import { A as AstroError, l as UnknownContentCollectionError, f as createComponent, n as renderUniqueStylesheet, o as renderScriptElement, p as createHeadAndContent, r as renderTemplate, j as renderComponent, u as unescapeHTML, e as createAstro, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, F as Fragment } from '../astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                           */
import { p as prependForwardSlash } from '../astro/assets-service_rEFrKTWA.mjs';
import { getIconData, iconToSVG } from '@iconify/utils';
import { buildClient } from '@xata.io/client';
import { format } from 'date-fns/format';
import { faThumbsUp, faStar, faRocket, faHeart } from '@fortawesome/free-solid-svg-icons';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection **${collection}** does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return;
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://rhythm-nation-blog.vercel.app", "ASSETS_PREFIX": undefined}, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
function createGetEntryBySlug({
  getEntryImport,
  getRenderEntryImport
}) {
  return async function getEntryBySlug(collection, slug) {
    const entryImport = await getEntryImport(collection, slug);
    if (typeof entryImport !== "function")
      return void 0;
    const entry = await entryImport();
    return {
      id: entry.id,
      slug: entry.slug,
      body: entry.body,
      collection: entry.collection,
      data: entry.data,
      async render() {
        return render({
          collection: entry.collection,
          id: entry.id,
          renderEntryImport: await getRenderEntryImport(collection, slug)
        });
      }
    };
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/authors/dwight-schrute.md": () => import('../dwight-schrute_gtAIAq1q.mjs'),"/src/content/authors/jim-halpert.md": () => import('../jim-halpert_VzGe01_b.mjs'),"/src/content/authors/michael-scott.md": () => import('../michael-scott_l5ahz8rq.mjs'),"/src/content/authors/pam-beesely.md": () => import('../pam-beesely_-T-alk3d.mjs'),"/src/content/posts/behind-the-scenes-with-our-artists.md": () => import('../behind-the-scenes-with-our-artists_XevyonN9.mjs'),"/src/content/posts/collaboration-in-music-production.md": () => import('../collaboration-in-music-production_kwVwcZJ2.mjs'),"/src/content/posts/creating-a-successful-music-brand.md": () => import('../creating-a-successful-music-brand_BfUXtHU5.mjs'),"/src/content/posts/gear-is-insanely-expensive.md": () => import('../gear-is-insanely-expensive_UBTO5Fbw.mjs'),"/src/content/posts/guitar-solos-are-still-awesome.md": () => import('../guitar-solos-are-still-awesome_6tzpHeJv.mjs'),"/src/content/posts/live-music-is-crucial.md": () => import('../live-music-is-crucial_ZxdUzsVh.mjs'),"/src/content/posts/making-a-home-studio.md": () => import('../making-a-home-studio_BCe0CU-w.mjs'),"/src/content/posts/the-art-of-music-production.md": () => import('../the-art-of-music-production_abTmaROY.mjs'),"/src/content/posts/the-importance-of-audio-quality.md": () => import('../the-importance-of-audio-quality_sdaKia8Y.mjs'),"/src/content/posts/tune-your-snare-drum.md": () => import('../tune-your-snare-drum_Kq6zGitA.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"authors":{"type":"content","entries":{"dwight-schrute":"/src/content/authors/dwight-schrute.md","michael-scott":"/src/content/authors/michael-scott.md","jim-halpert":"/src/content/authors/jim-halpert.md","pam-beesely":"/src/content/authors/pam-beesely.md"}},"posts":{"type":"content","entries":{"behind-the-scenes-with-our-artists":"/src/content/posts/behind-the-scenes-with-our-artists.md","creating-a-successful-music-brand":"/src/content/posts/creating-a-successful-music-brand.md","collaboration-in-music-production":"/src/content/posts/collaboration-in-music-production.md","gear-is-insanely-expensive":"/src/content/posts/gear-is-insanely-expensive.md","guitar-solos-are-still-awesome":"/src/content/posts/guitar-solos-are-still-awesome.md","live-music-is-crucial":"/src/content/posts/live-music-is-crucial.md","making-a-home-studio":"/src/content/posts/making-a-home-studio.md","the-art-of-music-production":"/src/content/posts/the-art-of-music-production.md","the-importance-of-audio-quality":"/src/content/posts/the-importance-of-audio-quality.md","tune-your-snare-drum":"/src/content/posts/tune-your-snare-drum.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/authors/dwight-schrute.md": () => import('../dwight-schrute_QAaCCHAq.mjs'),"/src/content/authors/jim-halpert.md": () => import('../jim-halpert_UHYkhojN.mjs'),"/src/content/authors/michael-scott.md": () => import('../michael-scott_KuNWZsRT.mjs'),"/src/content/authors/pam-beesely.md": () => import('../pam-beesely_m8xoe1vL.mjs'),"/src/content/posts/behind-the-scenes-with-our-artists.md": () => import('../behind-the-scenes-with-our-artists_q1xuclli.mjs'),"/src/content/posts/collaboration-in-music-production.md": () => import('../collaboration-in-music-production_zpTHML2N.mjs'),"/src/content/posts/creating-a-successful-music-brand.md": () => import('../creating-a-successful-music-brand_kiJM2MA3.mjs'),"/src/content/posts/gear-is-insanely-expensive.md": () => import('../gear-is-insanely-expensive_4SHGqSGZ.mjs'),"/src/content/posts/guitar-solos-are-still-awesome.md": () => import('../guitar-solos-are-still-awesome_9HUMZSXO.mjs'),"/src/content/posts/live-music-is-crucial.md": () => import('../live-music-is-crucial_-9iam72U.mjs'),"/src/content/posts/making-a-home-studio.md": () => import('../making-a-home-studio_tMowZSP-.mjs'),"/src/content/posts/the-art-of-music-production.md": () => import('../the-art-of-music-production_Tx6D3Tct.mjs'),"/src/content/posts/the-importance-of-audio-quality.md": () => import('../the-importance-of-audio-quality_gqyfeTp2.mjs'),"/src/content/posts/tune-your-snare-drum.md": () => import('../tune-your-snare-drum_RGlboxDq.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const getEntryBySlug = createGetEntryBySlug({
	getEntryImport: createGlobLookup(contentCollectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$d = createAstro("https://rhythm-nation-blog.vercel.app");
const $$CategoryBadge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$CategoryBadge;
  const { category } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/categories/${category}`, "href")} class="text-teal-900 text-xl uppercase rounded-3xl border-2 border-teal-900 whitespace-nowrap px-3">${category}</a>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/CategoryBadge.astro", void 0);

const $$Astro$c = createAstro("https://rhythm-nation-blog.vercel.app");
const $$CategoryList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$CategoryList;
  const { categories, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-[auto,1fr] gap-x-14 gap-y-3 mb-16 max-lg:grid-cols-1"> ${title && renderTemplate`<h2 class="font-bold text-5xl text-teal-900">${title}</h2>`} <div class="flex gap-4 flex-wrap items-center"> ${categories.map((c) => renderTemplate`${renderComponent($$result, "CategoryBadge", $$CategoryBadge, { "category": c })}`)} </div> </div>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/CategoryList.astro", void 0);

const $$Astro$b = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Post = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Post;
  const { post } = Astro2.props;
  const {
    slug,
    body,
    data: { title, cover, date }
  } = post;
  const author = await getEntryBySlug("authors", post.data.author);
  return renderTemplate`${maybeRenderHead()}<article> <a${addAttribute(`/blog/${slug}`, "href")} data-astro-prefetch> <span class="hidden assistive-text">${`Link to post ${title}`}</span> ${renderComponent($$result, "Image", $$Image, { "src": cover, "alt": `Link to post ${title}`, "width": 600, "height": 600 / 1.5, "format": "webp", "class": "rounded-2xl shadow-xl mb-6 aspect-thumbnail object-cover" })} </a> <a${addAttribute(`/blog/${slug}`, "href")} class="text-4xl text-zinc-900 mb-4 font-semibold inline-block"> <h2>${title}</h2> </a> <p class="text-zinc-500 text-2xl mb-9 line-clamp-3">${body}</p> <div class="flex justify-between items-center"> ${author ? renderTemplate`<a${addAttribute(`/authors/${author.slug}`, "href")} class="text-zinc-900 text-2xl font-bold"> ${author.data.name} </a>` : null} <span class="text-zinc-700 text-xl">${date}</span> </div> </article>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/Post.astro", void 0);

const $$Astro$a = createAstro("https://rhythm-nation-blog.vercel.app");
const $$PostsList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$PostsList;
  const { posts } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-2 gap-x-16 gap-y-32 max-md:grid-cols-1 max-sm:gap-y-14"> ${posts.map((p) => renderTemplate`${renderComponent($$result, "Post", $$Post, { "post": p })}`)} </div>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/PostsList.astro", void 0);

const getCategoriesFromPosts = (posts) => {
  const allCategories = posts.flatMap((p) => p.data.categories);
  return Array.from(new Set(allCategories));
};

const $$Astro$9 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$PaginationLinks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$PaginationLinks;
  const { page, numberOfPosts } = Astro2.props;
  const postsPerPage = Number("6");
  const hasPreviousPosts = page > 1;
  const hasNextPosts = numberOfPosts > page * postsPerPage;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between"> ${hasPreviousPosts ? renderTemplate`<a${addAttribute(`?page=${page - 1}`, "href")} class="bg-teal-900 text-white py-3 px-6 rounded-xl">
Previous
</a>` : renderTemplate`<div></div>`} ${hasNextPosts ? renderTemplate`<a${addAttribute(`?page=${page + 1}`, "href")} class="bg-teal-900 text-white py-3 px-6 rounded-xl">
Next
</a>` : renderTemplate`<div></div>`} </div>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/PaginationLinks.astro", void 0);

const icons = {"local":{"prefix":"local","lastModified":1705011828,"icons":{"arrow-left":{"body":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"m2.117 12 7.527 6.235L9 19l-9-7.521L9 4l.645.764L2.116 11H24v1H2.117z\" clip-rule=\"evenodd\"/>"},"linkedin":{"body":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M3.333.667A2.667 2.667 0 0 0 .667 3.333v29.334a2.667 2.667 0 0 0 2.666 2.666h29.334a2.667 2.667 0 0 0 2.666-2.666V3.333A2.667 2.667 0 0 0 32.667.667H3.332ZM6.133 14H11.2v16H6.133V14Zm5.4-5.32a2.867 2.867 0 1 1-5.733 0 2.867 2.867 0 0 1 5.733 0ZM30 20.286c0-4.814-3.111-6.685-6.201-6.685a5.873 5.873 0 0 0-2.922.615c-.686.344-1.403 1.131-1.957 2.5h-.142v-2.715H14v16.012h5.083v-8.516c-.074-.873.206-2 .777-2.67.57-.672 1.387-.832 2.007-.913h.193c1.617 0 2.816 1 2.816 3.522v8.577h5.083l.04-9.727Z\" clip-rule=\"evenodd\"/>"},"twitter":{"body":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M17.289 8.523a8.34 8.34 0 0 1 8.338-8.34c2.703 0 4.861 1.278 6.307 3.134A13.989 13.989 0 0 0 36.27 1.64a7.023 7.023 0 0 1-3.061 3.866l.003.008a14.025 14.025 0 0 0 4-1.1l-.002.005a14.237 14.237 0 0 1-3.327 3.502c.07.47.105.944.105 1.414 0 9.83-7.488 21.264-21.265 21.264a21.145 21.145 0 0 1-11.456-3.358 1.333 1.333 0 0 1-.287-1.997 1.2 1.2 0 0 1 1.168-.572c2.44.288 4.88-.01 7.031-.949a8.23 8.23 0 0 1-4.507-5.004 1.2 1.2 0 0 1 .274-1.193 8.185 8.185 0 0 1-2.787-6.162v-.09a1.2 1.2 0 0 1 .975-1.18 8.182 8.182 0 0 1-.918-3.775c0-1.248.008-2.82.886-4.237.197-.317.518-.51.862-.557a1.334 1.334 0 0 1 1.433.43A18.57 18.57 0 0 0 17.29 8.639l-.001-.116Zm-4.566 19.41c-2.1 0-4.116-.35-5.996-.994 2.287-.395 4.481-1.297 6.372-2.779a1.2 1.2 0 0 0-.719-2.144 5.798 5.798 0 0 1-4.572-2.367 8.217 8.217 0 0 0 1.484-.258 1.2 1.2 0 0 0-.077-2.335 5.815 5.815 0 0 1-4.384-3.931 8.277 8.277 0 0 0 1.662.225 1.2 1.2 0 0 0 .706-2.197 5.806 5.806 0 0 1-2.583-4.834c0-.447.007-.845.033-1.206a21.198 21.198 0 0 0 14.087 6.336 1.333 1.333 0 0 0 1.367-1.628 5.82 5.82 0 0 1-.147-1.298 5.673 5.673 0 0 1 5.67-5.673c3.292 0 5.696 3.049 5.696 6.485 0 8.684-6.601 18.597-18.599 18.597Z\" clip-rule=\"evenodd\"/>"}},"width":36,"height":36}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$8 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Icon;
  const req = Astro2.request;
  const { name = "", title, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new Error(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new Error('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new Error(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new Error(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new Error(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`} <use ${addAttribute(`#${id}`, "xlink:href")}></use> </svg>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$7 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$slug$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$slug$1;
  const page = Number(Astro2.url.searchParams.get("page")) || 1;
  const postsPerPage = Number("6");
  const start = postsPerPage * (page - 1);
  const end = start + postsPerPage;
  const category = Astro2.params.slug;
  const allPosts = await getCollection("posts");
  const postsByCategory = allPosts.filter(
    (post) => post.data.categories.includes(category)
  );
  const posts = postsByCategory.slice(start, end);
  if (posts.length < 1)
    return Astro2.redirect("/404");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog - Rhythm Nation", "description": "Read and learn from music producers and enthusiasts", "image": "images/drums.jpg" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<a href="/blog" class="text-zinc-500 text-2xl"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "arrow-left", "class": "size-5 inline mr-2" })}
Back to all posts
</a> ${renderComponent($$result3, "H1", $$H1, { "text": "Rhythm Nation Blog" })} <p class="text-zinc-900 text-2xl mb-24 max-sm:mb-14">
Join the community and learn from Music Producers and Enthusiasts
</p> ${renderComponent($$result3, "CategoryList", $$CategoryList, { "categories": [category], "title": "Posts Tagged" })} <div class="mb-12"> ${renderComponent($$result3, "PaginationLinks", $$PaginationLinks, { "page": page, "numberOfPosts": postsByCategory.length })} </div> ${renderComponent($$result3, "PostsList", $$PostsList, { "posts": posts })} <div class="mb-24"> ${renderComponent($$result3, "PaginationLinks", $$PaginationLinks, { "page": page, "numberOfPosts": postsByCategory.length })} </div> ` })} ` })}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/categories/[slug].astro", void 0);
const $$file$1 = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/categories/[slug].astro";
const $$url$1 = "/categories/[slug]";

const _slug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

/** @returns {void} */

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 * @param {unknown} value
 * @returns {string}
 */
function escape(value, is_attr = false) {
	const str = String(value);
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = '';
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}
	return escaped + str.substring(last);
}

/** @returns {string} */
function each(items, fn) {
	items = ensure_array_like(items);
	let str = '';
	for (let i = 0; i < items.length; i += 1) {
		str += fn(items[i], i);
	}
	return str;
}

function validate_component(component, name) {
	if (!component || !component.$$render) {
		if (name === 'svelte:component') name += ' this={...}';
		throw new Error(
			`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
		);
	}
	return component;
}

let on_destroy;

/** @returns {{ render: (props?: {}, { $$slots, context }?: { $$slots?: {}; context?: Map<any, any>; }) => { html: any; css: { code: string; map: any; }; head: string; }; $$render: (result: any, props: any, bindings: any, slots: any, context: any) => any; }} */
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = current_component;
		const $$ = {
			on_destroy,
			context: new Map(context || (parent_component ? parent_component.$$.context : [])),
			// these will be immediately discarded
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: blank_object()
		};
		set_current_component({ $$ });
		const html = fn(result, props, bindings, slots);
		set_current_component(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: '', head: '', css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			run_all(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css) => css.code)
						.join('\n'),
					map: null // TODO
				},
				head: result.title + result.head
			};
		},
		$$render
	};
}

/** @returns {string} */
function add_attribute(name, value, boolean) {
	if (value == null || (boolean && !value)) return '';
	const assignment = boolean && value === true ? '' : `="${escape(value, true)}"`;
	return ` ${name}${assignment}`;
}

const tables = [
  {
    name: "users",
    columns: [
      { name: "name", type: "string", notNull: true, defaultValue: "" },
      { name: "password", type: "string", notNull: true, defaultValue: "" },
      {
        name: "email",
        type: "email",
        notNull: true,
        defaultValue: "foo@foo.dev"
      }
    ],
    revLinks: [
      { column: "user", table: "comments" },
      { column: "user", table: "reactions" }
    ]
  },
  {
    name: "comments",
    columns: [
      { name: "post", type: "string", notNull: true, defaultValue: "" },
      { name: "text", type: "text", notNull: true, defaultValue: "" },
      { name: "user", type: "link", link: { table: "users" } },
      { name: "date", type: "datetime", notNull: true, defaultValue: "now" }
    ]
  },
  {
    name: "reactions",
    columns: [
      { name: "emoji", type: "string", notNull: true, defaultValue: "star" },
      { name: "post", type: "string", notNull: true, defaultValue: "null" },
      { name: "user", type: "link", link: { table: "users" } }
    ]
  }
];
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL: "https://tha-deciders-kpqloo.us-east-1.xata.sh/db/rhythm-nation-blog"
};
class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

const xata = new XataClient({
  apiKey: "xau_uRWDCv4vPGAA6iQdKLF5VMXxuO0bvTf04",
  branch: "main"
});

const $$Astro$6 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$TableOfContents = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { headings } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav> <ul> ${headings.map((heading) => renderTemplate`<li class="text-xl mb-4 text-zinc-500"> <a${addAttribute(`#${heading.slug}`, "href")}>#${heading.text}</a> </li>`)} </ul> </nav>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/TableOfContents.astro", void 0);

const $$Astro$5 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$SocialShare = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SocialShare;
  const { post } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-y-9 absolute top-2 -left-20"> <a${addAttribute(`https://twitter.com/intent/tweet?url=https://rhythm.nation/blog/${post.slug}`, "href")}> <span class="hidden assistive-text">Share post on Twitter</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "twitter", "class": "text-zinc-600 size-8" })} </a> <a${addAttribute(`https://www.linkedin.com/sharing/share-offsite/?url=https://rhythm.nation/blog/${post.slug}`, "href")}> <span class="hidden assistive-text">Share post on Linkedin</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "linkedin", "class": "text-zinc-600 size-8" })} </a> </div>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/SocialShare.astro", void 0);

const $$Astro$4 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$PostMeta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PostMeta;
  const { post } = Astro2.props;
  const author = await getEntryBySlug("authors", post.data.author);
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between items-center mb-10"> <div class="flex items-center gap-x-2"> ${author ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(`/authors/${author.slug}`, "href")}> ${renderComponent($$result2, "Image", $$Image, { "src": author.data.image, "alt": `Link to author ${author.data.name}`, "width": 48, "height": 48, "format": "webp", "class": "rounded-full border-2 border-teal-500 aspect-square object-cover size-12" })} </a> <a${addAttribute(`/authors/${author.slug}`, "href")} class="text-zinc-600 text-2xl font-bold"> ${author.data.name} </a> ` })}` : renderTemplate`<a href="#">Report missing author</a>`} </div> </div>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/PostMeta.astro", void 0);

const $$Astro$3 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$CommentForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CommentForm;
  const user = Astro2.cookies.get("userId");
  const { postSlug } = Astro2.props;
  return renderTemplate`${user?.value ? renderTemplate`${maybeRenderHead()}<form method="POST" class="grid grid-cols-[1fr,auto] gap-x-3 gap-y-2 items-end max-md:grid-cols-1"><div class="flex flex-col"><label for="comment" class="text-zinc-900 text-2xl mb-2">
Leave a comment
</label><input type="text" name="comment" id="comment" class="border border-teal-900 rounded-lg text-2xl px-6 py-6 "></div><button type="submit" class="bg-teal-900 text-white text-2xl px-6 py-5 rounded-xl my-1">
Add a comment
</button></form>` : renderTemplate`<p class="text-zinc-700 text-2xl mt-4 mb-24">
Please${" "}<a${addAttribute(`/login?redirect=/blog/${postSlug}#comments`, "href")} class="text-teal-900 underline">
login
</a>${" "}
to comment
</p>`}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/CommentForm.astro", void 0);

const $$Astro$2 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Comment = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Comment;
  const { comment } = Astro2.props;
  const initials = comment.user?.name.split(" ").map((i) => i[0]).join("");
  const formattedDate = format(comment.date, "MMM d, yyyy");
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-x-12 items-start"> <span class="text-teal-900 rounded-full border border-teal-900 font-bold text-xl p-5"> ${initials} </span> <div> <span class="text-zinc-700 font-bold text-xl mr-5"> ${comment.user?.name} </span> <span class="text-zinc-500 text-xl"> ${formattedDate} </span> <p class="text-zinc-500 text-2xl mt-2">${comment.text}</p> </div> </div>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/Comment.astro", void 0);

const $$Astro$1 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$CommentsList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CommentsList;
  const { comments } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-1 gap-y-8"> ${comments.map((c) => renderTemplate`${renderComponent($$result, "Comment", $$Comment, { "comment": c })}`)} </div>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/CommentsList.astro", void 0);

var Emoji = /* @__PURE__ */ ((Emoji2) => {
  Emoji2["thumbsup"] = "thumbsup";
  Emoji2["star"] = "star";
  Emoji2["heart"] = "heart";
  Emoji2["rocket"] = "rocket";
  return Emoji2;
})(Emoji || {});
const emojiList = Object.values(Emoji);

function getFontSize(size) {
    if (size && size !== "lg" && size !== "sm" && size !== "xs") {
        return size.replace("x", "em");
    }
    return "";
}
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
    let flipX = 1;
    let flipY = 1;
    if (flip) {
        if (flip == "horizontal") {
            flipX = -1;
        }
        else if (flip == "vertical") {
            flipY = -1;
        }
        else {
            flipX = flipY = -1;
        }
    }
    if (typeof scale === "string") {
        scale = parseFloat(scale);
    }
    if (typeof translateX === "string") {
        translateX = parseFloat(translateX);
    }
    if (typeof translateY === "string") {
        translateY = parseFloat(translateY);
    }
    const x = `${translateX * translateTimes}${translateUnit}`;
    const y = `${translateY * translateTimes}${translateUnit}`;
    let output = `translate(${x},${y}) scale(${flipX * scale},${flipY * scale})`;
    if (rotate) {
        output += ` rotate(${rotate}${rotateUnit})`;
    }
    return output;
}

/* C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/node_modules/svelte-fa/dist/fa.svelte generated by Svelte v4.2.8 */

const css = {
	code: ".svelte-fa-base{height:1em;overflow:visible;transform-origin:center;vertical-align:-0.125em}.svelte-fa-fw{text-align:center;width:1.25em}.svelte-fa-pull-left.svelte-bvo74f{float:left}.svelte-fa-pull-right.svelte-bvo74f{float:right}.svelte-fa-size-lg.svelte-bvo74f{font-size:1.33333em;line-height:0.75em;vertical-align:-0.225em}.svelte-fa-size-sm.svelte-bvo74f{font-size:0.875em}.svelte-fa-size-xs.svelte-bvo74f{font-size:0.75em}.spin.svelte-bvo74f{animation:svelte-bvo74f-spin 2s 0s infinite linear}.pulse.svelte-bvo74f{animation:svelte-bvo74f-spin 1s infinite steps(8)}@keyframes svelte-bvo74f-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
	map: null
};

const Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let i;
	let transform;
	let fontSize;
	let fullStyle;
	let { class: clazz = "" } = $$props;
	let { id = "" } = $$props;
	let { style = "" } = $$props;
	let { icon } = $$props;
	let { size = "" } = $$props;
	let { color = "" } = $$props;
	let { fw = false } = $$props;
	let { pull = void 0 } = $$props;
	let { scale = 1 } = $$props;
	let { translateX = 0 } = $$props;
	let { translateY = 0 } = $$props;
	let { rotate = "" } = $$props;
	let { flip = void 0 } = $$props;
	let { spin = false } = $$props;
	let { pulse = false } = $$props;
	let { primaryColor = "" } = $$props;
	let { secondaryColor = "" } = $$props;
	let { primaryOpacity = 1 } = $$props;
	let { secondaryOpacity = 0.4 } = $$props;
	let { swapOpacity = false } = $$props;
	if ($$props.class === void 0 && $$bindings.class && clazz !== void 0) $$bindings.class(clazz);
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
	if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0) $$bindings.fw(fw);
	if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0) $$bindings.pull(pull);
	if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0) $$bindings.scale(scale);
	if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0) $$bindings.translateX(translateX);
	if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0) $$bindings.translateY(translateY);
	if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0) $$bindings.rotate(rotate);
	if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0) $$bindings.flip(flip);
	if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0) $$bindings.spin(spin);
	if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0) $$bindings.pulse(pulse);
	if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0) $$bindings.primaryColor(primaryColor);
	if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0) $$bindings.secondaryColor(secondaryColor);
	if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0) $$bindings.primaryOpacity(primaryOpacity);
	if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0) $$bindings.secondaryOpacity(secondaryOpacity);
	if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0) $$bindings.swapOpacity(swapOpacity);
	$$result.css.add(css);
	i = icon && icon.icon || [0, 0, "", [], ""];
	transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
	fontSize = getFontSize(size);
	fullStyle = (fontSize ? `font-size:${fontSize}` : "") + (style ? `; ${style}` : "");

	return `${i[4]
	? `<svg${add_attribute("id", id || undefined, 0)} class="${[
			"svelte-fa svelte-fa-base " + escape(clazz, true) + " svelte-bvo74f",
			(pulse ? "pulse" : "") + ' ' + (size === "lg" ? "svelte-fa-size-lg" : "") + ' ' + (size === "sm" ? "svelte-fa-size-sm" : "") + ' ' + (size === "xs" ? "svelte-fa-size-xs" : "") + ' ' + (fw ? "svelte-fa-fw" : "") + ' ' + (pull === "left" ? "svelte-fa-pull-left" : "") + ' ' + (pull === "right" ? "svelte-fa-pull-right" : "") + ' ' + (spin ? "spin" : "")
		].join(' ').trim()}"${add_attribute("style", fullStyle, 0)} viewBox="${"0 0 " + escape(i[0], true) + " " + escape(i[1], true)}" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="${"translate(" + escape(i[0] / 2, true) + " " + escape(i[1] / 2, true) + ")"}" transform-origin="${escape(i[0] / 4, true) + " 0"}"><g${add_attribute("transform", transform, 0)}>${typeof i[4] == "string"
		? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>`
		: ` <path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path> <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>`}</g></g></svg>`
	: ``}`;
});

/* C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/EmojiReaction.svelte generated by Svelte v4.2.8 */

const EmojiReaction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	const nameToIcon = {
		thumbsup: faThumbsUp,
		star: faStar,
		rocket: faRocket,
		heart: faHeart
	};

	let { emoji } = $$props;
	let { reacted } = $$props;
	let { count } = $$props;
	let { post } = $$props;

	if ($$props.emoji === void 0 && $$bindings.emoji && emoji !== void 0) $$bindings.emoji(emoji);
	if ($$props.reacted === void 0 && $$bindings.reacted && reacted !== void 0) $$bindings.reacted(reacted);
	if ($$props.count === void 0 && $$bindings.count && count !== void 0) $$bindings.count(count);
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);

	return `<button${add_attribute(
		"class",
		`w-16 flex gap-x-1 justify-center items-center text-gray-500 cursor-pointer hover:scale-110 transition-transform ${reacted
		? "text-teal-700 border-2 border-teal-900 bg-teal-50 py-2 rounded-full"
		: ""}`,
		0
	)}>${validate_component(Fa, "Fa").$$render($$result, { icon: nameToIcon[emoji] }, {}, {})} <span class="text-sm">${count > 0 ? `${escape(count)}` : ``}</span></button>`;
});

/* C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/EmojiReactions.svelte generated by Svelte v4.2.8 */

const EmojiReactions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { post } = $$props;
	let { reactionsDetails } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	if ($$props.reactionsDetails === void 0 && $$bindings.reactionsDetails && reactionsDetails !== void 0) $$bindings.reactionsDetails(reactionsDetails);

	return `<div class="flex gap-x-2 justify-center items-center h-8">${each(emojiList, emoji => {
		return `${validate_component(EmojiReaction, "EmojiReaction").$$render(
			$$result,
			{
				post,
				emoji,
				reacted: reactionsDetails[emoji].reacted,
				count: reactionsDetails[emoji].count
			},
			{},
			{}
		)}`;
	})}</div>`;
});

const getReactionCountsByPost = async (post) => {
  const aggregateConfig = emojiList.reduce((acc, emoji) => {
    acc[emoji] = {
      count: {
        filter: { emoji, post }
      }
    };
    return acc;
  }, {});
  const { aggs } = await xata.db.reactions.aggregate(aggregateConfig);
  return aggs;
};
const getReactionsDetailsByPost = async (post, userId) => {
  const reactionCounts = await getReactionCountsByPost(post);
  const reactionsByUser = await xata.db.reactions.filter({
    "user.id": userId || "",
    post
  }).getMany();
  const reactionsDetails = emojiList.reduce(
    (acc, emoji) => {
      acc[emoji] = {
        count: reactionCounts[emoji],
        reacted: reactionsByUser.some((reaction) => reaction.emoji === emoji)
      };
      return acc;
    },
    {
      [Emoji.thumbsup]: { count: 0, reacted: false },
      [Emoji.star]: { count: 0, reacted: false },
      [Emoji.heart]: { count: 0, reacted: false },
      [Emoji.rocket]: { count: 0, reacted: false }
    }
  );
  return reactionsDetails;
};

const $$Astro = createAstro("https://rhythm-nation-blog.vercel.app");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug)
    return Astro2.redirect("/404");
  const user = Astro2.cookies.get("userId");
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const comment = data.get("comment");
    await xata.db.comments.create({
      post: slug,
      text: comment,
      user: user?.value
    });
    return Astro2.redirect(`/blog/${slug}`);
  }
  const post = await getEntryBySlug("posts", slug);
  if (!post)
    return Astro2.redirect("/404");
  const comments = await xata.db.comments.select(["id", "text", "date", "user.name"]).filter({ post: post.slug }).getMany();
  const { title, cover, description } = post.data;
  const { Content, headings } = await post.render();
  const coverImageSrc = (await getImage({ src: cover })).src;
  const reactionsDetails = await getReactionsDetailsByPost(
    post.slug,
    user?.value
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "image": coverImageSrc, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<a id="top" href="#top" class="text-xs text-transparent">Top Anchor</a> <div class="border-b-4 border-zinc-500 w-fit mb-16"> <a href="/blog" class="text-zinc-500 text-2xl"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "arrow-left", "class": "size-5 inline mr-2" })}
Back to all posts
</a> </div> ${renderComponent($$result3, "H1", $$H1, { "text": title })} ${renderComponent($$result3, "PostMeta", $$PostMeta, { "post": post })} ${renderComponent($$result3, "Image", $$Image, { "src": cover, "alt": title, "height": 1024, "width": 1024, "format": "webp", "class": "rounded-2xl shadow-xl mb-28 aspect-thumbnail object-cover" })} <div class="mb-10"> ${renderComponent($$result3, "TableOfContents", $$TableOfContents, { "headings": headings })} </div> <div class="relative"> ${renderComponent($$result3, "SocialShare", $$SocialShare, { "post": post })} <div class="prose prose-2xl overflow-visible relative mb-10"> ${renderComponent($$result3, "Content", Content, {})} </div> </div> ${renderComponent($$result3, "EmojiReactions", EmojiReactions, { "client:visible": true, "post": post.slug, "reactionsDetails": reactionsDetails, "client:component-hydration": "visible", "client:component-path": "~/components/EmojiReactions.svelte", "client:component-export": "default" })} <div class="mt-10"> <a href="#top" class="text-zinc-500 underline">Back to Top</a> </div> ` })} <div class="bg-teal-100/30 py-14 px-24 relative border-b border-teal-900 mt-32"> <div class="max-w-7xl mx-auto"> <div id="comments" class="mb-5"> <h2> <span class="font-bold text-teal-900 text-4xl mr-8">Comments</span> <span class="border border-teal-900 text-teal-900 rounded-full px-4 py-2 font-bold text-2xl">${comments.length}</span> </h2> </div> </div> <div class="mb-14"> ${renderComponent($$result2, "CommentForm", $$CommentForm, { "postSlug": slug })} </div> ${renderComponent($$result2, "CommentsList", $$CommentsList, { "comments": comments })} </div> ` })}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/blog/[slug].astro", void 0);

const $$file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$CategoryList as $, _slug_$1 as _, getCategoriesFromPosts as a, $$PaginationLinks as b, $$PostsList as c, create_ssr_component as d, _slug_ as e, getCollection as g, xata as x };
//# sourceMappingURL=_slug__2dC7f6M1.mjs.map
