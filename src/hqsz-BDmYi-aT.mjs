import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import r from 'crypto-js/crypto-js';
const i = {
    path: `/hqsz`,
    categories: [`university`],
    example: `/ouc/hqsz`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`hqsz.ouc.edu.cn/news.html`] }],
    name: `后勤公告通知`,
    maintainers: [`ladeng07`],
    handler: o,
    url: `hqsz.ouc.edu.cn/news.html?typeId=02`,
};
function a(e, t = `1974051005060708`, n = `1974051005060708`) {
    let i = r.enc.Utf8.parse(t),
        a = r.enc.Utf8.parse(n),
        o = r.enc.Base64.parse(e),
        s = r.enc.Base64.stringify(o);
    return r.AES.decrypt(s, i, { iv: a, mode: r.mode.CBC, padding: r.pad.Pkcs7 }).toString(r.enc.Utf8);
}
async function o() {
    let r = `http://hqsz.ouc.edu.cn/`,
        i = r + `api/website/frontendWebsite/lists`,
        { data: o } = await n.post(i, { form: { schoolCode: `10423`, website: `89e97da117d547128283cf9d12891fa9`, code: `0202`, pageSize: `10`, pageIndex: `1` } }),
        s = JSON.parse(a(o)).data.list.map((e) => ({ title: e.title, id: e.id, author: e.author, link: r + `news_detail.html?id=` + e.id, pubDate: t(e.publishTime) }));
    return {
        title: `中国海洋大学后勤公告通知`,
        link: i,
        description: `中国海洋大学后勤公告通知`,
        item: await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n.post(r + `api/website/frontendWebsite/info`, { form: { schoolCode: `10423`, website: `89e97da117d547128283cf9d12891fa9`, id: t.id } });
                    return ((t.description = a(JSON.parse(a(e)).data.content)), delete t.id, t);
                })
            )
        ),
    };
}
export { i as route };
