;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cd47802f-6335-48be-8a8b-787825a8f15a",e._sentryDebugIdIdentifier="sentry-dbid-cd47802f-6335-48be-8a8b-787825a8f15a")}catch(e){}}();/* empty css                         */
import * as Sentry from '@sentry/astro';
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderSlot, j as renderComponent, k as renderHead } from '../astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';
import { twMerge } from 'tailwind-merge';
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_rEFrKTWA.mjs';
/* empty css                         */
import { Cloudinary } from '@cloudinary/url-gen';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_rEFrKTWA.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$7 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/node_modules/astro/components/Image.astro", void 0);

const $$Astro$6 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

var _global =
      typeof window !== 'undefined' ?
        window :
        typeof global !== 'undefined' ?
          global :
          typeof self !== 'undefined' ?
            self :
            {};

    _global.SENTRY_RELEASE={id:"b57635ad64d3086ef39d4fc799f25b5f1663d513"};

Sentry.init({
  dsn: "https://6b3d9cf217f575ee9ca356327415e129@o1078821.ingest.sentry.io/4506544480124928",
  debug: false,
  environment: {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://rhythm-nation-blog.vercel.app", "ASSETS_PREFIX": undefined}.PUBLIC_VERCEL_ENV,
  release: {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://rhythm-nation-blog.vercel.app", "ASSETS_PREFIX": undefined}.PUBLIC_VERCEL_GIT_COMMIT_SHA,
  tracesSampleRate: 1
});

const $$Astro$5 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$H1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$H1;
  const { text, classes, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<h1${spreadAttributes(rest)}${addAttribute(twMerge("text-6xl text-teal-900 font-bold mb-5", classes), "class")}> ${text} </h1>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/components/H1.astro", void 0);

const $$Astro$4 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Main = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Main;
  return renderTemplate`${maybeRenderHead()}<main class="px-24 max-sm:px-5 max-w-7xl mx-auto w-full"> ${renderSlot($$result, $$slots["default"])} </main>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/layouts/Main.astro", void 0);

const $$Astro$3 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="bg-green-950 text-center pt-20 pb-6 px-5 max-sm:pb-3 max-sm:pt-8"> <p class="text-zinc-300">Copyright 2023. Rhythm Nation</p> </footer>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/layouts/Footer.astro", void 0);

const heartbeat = new Proxy({"src":"/_astro/heartbeat.bA1Ymfu_.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const $$Astro$2 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const userEmail = Astro2.cookies.get("userId");
  const isAuthenticated = userEmail?.value !== void 0;
  return renderTemplate`${maybeRenderHead()}<header class="flex justify-between items-center p-24 py-12 max-sm:px-5 max-sm:p-10 max-w-7xl w-full mx-auto"> <a href="/" class="flex items-center gap-x-4 w-fit"> ${renderComponent($$result, "Image", $$Image, { "src": heartbeat, "alt": "rhythm nation logo", "width": 64, "height": 64, "format": "webp", "class": "w-16" })} <p class="uppercase text-3xl text-zinc-900">blog</p> </a> ${isAuthenticated ? renderTemplate`<a href="/logout" class="bg-teal-900 text-white py-2 px-6 rounded-xl text-xl">
Logout
</a>` : renderTemplate`<a href="/login" class="bg-teal-900 text-white py-2 px-6 rounded-xl text-xl">
Login
</a>`} </header>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/layouts/Header.astro", void 0);

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "tha-deciders"
  },
  url: {
    secure: true
  }
});
const getThumbnail = (title) => {
  const thumbnail = cloudinary.image("astro-course-demo-template").overlay(
    source(text(title, new TextStyle("Cabin", 64).fontWeight("bold")))
  );
  return thumbnail.toURL();
};

const $$Astro$1 = createAstro("https://rhythm-nation-blog.vercel.app");
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "A community of music producers and enthusiasts",
    image = getThumbnail("A community of music producers and enthusiasts")
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><link data-rh="true" rel="alternate" type="application/rss+xml" title="RSS"${addAttribute(`${Astro2.url}rss.xml`, "href")}><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- open graph --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(image, "content")}><meta property="og:image:alt"${addAttribute(description, "content")}><!-- twitter --><meta property="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@isimmons33"><meta name="twitter:creator" content="@isimmons33"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(image, "content")}><meta property="twitter:image:alt"${addAttribute(description, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen grid grid-rows-[auto,1fr,auto] w-full"> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/layouts/BaseLayout.astro", void 0);

const $$Astro = createAstro("https://rhythm-nation-blog.vercel.app");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Not Found" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-2 w-1/2 mx-auto items-center mt-24 bg-teal-900 py-24 rounded-md text-teal-200"> ${renderComponent($$result3, "H1", $$H1, { "text": "404", "classes": "text-teal-200" })} <p class="pt-12 text-2xl">Not the page you're looking for</p> </div> ` })} ` })}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/404.astro", void 0);

const $$file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, _404 as _, $$Main as a, $$H1 as b, $$BaseLayout as c, getConfiguredImageService as d, getImage as g, imageConfig as i };
//# sourceMappingURL=404_Lc-3aH9C.mjs.map
