import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import * as n from 'cheerio';
const r = {
    path: `/routes/:lang?`,
    categories: [`program-update`],
    view: t.Notifications,
    example: `/rsshub/routes/en`,
    parameters: {
        lang: {
            description: `Language`,
            options: [
                { label: `Chinese`, value: `zh` },
                { label: `English`, value: `en` },
            ],
            default: `en`,
        },
    },
    radar: [{ source: [`docs.rsshub.app/*`], target: `/routes` }],
    name: `New routes`,
    maintainers: [`DIYgod`],
    handler: i,
    url: `docs.rsshub.app/*`,
};
async function i(t) {
    let r = t.req.param(`lang`) !== `zh`,
        i = r ? `` : `zh/`,
        a = (
            await Promise.all(
                [
                    `social-media`,
                    `new-media`,
                    `traditional-media`,
                    `bbs`,
                    `blog`,
                    `programming`,
                    `design`,
                    `live`,
                    `multimedia`,
                    `picture`,
                    `anime`,
                    `program-update`,
                    `university`,
                    `forecast`,
                    `travel`,
                    `shopping`,
                    `game`,
                    `reading`,
                    `government`,
                    `study`,
                    `journal`,
                    `finance`,
                    `other`,
                ].map(async (t) => {
                    let r = await e(`https://docs.rsshub.app/${i}routes/${t}`),
                        a = n.load(r);
                    return { page: a(`.page`).toArray(), item: a(`.routeBlock`).toArray(), type: t };
                })
            )
        ).flatMap(({ page: e, item: t, type: n }) => t.map((t) => ({ page: e, item: t, type: n })));
    return {
        title: r ? `RSSHub has new routes` : `RSSHub 有新路由啦`,
        link: `https://docs.rsshub.app`,
        description: r ? `Everything is RSSible` : `万物皆可 RSS`,
        language: r ? `en-us` : `zh-cn`,
        item: a.map(({ page: e, item: t, type: r }) => {
            let a = n.load(e),
                o = a(t),
                s = o.prevAll(`h2`).eq(0),
                c = o.prevAll(`h3`).eq(0);
            return (
                o.find(`.VPBadge`).each((e, t) => {
                    let n = a(t);
                    n.text().includes(`Test`) && n.remove();
                }),
                {
                    title: `${s.text().trim()} - ${c.text().trim()}`,
                    description: o.html()?.replaceAll(/<!--.*?-->/g, ``),
                    link: `https://docs.rsshub.app/${i}routes/${r}#${encodeURIComponent(s.find(`.header-anchor`).attr(`href`) && c.find(`.header-anchor`).attr(`href`)?.slice(1))}`,
                    guid: o.attr(`id`),
                }
            );
        }),
    };
}
export { r as route };
