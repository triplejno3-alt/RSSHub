import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = {
    path: `/:type`,
    categories: [`university`],
    example: `/wtu/2`,
    parameters: { type: `公告类型，详见表格` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `信息门户公告`,
    maintainers: [`loyio`],
    handler: i,
    description: `| 公告类型 | 通知公告 | 教务信息 | 科研动态 |
| -------- | -------- | -------- | -------- |
| 参数     | 1        | 2        | 3        |`,
};
async function i(r) {
    let i = new Map([
            [1, { title: `通知公告`, type: `2`, id: `1994a3b58bef4ee887e1efc19881decd` }],
            [2, { title: `教务信息`, type: `6`, id: `36d47fcd3e774f289adfef1d93138a9d` }],
            [3, { title: `科研动态`, type: `7`, id: `48e8abfb983b4e4486b69feacad1dc1b` }],
        ]),
        a = Number.parseInt(r.req.param(`type`)),
        o = i.get(a),
        s = o.title,
        c = o.id,
        l = o.type,
        u = (await t({ method: `get`, url: `https://ehall.wtu.edu.cn/wtu/api/queryBulletinListByConditional.do?pageNum=1&pageSize=20&columnId=${c}` })).data.bulletinList;
    return {
        title: `${s} - 武汉纺织大学信息门户`,
        link: `https://ehall.wtu.edu.cn/new/list.html?type=${l}`,
        description: `${s} - 武汉纺织大学信息门户`,
        item: u.map((t) => ({ title: t.TITLE, pubDate: n(e(t.CREATE_TIME), 8), link: t.GOTO_URL ?? `https://ehall.wtu.edu.cn/new/detail-word.html?type=${l}?bulletinId=${t.WID}`, author: t.PUBLISH_USER_DEPT_NAME })),
    };
}
export { r as route };
