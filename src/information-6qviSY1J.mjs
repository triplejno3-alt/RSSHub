import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, description: t }) => o(i, { children: [e?.map((e) => (e?.src ? a(`figure`, { children: a(`img`, { src: e.src, alt: e.alt }) }) : null)), t ? l(t) : null] }),
    d = (e) => c(a(u, { ...e })),
    f = async (r) => {
        let { id: i = `all` } = r.req.param(),
            a = Number.parseInt(r.req.query(`limit`) ?? `50`, 10),
            o = `https://www.cbndata.com`,
            c = new URL(`information?tag_id=${i}`, o).href,
            l = new URL(`api/v3/informations`, o).href,
            u = s(await e(c)),
            f = u(`html`).attr(`lang`) ?? `zh`,
            p = await e(l, { query: { page: 1, per_page: a } }),
            m = [];
        ((m = p.data.slice(0, a).map((e) => {
            let t = e.title,
                r = e.image,
                i = d({ images: r ? [{ src: r, alt: t }] : void 0 }),
                a = e.date,
                s = e.id ? `information/${e.id}` : void 0,
                c = e.tags,
                l = `cbndata-information-${e.id}`,
                u = a;
            return {
                title: t,
                description: i,
                pubDate: a ? n(a) : void 0,
                link: s ? new URL(s, o).href : void 0,
                category: c,
                guid: l,
                id: l,
                content: { html: i, text: i },
                image: r,
                banner: r,
                updated: u ? n(u) : void 0,
                language: f,
            };
        })),
            (m = await Promise.all(
                m.map((r) =>
                    r.link
                        ? t.tryGet(r.link, async () => {
                              let t = (await e(r.link)).match(/<script>window\.__INITIAL_STATE__=(.*?);<\/script>/)?.[1];
                              if (!t) return r;
                              let i = JSON.parse(t)?.data;
                              if (!i) return r;
                              let a = i.title,
                                  s = r.description + d({ description: i.content }),
                                  c = i.date,
                                  l = i.id ? `information/${i.id}` : void 0,
                                  u = [...new Set((i.tags?.map((e) => e.name) ?? []).filter(Boolean))],
                                  p = [{ name: i.author, url: void 0, avatar: void 0 }],
                                  m = `cbndata-information-${i.id}`,
                                  h = i.thumbnail_url,
                                  g = c,
                                  _ = {
                                      title: a,
                                      description: s,
                                      pubDate: c ? n(c) : void 0,
                                      link: l ? new URL(l, o).href : void 0,
                                      category: u,
                                      author: p,
                                      guid: m,
                                      id: m,
                                      content: { html: s, text: s },
                                      image: h,
                                      banner: h,
                                      updated: g ? n(g) : void 0,
                                      language: f,
                                  };
                              return { ...r, ..._ };
                          })
                        : r
                )
            )));
        let h = p.home_tags.find((e) => String(e.id) === i)?.name ?? ``,
            g = `${h ? `${h}-` : ``}${u(`title`).text().trim()}`;
        return { title: g, description: u(`meta[name="description"]`).attr(`content`), link: c, item: m, allowEmpty: !0, image: u(`img.logo-logoImage`).attr(`src`), author: g.split(/\|/).pop(), language: f, id: c };
    },
    p = {
        path: `/information/:id?`,
        name: `看点`,
        url: `www.cbndata.com`,
        maintainers: [`nczitzk`],
        handler: f,
        example: `/cbndata/information/all`,
        parameters: {
            id: {
                description: '分类，默认为 `all`，即全部，可在对应分类页 URL 中找到',
                options: [
                    { label: `全部`, value: `all` },
                    { label: `美妆个护`, value: `1` },
                    { label: `服饰鞋包`, value: `2559` },
                    { label: `宠物`, value: `2419` },
                    { label: `营销`, value: `2484` },
                ],
            },
        },
        description: `::: tip
订阅 [美妆个护](https://www.cbndata.com/information?tag_id=1)，其源网址为 \`https://www.cbndata.com/information?tag_id=1\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/cbndata/information/1\`](https://rsshub.app/cbndata/information/1)。
:::

| 分类                                                        | ID                                                  |
| ----------------------------------------------------------- | --------------------------------------------------- |
| [全部](https://www.cbndata.com/information?tag_id=all)      | [all](https://rsshub.app/cbndata/information/all)   |
| [美妆个护](https://www.cbndata.com/information?tag_id=1)    | [1](https://rsshub.app/cbndata/information/1)       |
| [服饰鞋包](https://www.cbndata.com/information?tag_id=2559) | [2559](https://rsshub.app/cbndata/information/2559) |
| [宠物](https://www.cbndata.com/information?tag_id=2419)     | [2419](https://rsshub.app/cbndata/information/2419) |
| [营销](https://www.cbndata.com/information?tag_id=2484)     | [2484](https://rsshub.app/cbndata/information/2484) |
`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.cbndata.com/information`],
                target: (e, t) => {
                    let n = new URL(t).searchParams.get(`tag_id`) ?? void 0;
                    return `/information${n ? `/${n}` : ``}`;
                },
            },
            { title: `全部`, source: [`www.cbndata.com/information`], target: `/information/all` },
            { title: `美妆个护`, source: [`www.cbndata.com/information`], target: `/information/1` },
            { title: `服饰鞋包`, source: [`www.cbndata.com/information`], target: `/information/2559` },
            { title: `宠物`, source: [`www.cbndata.com/information`], target: `/information/2419` },
            { title: `营销`, source: [`www.cbndata.com/information`], target: `/information/2484` },
        ],
        view: r.Articles,
    };
export { f as handler, p as route };
