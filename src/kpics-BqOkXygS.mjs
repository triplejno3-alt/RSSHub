import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './description-B51rTNiE.mjs';
import { load as a } from 'cheerio';
const o = async (r) => {
        let { filter: o } = r.req.param(),
            s = Number.parseInt(r.req.query(`limit`) ?? `30`, 10),
            c = `https://kpopping.com`,
            l = new URL(`kpics${o ? `/${o}` : ``}`, c).href,
            u = a(await e(l)),
            d = u(`html`).attr(`lang`) ?? `en`,
            f = [];
        return (
            (f = u(`div.pics div.matrix div.cell`)
                .slice(0, s)
                .toArray()
                .map((e) => {
                    let t = u(e),
                        n = t.find(`figcaption section`).text(),
                        r = i({ images: t.find(`a.picture img`).attr(`src`) ? [{ src: t.find(`a.picture img`).attr(`src`), alt: n }] : void 0 }),
                        a = t.find(`a`).first().attr(`href`),
                        o = t.find(`figcaption section a`).contents().last().text(),
                        s = t.find(`a.picture img`).attr(`src`);
                    return { title: n, description: r, link: a ? new URL(a, c).href : void 0, author: o, content: { html: r, text: r }, image: s, banner: s, language: d };
                })),
            (f = (
                await Promise.all(
                    f.map((r) =>
                        r.link
                            ? t.tryGet(r.link, async () => {
                                  let t = a(await e(r.link)),
                                      o = t(`h1`).contents().first().text(),
                                      s = i({ description: t(`div.pics`).first().html() }),
                                      l = t(`meta[property="article:published_time"]`).attr(`content`),
                                      u = t(`div.buttons a`).toArray(),
                                      f = [...new Set(u.map((e) => t(e).text()).filter(Boolean))],
                                      p = t(`div.content-snippet aside:not(.like)`)
                                          .toArray()
                                          .map((e) => {
                                              let n = t(e),
                                                  r = n.find(`a`).last();
                                              return { name: r.text(), url: new URL(r.attr(`href`), c).href, avatar: n.find(`img`).attr(`src`) };
                                          }),
                                      m = t(`meta[name="twitter:image"]`).attr(`content`),
                                      h = t(`meta[property="article:modified_time"]`).attr(`content`),
                                      g = { title: o, description: s, pubDate: l ? n(l) : r.pubDate, category: f, author: p, content: { html: s, text: s }, image: m, banner: m, updated: h ? n(h) : r.updated, language: d },
                                      _ = t(`div.pics`).first().find(`img`).toArray(),
                                      v = {},
                                      y = 1;
                                  for (let e of _) {
                                      let n = t(e),
                                          r = n.attr(`src`) ? new URL(n.attr(`src`), c).href : void 0;
                                      if (!r) continue;
                                      let i = `image`,
                                          a = `${i}${y++}`;
                                      v[a] = { url: r, medium: i, title: n.attr(`alt`) || o, description: n.attr(`alt`) || o, thumbnail: r };
                                  }
                                  return (Object.keys(v).length > 0 && (g = { ...g, media: v }), { ...r, ...g });
                              })
                            : r
                    )
                )
            ).filter((e) => !0)),
            {
                title: u(`title`).text(),
                description: u(`meta[property="og:description"]`).attr(`content`),
                link: l,
                item: f,
                allowEmpty: !0,
                image: u(`meta[property="og:image"]`).attr(`content`),
                author: u(`meta[property="og:site_name"]`).attr(`content`),
                language: d,
                id: l,
            }
        );
    },
    s = {
        path: `/kpics/:filter{.+}?`,
        name: `Pics`,
        url: `kpopping.com`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/kpopping/kpics/gender-male/category-all/idol-any/group-any/order`,
        parameters: { filter: `Filter` },
        description:
            '::: tip\nIf you subscribe to [All male photo albums](https://kpopping.com/kpics/gender-male/category-all/idol-any/group-any/order)，where the URL is `https://kpopping.com/kpics/gender-male/category-all/idol-any/group-any/order`, extract the part `https://kpopping.com/kpics/` to the end, which is `gender-male/category-all/idol-any/group-any/order`, and use it as the parameter to fill in. Therefore, the route will be [`/kpopping/kpics/gender-male/category-all/idol-any/group-any/order`](https://rsshub.app/kpopping/kpics/gender-male/category-all/idol-any/group-any/order).\n:::',
        categories: [`picture`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`kpopping.com/kpics/:filter`],
                target: (e) => {
                    let t = e.filter;
                    return `/kpopping/kpics${t ? `/${t}` : ``}`;
                },
            },
        ],
        view: r.Articles,
        zh: {
            path: `/kpics/:filter{.+}?`,
            name: `Pics`,
            url: `kpopping.com`,
            maintainers: [`nczitzk`],
            handler: o,
            example: `/kpopping/kpics/gender-male/category-all/idol-any/group-any/order`,
            parameters: { filter: `筛选，可在对应分类页 URL 中找到` },
            description:
                '::: tip\n若订阅 [All male photo albums](https://kpopping.com/kpics/gender-male/category-all/idol-any/group-any/order)，网址为 `https://kpopping.com/kpics/gender-male/category-all/idol-any/group-any/order`，请截取 `https://kpopping.com/kpics/` 到末尾的部分 `gender-male/category-all/idol-any/group-any/order` 作为 `filter` 参数填入，此时目标路由为 [`/kpopping/kpics/gender-male/category-all/idol-any/group-any/order`](https://rsshub.app/kpopping/kpics/gender-male/category-all/idol-any/group-any/order)。\n:::\n',
        },
    };
export { o as handler, s as route };
