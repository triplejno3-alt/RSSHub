import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://ylxx.szftedu.cn/xx_5828/xydt_5829/bxfbx_6371/`,
    o = {
        path: `/dongtai`,
        categories: [`university`],
        example: `/szftedu/dongtai`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `动态`,
        maintainers: [`valuex`],
        handler: s,
        description: ``,
    };
async function s() {
    let o = i((await n(a)).data),
        s = o(`div.pagenews04 div ul li`)
            .toArray()
            .map((e) => ({ title: o(`a`, e).text().trim(), link: o(`a`, e).attr(`href`), pubDate: r(t(o(`span[class=canedit]`, e).text()), 8) }));
    return {
        title: `园岭小学动态`,
        link: a,
        description: `园岭小学动态`,
        item: await Promise.all(
            s.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = a.link,
                        o = i((await n(e.includes(`http`) ? e : `https://ylxx.szftedu.cn` + e)).data);
                    return ((a.description = e.includes(`http`) ? o(`#page-content`).html() : o(`div.TRS_Editor`).html()), (a.pubDate = r(t(o(`#publish_time`).first().text()), 8)), a);
                })
            )
        ),
    };
}
export { o as route };
