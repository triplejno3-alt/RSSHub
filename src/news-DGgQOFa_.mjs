import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import './description-CN05cUaw.mjs';
import { n, r } from './util-pFc_biuX.mjs';
import { load as i } from 'cheerio';
const a = async (t) => {
        let { id: a = `0` } = t.req.param(),
            o = Number.parseInt(t.req.query(`limit`) ?? `30`, 10),
            s = new URL(`news`, r).href,
            c = new URL(`news/getNewsIndexList/${a}`, r).href,
            l = i(await e(s)),
            u = l(`html`).attr(`lang`) ?? `zh-CN`,
            d = await n(o, (await e(c)).data.dataList),
            f = l(`div.whale_news_index-content-tab li[data_id="${a}"]`).text();
        return {
            title: `${l(`title`).text().trim().split(/\s/)[0]}${f ? ` - ${f}` : a}`,
            description: l(`meta[name="description"]`).attr(`content`),
            link: s,
            item: d,
            allowEmpty: !0,
            author: l(`meta[name="keywords"]`).attr(`content`)?.split(/,/)[0] ?? void 0,
            language: u,
            id: s,
        };
    },
    o = {
        path: `/news/:id?`,
        name: `鲸闻`,
        url: `www.dgtle.com`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/dgtle/news/0`,
        parameters: {
            id: {
                description: '分类，默认为 `0`，即最新，可在下表中找到',
                options: [
                    { label: `最新`, value: `0` },
                    { label: `直播`, value: `395` },
                    { label: `资讯`, value: `396` },
                    { label: `每日一言`, value: `388` },
                ],
            },
        },
        description: `:::tip
订阅 [最新](https://www.dgtle.com/news)，其对应分类 ID 为 \`0\`，此时路由为 [\`/dgtle/news/0\`](https://rsshub.app/dgtle/news/0)。
:::

| 最新 | 直播 | 资讯 | 每日一言 |
| ---- | ---- | ---- | -------- |
| 0    | 395  | 396  | 388      |
`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.dgtle.com/news`], target: `/news` },
            { title: `最新`, source: [`www.dgtle.com/news`], target: `/news/0` },
            { title: `直播`, source: [`www.dgtle.com/news`], target: `/news/395` },
            { title: `资讯`, source: [`www.dgtle.com/news`], target: `/news/396` },
            { title: `每日一言`, source: [`www.dgtle.com/news`], target: `/news/388` },
        ],
        view: t.Articles,
    };
export { a as handler, o as route };
