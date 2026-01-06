import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = { date: `Newest`, popularity: `Most Popular`, trending: `Trending`, alpha: `Name`, style: `Number of styles` },
    l = {
        path: `/fonts/:sort?`,
        categories: [`design`],
        example: `/google/fonts/date`,
        parameters: { sort: 'Sorting type, see below, default to `date`' },
        features: { requireConfig: [{ name: `GOOGLE_FONTS_API_KEY`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Google Fonts`,
        maintainers: [`Fatpandac`],
        handler: u,
        description: `| Newest | Trending | Most popular |  Name | Number of styles |
| :----: | :------: | :----------: | :---: | :--------------: |
|  date  | trending |  popularity  | alpha |       style      |

::: warning
  This route requires API key, therefore it's only available when self-hosting, refer to the [Deploy Guide](https://docs.rsshub.app/deploy/config#route-specific-configurations) for route-specific configurations.
:::`,
    };
async function u(i) {
    let a = i.req.param(`sort`) ?? `date`,
        o = i.req.param(`limit`) ?? 25,
        s = e.google.fontsApiKey;
    if (!s) throw new r(`Google Fonts API key is required.`);
    let l = `https://www.googleapis.com/webfonts/v1/webfonts?sort=${a}&key=${s}`,
        u = (await n.get(l)).data.items.slice(0, o);
    return {
        title: `Google Fonts - ${c[a]}`,
        link: `https://fonts.google.com`,
        item: u && u.map((e) => ({ title: e.family, description: d(e), link: `https://fonts.google.com/specimen/${e.family.replaceAll(/\s/g, `+`)}`, pubDate: t(e.lastModified, `YYYY-MM-DD`) })),
    };
}
const d = (e) =>
    s(
        o(i, {
            children: [
                o(`text`, { children: [`Family: `, e.family] }),
                a(`br`, {}),
                o(`text`, { children: [`Category: `, e.category] }),
                a(`br`, {}),
                o(`text`, { children: [`Subsets: `, e.subsets?.join(`,`)] }),
                a(`br`, {}),
                o(`text`, { children: [`Version: `, e.version] }),
                a(`br`, {}),
                o(`text`, { children: [`Last modified: `, e.lastModified] }),
                a(`br`, {}),
                a(Strong, { children: `File:` }),
                a(`br`, {}),
                Object.entries(e.files ?? {}).map(([e, t]) => o(i, { children: [a(`a`, { href: t, children: e }), `\xA0\xA0`] })),
            ],
        })
    );
export { l as route };
