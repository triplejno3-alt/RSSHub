import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { n as t, t as n } from './utils-_nwBuBHV.mjs';
const r = {
    path: `/outlet/:country/:gender`,
    categories: [`shopping`],
    example: `/arcteryx/outlet/us/mens`,
    parameters: { country: `country`, gender: `gender` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`outlet.arcteryx.com/:country/en/c/:gender`] }],
    name: `Outlet`,
    maintainers: [`EthanWng97`],
    handler: i,
    description: `Country

| United States | Canada | United Kingdom |
| ------------- | ------ | -------------- |
| us            | ca     | gb             |

  gender

| male | female |
| ---- | ------ |
| mens | womens |

::: tip
  Parameter \`country\` can be found within the url of \`Arcteryx\` website.
:::`,
};
async function i(r) {
    let { country: i, gender: a } = r.req.param(),
        o = `https://outlet.arcteryx.com/${i}/en/`,
        s = `${o}api/fredhopper/query`,
        c = `${o}shop/`,
        l = `${o}c/${a}`,
        u = (
            await e({ method: `get`, url: s, searchParams: { fh_location: `//catalog01/en_CA/gender>{${a}}`, fh_country: i, fh_review: `lister`, fh_view_size: `all`, fh_context_location: `//catalog01` } })
        ).data.universes.universe[1][`items-section`].items.item.map((e, t, r) => n(e, t, r, i));
    return {
        title: `Arcteryx - Outlet(${i.toUpperCase()}) - ${a.toUpperCase()}`,
        link: l,
        description: `Arcteryx - Outlet(${i.toUpperCase()}) - ${a.toUpperCase()}`,
        item: u.map((e) => ({ title: e.name, link: c + e.slug, description: t(e) })),
    };
}
export { r as route };
