import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { t as i } from './valid-host-Bsy2BS2p.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
const u = {
    path: `/activity/:category?/:language?/:latestAdditions?/:latestEdits?/:latestAlerts?/:latestPictures?`,
    categories: [`shopping`],
    example: `/myfigurecollection/activity`,
    parameters: {
        category: `Category, Figures by default`,
        language: 'Language, as above, `en` by default',
        latestAdditions: 'Latest Additions, on as `1` by default, off as `0`',
        latestEdits: 'Changes, on as `1` by default, off as `0`',
        latestAlerts: 'Alerts, on as `1` by default, off as `0`',
        latestPictures: 'Pictures, on as `1` by default, off as `0`',
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`zh.myfigurecollection.net/browse`, `zh.myfigurecollection.net/`], target: `/:category?/:language?` }],
    name: `Activity`,
    maintainers: [`nczitzk`],
    handler: d,
    url: `zh.myfigurecollection.net/browse`,
    description: `Category

| Figures | Goods | Media |
| ------- | ----- | ----- |
| 0       | 1     | 2     |

  Language

| Id | Language   |
| -- | ---------- |
|    | en         |
| de | Deutsch    |
| es | Español    |
| fi | Suomeksi   |
| fr | Français   |
| it | Italiano   |
| ja | 日本語     |
| nl | Nederlands |
| no | Norsk      |
| pl | Polski     |
| pt | Português  |
| ru | Русский    |
| sv | Svenska    |
| zh | 中文       |`,
};
async function d(a) {
    let o = a.req.param(`category`) ?? `-1`,
        s = a.req.param(`language`) ?? ``,
        l = a.req.param(`latestAdditions`) ?? `1`,
        u = a.req.param(`latestEdits`) ?? `1`,
        d = a.req.param(`latestAlerts`) ?? `1`,
        p = a.req.param(`latestPictures`) ?? `1`;
    if (s && !i(s)) throw new r(`Invalid language`);
    let m = `https://${s === `en` || s === `` ? `` : `${s}.`}myfigurecollection.net`,
        h = `${m}/browse.v4.php?mode=activity&latestAdditions=${l}&latestEdits=${u}&latestAlerts=${d}&latestPictures=${p}&rootId=${o}`,
        g = c((await t({ method: `get`, url: h })).data),
        _ = g(`.activity-wrapper`)
            .toArray()
            .map(
                (t) => (
                    (t = g(t)),
                    {
                        title: `${t.find(`.activity-label`).text().split(` • `)[0]}: ${t.find(`.stamp-anchor`).text()}`,
                        link: `${m}${t.find(`.stamp-anchor .tbx-tooltip`).attr(`href`)}`,
                        pubDate: n(e(t.find(`.activity-time span`).attr(`title`)), 0),
                        author: t.find(`.user-anchor`).text(),
                        description: f(
                            t.find(`.changelog`).text(),
                            t
                                .find(`.picture-icon`)
                                .toArray()
                                .map((e) =>
                                    g(e)
                                        .html()
                                        .match(/url\((.*)\)/)[1]
                                        .replace(/\/thumbnails/, ``)
                                )
                        ),
                    }
                )
            );
    return {
        title: g(`title`)
            .text()
            .replace(/ \(.*\)/, ``),
        link: h,
        item: _,
    };
}
const f = (e, t) => l(s(a, { children: [e ? s(a, { children: [`Changed field: `, e] }) : null, t?.map((e, t) => o(`img`, { src: e }, `${e}-${t}`))] }));
export { u as route };
