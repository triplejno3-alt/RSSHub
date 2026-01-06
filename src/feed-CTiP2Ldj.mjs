import './config-Cc-zZ5p-.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { t as r } from './rss-parser-CKuAfhVS.mjs';
const i = {
    path: `/feed/:user`,
    categories: [`blog`],
    view: t.SocialMedia,
    example: `/medium/feed/zhgchgli`,
    parameters: { user: `Username of the Medium` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`medium.com/@:user`], target: `/feed/:user` }],
    name: `Medium Feed`,
    maintainers: [`pseudoyu`],
    handler: a,
};
async function a(t) {
    let i = t.req.param(`user`);
    if (!i) throw new n(`Invalid user`);
    let a = await r.parseURL(`https://medium.com/feed/@${i}`);
    return {
        title: a.title ?? `Medium`,
        description: a.description ?? `${i}'s Medium`,
        link: a.link ?? `https://medium.com/@${i}`,
        image: a.image?.url ?? ``,
        item: a.items.map((t) => ({ title: t.title ?? `Untitled`, description: t[`content:encoded`] ?? t.content ?? ``, link: t.link ?? ``, pubDate: t.pubDate ? e(t.pubDate) : void 0, guid: t.guid ?? ``, author: t.creator ?? i })),
    };
}
export { i as route };
