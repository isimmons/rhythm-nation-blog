import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
// import vercelServerless from "@astrojs/vercel/serverless";
import netlify from "@astrojs/netlify";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";

import { loadEnv } from "vite";
const { NODE_ENV, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } = loadEnv(
  process.env,
  process.cwd(),
  ""
);

const isDev = NODE_ENV === "development";

const site = isDev
  ? "http://localhost:4321"
  : "https://main--gleaming-cuchufli-c99aa1.netlify.app";

const devOnlyIntegrations = [
  sentry({
    dsn: "https://6b3d9cf217f575ee9ca356327415e129@o1078821.ingest.sentry.io/4506544480124928",
    sourceMapsUploadOptions: {
      org: SENTRY_ORG,
      project: SENTRY_PROJECT,
      authToken: SENTRY_AUTH_TOKEN,
      telemetry: false,
    },
  }),
  ,
  spotlightjs(),
];

const integrations = [tailwind(), icon(), svelte(), sitemap()];

// https://astro.build/config
export default defineConfig({
  integrations: isDev
    ? [...integrations, ...devOnlyIntegrations]
    : integrations,

  site: site,
  output: "server",
  adapter: netlify(),
});
