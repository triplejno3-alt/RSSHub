import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './utils-BZuxbJRH.mjs';
import { load as a } from 'cheerio';
import o from 'iconv-lite';
const s = {
    path: `/user/:name`,
    categories: [`bbs`],
    example: `/pikabu/user/@bula.dragon`,
    parameters: { name: `User name` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`pikabu.ru/:name`] }],
    name: `User`,
    maintainers: [`TonyRL`],
    handler: c,
};
async function c(s) {
    let c = `${i}/${s.req.param(`name`)}`,
        l = await t(c, { responseType: `buffer` }),
        u = l.headers[`content-type`].match(/charset=([\w-]+)/)[1],
        d = a(o.decode(l.data, u)),
        f = d(`.story__main`)
            .not(`.story__placeholder`)
            .toArray()
            .map((t) => {
                t = d(t);
                let i = t.find(`.story__title a`);
                return (
                    n(t),
                    t.find(`.player`).each((e, t) => {
                        ((t = d(t)), r(t));
                    }),
                    { title: i.text(), link: i.attr(`href`), pubDate: e(t.find(`time`).attr(`datetime`)), description: t.find(`.story__content-inner`).html(), author: t.find(`.user__nick`).text() }
                );
            });
    return { title: d(`meta[property="og:title"]`).attr(`content`), description: d(`.profile__user-about-content`).text(), image: d(`meta[property="og:image"]`).attr(`content`), language: `ru-RU`, link: c, item: f };
}
export { s as route };
