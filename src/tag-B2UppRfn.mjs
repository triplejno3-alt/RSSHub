import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t } from './ehapi-u6OXYeVA.mjs';
const n = {
    path: `/tag/:tag/:page?/:routeParams?`,
    categories: [`picture`],
    example: `/ehentai/tag/language:chinese/0/bittorrent=true&embed_thumb=false`,
    parameters: { tag: `Tag`, page: `Page number, set 0 to get latest`, routeParams: `Additional parameters, see the table above` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !0, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Tag`,
    maintainers: [`yindaheng98`, `syrinka`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`page`),
        i = n.req.param(`tag`),
        a = new URLSearchParams(n.req.param(`routeParams`)),
        o = a.get(`bittorrent`) || !1,
        s = a.get(`embed_thumb`) || !1,
        c = await t.getTagItems(e, i, r, o, s);
    return t.from_ex ? { title: i + ` - ExHentai Tag`, link: `https://exhentai.org/tag/${i}`, item: c } : { title: i + ` - E-Hentai Tag`, link: `https://e-hentai.org/tag/${i}`, item: c };
}
export { n as route };
