import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r, t as i } from './utils-BETPJRxL.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/user_article/:id`,
    categories: [`new-media`],
    example: `/woshipm/user_article/324696`,
    parameters: { id: `用户 id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`woshipm.com/u/:id`] }],
    name: `用户文章`,
    maintainers: [`LogicJake`],
    handler: s,
};
async function s(o) {
    let s = o.req.param(`id`),
        c = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 12,
        l = `${i}/u/${s}`,
        u = a(await n(l).then((e) => e.data)),
        d = u(`.author--meta .name`).text(),
        f = u(`.post--card`)
            .slice(0, c)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.find(`h2.post--card__title a`);
                return { title: n.attr(`title`), link: n.attr(`href`), pubDate: t(e.find(`time`).text(), `YYYY-MM-DD`) };
            }),
        p = await Promise.all(f.map((t) => r(t, e.tryGet)));
    return { title: `${d}的文章-人人都是产品经理`, description: u(`.author--meta .description`).text(), image: u(`.author--meta .avatar`).attr(`src`).split(`!`)[0], link: l, item: p };
}
export { o as route };
