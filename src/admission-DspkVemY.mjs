import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { n as t, r as n, t as r } from './common-YJ-BcF6c.mjs';
const i = `${r}/admission/admnotice/`,
    a = {
        path: `/ss/admission`,
        categories: [`university`],
        example: `/pku/ss/admission`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`ss.pku.edu.cn/admission/admnotice`, `ss.pku.edu.cn/`] }],
        name: `软件与微电子学院 - 招生通知`,
        maintainers: [`legr4ndk`],
        handler: o,
        url: `ss.pku.edu.cn/admission/admnotice`,
    };
async function o() {
    let r = await n(i);
    return { title: `北大软微-招生通知`, description: `北京大学软件与微电子学院 - 招生通知`, link: i, item: await Promise.all(r.map((n) => t(n, e.tryGet))) };
}
export { a as route };
