import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import './description-CN05cUaw.mjs';
import { r as n, t as r } from './util-pFc_biuX.mjs';
import { load as i } from 'cheerio';
const a = async (t) => {
        let { id: a } = t.req.param(),
            o = Number.parseInt(t.req.query(`limit`) ?? `10`, 10),
            s = new URL(`tag-${a}-1.html`, n).href,
            c = new URL(`tag/getDynamicList/${a}`, n).href,
            l = i(await e(s)),
            u = l(`html`).attr(`lang`) ?? `zh-CN`,
            d = r(o, (await e(c, { query: { page: 1, type: 2 } })).data.dataList, l),
            f = l(`div.tags-detail-top-1 h2`).text();
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
        path: `/tag/:id`,
        name: `标签`,
        url: `www.dgtle.com`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/dgtle/tag/394`,
        parameters: { id: { description: `标签 ID，可在对应标签页 URL 中找到` } },
        description:
            ':::tip\n订阅 [#手机讨论区](https://www.dgtle.com/tag-394-1.html)，其源网址为 `https://www.dgtle.com/tag-394-1.html`，请参考该 URL 指定部分构成参数，此时路由为 [`/dgtle/tag/394`](https://rsshub.app/dgtle/tag/394)。\n:::\n',
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [String.raw`www.dgtle.com/$tag-:id-\d+.html`], target: `/tag/:id` }],
        view: t.Articles,
    };
export { a as handler, o as route };
