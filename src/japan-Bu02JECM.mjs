import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/arknights/japan`,
    categories: [`game`],
    example: `/hypergryph/arknights/japan`,
    radar: [{ source: [`ak.arknights.jp/news`, `ak.arknights.jp/`] }],
    name: `アークナイツ (日服新闻)`,
    maintainers: [`ofyark`],
    handler: r,
    url: `ak.arknights.jp/news`,
};
async function r(n) {
    return {
        title: `アークナイツ`,
        link: `https://www.arknights.jp/news`,
        description: `アークナイツ ニュース`,
        language: `ja`,
        item: (await e(`https://www.arknights.jp:10014/news`, { query: { lang: `ja`, limit: n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 9, page: 1 } })).data.items.map((e) => ({
            title: e.title,
            description: e.content[0].value,
            pubDate: t(e.publishedAt),
            link: `https://www.arknights.jp/news/${e.id}`,
        })),
    };
}
export { n as route };
