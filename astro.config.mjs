import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    svelte(),
    sentry({
      dsn: "https://6b3d9cf217f575ee9ca356327415e129@o1078821.ingest.sentry.io/4506544480124928",
      sourceMapsUploadOptions: {
        org: import.meta.env.SENTRY_ORGANIZATION,
        project: "rhythm-nation-blog",
        authToken: import.meta.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  site: "https://rythm-nation-blog.vercel.app",
  output: "server",
  adapter: vercel({
    imageService: true,
  }),
});
