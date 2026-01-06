import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
async function a(e) {
    let t = i((await n(e.link)).data);
    return ((e.author = t(`.zuozhe`).children().next().first().text()), (e.description = t(`.wz_art`).html()), e);
}
var o = {
    ProcessFeed: (e, n) =>
        Promise.all(
            e.map((e) => {
                let o = i(e),
                    s = o(`a`),
                    c = new URL(s.attr(`href`), `https://cs.bit.edu.cn/tzgg/`).href,
                    l = { title: s.text(), link: c, pubDate: r(t(o(`span`).text()), 8) };
                return n.tryGet(l.link, () => a(l));
            })
        ),
};
const s = {
    path: `/cs`,
    categories: [`university`],
    example: `/bit/cs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cs.bit.edu.cn/tzgg`, `cs.bit.edu.cn/`] }],
    name: `计院通知`,
    maintainers: [`sinofp`],
    handler: c,
    url: `cs.bit.edu.cn/tzgg`,
};
async function c() {
    let t = `https://cs.bit.edu.cn/tzgg/`,
        r = i((await n({ method: `get`, url: t })).data),
        a = r(`.box_list01 li`).toArray(),
        s = await o.ProcessFeed(a, e);
    return { title: r(`title`).text(), link: t, description: r(`meta[name="description"]`).attr(`content`), item: s };
}
export { s as route };
