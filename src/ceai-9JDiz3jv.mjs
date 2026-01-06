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
    let a = i((await n.get(e, { https: { rejectUnauthorized: !1 } })).data),
        o = r(t(a(`#xw_xinxi span:nth-child(1)`).text(), `YYYY-MM-DD`, `zh-cn`), 8);
    return { description: a(`#xw_content`).html(), pubDate: o };
}
var o = {
    ProcessFeed: (e, t) =>
        Promise.all(
            e.map(async (e) => {
                let n = i(e)(`a`),
                    r = n.attr(`href`),
                    o = { title: n.text(), link: r, author: `计算机与电子信息学院-人工智能学院`, guid: r },
                    s = await t.tryGet(r, () => a(r));
                return { ...o, ...s };
            })
        ),
};
const s = {
    path: `/ceai/:type`,
    categories: [`university`],
    example: `/njnu/ceai/xszx`,
    parameters: { type: `分类名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `计算机与电子信息学院 - 人工智能学院`,
    maintainers: [`Shujakuinkuraudo`],
    handler: c,
    description: `| 学院公告 | 学院新闻 | 学生资讯 |
| -------- | -------- | -------- |
| xygg     | xyxw     | xszx     |`,
};
async function c(t) {
    let r = t.req.param(`type`),
        a,
        s;
    switch (r) {
        case `xygg`:
            ((a = `学院公告`), (s = `1651`));
            break;
        case `xyxw`:
            ((a = `学院新闻`), (s = `1652`));
            break;
        case `xszx`:
            ((a = `学生资讯`), (s = `1659`));
            break;
    }
    let c = i((await n({ method: `get`, url: `http://ceai.njnu.edu.cn/Item/List.asp?ID=` + s, https: { rejectUnauthorized: !1 } })).data)(`span a`).toArray(),
        l = await o.ProcessFeed(c, e);
    return { title: `南京师范大学计电人院 - ` + a, link: `http://ceai.njnu.edu.cn/`, description: `南京师范大学计电人院`, item: l };
}
export { s as route };
