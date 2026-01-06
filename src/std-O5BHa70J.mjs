import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = {
    path: `/std/:category?`,
    categories: [`university`],
    example: `/xjtu/std/zytz`,
    parameters: { category: `分类，见下表，默认为通知公告` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `科技在线`,
    maintainers: [`nczitzk`],
    handler: d,
    description: `| 通知公告 | 重要通知 | 项目申报 | 成果申报 | 信息快讯 |
| -------- | -------- | -------- | -------- | -------- |
|          | zytz     | xmsb     | cgsb     | xxkx     |`,
};
async function d(i) {
    let o = i.req.param(`category`) ?? ``,
        l = `http://std.xjtu.edu.cn`,
        u = `${l}/tzgg${o ? `/${o}` : ``}.htm`,
        d = s((await n({ method: `get`, url: u })).data),
        p = d(`.c1017`)
            .toArray()
            .map((e) => ((e = d(e)), { title: e.text(), link: `${l}/${e.attr(`href`)}` }));
    return (
        (p = await Promise.all(
            p.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = s((await n({ method: `get`, url: i.link })).data);
                    return (
                        (i.description = c(a(f, { description: e(`#vsb_newscontent`).html(), attachments: e(`#vsb_newscontent`).parent().next().next().next().html() }))),
                        (i.pubDate = r(t(e(`#vsb_newscontent`).parent().prev().prev().text().split(`&nbsp`)[0], `YYYY年MM月DD日 HH:mm`), 8)),
                        i
                    );
                })
            )
        )),
        { title: d(`title`).text(), link: u, item: p }
    );
}
const f = ({ description: e, attachments: t }) => o(i, { children: [e ? l(e) : null, t ? l(t) : null] });
export { u as route };
