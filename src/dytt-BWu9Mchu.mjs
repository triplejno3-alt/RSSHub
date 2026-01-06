import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
import o from 'iconv-lite';
const s = `www.dydytt.net`,
    c = `https://${s}`,
    l = async (i) => {
        let { category: s = `gndy/dyzz` } = i.req.param(),
            l = Number.parseInt(i.req.query(`limit`) ?? `25`, 10),
            u = new URL(`html/${s.replace(/^html\//, ``)}`, c).href,
            d = await e(u, { responseType: `arrayBuffer` }),
            f = a(o.decode(Buffer.from(d), `gb2312`)),
            p = f(`html`).attr(`lang`) ?? `zh-CN`,
            m = [];
        ((m = f(`div.co_content8 ul table`)
            .slice(0, l)
            .toArray()
            .map((e) => {
                let t = f(e),
                    i = t.find(`a.ulink`),
                    a = i.text(),
                    o = t.find(`td`).last().text(),
                    s = t.find(`font`).last().text().split(/：/).pop(),
                    l = i.attr(`href`),
                    u = s;
                return {
                    title: a,
                    description: o,
                    pubDate: s ? r(n(s), 8) : void 0,
                    link: l ? new URL(l, c).href : void 0,
                    doi: t.find(`meta[name="citation_doi"]`).attr(`content`),
                    content: { html: o, text: o },
                    updated: u ? r(n(u), 8) : void 0,
                    language: p,
                };
            })),
            (m = (
                await Promise.all(
                    m.map((r) =>
                        r.link
                            ? t.tryGet(r.link, async () => {
                                  let t = await e(r.link, { responseType: `arrayBuffer` }),
                                      i = a(o.decode(Buffer.from(t), `gb2312`)),
                                      s = i(`div.title_all h1 font`).text(),
                                      c = i(`div#Zoom span`).first(),
                                      l = c.contents().toArray(),
                                      u = l.findIndex((e) => e.type === `tag` && e.name === `center`),
                                      d = (u === -1 ? l : l.slice(0, u)).map((e) => f.html(e)).join(``),
                                      m = r.pubDate ? void 0 : c.prev().text().split(/：/).pop(),
                                      h = c.find(`img`).first().attr(`src`),
                                      g = m,
                                      _ = { title: s, description: d, pubDate: m ? n(m) : r.pubDate, content: { html: d, text: d }, image: h, banner: h, updated: g ? n(g) : r.updated, language: p },
                                      v = c.find(`a[href^="magnet:"]`).last(),
                                      y = v.attr(`href`);
                                  if (y) {
                                      let e = v.text();
                                      _ = { ..._, enclosure_url: y, enclosure_type: `application/x-bittorrent`, enclosure_title: e || s, enclosure_length: void 0, itunes_duration: void 0, itunes_item_image: h };
                                  }
                                  return { ...r, ..._ };
                              })
                            : r
                    )
                )
            ).filter((e) => !0)));
        let h = f(`title`).text();
        return { title: h, description: f(`META[name=description]`).attr(`content`), link: u, item: m, allowEmpty: !0, image: new URL(`images/logo.gif`, c).href, author: h.split(/_/).pop(), language: p, id: u };
    },
    u = {
        path: `/:category{.+}?`,
        name: `分类`,
        url: s,
        maintainers: [`junfengP`, `nczitzk`],
        handler: l,
        example: `/dytt/gndy/dyzz`,
        parameters: {
            category: {
                description: '分类，默认为 `gndy/dyzz`，即最新影片，可在对应分类页 URL 中找到',
                options: [
                    { label: `最新影片`, value: `gndy/dyzz` },
                    { label: `经典影片`, value: `gndy` },
                    { label: `国内电影`, value: `gndy/china` },
                    { label: `欧美电影`, value: `gndy/oumei` },
                    { label: `其它电影`, value: `gndy/rihan` },
                    { label: `华语电视`, value: `tv/hytv` },
                    { label: `欧美电视`, value: `tv/oumeitv` },
                    { label: `最新综艺`, value: `zongyi2013` },
                    { label: `旧版综艺`, value: `2009zongyi` },
                    { label: `动漫资源`, value: `dongman` },
                    { label: `旧版游戏`, value: `game` },
                    { label: `游戏下载`, value: `newgame` },
                    { label: `日韩剧集专区`, value: `tv/rihantv` },
                ],
            },
        },
        description: `::: tip
若订阅 [最新影片](${c}/html/gndy/dyzz)，网址为 \`${c}/html/gndy/dyzz\`，请截取 \`${c}/html/\` 到末尾的部分 \`gndy/dyzz\` 作为 \`category\` 参数填入，此时目标路由为 [\`/dytt/gndy/dyzz\`](https://rsshub.app/dytt/gndy/dyzz)。
:::

<details>
<summary>更多分类</summary>

| 分类                                                  | ID                                               |
| ----------------------------------------------------- | ------------------------------------------------ |
| [最新影片](${c}/html/gndy/dyzz/index.html)      | [gndy/dyzz](https://rsshub.app/dytt/gndy/dyzz)   |
| [经典影片](${c}/html/gndy/index.html)           | [gndy](https://rsshub.app/dytt/gndy)             |
| [国内电影](${c}/html/gndy/china/index.html)     | [gndy/china](https://rsshub.app/dytt/gndy/china) |
| [欧美电影](${c}/html/gndy/oumei/index.html)     | [gndy/oumei](https://rsshub.app/dytt/gndy/oumei) |
| [其它电影](${c}/html/gndy/rihan/index.html)     | [gndy/rihan](https://rsshub.app/dytt/gndy/rihan) |
| [华语电视](${c}/html/tv/hytv/index.html)        | [tv/hytv](https://rsshub.app/dytt/tv/hytv)       |
| [欧美电视](${c}/html/tv/oumeitv/index.html)     | [tv/oumeitv](https://rsshub.app/dytt/tv/oumeitv) |
| [最新综艺](${c}/html/zongyi2013/index.html)     | [zongyi2013](https://rsshub.app/dytt/zongyi2013) |
| [旧版综艺](${c}/html/2009zongyi/index.html)     | [2009zongyi](https://rsshub.app/dytt/2009zongyi) |
| [动漫资源](${c}/html/dongman/index.html)        | [dongman](https://rsshub.app/dytt/dongman)       |
| [旧版游戏](${c}/html/game/index.html)           | [game](https://rsshub.app/dytt/game)             |
| [游戏下载](${c}/html/newgame/index.html)        | [newgame](https://rsshub.app/dytt/newgame)       |
| [日韩剧集专区](${c}/html/tv/rihantv/index.html) | [tv/rihantv](https://rsshub.app/dytt/tv/rihantv) |

</details>
`,
        categories: [`multimedia`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !0, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: ['${domain}/index.htm', `${s}/html/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/dytt/html${t ? `/${t}` : ``}`;
                },
            },
            { title: `最新影片`, source: [`${c}/html/gndy/dyzz/index.html`], target: `/gndy/dyzz` },
            { title: `经典影片`, source: [`${c}/html/gndy/index.html`], target: `/gndy` },
            { title: `国内电影`, source: [`${c}/html/gndy/china/index.html`], target: `/gndy/china` },
            { title: `欧美电影`, source: [`${c}/html/gndy/oumei/index.html`], target: `/gndy/oumei` },
            { title: `其它电影`, source: [`${c}/html/gndy/rihan/index.html`], target: `/gndy/rihan` },
            { title: `华语电视`, source: [`${c}/html/tv/hytv/index.html`], target: `/tv/hytv` },
            { title: `欧美电视`, source: [`${c}/html/tv/oumeitv/index.html`], target: `/tv/oumeitv` },
            { title: `最新综艺`, source: [`${c}/html/zongyi2013/index.html`], target: `/zongyi2013` },
            { title: `旧版综艺`, source: [`${c}/html/2009zongyi/index.html`], target: `/2009zongyi` },
            { title: `动漫资源`, source: [`${c}/html/dongman/index.html`], target: `/dongman` },
            { title: `旧版游戏`, source: [`${c}/html/game/index.html`], target: `/game` },
            { title: `游戏下载`, source: [`${c}/html/newgame/index.html`], target: `/newgame` },
            { title: `日韩剧集专区`, source: [`${c}/html/tv/rihantv/index.html`], target: `/tv/rihantv` },
        ],
        view: i.Articles,
    };
export { l as handler, u as route };
