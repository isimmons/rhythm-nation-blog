import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), svelte()],
  site: "https://rythm-nation-blog.vercel.app",
  output: "server",
  adapter: vercel({
    imageService: true,
  }),
});
