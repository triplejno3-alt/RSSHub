import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './utils-lcRUpQu2.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/activity`,
    categories: [`new-media`],
    example: `/odaily/activity`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`0daily.com/activityPage`, `0daily.com/`] }],
    name: `活动`,
    maintainers: [`nczitzk`],
    handler: s,
    url: `0daily.com/activityPage`,
};
async function s(o) {
    let s = (await n({ method: `get`, url: `${i}/service/scheme/group/8?page=1&per_page=${o.req.query(`limit`) ?? 25}` })).data.data.items.data.map((e) => ({
        title: e.title,
        link: `${i}/activity/${e.id}`,
        pubDate: r(t(e.published_at), 8),
    }));
    return (
        (s = await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = a((await n({ method: `get`, url: t.link })).data.match(/"content":"(.*)"}},"secondaryList":/)[1]);
                    return (
                        e(`img`).each(function () {
                            e(this).attr(
                                `src`,
                                e(this)
                                    .attr(`src`)
                                    .replaceAll(String.raw`\"`, ``)
                            );
                        }),
                        (t.description = e.html()),
                        t
                    );
                })
            )
        )),
        { title: `活动 - Odaily星球日报`, link: `${i}/activityPage`, item: s }
    );
}
export { o as route };
