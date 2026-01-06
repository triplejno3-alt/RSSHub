import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import './wechat-mp-HNgcLN2K.mjs';
import { t as e } from './utils-DtKQmsNv.mjs';
const t = `https://grad.nua.edu.cn`,
    n = {
        path: `/gra/:type`,
        categories: [`university`],
        example: `/nua/gra/1959`,
        parameters: { type: `News Type` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`grad.nua.edu.cn/:type/list.htm`] }],
        name: `Graduate Institute`,
        maintainers: [`evnydd0sf`],
        handler: r,
        description: `| News Type | Parameters |
| --------- | ---------- |
| 招生工作  | 1959       |
| 培养工作  | 1962       |
| 学位工作  | 1958       |`,
    };
async function r(n) {
    let r = n.req.param(`type`),
        i = `${t}/${r}/list.htm`,
        a = await e.ProcessList(i, t, `li.list_item`, `.Article_PublishDate`, `.col_title`),
        o = await e.ProcessFeed(a[0], `.read`);
    return { title: `NUA-研究生处-` + a[1], link: `${t}/${r}/list.htm`, description: `南京艺术学院 研究生处 ` + a[1], item: o };
}
export { n as route };
