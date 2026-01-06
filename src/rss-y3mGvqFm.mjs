import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = { path: `/`, categories: [`blog`], example: `/ippa`, radar: [{ source: [`ippa.top/`] }], name: `最新文章`, maintainers: [`cnkmmk`], handler: r, url: `ippa.top/` };
async function r() {
    let n = `https://www.ippa.top`;
    return {
        title: `子方有料`,
        link: n,
        description: `子方有料 - 最新文章`,
        item: (await t(`${n}/wp-json/wp/v2/posts`)).data.map((t) => ({ title: t.title.rendered, link: t.link, pubDate: e(t.date_gmt), description: t.content.rendered })),
    };
}
export { n as route };
