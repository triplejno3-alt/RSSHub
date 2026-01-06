import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = {
    path: `/news`,
    categories: [`anime`],
    view: r.Articles,
    example: `/idolypride/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`idolypride.jp/news`] }],
    name: `News`,
    maintainers: [`Mingxia1`],
    handler: a,
    url: `idolypride.jp/news`,
};
async function a() {
    return {
        title: `偶像荣耀-新闻`,
        link: `https://idolypride.jp/news`,
        item: (await t({ method: `get`, url: `https://idolypride.jp/wp-json/wp/v2/news` })).data.map((t) => ({ title: t.title.rendered, link: t.link, pubDate: n(e(t.date_gmt), 0), description: t.content.rendered })),
    };
}
export { i as route };
