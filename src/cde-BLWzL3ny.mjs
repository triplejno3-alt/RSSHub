import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './utils-BNmanp6O.mjs';
import { load as i } from 'cheerio';
const a = { news: `https://www.cde.org.cn/main/news/listpage/545cf855a50574699b46b26bcb165f32`, policy: `https://www.cde.org.cn/main/policy/listpage/9f9c74c73e0f8f56a8bfbc646055026d` },
    o = { news: { zwxw: `getList`, ywdd: `getHotNewsList`, tpxw: `getPictureNewsList`, gzdt: `getWorkList` }, policy: { flfg: `getPolicyList`, zxgz: `getRuleList` } },
    s = { news: { zwxw: `政务新闻`, ywdd: `要闻导读`, tpxw: `图片新闻`, gzdt: `工作动态` }, policy: { flfg: `法律法规`, zxgz: `政策规章` } },
    c = {
        news: {
            zwxw: { pageSize: 25, pageNum: 1, classId: `545cf855a50574699b46b26bcb165f32` },
            ywdd: { pageSize: 25, pageNum: 1, ishot: 1 },
            tpxw: { pageSize: 25, pageNum: 1 },
            gzdt: { pageSize: 25, pageNum: 1, classId: `8dc6aac86eb083759b1e01615617a347` },
        },
        policy: { flfg: { pageNum: 1, pageSize: 25, fclass: 0, keyName: `TITLE`, logicC: `bh` }, zxgz: { pageNum: 1, pageSize: 25, fclass: 0, keyName: `TITLE`, logicC: `bh` } },
    },
    l = {
        path: `/:channel/:category`,
        categories: [`government`],
        example: `/cde/news/gzdt`,
        parameters: { channel: `频道`, category: `类别` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `首页`,
        maintainers: [`Fatpandac`],
        handler: u,
        description: `-   频道

| 新闻中心 | 政策法规 |
| :------: | :------: |
|   news   |  policy  |

  -   类别

| 新闻中心 | 政务新闻 | 要闻导读 | 图片新闻 | 工作动态 |
| :------: | :------: | :------: | :------: | :------: |
|          |   zwxw   |   ywdd   |   tpxw   |   gzdt   |

| 政策法规 | 法律法规 | 中心规章 |
| :------: | :------: | :------: |
|          |   flfg   |   zxgz   |`,
    };
async function u(l) {
    let u = l.req.param(`channel`),
        d = l.req.param(`category`);
    c[u][d].pageSize = l.req.param(`limit`) ?? 25;
    let f = (await n({ method: `post`, url: `${r.rootUrl}/main/${u}/${o[u][d]}`, headers: { cookie: await r.getCookie(l) }, form: c[u][d] })).data.data.records.map((e) => {
            let t = {
                news: `${r.rootUrl}/main/${e.isPic ? `newspic/view/` : `news/viewInfoCommon/`}${e.newsIdCode}`,
                policy: `${r.rootUrl}/main/${e.regulatIdCODE ? `policy/regulatview/${e.regulatIdCODE}` : `policy/view/${e.policyIdCODE}`}`,
            };
            return { title: e.title, link: t[u] };
        }),
        p = await Promise.all(
            f.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n(a.link, { headers: { cookie: await r.getCookie(l) } })).data);
                    return (
                        (a.pubDate = t(e(`div.news_detail_date`).text(), `YYYYMMDD`)),
                        (a.description = e(`div.news_detail_box`).find(`div.news_detail_title`).remove().end().find(`div.news_detail_date`).remove().end().find(`img`).remove().end().html()),
                        a
                    );
                })
            )
        );
    return { title: `${r.title} - ${s[u][d]}`, link: a[u], item: p };
}
export { l as route };
