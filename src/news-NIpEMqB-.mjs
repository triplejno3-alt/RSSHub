import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
        path: `/news/:language?/:category?`,
        categories: [`game`],
        example: `/blizzard/news`,
        parameters: { language: `Language code, see below, en-US by default`, category: `Category, see below, All News by default` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `News`,
        maintainers: [`nczitzk`],
        handler: o,
        description: `Categories

| Category               | Slug                |
| ---------------------- | ------------------- |
| All News               |                     |
| Diablo II: Resurrected | diablo2             |
| Diablo III             | diablo3             |
| Diablo IV              | diablo4             |
| Diablo Immortal        | diablo-immortal     |
| Hearthstone            | hearthstone         |
| Heroes of the Storm    | heroes-of-the-storm |
| Overwatch 2            | overwatch           |
| StarCraft: Remastered  | starcraft           |
| StarCraft II           | starcraft2          |
| World of Warcraft      | world-of-warcraft   |
| Warcraft 3: Reforged   | warcraft3           |
| Warcraft Rumble        | warcraft-rumble     |
| Battle.net             | battlenet           |
| BlizzCon               | blizzcon            |
| Inside Blizzard        | blizzard            |

  Language codes

| Language           | Code  |
| ------------------ | ----- |
| Deutsch            | de-de |
| English (US)       | en-us |
| English (EU)       | en-gb |
| Español (EU)       | es-es |
| Español (Latino)   | es-mx |
| Français           | fr-fr |
| Italiano           | it-it |
| Português (Brasil) | pt-br |
| Polski             | pl-pl |
| Русский            | ru-ru |
| 한국어             | ko-kr |
| ภาษาไทย            | th-th |
| 日本語             | ja-jp |
| 繁體中文           | zh-tw |`,
    },
    i = {
        diablo2: { key: `diablo2`, value: `diablo-2-resurrected`, id: `blt54fbd3787a705054` },
        diablo3: { key: `diablo3`, value: `diablo-3`, id: `blt2031aef34200656d` },
        diablo4: { key: `diablo4`, value: `diablo-4`, id: `blt795c314400d7ded9` },
        'diablo-immortal': { key: `diablo-immortal`, value: `diablo-immortal`, id: `blt525c436e4a1b0a97` },
        hearthstone: { key: `hearthstone`, value: `hearthstone`, id: `blt5cfc6affa3ca0638` },
        'heroes-of-the-storm': { key: `heroes-of-the-storm`, value: `heroes-of-the-storm`, id: `blt2e50e1521bb84dc6` },
        overwatch: { key: `overwatch`, value: `overwatch`, id: `blt376fb94931906b6f` },
        starcraft: { key: `starcraft`, value: `starcraft`, id: `blt81d46fcb05ab8811` },
        starcraft2: { key: `starcraft2`, value: `starcraft-2`, id: `bltede2389c0a8885aa` },
        'world-of-warcraft': { key: `world-of-warcraft`, value: `world-of-warcraft`, id: `blt2caca37e42f19839` },
        warcraft3: { key: `warcraft3`, value: `warcraft-3`, id: `blt24859ba8086fb294` },
        'warcraft-rumble': { key: `warcraft-rumble`, value: `warcraft-rumble`, id: `blte27d02816a8ff3e1` },
        battlenet: { key: `battlenet`, value: `battle-net`, id: `blt90855744d00cd378` },
        blizzcon: { key: `blizzcon`, value: `blizzcon`, id: `bltec70ad0ea4fd6d1d` },
        blizzard: { key: `blizzard`, value: `blizzard`, id: `blt500c1f8b5470bfdb` },
    };
function a(e = `all`) {
    return e === `all`
        ? Object.values(i)
              .map((e) => `feedCxpProductIds[]=${e.id}`)
              .join(`&`)
        : `feedCxpProductIds[]=${i[e].id}`;
}
async function o(r) {
    let o = i[r.req.param(`category`)]?.key || `all`,
        s = `https://news.blizzard.com/${r.req.param(`language`) || `en-us`}`,
        c = o === `all` ? s : `${s}/?filter=${i[o].value}`,
        l = `${s}/api/news/blizzard`,
        u = ``,
        {
            data: {
                feed: { contentItems: d },
            },
        } = await t(`${l}?${a(o)}`),
        f = d.map((e) => {
            let t = e.properties;
            return ((u = o === `all` ? `All News` : t.cxpProduct.title), { title: t.title, link: t.newsUrl, author: t.author, category: t.category, guid: t.newsId, description: t.summary, pubDate: t.lastUpdated });
        }),
        p = await Promise.all(
            f.map((r) =>
                e.tryGet(r.link, async () => {
                    try {
                        let { data: e } = await t(r.link);
                        return ((r.description = n(e)(`.Content`).html()), r);
                    } catch {
                        return r;
                    }
                })
            )
        );
    return { title: u, link: c, item: p };
}
export { r as route };
