import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { n as t } from './utils-CA4deCoK.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/top/:k`,
    categories: [`picture`],
    example: `/misskon/top/60`,
    parameters: { k: `Top k days, can be 3, 7, 30 or 60` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [
        { title: `Top 3 days`, source: [`misskon.com/top3/`], target: `/top/3` },
        { title: `Top 7 days`, source: [`misskon.com/top7/`], target: `/top/7` },
        { title: `Top 30 days`, source: [`misskon.com/top30/`], target: `/top/30` },
        { title: `Top 60 days`, source: [`misskon.com/top60/`], target: `/top/60` },
    ],
    name: `Top k days`,
    maintainers: [`Urabartin`],
    handler: async (r) => {
        let { k: i } = r.req.param();
        if (![`3`, `7`, `30`, `60`].includes(i)) throw Error(`Invalid k: k=${i}`);
        let a = `https://misskon.com/top${i}/`,
            o = n(await e(a)),
            s = o(`.page-title`).text(),
            c = o(`.content > p`).first().text(),
            l = o(`#main-content article.item-list > h2 a`)
                .toArray()
                .map((e) => new URL(o(e).attr(`href`) || ``).pathname.slice(1, -1)),
            u = new URLSearchParams();
        return (u.set(`slug`, l.join(`,`)), u.set(`per_page`, l.length.toString()), { title: `MissKON - ${s}`, link: a, description: c, item: await t(u) });
    },
};
export { r as route };
