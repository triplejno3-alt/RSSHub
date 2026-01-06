import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './depth-DjXhYqvn.mjs';
import { n as i, t as a } from './utils-BhV27ZO7.mjs';
import { load as o } from 'cheerio';
const s = {
    path: `/hot`,
    categories: [`finance`],
    example: `/cls/hot`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cls.cn/`] }],
    name: `热门文章排行榜`,
    maintainers: [`5upernova-heng`, `nczitzk`],
    handler: c,
    url: `cls.cn/`,
};
async function c(s) {
    let c = s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`)) : 50,
        l = (await n({ method: `get`, url: `${i}/v2/article/hot/list`, searchParams: a() })).data.data.slice(0, c).map((e) => ({ title: e.title || e.brief, link: `${i}/detail/${e.id}`, pubDate: t(e.ctime * 1e3) }));
    return (
        (l = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = o((await n({ method: `get`, url: t.link })).data),
                        i = JSON.parse(e(`script#__NEXT_DATA__`).text()).props.initialState.detail.articleDetail;
                    return ((t.author = i.author?.name ?? t.author ?? ``), (t.description = r(i)), t);
                })
            )
        )),
        { title: `财联社 - 热门文章排行榜`, link: i, item: l }
    );
}
export { s as route };
