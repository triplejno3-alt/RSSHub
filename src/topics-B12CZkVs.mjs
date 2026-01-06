import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = (e) => o(i(r, { children: e?.length ? e.map((e) => (e.type === `text` ? i(`p`, { children: e.content }) : e.type === `raw_html` ? i(r, { children: s(e.content ?? ``) }) : null)) : null })),
    l = async (n) => {
        let { id: r = `hotspot` } = n.req.param(),
            i = Number.parseInt(n.req.query(`limit`) ?? `30`, 10),
            o = `https://www.wainao.me`,
            s = new URL(`topics/${r}`, o).href,
            l = new URL(`pf/api/v3/content/fetch/story-feed-sections`, o).href,
            u = await e(l, { query: { query: JSON.stringify({ feedOffset: 0, feedSize: i, includeSections: `/topics/${r}` }), d: 81, _website: `wainao` } }),
            d = a(await e(s)),
            f = d(`html`).attr(`lang`) ?? `zh-CN`,
            p = [];
        return (
            (p = u.content_elements
                .slice(0, i)
                .map((e) => {
                    let n = e.headlines.basic,
                        r = c(e.content_elements),
                        i = e.publish_date,
                        a = e.website_url,
                        s = [e.taxonomy?.primary_section?.name].filter(Boolean),
                        l = e.credits?.by?.map((e) => ({ name: e.name })) ?? [],
                        u = e.website_url,
                        d = e.promo_items.basic.url,
                        p = e.last_updated_date;
                    return {
                        title: n,
                        description: r,
                        pubDate: i ? t(i) : void 0,
                        link: a ? new URL(a, o).href : void 0,
                        category: s,
                        author: l,
                        guid: u,
                        id: u,
                        content: { html: r, text: r },
                        image: d,
                        banner: d,
                        updated: p ? t(p) : void 0,
                        language: f,
                    };
                })
                .filter((e) => !0)),
            {
                title: d(`title`).text(),
                description: d(`meta[property="og:title"]`).attr(`content`),
                link: s,
                item: p,
                allowEmpty: !0,
                image: d(`meta[property="og:image"]`).attr(`content`),
                author: d(`meta[property="og:site_name"]`).attr(`content`),
                language: f,
                id: s,
            }
        );
    },
    u = {
        path: `/topics/:id?`,
        name: `主题`,
        url: `wainao.me`,
        maintainers: [`nczitzk`],
        handler: l,
        example: `/wainao/topics/hotspot`,
        parameters: {
            id: {
                description: '主题 id，默认为 `hotspot`，即热点，可在对应主题页 URL 中找到',
                options: [
                    { label: `热点`, value: `hotspot` },
                    { label: `人物`, value: `people` },
                    { label: `身份`, value: `identity` },
                    { label: `政治`, value: `politics` },
                    { label: `社会`, value: `society` },
                    { label: `文化`, value: `culture` },
                    { label: `经济`, value: `economics` },
                    { label: `环境`, value: `environment` },
                    { label: `FUN`, value: `fun` },
                ],
            },
        },
        description:
            '::: tip\n若订阅 [人物](https://www.wainao.me/topics/people)，网址为 `https://www.wainao.me/topics/people`，请截取 `https://www.wainao.me/topics/` 到末尾的部分 `people` 作为 `id` 参数填入，此时目标路由为 [`/wainao/topics/people`](https://rsshub.app/wainao/topics/people)。\n:::\n\n| [热点](https://www.wainao.me/topics/hotspot)        | [人物](https://www.wainao.me/topics/people)       | [身份](https://www.wainao.me/topics/identity)         | [政治](https://www.wainao.me/topics/politics)         | [社会](https://www.wainao.me/topics/society)        | [文化](https://www.wainao.me/topics/culture)        | [经济](https://www.wainao.me/topics/economics)          | [环境](https://www.wainao.me/topics/environment)            | [FUN](https://www.wainao.me/topics/fun)     |\n| --------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------- |\n| [hotspot](https://rsshub.app/wainao/topics/hotspot) | [people](https://rsshub.app/wainao/topics/people) | [identity](https://rsshub.app/wainao/topics/identity) | [politics](https://rsshub.app/wainao/topics/politics) | [society](https://rsshub.app/wainao/topics/society) | [culture](https://rsshub.app/wainao/topics/culture) | [economics](https://rsshub.app/wainao/topics/economics) | [environment](https://rsshub.app/wainao/topics/environment) | [fun](https://rsshub.app/wainao/topics/fun) |\n',
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.wainao.me/topics/:id`], target: `/topics/:id` },
            { title: `热点`, source: [`www.wainao.me/topics/hotspot`], target: `/topics/hotspot` },
            { title: `人物`, source: [`www.wainao.me/topics/people`], target: `/topics/people` },
            { title: `身份`, source: [`www.wainao.me/topics/identity`], target: `/topics/identity` },
            { title: `政治`, source: [`www.wainao.me/topics/politics`], target: `/topics/politics` },
            { title: `社会`, source: [`www.wainao.me/topics/society`], target: `/topics/society` },
            { title: `文化`, source: [`www.wainao.me/topics/culture`], target: `/topics/culture` },
            { title: `经济`, source: [`www.wainao.me/topics/economics`], target: `/topics/economics` },
            { title: `环境`, source: [`www.wainao.me/topics/environment`], target: `/topics/environment` },
            { title: `FUN`, source: [`www.wainao.me/topics/fun`], target: `/topics/fun` },
        ],
        view: n.Articles,
    };
export { l as handler, u as route };
