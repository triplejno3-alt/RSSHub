import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as n, o as r, r as i } from './utils-i-Akwp6Q.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/news/:lang?`,
    categories: [`anime`],
    example: `/qoo-app/news/en`,
    parameters: { lang: 'Language, see the table below, empty means `中文`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `News`,
    maintainers: [`TonyRL`],
    handler: s,
    description: `| 中文 | English |
| ---- | ------- |
|      | en      |`,
};
async function s(o) {
    let { lang: s = `` } = o.req.param(),
        { data: c } = await t(`${n}${s ? `/${s}` : ``}/wp-json/wp/v2/posts`, { searchParams: { per_page: o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 100 } }),
        l = c.map((t) => {
            let n = a(t.content.rendered, null, !1);
            return (i(n), { title: t.title.rendered, link: t.link.slice(0, t.link.lastIndexOf(`/`)), description: n.html(), pubDate: e(t.date_gmt) });
        });
    return {
        title: `QooApp : Anime Game Platform`,
        description:
            s === `en`
                ? `QooApp is a professional platform specialising in Anime, Comics and Games (ACG) culture. We aim to unite ACG fans around the globe and help them as thoroughly as we can.`
                : `QooApp 是專注二次元的專業平台，旨在聚集世界各地熱愛ACG的用戶，為他們創造有價值的服務和產品。從遊戲商店、新聞資訊、玩家社群，到線下聚會、漫畫閱讀、遊戲發行——QooApp不斷進化中，拓展突破次元的遊玩體驗。`,
        image: r,
        link: `${n}${s ? `/${s}` : ``}`,
        language: s === `en` ? `en` : `zh`,
        item: l,
    };
}
export { o as route };
