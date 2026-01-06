import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
async function a(e) {
    return i((await n(e)).data)(`.tb-ct-info`).html();
}
const o = {
    path: `/mail/:type?`,
    categories: [`university`],
    example: `/csu/mail`,
    parameters: { type: `类型` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `校长信箱`,
    maintainers: [`j1g5awi`],
    handler: s,
    description: `| 类型 | 校长信箱 | 党委信箱 |
| ---- | -------- | -------- |
| 参数 | 01       | 02       |`,
};
async function s(i) {
    let o = `https://oa.csu.edu.cn`,
        { type: s = `01` } = i.req.param(),
        c = `${o}/mailbox/NoAuth/MailList_Pub?tp=${s}`,
        l = (await n.post(`${o}/mailbox/NoAuth/Get_MailList_Pub`, { form: { params: `{"XXLX":"${s}","tjnr":""}`, pageSize: 1, pageNo: 15 } })).data.data.map((e) => ({
            title: e.WJBT,
            link: `${o}/mailbox/NoAuth/MailInInfo?XXLX=${s}&id=${e.NBBM}`,
            pubDate: r(t(e.LXSJ), 8),
            author: e.FZDW,
            category: e.NRFL,
        })),
        u = await Promise.all(l.map((t) => e.tryGet(t.link, async () => ((t.description = await a(t.link)), t))));
    return { title: `中南大学学校信箱 - ${s === `01` ? `校长信箱` : `党委信箱`}`, link: c, item: u };
}
export { o as route };
