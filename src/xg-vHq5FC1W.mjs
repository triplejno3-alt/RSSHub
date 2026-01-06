import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
const a = `http://xg.swjtu.edu.cn`,
    o = { tzgg: `${a}/web/Home/PushNewsList?Lmk7LJw34Jmu=010j.shtml`, yhxw: `${a}/web/Home/NewsList?LJw34Jmu=011e.shtml`, dcxy: `${a}/web/Home/ColourfulCollegeNewsList`, xgzj: `${a}/web/Home/NewsList?xvw34vmu=010e.shtml` },
    s = (e, r) => {
        let o = e.find(`h4`).find(`a`),
            s = e.find(`span.ctxlist-time`).text(),
            c = o.text(),
            l = `${a}${o.attr(`href`)}`;
        return r.tryGet(l, async () => {
            try {
                let e = i((await n({ method: `get`, url: l })).data)(`.detail-content-text`).html();
                return ((e ||= `转发通知`), { title: c, pubDate: t(String(s)), link: l, description: e });
            } catch (e) {
                if (e.response && e.response.status === 404) return { title: c, pubDate: t(String(s)), link: l, description: `` };
                throw e;
            }
        });
    },
    c = {
        path: `/xg/:code?`,
        categories: [`university`],
        example: `/swjtu/xg/tzgg`,
        parameters: { code: `栏目(默认为tzgg)` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`xg.swjtu.edu.cn/web/Home/PushNewsList`, `xg.swjtu.edu.cn/web/Home/NewsList`, `xg.swjtu.edu.cn/web/Home/ColourfulCollegeNewsList`, `xg.swjtu.edu.cn/web/Publicity/List`, `xg.swjtu.edu.cn/`], target: `/xg` },
        ],
        name: `扬华素质网`,
        maintainers: [`mobyw`],
        handler: l,
        url: `xg.swjtu.edu.cn/web/Home/PushNewsList`,
        description: `栏目列表：

| 通知公告 | 扬华新闻 | 多彩学院 | 学工之家 |
| -------- | -------- | -------- | -------- |
| tzgg     | yhxw     | dcxy     | xgzj     |`,
    };
async function l(t) {
    let a = o[t.req.param(`code`) ?? `tzgg`];
    if (!a) throw new r(`code not supported`);
    let c = i((await n({ method: `get`, url: a })).data),
        l = c(`div.right-side ul.block-ctxlist li`);
    return { title: `西南交大-扬华素质网`, link: a, item: await Promise.all(l.toArray().map((t) => s(c(t), e))), allowEmpty: !0 };
}
export { c as route };
