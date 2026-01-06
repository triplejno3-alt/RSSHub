import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = `http://www.mztoday.gov.cn`,
    l = {
        zx: { name: `最新`, url: `/news.html?page=1` },
        tj: { name: `推荐`, url: `/list/42.html?page=1` },
        sz: { name: `时政`, url: `/list/39.html?page=1` },
        jy: { name: `教育`, url: `/list/40.html?page=1` },
        ms: { name: `民生`, url: `/list/41.html?page=1` },
        wl: { name: `文旅`, url: `/list/41.html?page=1` },
        jj: { name: `经济`, url: `/list/53.html?page=1` },
        wwcj: { name: `文明创建`, url: `/list/54.html?page=1` },
        bxsh: { name: `文明创建`, url: `/list/55.html?page=1` },
        bm: { name: `部门`, url: `/list/56.html?page=1` },
        zj: { name: `镇（街道）`, url: `/list/57.html?page=1` },
        jkmz: { name: `健康绵竹`, url: `/list/59.html?page=1` },
        nxjt: { name: `南轩讲堂`, url: `/list/70.html?page=1` },
        sp: { name: `视频`, url: `/vlist.html?page=1` },
        wmsj: { name: `文明实践`, url: `/list/71.html?page=1` },
        lhzg: { name: `领航中国`, url: `/list/74.html?page=1` },
        mznh: { name: `绵竹年画`, url: `/list/36.html?page=1` },
        mzls: { name: `绵竹历史`, url: `/list/16.html?page=1` },
        mzly: { name: `绵竹旅游`, url: `/list/37.html?page=1` },
        wwkmz: { name: `外媒看绵竹`, url: `/list/50.html?page=1` },
    },
    u = async (e) => {
        let i = a((await n(e)).data);
        return i(`div.sl`)
            .toArray()
            .map((e) => ({ title: i(`a`, e).attr(`title`), url: `${c}${i(`a`, e).attr(`href`)}`, pubDate: t(r(i(`div > div:nth-child(4)`, e).html().trim()), 8) }));
    },
    d = (t) =>
        e.tryGet(t.url, async () => {
            let e = a((await n(t.url)).data);
            return { title: t.title, content: e(`td:nth-child(2)`).html(), link: t.url, pubDate: t.pubDate };
        }),
    f = {
        path: `/sichuan/deyang/mztoday/:infoType?`,
        categories: [`government`],
        example: `/gov/sichuan/deyang/mztoday/zx`,
        parameters: { infoType: `信息栏目名称。默认最新(zx)` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.mztoday.gov.cn/*`], target: `/sichuan/deyang/mztoday` }],
        name: `今日绵竹`,
        maintainers: [`zytomorrow`],
        handler: p,
        url: `www.mztoday.gov.cn/*`,
        description: `| 最新 | 推荐 | 时政 | 教育 | 民生 | 文旅 | 经济 | 文明创建 | 部门 | 镇（街道） | 健康绵竹 | 南轩讲堂 | 视频 | 文明实践 | 领航中国 | 绵竹年画 | 绵竹历史 | 绵竹旅游 | 外媒看绵竹 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | -------- | ---- | ---------- | -------- | -------- | ---- | -------- | -------- | -------- | -------- | -------- | ---------- |
| zx   | tj   | sz   | jy   | ms   | wl   | jj   | wmcj     | bm   | zj         | jkmz     | nxjt     | sp   | wmsj     | lhzg     | mznh     | mzls     | mzly     | wmkmz      |`,
    };
async function p(e) {
    let t = e.req.param(`infoType`) || `zx`,
        n = `${c}${l[t].url}`,
        r = await u(n),
        a = await Promise.all(r.map((e) => d(e)));
    return { title: `今日绵竹-${l[t].name}`, link: `${n}1`, item: a.map((e) => ({ title: e.title, description: o(i(`div`, { children: e.content ? s(e.content) : null })), link: e.link, pubDate: e.pubDate })) };
}
export { f as route };
