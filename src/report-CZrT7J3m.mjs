import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let { filter: i } = n.req.param(),
            a = Number.parseInt(n.req.query(`limit`) ?? `50`, 10),
            o = `wp-json/wp/v2`,
            s = `https://jbma.net`,
            c = new URL(`${o}/report`, s).href,
            l = new URL(`report/`, s).href,
            [u, d] = i ? (i.includes(`/`) ? i.split(`/`) : [void 0, i]) : [void 0, void 0],
            f;
        if (u && d) {
            let t = new URL(`${o}/${u}`, s).href,
                n = (await e(t, { query: { search: d } })).find((e) => e.slug === d || e.name === d);
            ((f = n?.id ?? void 0), (l = n?.link ?? l));
        }
        let p = await e(c, { query: { _embed: `true`, per_page: a, ...(u && f ? { [u]: f } : { search: d }) } }),
            m = r(await e(l)),
            h = m(`html`).attr(`lang`) ?? `ja`,
            g = [],
            _ = new RegExp(String.raw`^${s.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)}/?(?:[a-zA-Z0-9-]+/)*\?p=\d+$`);
        for (let e of p.slice(0, a)) {
            let t = e.link;
            t && _.test(t) && g.push(e.id);
        }
        let v = new Map();
        if (g.length > 0) {
            let t = new URL(`${o}/media`, s).href,
                n = await e(t, { query: { parent: g.join(`,`), per_page: 100 } });
            for (let e of n)
                if (e.parent) {
                    let t = v.get(e.parent);
                    t ? t.push(e) : v.set(e.parent, [e]);
                }
        }
        let y = p.slice(0, a).map((e) => {
            let n = e.title?.rendered ?? e.title,
                r = e.content?.rendered ?? void 0,
                i = e.date_gmt,
                a = e._embedded?.[`wp:term`]?.flat().map((e) => e.name) ?? [],
                o = e._embedded?.author?.map((e) => ({ name: e.name, url: e.link, avatar: e.avatar_urls?.[`96`] ?? e.avatar_urls?.[`48`] ?? e.avatar_urls?.[`24`] ?? void 0 })) ?? [],
                c = e.guid?.rendered ?? e.guid,
                l = e.modified_gmt ?? i,
                u = e._embedded?.[`wp:featuredmedia`]?.[0].source_url ?? void 0,
                d,
                f,
                p,
                m,
                g = e.link;
            if (g && _.test(g)) {
                let t = v.get(e.id);
                if (t && t.length > 0) {
                    let e = t[0];
                    (e.source_url && ((d = e.source_url), (f = e.mime_type), (p = e.title?.rendered ?? e.title), (m = Number(e.media_details?.filesize)), (g = d)),
                        !u && e.media_details?.sizes?.full?.source_url && (u = e.media_details.sizes.full.source_url));
                }
            }
            (!g || _.test(g)) && (g = new URL(`report/${e.slug}`, s).href);
            let y = { title: n, description: r, pubDate: i ? t(i) : void 0, link: g ?? c, category: a, author: o, guid: c, id: c, content: { html: r, text: r }, image: u, banner: u, updated: l ? t(l) : void 0, language: h };
            return (d && (y = { ...y, enclosure_url: d, enclosure_type: f, enclosure_title: p || n, enclosure_length: m }), y);
        });
        return {
            title: m(`title`).text(),
            description: m(`meta[property="og:description"]`).attr(`content`),
            link: l,
            item: y,
            allowEmpty: !0,
            image: m(`meta[property="og:image"]`).attr(`content`),
            author: m(`meta[property="og:site_name"]`).attr(`content`),
            language: h,
            id: l,
        };
    },
    a = [
        { label: `すべて`, value: `` },
        { label: `Metals Forcus`, value: `cat_report/metals-forcus` },
        { label: `WPIC`, value: `cat_report/wpic` },
        { label: `Incrementum`, value: `cat_report/incrementum` },
        { label: `東京金融取引所`, value: `cat_report/tfx` },
        { label: `池水執筆・出演`, value: `cat_report/ikemizu` },
        { label: `note`, value: `cat_report/note` },
        { label: `その他`, value: `cat_report/other` },
        { label: `In Gold We Trust`, value: `tag_report/in-gold-we-trust` },
        { label: `Precious Metals Weeklyレポート`, value: `tag_report/precious-metals-weekly-report` },
        { label: `ひろこのマーケットラウンジ`, value: `tag_report/market-lounge` },
        { label: `その他`, value: `tag_report/other` },
        { label: `四半期レポート`, value: `tag_report/quarterly-report` },
        { label: `プラチナ展望`, value: `tag_report/tenbo` },
        { label: `Gold Compass`, value: `tag_report/gold-compass` },
        { label: `豆知識`, value: `tag_report/mamechishiki` },
        { label: `プラチナ投資のエッセンス`, value: `tag_report/essence` },
        { label: `三菱UFJ信託銀行`, value: `tag_report/mufg` },
        { label: `石福金属興業`, value: `tag_report/ishifuku` },
        { label: `OANDA 証券`, value: `tag_report/oanda` },
        { label: `レポート`, value: `tag_report/report` },
    ],
    o = `
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [Metals Forcus](https://jbma.net/cat_report/metals-forcus/)                                   | [cat_report/metals-forcus](https://rsshub.app/jbma/report/cat_report/metals-forcus)                                 |
| [WPIC](https://jbma.net/cat_report/wpic/)                                                     | [cat_report/wpic](https://rsshub.app/jbma/report/cat_report/wpic)                                                   |
| [Incrementum](https://jbma.net/cat_report/incrementum/)                                       | [cat_report/incrementum](https://rsshub.app/jbma/report/cat_report/incrementum)                                     |
| [東京金融取引所](https://jbma.net/cat_report/tfx/)                                            | [cat_report/tfx](https://rsshub.app/jbma/report/cat_report/tfx)                                                     |
| [池水執筆・出演](https://jbma.net/cat_report/ikemizu/)                                        | [cat_report/ikemizu](https://rsshub.app/jbma/report/cat_report/ikemizu)                                             |
| [note](https://jbma.net/cat_report/note/)                                                     | [cat_report/note](https://rsshub.app/jbma/report/cat_report/note)                                                   |
| [その他](https://jbma.net/cat_report/other/)                                                  | [cat_report/other](https://rsshub.app/jbma/report/cat_report/other)                                                 |
| [In Gold We Trust](https://jbma.net/tag_report/in-gold-we-trust/)                             | [tag_report/in-gold-we-trust](https://rsshub.app/jbma/report/tag_report/in-gold-we-trust)                           |
| [Precious Metals Weekly レポート](https://jbma.net/tag_report/precious-metals-weekly-report/) | [tag_report/precious-metals-weekly-report](https://rsshub.app/jbma/report/tag_report/precious-metals-weekly-report) |
| [ひろこのマーケットラウンジ](https://jbma.net/tag_report/market-lounge/)                      | [tag_report/market-lounge](https://rsshub.app/jbma/report/tag_report/market-lounge)                                 |
| [その他](https://jbma.net/tag_report/other/)                                                  | [tag_report/other](https://rsshub.app/jbma/report/tag_report/other)                                                 |
| [四半期レポート](https://jbma.net/tag_report/quarterly-report/)                               | [tag_report/quarterly-report](https://rsshub.app/jbma/report/tag_report/quarterly-report)                           |
| [プラチナ展望](https://jbma.net/tag_report/tenbo/)                                            | [tag_report/tenbo](https://rsshub.app/jbma/report/tag_report/tenbo)                                                 |
| [Gold Compass](https://jbma.net/tag_report/gold-compass/)                                     | [tag_report/gold-compass](https://rsshub.app/jbma/report/tag_report/gold-compass)                                   |
| [豆知識](https://jbma.net/tag_report/mamechishiki/)                                           | [tag_report/mamechishiki](https://rsshub.app/jbma/report/tag_report/mamechishiki)                                   |
| [プラチナ投資のエッセンス](https://jbma.net/tag_report/essence/)                              | [tag_report/essence](https://rsshub.app/jbma/report/tag_report/essence)                                             |
| [三菱 UFJ 信託銀行](https://jbma.net/tag_report/mufg/)                                        | [tag_report/mufg](https://rsshub.app/jbma/report/tag_report/mufg)                                                   |
| [石福金属興業](https://jbma.net/tag_report/ishifuku/)                                         | [tag_report/ishifuku](https://rsshub.app/jbma/report/tag_report/ishifuku)                                           |
| [OANDA 証券](https://jbma.net/tag_report/oanda/)                                              | [tag_report/oanda](https://rsshub.app/jbma/report/tag_report/oanda)                                                 |
| [レポート](https://jbma.net/tag_report/report/)                                               | [tag_report/report](https://rsshub.app/jbma/report/tag_report/report)                                               |

`,
    s = {
        path: `/report/:filter{.+}?`,
        name: `Precious Metals Report`,
        url: `jbma.net`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/jbma/report`,
        parameters: { filter: { description: `Filter, all by default, can be found in the corresponding page URL`, options: a } },
        description:
            `::: tip
To subscribe to [Metals Forcus](https://jbma.net/cat_report/metals-forcus/), where the source URL is \`https://jbma.net/cat_report/metals-forcus/\`, extract the certain parts from this URL to be used as parameters, resulting in the route as [\`/jbma/report/cat_report/metals-forcus\`](https://rsshub.app/jbma/report/cat_report/metals-forcus).
:::

<details>
  <summary>More filters</summary>

| Name                                                                                          | ID                                                                                                                  |` +
            o +
            `
</details>
`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`jbma.net/:type/:name?`],
                target: (e) => {
                    let t = e.type,
                        n = e.name;
                    return t === `report` || t === `cat_report` || t === `tag_report` ? `/${t}${n ? `/${n}` : ``}` : `/${t}`;
                },
            },
            { title: `Metals Forcus`, source: [`jbma.net/cat_report/metals-forcus`], target: `/report/cat_report/metals-forcus` },
            { title: `WPIC`, source: [`jbma.net/cat_report/wpic`], target: `/report/cat_report/wpic` },
            { title: `Incrementum`, source: [`jbma.net/cat_report/incrementum`], target: `/report/cat_report/incrementum` },
            { title: `東京金融取引所`, source: [`jbma.net/cat_report/tfx`], target: `/report/cat_report/tfx` },
            { title: `池水執筆・出演`, source: [`jbma.net/cat_report/ikemizu`], target: `/report/cat_report/ikemizu` },
            { title: `note`, source: [`jbma.net/cat_report/note`], target: `/report/cat_report/note` },
            { title: `その他`, source: [`jbma.net/cat_report/other`], target: `/report/cat_report/other` },
            { title: `In Gold We Trust`, source: [`jbma.net/tag_report/in-gold-we-trust`], target: `/report/tag_report/in-gold-we-trust` },
            { title: `Precious Metals Weeklyレポート`, source: [`jbma.net/tag_report/precious-metals-weekly-report`], target: `/report/tag_report/precious-metals-weekly-report` },
            { title: `ひろこのマーケットラウンジ`, source: [`jbma.net/tag_report/market-lounge`], target: `/report/tag_report/market-lounge` },
            { title: `その他`, source: [`jbma.net/tag_report/other`], target: `/report/tag_report/other` },
            { title: `四半期レポート`, source: [`jbma.net/tag_report/quarterly-report`], target: `/report/tag_report/quarterly-report` },
            { title: `プラチナ展望`, source: [`jbma.net/tag_report/tenbo`], target: `/report/tag_report/tenbo` },
            { title: `Gold Compass`, source: [`jbma.net/tag_report/gold-compass`], target: `/report/tag_report/gold-compass` },
            { title: `豆知識`, source: [`jbma.net/tag_report/mamechishiki`], target: `/report/tag_report/mamechishiki` },
            { title: `プラチナ投資のエッセンス`, source: [`jbma.net/tag_report/essence`], target: `/report/tag_report/essence` },
            { title: `三菱UFJ信託銀行`, source: [`jbma.net/tag_report/mufg`], target: `/report/tag_report/mufg` },
            { title: `石福金属興業`, source: [`jbma.net/tag_report/ishifuku`], target: `/report/tag_report/ishifuku` },
            { title: `OANDA 証券`, source: [`jbma.net/tag_report/oanda`], target: `/report/tag_report/oanda` },
            { title: `レポート`, source: [`jbma.net/tag_report/report`], target: `/report/tag_report/report` },
        ],
        view: n.Articles,
        zh: {
            path: `/report/:filter{.+}?`,
            name: `贵金属报告`,
            url: `jbma.net`,
            maintainers: [`nczitzk`],
            handler: i,
            example: `/jbma/report`,
            parameters: { filter: { description: `过滤条件，默认为全部，可在对应页 URL 中找到`, options: a } },
            description:
                '::: tip\n若订阅 [Metals Forcus](https://jbma.net/cat_report/metals-forcus/)，网址为 `https://jbma.net/cat_report/metals-forcus/`，请截取 `https://jbma.net/` 到末尾 `/` 的部分 `cat_report/metals-forcus` 作为 `filter` 参数填入，此时目标路由为 [`/jbma/report/cat_report/metals-forcus`](https://rsshub.app/jbma/report/cat_report/metals-forcus)。\n:::\n\n<details>\n  <summary>更多分类</summary>\n\n| 名称                                                                                          | ID                                                                                                                  |' +
                o +
                `
</details>
`,
        },
    };
export { i as handler, s as route };
