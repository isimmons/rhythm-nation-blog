;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f3f7db54-47f4-43f5-bc50-df31320b028f",e._sentryDebugIdIdentifier="sentry-dbid-f3f7db54-47f4-43f5-bc50-df31320b028f")}catch(e){}}();import './404_Lc-3aH9C.mjs';
import { e as createAstro, f as createComponent } from '../astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  Astro2.cookies.delete("userId");
  Astro2.cookies.delete("userName");
  Astro2.cookies.delete("userEmail");
  return Astro2.redirect("/");
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/logout.astro", void 0);

const $$file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/logout.astro";
const $$url = "/logout";

export { $$Logout as default, $$file as file, $$url as url };
//# sourceMappingURL=logout_Nd06MvFe.mjs.map
