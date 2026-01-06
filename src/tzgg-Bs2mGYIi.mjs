import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/hainan/iitb/tzgg`, categories: [`government`], example: `/gov/hainan/iitb/tzgg`, url: `iitb.hainan.gov.cn/iitb/tzgg/list2.shtml`, name: `通知公告`, maintainers: [`p3psi-boo`], handler: a };
async function a() {
    let i = `https://iitb.hainan.gov.cn`,
        a = `${i}/iitb/tzgg/list2.shtml`,
        o = r((await n({ method: `get`, url: a })).data),
        s = o(`.list_div`)
            .toArray()
            .map((e) => {
                let n = o(e),
                    r = n.find(`.list-right_title a`),
                    a = r.attr(`href`) || ``,
                    s = r.text().trim() || ``,
                    c = n.find(`td[align="left"]`).text().replace(`发布时间：`, ``).trim(),
                    l = n.find(`.column-name`).text().trim();
                return { title: s, link: new URL(a, i).href, pubDate: t(c), category: l };
            });
    return {
        title: `通知公告 - 海南省工业和信息化厅`,
        link: a,
        item: await Promise.all(
            s.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data),
                        a = e(`#xxgkfbjg`).text(),
                        o = e(`publishtime`).text(),
                        s = e(`ucapcontent`).html();
                    return ((i.author = a), (i.pubDate = t(o)), (i.description = s), i);
                })
            )
        ),
    };
}
export { i as route };
