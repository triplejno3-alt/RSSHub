import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { t as i } from './valid-host-Bsy2BS2p.mjs';
import { t as a } from './rss-parser-CKuAfhVS.mjs';
const o = {
    path: `/subscribe/:user`,
    categories: [`blog`],
    view: n.SocialMedia,
    example: `/substack/subscribe/mangoread`,
    parameters: { user: `Username of the Substack` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Substack Subscription`,
    maintainers: [`pseudoyu`],
    handler: s,
};
async function s(n) {
    let o = n.req.param(`user`);
    if (!i(o)) throw new r(`Invalid user`);
    let s = await e(`https://${o}.substack.com/feed`),
        c = await a.parseString(s);
    return {
        title: c.title ?? `Substack`,
        description: c.description ?? `${o}'s Substack`,
        link: c.link ?? `https://${o}.substack.com`,
        image: c.image?.url ?? ``,
        item: c.items.map((e) => ({ title: e.title ?? `Untitled`, description: e[`content:encoded`] ?? e.content ?? ``, link: e.link ?? ``, pubDate: e.pubDate ? t(e.pubDate) : void 0, guid: e.guid ?? ``, author: e.creator ?? o })),
    };
}
export { o as route };
