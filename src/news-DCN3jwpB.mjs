import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
import r from '@bbob/html';
import i from '@bbob/preset-html5';
const a = (e) =>
        e.walk((e) =>
            typeof e == `string` &&
            e ===
                `
`
                ? { tag: `br`, content: null }
                : e
        ),
    o = i.extend((e) => ({
        ...e,
        url: (e) => ({ tag: `a`, attrs: { href: Object.keys(e.attrs)[0], rel: `noopener`, target: `_blank` }, content: e.content }),
        video: (e, { render: t }) => ({
            tag: `video`,
            attrs: { controls: ``, preload: `metadata`, poster: e.attrs?.poster },
            content: t(Object.entries({ webm: `video/webm`, mp4: `video/mp4` }).map(([t, n]) => ({ tag: `source`, attrs: { src: e.attrs?.[t], type: n } }))),
        }),
    })),
    s = async (i) => {
        let { category: s = `all`, language: c = `english` } = i.req.param(),
            l = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 100,
            u = `https://www.counter-strike.net`,
            d = new URL(`news${s && s !== `all` ? `/${s}` : ``}${c ? `?l=${c}` : ``}`, u).href,
            f = new URL(`events/ajaxgetpartnereventspageable/`, `https://store.steampowered.com`).href,
            { data: p } = await t(f, { searchParams: { clan_accountid: 0, appid: 730, offset: 0, count: l, l: c } }),
            m = p.events
                .filter((e) => (s === `updates` ? e.event_type === 12 : e.event_type))
                .slice(0, l)
                .map((t) => {
                    let n = t.event_name,
                        i = r(t.announcement_body.body, [o(), a]),
                        s = `counter-strike-news-${t.gid}`;
                    return {
                        title: n,
                        description: i,
                        pubDate: e(t.announcement_body.posttime, `X`),
                        link: new URL(`newsentry/${t.gid}`, u).href,
                        category: t.announcement_body.tags,
                        guid: s,
                        id: s,
                        content: { html: i, text: t.announcement_body.body },
                        updated: e(t.announcement_body.updatetime, `X`),
                    };
                }),
            { data: h } = await t(d),
            g = n(h),
            _ = `Counter Strike`,
            v = new URL(`apps/csgo/images/dota_react//blog/default_cover.jpg`, `https://media.st.dl.eccdnx.com`).href;
        return { title: `${_} - ${s === `updates` ? `Updates` : `News`}`, description: g(`title`).text(), link: d, item: m, allowEmpty: !0, image: v, author: _, language: c };
    },
    c = {
        path: `/news/:category?/:language?`,
        name: `News`,
        url: `www.counter-strike.net`,
        maintainers: [`nczitzk`],
        handler: s,
        example: `/counter-strike/news`,
        parameters: { category: 'Category, `updates` or `all`, `all` by default', language: `Language, english by default, see below for more languages` },
        description: `::: tip
  If you subscribe to [Updates in English](https://www.counter-strike.net/news/updates?l=english)，where the URL is \`https://www.counter-strike.net/news/updates?l=english\`, extract the \`l\`, which is \`english\`, and use it as the parameter to fill in. Therefore, the route will be [\`/counter-strike/news/updates/english\`](https://rsshub.app/counter-strike/news/updates/english).
:::

<details>
<summary>More languages</summary>

| 语言代码                                          | 语言名称   |
| ------------------------------------------------- | ---------- |
| English                                           | english    |
| Español - España (Spanish - Spain)                | spanish    |
| Français (French)                                 | french     |
| Italiano (Italian)                                | italian    |
| Deutsch (German)                                  | german     |
| Ελληνικά (Greek)                                  | greek      |
| 한국어 (Korean)                                   | koreana    |
| 简体中文 (Simplified Chinese)                     | schinese   |
| 繁體中文 (Traditional Chinese)                    | tchinese   |
| Русский (Russian)                                 | russian    |
| ไทย (Thai)                                        | thai       |
| 日本語 (Japanese)                                 | japanese   |
| Português (Portuguese)                            | portuguese |
| Português - Brasil (Portuguese - Brazil)          | brazilian  |
| Polski (Polish)                                   | polish     |
| Dansk (Danish)                                    | danish     |
| Nederlands (Dutch)                                | dutch      |
| Suomi (Finnish)                                   | finnish    |
| Norsk (Norwegian)                                 | norwegian  |
| Svenska (Swedish)                                 | swedish    |
| Čeština (Czech)                                   | czech      |
| Magyar (Hungarian)                                | hungarian  |
| Română (Romanian)                                 | romanian   |
| Български (Bulgarian)                             | bulgarian  |
| Türkçe (Turkish)                                  | turkish    |
| Українська (Ukrainian)                            | ukrainian  |
| Tiếng Việt (Vietnamese)                           | vietnamese |
| Español - Latinoamérica (Spanish - Latin America) | latam      |

</details>
    `,
        categories: [`game`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.counter-strike.net/news/:category`],
                target: (e, t) => {
                    t = new URL(t);
                    let n = e.category,
                        r = t.searchParams.get(`l`);
                    return `/news${n ? `/${n}${r ? `/${r}` : ``}` : ``}`;
                },
            },
        ],
    };
export { s as handler, c as route };
