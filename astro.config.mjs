import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercelServerless from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sentry({
      dsn: "https://6b3d9cf217f575ee9ca356327415e129@o1078821.ingest.sentry.io/4506544480124928",
      sourceMapsUploadOptions: {
        project: "rhythm-nation-blog",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false,
      },
    }),
    ,
    spotlightjs(),
    tailwind(),
    icon(),
    svelte(),
    sitemap(),
  ],
  site: "https://rythm-nation-blog.vercel.app",
  output: "server",
  adapter: vercelServerless({
    imageService: true,
  }),
});
