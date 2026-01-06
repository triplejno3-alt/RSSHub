import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { n as i } from './wechat-mp-HNgcLN2K.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/seiee/icisee/:cat`,
    categories: [`university`],
    example: `/sjtu/seiee/icisee/news`,
    parameters: { cat: `子类别` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [],
    name: `集成电路学院（信息与电子工程学院）`,
    maintainers: [`dzx-dzx`],
    handler: s,
};
async function s(o) {
    let s = `https://icisee.sjtu.edu.cn//${o.req.param(`cat`)}.html`,
        c = a(await e(s)),
        l = c(`.djdt li`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`.tit`).text().trim(), link: e.find(`a`).attr(`href`), pubDate: r(n(e.find(`.time`).text().trim())) })),
        u = await Promise.all(
            l.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = await e.raw(n.link);
                    return new URL(t.url).hostname === `mp.weixin.qq.com` ? ((n.link = t.url), await i(n)) : { ...n, description: c(t._data).find(`.xwxq`).html() };
                })
            )
        );
    return { title: c(`title`).text(), link: s, item: u };
}
export { o as route };
