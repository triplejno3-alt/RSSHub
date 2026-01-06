import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/apod-ncku`,
    categories: [`picture`],
    example: `/nasa/apod-ncku`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`apod.nasa.govundefined`] }],
    name: `Cheng Kung University Mirror`,
    maintainers: [`nczitzk`, `williamgateszhao`],
    handler: a,
    url: `apod.nasa.govundefined`,
};
async function a(i) {
    let a = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 10,
        o = `http://sprite.phys.ncku.edu.tw/astrolab/mirrors/apod/archivepix.html`,
        s = r((await n({ method: `get`, url: o })).data),
        c = s(`body > b > a`)
            .slice(0, a)
            .toArray()
            .map((e) => ({ title: s(e).text(), link: `http://sprite.phys.ncku.edu.tw/astrolab/mirrors/apod/${s(e).attr(`href`)}` }));
    return {
        title: `NASA 每日一天文圖 (成大物理分站) `,
        link: o,
        item: await Promise.all(
            c.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data),
                        a = `<img src="${e(`img`).attr(`src`)}"> <br> ${e(`body > center`).eq(1).html()} <br> ${e(`body > p`).eq(0).html()}`,
                        o = t(i.link.slice(-11, -5), `YYMMDD`);
                    return { title: i.title, description: a, pubDate: o, link: i.link };
                })
            )
        ),
    };
}
export { i as route };
