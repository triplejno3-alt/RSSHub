import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = `https://gsee.swjtu.edu.cn`,
    a = `${i}/xwzx/tzgg.htm`,
    o = (a) => {
        let o = a.find(`dt`),
            s = a
                .find(`dd`)
                .text()
                .match(/\d{4}(-|\/|.)\d{1,2}\1\d{1,2}/)[0],
            c = o.text(),
            l = i + o.find(`a`).last().attr(`href`).slice(2);
        return t.tryGet(l, async () => {
            let t = r(await e(l))(`.article`).html();
            return { title: c, pubDate: n(s), link: l, description: t };
        });
    },
    s = {
        path: `/gsee/yjs`,
        categories: [`university`],
        example: `/swjtu/gsee/yjs`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gsee.swjtu.edu.cn/`] }],
        name: `地球科学与工程学院`,
        maintainers: [`E1nzbern`],
        handler: c,
        description: `研究生教育通知公告`,
    };
async function c() {
    let t = r(await e(a)),
        n = t(`dl`);
    return { title: `西南交大地学学院-研究生通知`, link: a, item: await Promise.all(n.toArray().map((e) => o(t(e)))), allowEmpty: !0 };
}
export { s as route };
