import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/photo/jx`,
    categories: [`traditional-media`],
    example: `/cctv/photo/jx`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`photo.cctv.com/jx`, `photo.cctv.com/`] }],
    name: `央视网图片《镜象》`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `photo.cctv.com/jx`,
};
async function a(i) {
    let a = `https://photo.cctv.com/jx/`,
        o = r((await n({ method: `get`, url: a })).data),
        s = o(`.textr a`)
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 10)
            .toArray()
            .map((e) => ((e = o(e)), { title: e.text(), link: e.attr(`href`) }));
    return {
        title: `央视网图片《镜象》`,
        link: a,
        item: await Promise.all(
            s.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data),
                        a = e(`head`)
                            .html()
                            .match(/publishDate ="(.*) ";/)[1];
                    return ((i.pubDate = a ? t(a, `YYYYMMDDHHmmss`) : null), (i.description = e(`.tujitop`).html()), i);
                })
            )
        ),
    };
}
export { i as route };
