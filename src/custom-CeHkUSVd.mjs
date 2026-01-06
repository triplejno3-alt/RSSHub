import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
async function r(r) {
    let i = n((await t({ method: `get`, url: `http://www.cst.zju.edu.cn/${r}/list.htm` })).data);
    return i(`.lm_new ul li`)
        .toArray()
        .map((t) => ((t = i(t)), { title: t.find(`a`).text(), pubDate: e(t.find(`.fr`).text()), link: t.find(`a`).attr(`href`) }));
}
const i = {
    path: `/cst/custom/:id`,
    categories: [`university`],
    example: `/zju/cst/custom/36194+36241+36246`,
    parameters: { id: '提取出通知页面中的 `ID`，如 `http://www.cst.zju.edu.cn/36246/list.htm` 中的 `36246`，可将你想获取通知的多个页面，通过 `+` 符号来聚合。' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `软件学院`,
    maintainers: [`zwithz`],
    handler: a,
    description: `| 全部通知 | 招生信息 | 教务管理 | 论文管理 | 思政工作 | 评奖评优 | 实习就业 | 国际实习 | 国内合作科研 | 国际合作科研 | 校园服务 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | ------------ | ------------ | -------- |
| 0        | 1        | 2        | 3        | 4        | 5        | 6        | 7        | 8            | 9            | 10       |

#### 自定义聚合通知 {#zhe-jiang-da-xue-ruan-jian-xue-yuan-zi-ding-yi-ju-he-tong-zhi}`,
};
async function a(e) {
    let t = e.req
            .param(`id`)
            .split(`+`)
            .map((e) => r(e)),
        n = await Promise.all(t),
        i = [];
    for (let e of n) i = [...i, ...e];
    return { title: `浙江大学软件学院通知`, link: `http://www.cst.zju.edu.cn/`, item: i };
}
export { i as route };
