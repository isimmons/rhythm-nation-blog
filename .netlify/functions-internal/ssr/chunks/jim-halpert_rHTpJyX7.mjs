;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a4a2de01-2d57-4ab9-ae0a-e1695da871da",e._sentryDebugIdIdentifier="sentry-dbid-a4a2de01-2d57-4ab9-ae0a-e1695da871da")}catch(e){}}();import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"name":"Jim Halpert","image":"../posts/images/coffee.jpg"};
				const file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/content/authors/jim-halpert.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
//# sourceMappingURL=jim-halpert_rHTpJyX7.mjs.map
