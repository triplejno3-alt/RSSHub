import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './utils-Cf5U_hKP.mjs';
import { load as n } from 'cheerio';
const r = `http://www.pbc.gov.cn`,
    i = {
        path: `/pbc/gzlw`,
        categories: [`finance`],
        example: `/gov/pbc/gzlw`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`pbc.gov.cn/redianzhuanti/118742/4122386/4122692/index.html`] }],
        name: `工作论文`,
        maintainers: [`Fatpandac`],
        handler: a,
        url: `pbc.gov.cn/redianzhuanti/118742/4122386/4122692/index.html`,
    };
async function a() {
    let i = `${r}/redianzhuanti/118742/4122386/4122692/index.html`,
        a = n((await e.post(i)).data);
    return {
        title: `中国人民银行 工作论文`,
        link: i,
        item: await t(
            a(`li.clearfix`)
                .toArray()
                .map((e) => ({ title: a(e).find(`a`).text(), link: new URL(a(e).find(`a`).attr(`href`), r).href, author: a(e).find(`span.fr`).text().replaceAll(`…`, ``) }))
        ),
    };
}
export { i as route };
