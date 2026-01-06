import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { jsx as n } from 'hono/jsx/jsx-runtime';
import { load as r } from 'cheerio';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = async (t) => {
        let { filter: a = `order=sell_desc` } = t.req.param(),
            o = Number.parseInt(t.req.query(`limit`) ?? `24`, 10),
            s = `https://www.bookwalker.com.tw`,
            c = new URL(`search?${a}`, s).href,
            l = r(await e(c)),
            u = l(`html`).attr(`lang`) ?? `zh-TW`,
            d = l(`div.bwbook_package`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    let t = l(e),
                        r = t.find(`h4.bookname`).text(),
                        a = t.find(`h5.bprice`).text(),
                        o = t.find(`h5.booknamesub`).text().trim(),
                        c = `${r} - ${o} ${a}`,
                        d = t
                            .find(`img`)
                            .attr(`data-src`)
                            ?.replace(/_\d+(\.\w+)$/, `$1`),
                        f = i(d ? n(`figure`, { children: n(`img`, { src: d, alt: r }) }) : null),
                        p = t.find(`div.bwbookitem a`).attr(`href`),
                        m = o.split(/,/).map((e) => ({ name: e }));
                    return { title: c, description: f, link: p ? new URL(p, s).href : void 0, author: m, content: { html: f, text: f }, image: d, banner: d, language: u };
                });
        return {
            title: l(`title`).text(),
            description: l(`meta[property="og:description"]`).attr(`content`),
            link: c,
            item: d,
            allowEmpty: !0,
            image: l(`meta[property="og:image"]`).attr(`content`),
            author: l(`meta[property="og:site_name"]`).attr(`content`),
            language: u,
            id: l(`meta[property="og:url"]`).attr(`content`),
        };
    },
    o = {
        path: `/search/:filter?`,
        name: `搜尋`,
        url: `www.bookwalker.com.tw`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/bookwalker/search/order=sell_desc&s=34`,
        parameters: { filter: { description: '过滤器，默认为 `order=sell_desc`，即依發售日新至舊排序' } },
        description:
            '::: tip\n订阅 [依發售日新至舊排序的文學小說](https://www.bookwalker.com.tw/search?order=sell_desc&s=34)，其源网址为 `https://www.bookwalker.com.tw/search?order=sell_desc&s=34`，请参考该 URL 指定部分构成参数，此时路由为 [`/bookwalker/search/order=sell_desc&s=34`](https://rsshub.app/bookwalker/search/order=sell_desc&s=34)。\n:::',
        categories: [`shopping`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.bookwalker.com.tw/search`], target: `/bookwalker/search` }],
        view: t.Articles,
    };
export { a as handler, o as route };
