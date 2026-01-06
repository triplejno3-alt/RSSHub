import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './config-not-found-DGyG6Tbz.mjs';
import { load as r } from 'cheerio';
function i(e, t) {
    if (typeof t != `string`) return e;
    for (let n of t.split(`.`)) e = e[n];
    return e;
}
const a = {
    path: `/transform/json/:url/:routeParams`,
    categories: [`other`],
    example: `/rsshub/transform/json/https%3A%2F%2Fapi.github.com%2Frepos%2Fginuerzh%2Fgost%2Freleases/title=Gost%20releases&itemTitle=tag_name&itemLink=html_url&itemDesc=body`,
    parameters: { url: '`encodeURIComponent`ed URL address', routeParams: `Transformation rules, requires URL encode` },
    features: { requireConfig: [{ name: `ALLOW_USER_SUPPLY_UNSAFE_DOMAIN`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Transformation - JSON`,
    maintainers: [`ttttmr`],
    handler: o,
    description:
        'Specify options (in the format of query string) in parameter `routeParams` parameter to extract data from JSON.\n\n| Key                | Meaning                                      | Accepted Values   | Default                                    |\n| ------------------ | -------------------------------------------- | ----------------- | ------------------------------------------ |\n| `title`          | The title of the RSS                         | `string`        | Extracted from home page of current domain |\n| `item`           | The JSON Path as `item` element            | `string`        | Entire JSON response                       |\n| `itemTitle`      | The JSON Path as `title` in `item`       | `string`        | None                                       |\n| `itemLink`       | The JSON Path as `link` in `item`        | `string`        | None                                       |\n| `itemLinkPrefix` | Optional Prefix for `itemLink` value       | `string`        | None                                       |\n| `itemDesc`       | The JSON Path as `description` in `item` | `string`        | None                                       |\n| `itemPubDate`    | The JSON Path as `pubDate` in `item`     | `string`        | None                                       |\n\n::: tip\nJSON Path only supports format like `a.b.c`. if you need to access arrays, like `a[0].b`, you can write it as `a.0.b`.\n:::\n\n  Parameters parsing in the above example:\n\n| Parameter     | Value                                                                    |\n| ------------- | ------------------------------------------------------------------------ |\n| `url`         | `https://api.github.com/repos/ginuerzh/gost/releases`                    |\n| `routeParams` | `title=Gost releases&itemTitle=tag_name&itemLink=html_url&itemDesc=body` |\n\n  Parsing of `routeParams` parameter:\n\n| Parameter   | Value           |\n| ----------- | --------------- |\n| `title`     | `Gost releases` |\n| `itemTitle` | `tag_name`      |\n| `itemLink`  | `html_url`      |\n| `itemDesc`  | `body`          |',
};
async function o(a) {
    if (!e.feature.allow_user_supply_unsafe_domain) throw new n(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
    let o = a.req.param(`url`),
        s = await t({ method: `get`, url: o }),
        c = new URLSearchParams(a.req.param(`routeParams`)),
        l = c.get(`title`);
    l ||= r((await t({ method: `get`, url: new URL(o).origin })).data)(`title`).text();
    let u = i(s.data, c.get(`item`)).map((e) => {
        let t = i(e, c.get(`itemLink`)).trim(),
            n = c.get(`itemLinkPrefix`);
        return (
            t && n && (t = `${n}${t}`),
            t && !t.startsWith(`http`) && (t = `${new URL(o).origin}${t}`),
            { title: i(e, c.get(`itemTitle`)), link: t, description: c.get(`itemDesc`) ? i(e, c.get(`itemDesc`)) : ``, pubDate: c.get(`itemPubDate`) ? i(e, c.get(`itemPubDate`)) : `` }
        );
    });
    return { title: l, link: o, description: `Proxy ${o}`, item: u };
}
export { a as route };
