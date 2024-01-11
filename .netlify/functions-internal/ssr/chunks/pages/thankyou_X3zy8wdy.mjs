;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="29007009-6d69-4a11-a1ba-b2ed765e8d8c",e._sentryDebugIdIdentifier="sentry-dbid-29007009-6d69-4a11-a1ba-b2ed765e8d8c")}catch(e){}}();import { a as $$Main, b as $$H1, c as $$BaseLayout } from './404_Lc-3aH9C.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Thankyou = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Thankyou;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact - Rhythm Nation", "description": "Contact us", "image": "images/drums.jpg" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "H1", $$H1, { "text": "Rhythm Nation Blog" })} ${maybeRenderHead()}<p class="text-zinc-900 text-2xl mb-24 max-sm:mb-14">
Thanks for reaching out! We'll get back to you as soon as we can.
</p> ` })} ` })}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/thankyou.astro", void 0);

const $$file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/thankyou.astro";
const $$url = "/thankyou";

export { $$Thankyou as default, $$file as file, $$url as url };
//# sourceMappingURL=thankyou_X3zy8wdy.mjs.map
