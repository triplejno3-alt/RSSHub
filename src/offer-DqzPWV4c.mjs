import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = {
    path: `/offer/:year?/:major?/:school?`,
    categories: [`bbs`],
    example: `/1point3acres/offer/12/null/CMU`,
    parameters: { year: `录取年份  id，空为null`, major: `录取专业 id，空为null`, school: `录取学校 id，空为null` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`offer.1point3acres.com/`], target: `/offer` }],
    name: `录取结果`,
    maintainers: [`EthanWng97`],
    handler: s,
    url: `offer.1point3acres.com/`,
    description: `::: tip 三个 id 获取方式
  1.  打开 [https://offer.1point3acres.com](https://offer.1point3acres.com)
  2.  打开控制台
  3.  切换到 Network 面板
  4.  点击 搜索 按钮
  5.  点击 results?ps=15&pg=1 POST 请求
  6.  找到 Request Payload 请求参数，例如 \`filters: {planyr: "13", planmajor: "1", outname_w: "ACADIAU"}\` ，则三个 id 分别为: 13,1,ACADIAU
:::`,
};
async function s(n) {
    let { year: r = `null`, major: i = `null`, school: a = `null` } = n.req.param();
    return {
        title: `录取结果 - 一亩三分地`,
        link: `https://offer.1point3acres.com`,
        item: (
            await t.post(`https://api.1point3acres.com/offer/results`, {
                searchParams: { ps: 15, pg: 1 },
                json: { filters: { planyr: r === `null` ? void 0 : r, planmajor: i === `null` ? void 0 : i, outname_w: a === `null` ? void 0 : a } },
            })
        ).data.results.map((t) => ({
            title: `${t.planyr}年${t.planmajor}@${t.outname_w}：${t.result} - 一亩三分地`,
            description: c(t),
            pubDate: e(t.dateline, `X`),
            link: `https://offer.1point3acres.com`,
            guid: `1point3acres:offer:${r}:${i}:${a}:${t.id}`,
        })),
    };
}
const c = (e) =>
    a(
        i(n, {
            children: [
                r(`b`, { children: `国家：` }),
                e.country,
                r(`br`, {}),
                r(`b`, { children: `学校：` }),
                e.outname_w,
                ` `,
                e.outname,
                r(`br`, {}),
                r(`b`, { children: `录取学位：` }),
                e.plandegree,
                r(`br`, {}),
                r(`b`, { children: `录取项目：` }),
                e.planmajor,
                ` - `,
                e.planprogram,
                r(`br`, {}),
                r(`b`, { children: `录取结果：` }),
                e.result,
                r(`br`, {}),
                r(`b`, { children: `录取时间：` }),
                e.outtime,
                r(`br`, {}),
                r(`b`, { children: `通知方式：` }),
                e.noticemethod,
                r(`br`, {}),
                r(`b`, { children: `全奖/自费：` }),
                e.planfin,
                r(`br`, {}),
                r(`b`, { children: `申入学学期：` }),
                e.planterm,
                r(`br`, {}),
                r(`b`, { children: `申入学年度：` }),
                e.planyr,
                r(`br`, {}),
                r(`b`, { children: `提交时间：` }),
                e.submittime,
            ],
        })
    );
export { o as route };
