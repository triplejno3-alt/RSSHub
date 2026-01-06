import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './utils-OLSnwVIy.mjs';
const n = {
    path: `/`,
    categories: [`new-media`],
    example: `/thewirehindi`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`thewirehindi.com/`] }],
    name: `Latest News`,
    maintainers: [`Rjnishant530`],
    handler: r,
    url: `thewirehindi.com/`,
};
async function r() {
    let { data: n } = await e(`https://thewirehindi.com/wp-json/wp/v2/posts?_embed`);
    return {
        title: `The Wire Hindi - Latest News`,
        link: `https://thewirehindi.com/`,
        item: n.map((e) => t(e)),
        description: `Latest news from The Wire Hindi`,
        logo: `https://thewirehindi.com/wp-content/uploads/2023/05/cropped-The-wire-32x32.jpeg`,
        language: `hi`,
    };
}
export { n as route };
