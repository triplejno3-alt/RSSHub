import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = { '01': `关于我们`, '02': `港澳新闻`, '03': `重要新闻`, '04': `顾问点评、会员观点`, '05': `专题汇总`, '06': `港澳时评`, '07': `图片新闻`, '08': `视频中心`, '09': `港澳研究`, 10: `最新书讯`, 11: `研究资讯` },
    u = {
        path: `/:category?`,
        categories: [`new-media`],
        example: `/cahkms`,
        parameters: { category: `分类，见下表，默认为重要新闻` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`cahkms.org/`] }],
        name: `分类`,
        maintainers: [`nczitzk`],
        handler: d,
        url: `cahkms.org/`,
        description: `| 关于我们 | 港澳新闻 | 重要新闻 | 顾问点评、会员观点 | 专题汇总 |
| -------- | -------- | -------- | ------------------ | -------- |
| 01       | 02       | 03       | 04                 | 05       |

| 港澳时评 | 图片新闻 | 视频中心 | 港澳研究 | 最新书讯 | 研究资讯 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 06       | 07       | 08       | 09       | 10       | 11       |`,
    };
async function d(u) {
    let d = u.req.param(`category`) ?? `03`,
        f = `http://www.cahkms.org`,
        p = `${f}/HKMAC/indexMac/getRightList?dm=${d}&page=1&countPage=${u.req.query(`limit`) ?? 10}`,
        m = (await n({ method: `get`, url: p })).data.filter((e) => e.ID).map((e) => ({ title: e.TITLE, description: `<p>${e.GJZ}</p>`, pubDate: r(t(e.JDRQ), 8), link: `${f}/HKMAC/indexMac/getWzxx?id=${e.ID}` }));
    return (
        (m = await Promise.all(
            m.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = await n({ method: `get`, url: t.link });
                    t.author = e.data.WZLY;
                    let r = e.data.VIDEO.indexOf(`.mp4`) > 0 ? e.data.VIDEO : null;
                    return (
                        (t.description = s(
                            o(i, {
                                children: [
                                    e.data.URL ? a(`img`, { src: `${f}${e.data.URL}` }) : null,
                                    e.data.CONTENT ? c(e.data.CONTENT) : null,
                                    r ? a(`video`, { controls: !0, children: a(`source`, { src: `${f}${r}`, type: `video/mp4` }) }) : null,
                                    e.data.fjlist?.length
                                        ? o(i, {
                                              children: [a(`br`, {}), a(`b`, { children: `下载附件：` }), a(`br`, {}), e.data.fjlist.map((e) => o(i, { children: [a(`a`, { href: `${f}${e.URL}`, children: e.FJMC }), a(`br`, {})] }))],
                                          })
                                        : null,
                                ],
                            })
                        )),
                        (t.link = `${f}/HKMAC/webView/mc/AboutUs_1.html?${d}&${l[d]}`),
                        t
                    );
                })
            )
        )),
        { title: `${l[d]} - 全国港澳研究会`, link: p, item: m }
    );
}
export { u as route };
