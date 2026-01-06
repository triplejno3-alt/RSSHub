import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
        社会: `shehui`,
        娱乐: `yule`,
        国际: `guoji`,
        军事: `junshi`,
        养生: `yangsheng`,
        汽车: `qiche`,
        体育: `tiyu`,
        财经: `caijing`,
        游戏: `youxi`,
        科技: `keji`,
        国内: `guonei`,
        宠物: `chongwu`,
        情感: `qinggan`,
        人文: `renwen`,
        教育: `jiaoyu`,
    },
    o = {
        path: `/24/:category?`,
        categories: [`traditional-media`],
        example: `/eastday/24`,
        parameters: { category: `分类，见下表，默认为社会` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`mini.eastday.com/`], target: `/24` }],
        name: `24 小时热闻`,
        maintainers: [`nczitzk`],
        handler: s,
        url: `mini.eastday.com/`,
        description: `| 推荐 | 社会 | 娱乐 | 国际 | 军事 |
| ---- | ---- | ---- | ---- | ---- |

| 养生 | 汽车 | 体育 | 财经 | 游戏 |
| ---- | ---- | ---- | ---- | ---- |

| 科技 | 国内 | 宠物 | 情感 | 人文 | 教育 |
| ---- | ---- | ---- | ---- | ---- | ---- |`,
    };
async function s(o) {
    let s = o.req.param(`category`) ?? `社会`,
        c = `https://mini.eastday.com`,
        l = await n({ method: `get`, url: `${c}/ns/api/detail/trust/trust-news-${a[s]}.json` }),
        u = JSON.parse(l.data.match(/\((.*)\)/)[1]).data.trust.map((e) => ({ title: e.topic, link: `${c}${e.url}` })),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let o = await n({ method: `get`, url: a.link }),
                        s = i(o.data),
                        c = Number.parseInt(o.data.match(/var page_num = '(\d+)'/)[1]);
                    if (((a.description = s(`#J-contain_detail_cnt`).html()), (a.pubDate = r(t(s(`meta[property="og:release_date"]`).attr(`content`)), 8)), c > 1)) {
                        let t = [];
                        for (let e = 2; e <= c; e++) t.push(a.link.replace(/\.html/, `-${e}.html`));
                        for (let r of t)
                            e.tryGet(r, async () => {
                                let e = i((await n({ method: `get`, url: r })).data);
                                (e(`img`).each(function () {
                                    e(this).attr(`src`, e(this).attr(`data-url`));
                                }),
                                    (a.description += e(`#J-contain_detail_cnt`).html()));
                            });
                    }
                    return a;
                })
            )
        );
    return { title: `24小时${s}热闻 - 东方资讯`, link: `${c}/#${a[s]}`, item: d };
}
export { o as route };
