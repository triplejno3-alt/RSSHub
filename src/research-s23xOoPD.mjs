import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let { type: i = `1` } = n.req.param(),
            a = Number.parseInt(n.req.query(`limit`) ?? `20`, 10),
            o = new URL(`research.html?type=${i}`, `https://www.lhratings.com`).href,
            s = r(await e(o)),
            c = s(`html`).attr(`lang`) ?? `zh-CN`,
            l = s(`table.list-table tbody tr`)
                .slice(0, a)
                .toArray()
                .map((e) => {
                    let n = s(e),
                        r = n.find(`a`).first(),
                        i = r.text(),
                        a = r.parent().next().next().text(),
                        o = r.attr(`href`),
                        l = [r.parent().next()].filter(Boolean),
                        u = [...new Set(l.map((e) => s(e).text()).filter(Boolean))],
                        d = n.find(`img`).attr(`src`),
                        f = a,
                        p = { title: i, pubDate: a ? t(a) : void 0, link: o, category: u, image: d, banner: d, updated: f ? t(f) : void 0, language: c },
                        m = o;
                    return (m && (p = { ...p, enclosure_url: m, enclosure_type: `application/${m.split(/\./).pop()}`, enclosure_title: i }), p);
                }),
            u = s(`title`).text();
        return { title: `${u} - ${s(`li.active`).text()}`, description: s(`li.active`).text(), link: o, item: l, allowEmpty: !0, image: s(`a#logo img`).attr(`src`), author: u, language: c, id: o };
    },
    a = {
        path: `/research/:type?`,
        name: `研究报告`,
        url: `www.lhratings.com`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/lhratings/research/1`,
        parameters: { type: '分类，默认为 `1`，即宏观经济，可在对应分类页 URL 中找到' },
        description:
            '::: tip\n若订阅 [宏观经济](https://www.lhratings.com/research.html?type=1)，网址为 `https://www.lhratings.com/research.html?type=1`，请截取 `https://www.lhratings.com/research.html?type=` 到末尾的部分 `1` 作为 `type` 参数填入，此时目标路由为 [`/lhratings/research/1`](https://rsshub.app/lhratings/research/1)。\n:::\n\n| 宏观经济 | 债券市场 | 行业研究 | 评级理论与方法 | 国际债券市场与评级 | 评级表现 |\n| -------- | -------- | -------- | -------------- | ------------------ | -------- |\n| 1        | 2        | 3        | 4              | 5                  | 6        |\n',
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.lhratings.com/research.html`],
                target: (e, t) => {
                    let n = new URL(t).searchParams.get(`type`) ?? void 0;
                    return `/lhratings/research/${n ? `/${n}` : ``}`;
                },
            },
            { title: `宏观经济`, source: [`www.lhratings.com/research.html?type=1`], target: `/research/1` },
            { title: `债券市场`, source: [`www.lhratings.com/research.html?type=2`], target: `/research/2` },
            { title: `行业研究`, source: [`www.lhratings.com/research.html?type=3`], target: `/research/3` },
            { title: `评级理论与方法`, source: [`www.lhratings.com/research.html?type=4`], target: `/research/4` },
            { title: `国际债券市场与评级`, source: [`www.lhratings.com/research.html?type=5`], target: `/research/5` },
            { title: `评级表现`, source: [`www.lhratings.com/research.html?type=6`], target: `/research/6` },
        ],
        view: n.Articles,
    };
export { i as handler, a as route };
