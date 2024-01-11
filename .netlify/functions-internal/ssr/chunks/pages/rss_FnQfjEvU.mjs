;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0453e2d7-0db0-4430-8e98-8e39f2c78307",e._sentryDebugIdIdentifier="sentry-dbid-0453e2d7-0db0-4430-8e98-8e39f2c78307")}catch(e){}}();import rss from '@astrojs/rss';
import markdownIt from 'markdown-it';
import sanitizeHTML from 'sanitize-html';
import { g as getCollection } from './_slug__2dC7f6M1.mjs';
import './404_Lc-3aH9C.mjs';

const parser = markdownIt();
async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: "Rhythm Nation",
    description: "A community of music producers and enthusiasts",
    site: context.site || "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      content: sanitizeHTML(parser.render(post.body)),
      image: post.data.cover.src
    }))
  });
}

export { GET };
//# sourceMappingURL=rss_FnQfjEvU.mjs.map
