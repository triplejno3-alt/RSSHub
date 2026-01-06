import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import t from 'markdown-it';
const n = t({ html: !0 }),
    r = {
        path: `/release-notes`,
        categories: [`program-update`],
        example: `/postman/release-notes`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`postman.com/downloads/release-notes`, `postman.com/`] }],
        name: `Release Notes`,
        maintainers: [`nczitzk`],
        handler: i,
        url: `postman.com/downloads/release-notes`,
    };
async function i() {
    let t = `https://www.postman.com`,
        r = `${t}/mkapi/release.json`,
        i = `${t}/downloads/release-notes`;
    return { title: `Release Notes | Postman`, link: i, item: (await e({ method: `get`, url: r })).data.notes.map((e) => ({ title: e.version, link: `${i}#${e.version}`, description: n.render(e.content) })) };
}
export { r as route };
