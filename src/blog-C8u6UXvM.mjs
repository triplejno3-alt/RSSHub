import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
        path: `/:game/blog/:locale?`,
        categories: [`game`],
        example: `/supercell/clashroyale/blog/zh`,
        parameters: { game: `Game name, see below`, locale: `Language code, see below, English by default` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`supercell.com/en/games/:game/:locale/blog`], target: `/:game/blog/:locale` }],
        name: `Game Blog`,
        maintainers: [`fishyo`],
        handler: c,
        description: `Supported games

| Game              | Slug          |
| ----------------- | ------------- |
| Clash Royale      | clashroyale   |
| Brawl Stars       | brawlstars    |
| Clash of Clans    | clashofclans  |
| Boom Beach        | boombeach     |
| Hay Day           | hayday        |

Language codes

| Language           | Code    |
| ------------------ | ------- |
| English            |         |
| 繁體中文           | zh      |
| 简体中文           | zh-hans |
| Français           | fr      |
| Deutsch            | de      |
| Indonesia          | id      |
| Italiano           | it      |
| 日本語             | ja      |
| 한국어             | ko      |
| Português          | pt      |
| Русский            | ru      |
| Español            | es      |`,
    },
    i = { clashroyale: `Clash Royale`, brawlstars: `Brawl Stars`, clashofclans: `Clash of Clans`, boombeach: `Boom Beach`, hayday: `Hay Day` };
function a(e) {
    return !e?.content || !Array.isArray(e.content)
        ? ``
        : e.content
              .map((e) => {
                  switch (e.nodeType) {
                      case `paragraph`:
                          return `<p>${o(e)}</p>`;
                      case `heading-1`:
                      case `heading-2`:
                      case `heading-3`:
                      case `heading-4`:
                      case `heading-5`:
                      case `heading-6`: {
                          let t = e.nodeType.split(`-`)[1];
                          return `<h${t}>${o(e)}</h${t}>`;
                      }
                      case `quote`:
                          return `<blockquote>${o(e)}</blockquote>`;
                      case `unordered-list`:
                      case `ordered-list`:
                          return `<${e.nodeType === `unordered-list` ? `ul` : `ol`}>${e.content?.map((e) => `<li>${o(e)}</li>`).join(``) || ``}</${e.nodeType === `unordered-list` ? `ul` : `ol`}>`;
                      case `list-item`:
                          return o(e);
                      default:
                          return o(e);
                  }
              })
              .join(``);
}
function o(e) {
    return e?.content
        ? e.content
              .map((e) => {
                  if (e.nodeType === `text`) {
                      let t = e.value || ``;
                      if (e.marks && Array.isArray(e.marks))
                          for (let n of e.marks)
                              switch (n.type) {
                                  case `bold`:
                                      t = `<strong>${t}</strong>`;
                                      break;
                                  case `italic`:
                                      t = `<em>${t}</em>`;
                                      break;
                                  case `underline`:
                                      t = `<u>${t}</u>`;
                                      break;
                                  case `code`:
                                      t = `<code>${t}</code>`;
                                      break;
                                  default:
                                      break;
                              }
                      return t;
                  }
                  return e.nodeType === `paragraph` || e.nodeType === `list-item` ? o(e) : ``;
              })
              .join(``)
        : ``;
}
function s(e) {
    let t = [];
    switch (e.__typename) {
        case `TextBlock`:
            (e.title && t.push(`<h3>${e.title}</h3>`), e.text?.json?.content && t.push(a(e.text.json)));
            break;
        case `FeatureBlock`:
            (e.title && t.push(`<h3>${e.title}</h3>`),
                e.featureThumbnail?.url && t.push(`<img src="${e.featureThumbnail.url}" alt="${e.featureThumbnail.title || ``}">`),
                e.featureText?.json?.content && t.push(a(e.featureText.json)));
            break;
        case `ImageBlock`: {
            let n = e.image?.url || e.url || ``;
            n && t.push(`<img src="${n}" alt="${e.image?.title || e.title || ``}">`);
            break;
        }
        case `CarouselBlock`:
            if (e.items && Array.isArray(e.items)) for (let n of e.items) n.image?.url && t.push(`<img src="${n.image.url}" alt="${n.image.title || ``}">`);
            break;
        default:
            break;
    }
    return t.join(``);
}
async function c(r) {
    let a = r.req.param(`game`),
        o = r.req.param(`locale`) || ``;
    if (!i[a]) throw Error(`Unsupported game: ${a}. Supported games: ${Object.keys(i).join(`, `)}`);
    let c = o ? `/${o}` : ``,
        l = `https://supercell.com`,
        u = `${l}/en/games/${a}${c}/blog/`,
        { data: d } = await n(u),
        f = d.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/),
        p = f ? JSON.parse(f[1]) : {},
        m = p.props.pageProps.articles || [],
        h = p.buildId,
        g = await Promise.all(
            m.map((r) => {
                let i = `${l}${r.linkUrl}`,
                    a = t(r.publishDate);
                return e.tryGet(i, async () => {
                    try {
                        let { data: e } = await n(`${l}/_next/data/${h}${r.linkUrl}.json`),
                            t = e.pageProps,
                            o = ``;
                        return (
                            t?.bodyCollection && Array.isArray(t.bodyCollection) && (o = t.bodyCollection.map((e) => s(e)).join(``)),
                            { title: r.title, link: i, description: o || r.descriptionForNewsArchive || ``, pubDate: a, category: r.category, author: `Supercell` }
                        );
                    } catch {
                        return { title: r.title, link: i, description: r.descriptionForNewsArchive || ``, pubDate: a, category: r.category, author: `Supercell` };
                    }
                });
            })
        );
    return { title: `${i[a]} Blog${o ? ` (${o})` : ``}`, link: u, item: g, language: o || `en` };
}
export { r as route };
