;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cfce05f7-2852-4dae-adcf-35ca0f0c7a8a",e._sentryDebugIdIdentifier="sentry-dbid-cfce05f7-2852-4dae-adcf-35ca0f0c7a8a")}catch(e){}}();import { a as $$Main, b as $$H1, c as $$BaseLayout } from './404_Lc-3aH9C.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';
import { x as xata } from './_slug__2dC7f6M1.mjs';
import bcrypt from 'bcryptjs';

const $$Astro = createAstro("https://rhythm-nation-blog.vercel.app");
const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signup;
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await xata.db.users.create({
      name,
      email,
      password: hash
    });
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
    return Astro2.redirect("/", 302);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Sign Up" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "H1", $$H1, { "text": "Sign Up" })} ${maybeRenderHead()}<form method="POST"> <label for="name" class="mb-2 text-teal-900">Full Name</label> <input type="text" id="name" name="name" class="border-teal-900 border w-full mb-10 rounded-lg px-6 py-3"> <label for="email" class="mb-2 text-teal-900">Email</label> <input type="email" id="email" name="email" class="border-teal-900 border w-full mb-10 rounded-lg px-6 py-3"> <label for="password" class="mb-2 text-teal-900">Password</label> <input type="password" id="password" name="password" class="border-teal-900 border w-full mb-10 rounded-lg px-6 py-3"> <button type="submit" class="text-white text-2xl bg-teal-900 w-full rounded-lg px-6 py-3 mb-11">Sign Up</button> </form> <p class="mt-10">
Already have an account? <a href="/login" class="text-teal-900 underline">Login</a> </p> ` })} ` })}`;
}, "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/signup.astro", void 0);

const $$file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/pages/signup.astro";
const $$url = "/signup";

export { $$Signup as default, $$file as file, $$url as url };
//# sourceMappingURL=signup_4XLh5JSD.mjs.map
