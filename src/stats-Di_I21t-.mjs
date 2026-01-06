import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { r } from './common-utils-uYpL50sT.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = ({ description: e, attachments: t }) =>
        l(
            s(a, {
                children: [
                    e ? u(e) : null,
                    t?.length ? s(a, { children: [o(`br`, {}), o(`p`, { children: `附件：` }), o(`ul`, { children: t.map((e, t) => o(`li`, { children: o(`a`, { href: e.link, children: e.name }) }, `${e.link}-${t}`)) })] }) : null,
                ],
            })
        ),
    f = {
        path: `/stats/*`,
        name: `国家统计局 通用`,
        url: `www.stats.gov.cn`,
        categories: [`government`],
        maintainers: [`bigfei`, `nczitzk`, `reply2future`],
        example: `/gov/stats/sj/zxfb`,
        handler: p,
        radar: [{ title: `国家统计局 通用`, source: [`www.stats.gov.cn/*path`], target: `/gov/stats/*path` }],
        description:
            '::: tip\n路径处填写对应页面 URL 中 `http://www.stats.gov.cn/` 后的字段。下面是一个例子。\n\n若订阅 [数据 > 数据解读](http://www.stats.gov.cn/sj/sjjd/)\n则将对应页面 URL `http://www.stats.gov.cn/sj/sjjd/` 中 `http://www.stats.gov.cn/` 后的字段 `sj/sjjd` 作为路径填入。\n此时路由为 [`/gov/stats/sj/sjjd`](https://rsshub.app/gov/stats/sj/sjjd)\n\n若订阅 [新闻 > 时政要闻 > 中央精神](http://www.stats.gov.cn/xw/szyw/zyjs/)\n则将对应页面 URL `http://www.stats.gov.cn/xw/szyw/zyjs/` 中 `http://www.stats.gov.cn/`\n后的字段 `xw/szyw/zyjs` 作为路径填入。此时路由为 [`/gov/stats/xw/szyw/zyjs`](https://rsshub.app/gov/stats/xw/szyw/zyjs)\n:::',
    };
async function p(a) {
    let o = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 15,
        s = `http://www.stats.gov.cn`,
        { headers: l } = await e.raw(s),
        u = l
            ?.getSetCookie()
            .find((e) => e.startsWith(`wzws_sessionid=`))
            ?.split(`;`)[0],
        f = r(a) === `/stats` ? `/sj/zxfb/` : r(a).replace(/^\/stats(.*)/, `$1`),
        p = `${s}${f.endsWith(`/`) ? f : f + `/`}`,
        m = c(await e(p, { headers: { Cookie: u, Referer: p } })),
        h = m(m(`a.pchide`).length === 0 ? `a[title]` : `.list-content a.pchide`)
            .slice(0, o)
            .toArray()
            .map((e) => ((e = m(e)), { title: e.attr(`title`), link: new URL(e.attr(`href`), p).href }));
    return (
        (h = await Promise.all(
            h.map((r) =>
                t.tryGet(r.link, async () => {
                    let t = await e(r.link, { headers: { Cookie: u, Referer: s } }),
                        a = c(t);
                    if (/(news\.cn|www\.gov\.cn)/.test(r.link)) {
                        if (a(`.year`).text())
                            ((r.pubDate = i(n(`${a(`.year`).text()}/${a(`.day`).text()} ${a(`.time`).text()}`, `YYYY/MM/DD HH:mm:ss`), 8)),
                                (r.author = a(`.source`)
                                    .text()
                                    .replace(/来源：/, ``)
                                    .trim()));
                        else {
                            a(`.pages_print`).remove();
                            let e = a(`.info, .pages-date`).text().split(`来源：`);
                            ((r.pubDate = i(n(e[0].trim()), 8)), (r.author = e.pop()));
                        }
                        return ((r.title = r.title || a(`h1`).first().text() || a(`h2`).first().text()), (r.description = a(`#detail, .xlcontent, .pages_content`).html()), r);
                    }
                    return (
                        (r.author = t.match(/来源：(.*?)</)?.[1]?.trim()),
                        a(`.pchide`).remove(),
                        (r.title = r.title || a(`div.detail-title h1`).text()),
                        (r.pubDate = i(n(a(`div.detail-title-des h2 p, .info`).first().text().trim()), 8)),
                        (r.description = d({
                            description: a(`.TRS_Editor`).html() || a(`.TRS_UEDITOR`).html(),
                            attachments: a(`a[oldsrc]`)
                                .toArray()
                                .map((e) => ((e = m(e)), { link: new URL(e.attr(`href`), r.link).href, name: e.text().trim() })),
                        })),
                        r
                    );
                })
            )
        )),
        { title: m(`title`).text(), link: p, item: h }
    );
}
export { f as route };
