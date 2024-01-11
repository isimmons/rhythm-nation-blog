;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6b448b9a-faa0-49a5-9e13-60af95fb5fe6",e._sentryDebugIdIdentifier="sentry-dbid-6b448b9a-faa0-49a5-9e13-60af95fb5fe6")}catch(e){}}();import { a as $$Main, b as $$H1, c as $$BaseLayout } from './404_Lc-3aH9C.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';
import { x as xata } from './_slug__2dC7f6M1.mjs';
import bcrypt from 'bcryptjs';

const $$Astro = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const errors = {
    email: null,
    password: null,
    form: null
  };
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const email = data.get("email");
    const password = data.get("password");
    const user = await xata.db.users.filter({ email }).getFirst();
    if (!user) {
      errors.form = "Invalid email or password";
    } else {
      const isAuthenticated = bcrypt.compareSync(password, user.password);
      if (!isAuthenticated) {
        errors.form = "Invalid email or password";
      } else {
        Astro2.cookies.set("userId", user.id, {
          httpOnly: true,
          secure: true
        });
        Astro2.cookies.set("userName", user.name, {
          httpOnly: true,
          secure: true
        });
        Astro2.cookies.set("userEmail", user.email, {
          httpOnly: true,
          secure: true
        });
        return Astro2.redirect(Astro2.url.searchParams.get("redirect") ?? "/", 302);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "H1", $$H1, { "text": "Login" })} ${maybeRenderHead()}<form method="POST" novalidate> <label for="email" class="mb-2 text-teal-900">Email</label> <input type="email" id="email" name="email" class="border-teal-900 border w-full mb-10 rounded-lg px-6 py-3"> <label for="password" class="mb-2 text-teal-900">Password</label> <input type="password" id="password" name="password" class="border-teal-900 border w-full mb-10 rounded-lg px-6 py-3"> <p class="text-red-800 mb-10 text-sm h-5">${errors.form}</p> <button type="submit" class="text-white text-2xl bg-teal-900 w-full rounded-lg px-6 py-3 mb-11">Login</button> </form> <p class="mt-10">
Don't have an account? <a href="/signup" class="text-teal-900 underline">Sign Up</a> </p> ` })} ` })}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/login.astro", void 0);

const $$file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/login.astro";
const $$url = "/login";

export { $$Login as default, $$file as file, $$url as url };
//# sourceMappingURL=login_Pjfw_KlJ.mjs.map
