import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import r from 'node:zlib';
import { load as i } from 'cheerio';
const a = `https://wtu.91wllm.com/`,
    o = new Map([
        [`xxtz`, { title: `信息通知`, url: `${a}news/index/tag/xxtz` }],
        [`tzgg`, { title: `通知公告`, url: `${a}news/index/tag/tzgg` }],
        [`xwkd`, { title: `新闻快递`, url: `${a}news/index/tag/xwkd` }],
    ]);
function s(e) {
    let t = e.match(/Base64.decode\(unzip\("(.+?)"\)\.substr\((\d+)\)\)\.substr\((\d+)\)/);
    if (!t) return ``;
    let n = t[1],
        i = Number.parseInt(t[2]),
        a = Number.parseInt(t[3]),
        o = r.inflateSync(Buffer.from(n, `base64`)).toString(`utf8`);
    return Buffer.from(o.slice(i), `base64`).toString(`utf8`).slice(a);
}
const c = {
    path: `/job/:type`,
    categories: [`university`],
    example: `/wtu/job/xxtz`,
    parameters: { type: `信息类型` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`wtu.91wllm.com/news/index/tag/:type`] }],
    name: `就业信息`,
    maintainers: [`ticks-tan`],
    handler: l,
    description: `| 信息类型 | 消息通知 | 通知公告 | 新闻快递 |
| -------- | -------- | -------- | -------- |
| 参数     | xxtz     | tzgg     | xwkd     |`,
};
async function l(r) {
    let c = r.req.param(`type`),
        l = o.get(c),
        u = `${l.title} - 武汉纺织大学就业信息`,
        d = l.url,
        f = i(s((await n.get(d)).data)),
        p = f(`.newsList`)
            .toArray()
            .map((e) => {
                e = f(e);
                let n = e.find(`li[class='span2 y']`).text(),
                    r = e.find(`li>a`),
                    i = new URL(r.attr(`href`), a).href;
                return { title: r.text(), pubDate: t(n, `YYYY-MM-DD`), link: i };
            });
    return {
        title: u,
        link: d,
        description: u,
        item: await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n.get(t.link);
                    return ((t.description = s(e)), t);
                })
            )
        ),
    };
}
export { c as route };
