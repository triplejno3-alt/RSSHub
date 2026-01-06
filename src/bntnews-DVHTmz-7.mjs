import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { bnt003000000: `Beauty`, bnt002000000: `Fashion`, bnt004000000: `Star`, bnt007000000: `Style+`, bnt009000000: `Photo`, bnt005000000: `Life`, bnt008000000: `Now` },
    o = {
        path: `/:category?`,
        categories: [`new-media`],
        example: `/bntnews/bnt003000000`,
        parameters: { category: `Category ID, see table below, default to Now (bnt008000000)` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Category`,
        maintainers: [`iamsnn`],
        handler: s,
        description: `| Beauty | Fashion | Star | Style+ | Photo | Life | Now |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| bnt003000000 | bnt002000000 | bnt004000000 | bnt007000000 | bnt009000000 | bnt005000000 | bnt008000000 |`,
    };
async function s(o) {
    let s = o.req.param(`category`) || `bnt008000000`,
        c = `https://www.bntnews.co.kr`,
        l = `${c}/article/list/${s}`,
        u = ((await n({ method: `get`, url: l, searchParams: { returnType: `ajax` } })).data.result?.items || []).map((e) => {
            let n = `${c}/article/view/${e.aid}`;
            return { title: e.title, link: n, description: e.content, pubDate: r(t(e.firstPublishDate), 9), author: e.reporter?.[0]?.name || `` };
        }),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n({ method: `get`, url: t.link })).data),
                        r = e(`.body_wrap .content`);
                    if ((r.find(`.googleBanner`).remove(), r.find(`script`).remove(), r.find(`style`).remove(), r.length > 0)) t.description = r.html();
                    else {
                        let n = e(`.article_view`);
                        n.length > 0 && (t.description = n.html());
                    }
                    return t;
                })
            )
        );
    return { title: `bntnews - ${a[s] || s}`, link: l, item: d };
}
export { o as route };
