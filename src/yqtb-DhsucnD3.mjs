import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: [`/sh/wsjkw/yqtb`, `/shanghai/wsjkw/yqtb`],
    categories: [`government`],
    example: `/gov/sh/wsjkw/yqtb`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`wsjkw.sh.gov.cn/`] }],
    name: `上海卫健委 疫情通报`,
    maintainers: [`zcf0508`],
    handler: i,
    url: `wsjkw.sh.gov.cn/`,
};
async function i() {
    let r = `https://wsjkw.sh.gov.cn/yqtb/index.html`,
        i = n((await t.get(r)).data);
    return {
        title: `疫情通报-上海卫健委`,
        link: r,
        item: i(`.uli16.nowrapli.list-date  li`)
            .toArray()
            .map((t) => {
                t = i(t);
                let n = t.find(`a`).text(),
                    r = t.find(`a`).attr(`href`),
                    a = `https://wsjkw.sh.gov.cn`;
                return { title: n, description: n, pubDate: e(t.find(`span`).text(), `YYYY-MM-DD`), link: a + r, guid: a + r };
            }),
    };
}
export { r as route };
