import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { r as n, t as r } from './util-BkASGVbN.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/news`,
    name: `资讯`,
    url: `www.aibase.com`,
    maintainers: [`zreo0`],
    handler: async (a) => {
        let o = Number.parseInt(a.req.query(`limit`) ?? `30`, 10),
            s = new URL(`discover`, n).href,
            c = i(await e(s)),
            l = c(`img.logo`).prop(`src`),
            u = l ? new URL(l, n).href : ``,
            d = c(`title`).text().split(/_/).pop(),
            { apiInfoListUrl: f } = await r(c);
        return {
            title: `AI新闻资讯`,
            description: `AI新闻资讯 - 不错过全球AI革新的每一个时刻`,
            language: `zh-cn`,
            link: `https://www.aibase.com/zh/news`,
            item: (await e(f, { headers: { accept: `application/json;charset=utf-8` }, query: { pagesize: o, page: 1, type: 1, isen: 0 } })).map((e) => ({
                title: e.title,
                link: `https://www.aibase.com/zh/news/${e.Id}`,
                description: e.summary,
                pubDate: t(e.addtime),
                author: e.author || `AI Base`,
            })),
            allowEmpty: !0,
            image: u,
            author: d,
        };
    },
    example: `/aibase/news`,
    description: `获取 AI 资讯列表`,
    categories: [`new-media`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.aibase.com/zh/news`], target: `/news` }],
};
export { a as route };
