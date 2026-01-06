import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './utils-Cf5U_hKP.mjs';
import { load as i } from 'cheerio';
const a = `http://www.pbc.gov.cn`,
    o = {
        path: `/pbc/zcyj`,
        radar: [{ source: [`pbc.gov.cn/redianzhuanti/118742/4122386/4122510/index.html`] }],
        name: `Unknown`,
        maintainers: [`Fatpandac`],
        handler: s,
        url: `pbc.gov.cn/redianzhuanti/118742/4122386/4122510/index.html`,
    };
async function s() {
    let o = `${a}/redianzhuanti/118742/4122386/4122510/index.html`,
        s = i((await t.post(o)).data);
    return {
        title: `中国人民银行 政策研究`,
        link: o,
        item: await r(
            s(`li.clearfix`)
                .toArray()
                .map((t) => ({ title: s(t).find(`a`).text(), link: new URL(s(t).find(`a`).attr(`href`), a).href, pubDate: n(e(s(t).find(`span.fr`).text(), `YYYY-MM-DD`), 8) }))
        ),
    };
}
export { o as route };
