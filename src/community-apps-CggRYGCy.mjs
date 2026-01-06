import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/community-apps`,
    categories: [`program-update`],
    example: `/unraid/community-apps`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`unraid.net/community/apps`] }],
    name: `Community Apps`,
    maintainers: [`KTachibanaM`],
    handler: r,
    url: `unraid.net/community/apps`,
};
async function r(n) {
    let { data: r } = await t(`https://raw.githubusercontent.com/Squidly271/AppFeed/master/applicationFeed.json`),
        i = n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`)) : 20,
        a = r.applist;
    return (
        (a = a.map((e) => {
            let t = e.LastUpdate ?? e.FirstSeen ?? 0;
            return { ...e, _pubDate: t };
        })),
        a.sort((e, t) => t._pubDate - e._pubDate),
        {
            title: `Unraid Community Apps`,
            link: `https://unraid.net/community/apps`,
            image: `https://craftassets.unraid.net/static/favicon/favicon.ico?v=1.0`,
            item: a.slice(0, i).map((t) => ({
                title: `${t.Name} (${t.Repository ?? `Unknown repository`})`,
                link: t.Registry ?? `https://unraid.net/community/apps?q=${t.Name}`,
                description: t.Overview.replaceAll(
                    `\r
`,
                    `<br>`
                )
                    .replaceAll(
                        `
`,
                        `<br>`
                    )
                    .replaceAll(`[br]`, `<br>`),
                pubDate: e(t._pubDate * 1e3),
                category: t.CategoryList,
                upvotes: t.stars,
            })),
        }
    );
}
export { n as route };
