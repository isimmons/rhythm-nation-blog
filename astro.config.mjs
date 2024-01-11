import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
// import vercelServerless from "@astrojs/vercel/serverless";
import netlify from "@astrojs/netlify";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";

const devOnlyIntegrations = [
  sentry({
    dsn: "https://6b3d9cf217f575ee9ca356327415e129@o1078821.ingest.sentry.io/4506544480124928",
    sourceMapsUploadOptions: {
      project: "rhythm-nation-blog",
      authToken: import.meta.env.SENTRY_AUTH_TOKEN,
      telemetry: false,
    },
  }),
  ,
  spotlightjs(),
];

const integrations = [tailwind(), icon(), svelte(), sitemap()];

// https://astro.build/config
export default defineConfig({
  integrations:
    import.meta.env.MODE === "production"
      ? integrations
      : [...integrations, ...devOnlyIntegrations],
  site: "https://rhythm-nation-blog.vercel.app",
  output: "server",
  adapter: netlify(),
});
