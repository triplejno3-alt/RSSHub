import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as t, t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
import { CookieJar as d } from 'tough-cookie';
const f = new d(),
    p = {
        index: { name: ``, link: `/instantnews/`, title: `即時香港中國 國際金融 股市經濟新聞`, description: `全天候即時港股、香港財經、國際金融和經濟新聞、中國經濟新聞資訊和分析` },
        stock: { name: `港股直擊`, link: `/instantnews/stock`, title: `即時香港股市 股份板塊 攻略分析`, description: `全天候即時港股追蹤和直擊分析，股份異動、大行報告、沽空、速評` },
        hongkong: { name: `香港財經`, link: `/instantnews/hongkong`, title: `即時香港經濟 中港經濟融合追蹤分析`, description: `香港經濟和焦點行業 中港融合和商機的分析` },
        china: { name: `中國財經`, link: `/instantnews/china`, title: `即時中國經濟 國策焦點 中港融合追蹤分析`, description: `香港經濟和焦點行業 中港融合和商機的分析` },
        international: { name: `國際財經`, link: `/instantnews/international`, title: `即時國際財經 股市匯市 央行政策`, description: `國際財經 金融股市 央行政策的新聞和分析` },
        property: { name: `地產新聞`, link: `/property/news`, title: `地產投資`, description: `即時地產新聞, 新盤資訊, 樓市分析, 藍籌屋苑數據及室內設計鑑賞` },
        current: { name: `時事脈搏`, link: `/instantnews/current`, title: `即時香港中國 國際金融 股市經濟新聞`, description: `全天候即時香港股市、金融、經濟新聞資訊和分析，致力與讀者一起剖釋香港、關注兩岸、放眼全球政經格局` },
    },
    m = {
        path: `/:category?`,
        categories: [`traditional-media`],
        example: `/hkej/index`,
        parameters: { category: `分类，默认为全部新闻` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`hkej.com/`] }],
        name: `即时新闻`,
        maintainers: [`TonyRL`],
        handler: h,
        url: `hkej.com/`,
        description: `| index    | stock    | hongkong | china    | international | property | current  |
| -------- | -------- | -------- | -------- | ------------- | -------- | -------- |
| 全部新闻 | 港股直击 | 香港财经 | 中国财经 | 国际财经      | 地产新闻 | 时事脉搏 |`,
    };
async function h(d) {
    let m = p[d.req.param(`category`) ?? `index`],
        h = `https://www2.hkej.com`,
        g = c((await r({ method: `get`, url: h + m.link, headers: { Referer: h }, cookieJar: f })).data),
        _ = g(`h3.in_news_u_t a, h4.hkej_hl-news_topic_2014 a, div.hkej_toc_listingAll_news2_2014 h3 a, div.hkej_toc_cat_top_detail h3 a, div.allNews div.news h1 a, div#div_listingAll div.news2 h3 a`)
            .toArray()
            .map((e) => ((e = g(e)), { title: e.text().trim(), link: h + e.attr(`href`).slice(0, e.attr(`href`).lastIndexOf(`/`)) })),
        v = (e, t) => l(s(a, { children: [e.map((e) => s(`figure`, { children: [o(`img`, { src: e.href, alt: e.title }), o(`figcaption`, { children: e.title })] })), u(t ?? ``)] })),
        y = await Promise.all(
            _ &&
                _.map((a) =>
                    e.tryGet(a.link, async () => {
                        let e = c((await r({ method: `get`, url: a.link, headers: { Referer: m.link }, cookieJar: f })).data);
                        (e(`#ad_popup`).remove(), e(`[class^=ad-]`).remove(), e(`[id^=ad-]`).remove(), e(`[id^=div-gpt-ad-]`).remove(), e(`.hkej_sub_ex_article_nonsubscriber_ad_2014`).remove());
                        let o = (e(`div.hkej_detail_thumb_2014 td a`).length ? e(`div.hkej_detail_thumb_2014 td a`) : e(`div.thumb td a`)).toArray().map((e) => ((e = g(e)), { href: e.attr(`href`), title: e.attr(`title`) })),
                            s = e(`p.info span.date`).text().trim();
                        return (
                            (a.category = e(`p.info span.cate a`)
                                .toArray()
                                .map((t) => e(t).text().trim())),
                            (a.description = v(o, e(`div#article-content`).html())),
                            (a.pubDate = i(/(今|昨)/.test(s) ? t(s) : n(s, `YYYY M D`), 8)),
                            a
                        );
                    })
                )
        ),
        b = { title: `信報網站 - ${m.title} - 信報網站 hkej.com`, link: h + m.link, description: `信報網站(www.hkej.com)即時新聞${m.name}，提供${m.description}。`, item: y, language: `zh-hk` };
    return (d.set(`json`, { ...b, cookieJar: f }), b);
}
export { m as route };
