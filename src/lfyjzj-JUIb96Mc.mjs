import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/moj/lfyjzj`,
    categories: [`government`],
    example: `/gov/moj/lfyjzj`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.moj.gov.cn/lfyjzj/lflfyjzj/*`, `www.moj.gov.cn/pub/sfbgw/lfyjzj/lflfyjzj/*`] }],
    name: `立法意见征集`,
    maintainers: [`la3rence`],
    handler: o,
    url: `www.moj.gov.cn/lfyjzj/lflfyjzj/*`,
};
async function o() {
    let a = `https://www.moj.gov.cn`,
        o = `${a}/lfyjzj/lflfyjzj/index.html`,
        { data: s } = await n(o),
        c = i(s),
        l = c(`title:first`).text(),
        u = c(`div.list_title`).text(),
        d = `${l} - ${u}`,
        f = new URL(`/images/sfbgw_favicon.ico`, a).href,
        p = c(`ul.newsMsgList_zzy li`)
            .toArray()
            .map((e) => {
                let n = c(e).find(`a`),
                    i = c(e).find(`div.rightData`).text(),
                    a = n.prop(`href`),
                    s = a.startsWith(`http`) ? a : new URL(a, o).href;
                return { title: n.text(), link: s, pubDate: r(t(i), 8) };
            });
    return {
        item: await Promise.all(
            p.map((a) =>
                e.tryGet(`gov:mof:${a.link}`, async () => {
                    let { data: e } = await n(a.link),
                        o = i(e);
                    ((a.description = o(`div.TRS_Editor`).html()), (a.author = o(`div.sT_left span:first`).text().split(`：`)[1]));
                    let s = o(`div.sT_left span:last`).text().split(`：`)[1];
                    return ((a.pubDate = s ? r(t(s), 8) : a.pubDate), a);
                })
            )
        ),
        title: u,
        link: o,
        description: d,
        author: l,
        icon: f,
    };
}
export { a as route };
