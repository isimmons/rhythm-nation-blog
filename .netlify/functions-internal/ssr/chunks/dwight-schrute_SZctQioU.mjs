;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b130c21c-7db4-4dcb-9769-cf758bfc484d",e._sentryDebugIdIdentifier="sentry-dbid-b130c21c-7db4-4dcb-9769-cf758bfc484d")}catch(e){}}();import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_2WJtSRFU.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"name":"Dwight Schrute","image":"../posts/images/coffee.jpg"};
				const file = "C:/Users/isimm/code/astro/james-quick/rythm-nation-blog/src/content/authors/dwight-schrute.md";
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
//# sourceMappingURL=dwight-schrute_SZctQioU.mjs.map
