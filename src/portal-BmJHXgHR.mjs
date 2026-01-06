import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/portal`,
    categories: [`bbs`],
    example: `/trow/portal`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`trow.cc/`] }],
    name: `首页更新`,
    maintainers: [`shiningdracon`],
    handler: a,
    url: `trow.cc/`,
};
async function a() {
    let i,
        a = await t.extend({ followRedirect: !1 }).get({ url: `https://trow.cc` });
    i = a.statusCode === 302 ? (await t.extend({ followRedirect: !1 }).get({ url: `https://trow.cc`, headers: { cookie: a.headers[`set-cookie`] } })).data : a.data;
    let o = r(i);
    return {
        title: `The Ring of Wonder - Portal`,
        link: `https://trow.cc`,
        description: `The Ring of Wonder 首页更新`,
        item: o(`#portal_content .borderwrap[style="display:show"]`)
            .toArray()
            .map((t) => {
                t = o(t);
                let r = t.find(`.postdetails`).text();
                return {
                    title: t.find(`.maintitle p:nth-child(2) > a`).text(),
                    description: t.find(`.portal_news_content .row18`).html(),
                    link: t.find(`.maintitle p:nth-child(2) > a`).attr(`href`),
                    author: t.find(`.postdetails a`).text(),
                    pubDate: n(e(r.slice(3), `YYYY-MM-DD, HH:mm`), 8),
                };
            }),
    };
}
export { i as route };
