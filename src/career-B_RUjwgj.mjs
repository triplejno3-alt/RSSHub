import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { inflateSync as i } from 'node:zlib';
import { load as a } from 'cheerio';
const o = (e) => {
        let t = [...Buffer.from(e, `base64`).toString(`binary`)].map((e) => e.charCodeAt(0)),
            n = i(new Uint8Array(t)),
            r = ``;
        for (let e of n) r += String.fromCharCode(e);
        return r;
    },
    s = {
        path: `/career`,
        categories: [`university`],
        example: `/csu/career`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`career.csu.edu.cn/campus/index/category/1`, `career.csu.edu.cn/campus`, `career.csu.edu.cn/`] }],
        name: `就业信息网招聘信息`,
        maintainers: [`TonyRL`],
        handler: c,
        url: `career.csu.edu.cn/campus/index/category/1`,
    };
async function c() {
    let i = `https://career.csu.edu.cn`,
        s = `${i}/campus/index/category/1`,
        { data: c } = await n(s),
        l = a(c),
        u = l(`.infoList`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`a`).text(), link: `${i}${e.find(`a`).attr(`href`)}`, pubDate: r(t(e.find(`.span4`).text()), 8) })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        r = a(e),
                        i = r(`script[type="text/javascript"]`)
                            .text()
                            .match(/Base64\.decode\(unzip\("(.*)"\)\./)[1],
                        { slice1: s, slice2: c } = r(`script[type="text/javascript"]`)
                            .text()
                            .match(/"\)\.substr\((?<slice1>\d+)\)\)\.substr\((?<slice2>\d+)\)\);/).groups;
                    return ((r = a(Buffer.from(o(i).slice(s), `base64`).toString().slice(c), null, !1)), (t.description = r.html()), t);
                })
            )
        );
    return { title: `${l(`.curr`).text()} - ${l(`head title`).text()}`, link: s, item: d };
}
export { s as route };
