import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
import r from 'iconv-lite';
const i = async (i) => {
        let { tag: a } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 20,
            s = `https://news.10jqka.com.cn`,
            c = new URL(`tapp/news/push/stock`, s).href,
            l = new URL(`realtimenews.html`, s).href,
            { data: u } = await t(l, { responseType: `buffer` }),
            d = n(r.decode(u, `gbk`)),
            f = d(`html`).prop(`lang`),
            { data: p } = await t(c, { searchParams: { page: 1, tag: a ?? `` } }),
            m =
                p.data?.list.slice(0, o).map((t) => {
                    let n = t.title,
                        r = t.digest,
                        i = `10jqka-${t.seq}`,
                        a = t.picUrl;
                    return {
                        title: n,
                        description: r,
                        pubDate: e(t.ctime, `X`),
                        link: t.url,
                        category: [...new Set([t.color === `2` ? `重要` : void 0, ...t.tags.map((e) => e.name), ...t.tagInfo.map((e) => e.name)])].filter(Boolean),
                        author: t.source,
                        guid: i,
                        id: i,
                        content: { html: r, text: r },
                        image: a,
                        banner: t.picUrl,
                        updated: e(t.rtime, `X`),
                        language: f,
                    };
                }) ?? [],
            h = d(`title`).text(),
            g = d(`h1 a img`).prop(`src`);
        return { title: h, description: h.split(/_/).pop(), link: l, item: m, allowEmpty: !0, image: g, author: d(`meta[property="og:site_name"]`).prop(`content`), language: f };
    },
    a = {
        path: `/realtimenews/:tag?`,
        name: `7×24小时要闻直播`,
        url: `news.10jqka.com.cn`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/10jqka/realtimenews`,
        parameters: { tag: `标签，默认为全部` },
        description:
            '::: tip\n  若订阅 [7×24小时要闻直播](https://news.10jqka.com.cn/realtimenews.html) 的 `公告` 标签。将 `公告` 作为标签参数填入，此时路由为 [`/10jqka/realtimenews/公告`](https://rsshub.app/10jqka/realtimenews/公告)。\n  \n  若订阅 [7×24小时要闻直播](https://news.10jqka.com.cn/realtimenews.html) 的 `公告` 和 `A股` 标签。将 `公告,A股` 作为标签参数填入，此时路由为 [`/10jqka/realtimenews/公告,A股`](https://rsshub.app/10jqka/realtimenews/公告,A股)。\n:::\n\n| 全部 | 重要 | A股 | 港股 | 美股 | 机会 | 异动 | 公告 |\n| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |\n    ',
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { title: `全部`, source: [`news.10jqka.com.cn/realtimenews.html`], target: `/realtimenews/全部` },
            { title: `重要`, source: [`news.10jqka.com.cn/realtimenews.html`], target: `/realtimenews/重要` },
            { title: `A股`, source: [`news.10jqka.com.cn/realtimenews.html`], target: `/realtimenews/A股` },
            { title: `港股`, source: [`news.10jqka.com.cn/realtimenews.html`], target: `/realtimenews/港股` },
            { title: `美股`, source: [`news.10jqka.com.cn/realtimenews.html`], target: `/realtimenews/美股` },
            { title: `机会`, source: [`news.10jqka.com.cn/realtimenews.html`], target: `/realtimenews/机会` },
            { title: `异动`, source: [`news.10jqka.com.cn/realtimenews.html`], target: `/realtimenews/异动` },
            { title: `公告`, source: [`news.10jqka.com.cn/realtimenews.html`], target: `/realtimenews/公告` },
        ],
    };
export { i as handler, a as route };
