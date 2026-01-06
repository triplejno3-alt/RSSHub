import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = async (i) => {
        let { category: a } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 5,
            s = `moa.gov.cn`,
            c = `http://www.${s}`,
            l = `http://zdscxx.${s}:8080`,
            u = new URL(`nyb/getMessages`, l).href,
            d = new URL(`nyb/getMessagesById`, l).href,
            f = new URL(`nyb/pc/messageList.jsp`, l).href,
            p = new URL(`iframe/top_sj/`, c).href,
            m = {};
        if (a) {
            let e = new URL(`nyb/getMessageFilters`, l).href,
                { data: t } = await n.post(e, { form: { type: ``, isLatestMessage: !1 } }),
                r = {};
            for (let e of t.result) r[e.name.trim()] = e.data.map((e) => e.name.trim());
            let i = a.split(/\//);
            for (let e of i) for (let t of Object.keys(r)) r[t].includes(e) && (m[t] = e);
        }
        let { data: h } = await n.post(u, { form: { page: 1, rows: o, type: ``, isLatestMessage: !1, ...m } }),
            g = h.result.table.slice(0, o).map((e) => ({ title: e.title, link: e.id, guid: `moa-zdscxx-${e.id}`, pubDate: t(e.date) }));
        g = await Promise.all(
            g.map((r) =>
                e.tryGet(r.guid, async () => {
                    let { data: e } = await n.post(d, { form: { id: r.link } }),
                        i = e.result;
                    return ((r.title = i.title), (r.link = new URL(`nyb/pc/messageView.jsp?id=${r.link}`, l).href), (r.description = i.content), (r.author = i.source), (r.pubDate = t(i.date)), r);
                })
            )
        );
        let { data: _ } = await n(p),
            v = r(_),
            y = v(`title`).text();
        return { title: `${y}${a ? ` - ${a}` : ``}`, description: `数据`, link: f, item: g, allowEmpty: !0, image: v(`h1.logo a img`).prop(`src`), author: y };
    },
    a = {
        path: `/moa/zdscxx/:category{.+}?`,
        name: `中华人民共和国农业农村部数据`,
        url: `www.moa.gov.cn`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/gov/moa/zdscxx`,
        parameters: { category: `分类，默认为全部，见下表` },
        description:
            '::: tip\n  若订阅 [中华人民共和国农业农村部数据](http://zdscxx.moa.gov.cn:8080/nyb/pc/messageList.jsp) 的 `价格指数` 报告主题。此时路由为 [`/gov/moa/zdscxx/价格指数`](https://rsshub.app/gov/moa/zdscxx/价格指数)。\n\n  若订阅 `央视网` 报告来源 的 `蔬菜生产` 报告主题。此时路由为 [`/gov/moa/zdscxx/央视网/蔬菜生产`](https://rsshub.app/gov/moa/zdscxx/央视网/蔬菜生产)。\n:::\n\n| 价格指数 | 供需形势 | 分析报告周报 | 分析报告日报 | 日历信息 | 蔬菜生产 |\n| -------- | -------- | ------------ | ------------ | -------- | -------- |\n    ',
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { title: `价格指数`, source: [`zdscxx.moa.gov.cn:8080/nyb/pc/messageList.jsp`], target: `/gov/moa/zdscxx/价格指数` },
            { title: `供需形势`, source: [`zdscxx.moa.gov.cn:8080/nyb/pc/messageList.jsp`], target: `/gov/moa/zdscxx/供需形势` },
            { title: `分析报告周报`, source: [`zdscxx.moa.gov.cn:8080/nyb/pc/messageList.jsp`], target: `/gov/moa/zdscxx/分析报告周报` },
            { title: `分析报告日报`, source: [`zdscxx.moa.gov.cn:8080/nyb/pc/messageList.jsp`], target: `/gov/moa/zdscxx/分析报告日报` },
            { title: `日历信息`, source: [`zdscxx.moa.gov.cn:8080/nyb/pc/messageList.jsp`], target: `/gov/moa/zdscxx/日历信息` },
            { title: `蔬菜生产`, source: [`zdscxx.moa.gov.cn:8080/nyb/pc/messageList.jsp`], target: `/gov/moa/zdscxx/蔬菜生产` },
        ],
    };
export { i as handler, a as route };
