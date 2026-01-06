import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `http://www.cst.zju.edu.cn/`,
    a = new Map([
        [0, { id: ``, title: `浙大软件学院-全部通知` }],
        [1, { id: `32178/list.htm`, title: `浙大软件学院-招生信息` }],
        [2, { id: `36216/list.htm`, title: `浙大软件学院-教务管理` }],
        [3, { id: `36217/list.htm`, title: `浙大软件学院-论文管理` }],
        [4, { id: `36224/list.htm`, title: `浙大软件学院-思政工作` }],
        [5, { id: `36228/list.htm`, title: `浙大软件学院-评奖评优` }],
        [6, { id: `36233/list.htm`, title: `浙大软件学院-实习就业` }],
        [7, { id: `36235/list.htm`, title: `浙大软件学院-国际实习` }],
        [8, { id: `36194/list.htm`, title: `浙大软件学院-国内合作科研` }],
        [9, { id: `36246/list.htm`, title: `浙大软件学院-国际合作科研` }],
        [10, { id: `36195/list.htm`, title: `浙大软件学院-校园服务` }],
    ]);
async function o(e) {
    let a = r((await n({ method: `get`, url: i + e })).data);
    return a(`.lm_new`)
        .find(`li`)
        .toArray()
        .map((e) => ((e = a(e)), { title: e.find(`a`).text(), pubDate: t(e.find(`.fr`).text()), link: new URL(e.find(`a`).attr(`href`), i).href }));
}
const s = {
    path: `/cst/:type`,
    categories: [`university`],
    example: `/zju/cst/0`,
    parameters: { type: `分类，见下表` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `软件学院`,
    description: `| 全部通知 | 招生信息 | 教务管理 | 论文管理 | 思政工作 | 评奖评优 | 实习就业 | 国际实习 | 国内合作科研 | 国际合作科研 | 校园服务 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | ------------ | ------------ | -------- |
| 0        | 1        | 2        | 3        | 4        | 5        | 6        | 7        | 8            | 9            | 10       |`,
    maintainers: [`yonvenne`, `zwithz`],
    handler: c,
};
async function c(t) {
    let s = Number.parseInt(t.req.param(`type`)),
        c = i + a.get(s).id,
        l = [];
    if (s === 0) {
        let e = [];
        for (let t of a.values()) e.push(o(t.id));
        let t = await Promise.all(e);
        for (let e of t) l = [...l, ...e];
    } else l = await o(a.get(s).id);
    let u = await Promise.all(l.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n({ method: `get`, url: t.link, headers: { Referer: c } })).data)(`.vid_wz`).html()), t))));
    return { title: a.get(s).title, link: c, item: u };
}
export { s as route };
