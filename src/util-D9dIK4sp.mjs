import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = `https://www.safe.gov.cn`,
    s = { ywzx: `www/busines/businessQuery?siteid=`, tsjy: `www/complaint/complaintQuery?siteid=` },
    c = async (c = `beijing`, l = `ywzx`, u = `3`) => {
        let d = new URL(`${s[l]}${c}`, o).href,
            f = new URL(`${c}/${l}/index.html`, o).href,
            { data: p } = await t(d),
            m = i(p),
            h = m(`#complaint`)
                .slice(0, u)
                .toArray()
                .map((t) => {
                    t = m(t);
                    let i = t.find(`span[objid]`),
                        o = { author: i.first().text().replace(/:$/, ``), content: i.eq(1).text(), date: i.eq(2).text() },
                        s = { author: i.eq(3).text().replace(/:$/, ``), content: i.eq(4).text(), date: i.eq(5).text() };
                    return {
                        title: `${o.author}: ${o.content}`,
                        link: f,
                        description: a(
                            n(`table`, {
                                children: r(`tbody`, {
                                    children: [
                                        r(`tr`, { children: [n(`th`, { children: `留言人` }), n(`th`, { children: `留言内容` }), n(`th`, { children: `留言时间` })] }),
                                        o ? r(`tr`, { children: [n(`td`, { children: o.author }), n(`td`, { children: o.content }), n(`td`, { children: o.date })] }) : null,
                                        s ? r(`tr`, { style: { color: `#0069ae` }, children: [n(`td`, { children: s.author }), n(`td`, { children: s.content }), n(`td`, { children: s.date })] }) : null,
                                    ],
                                }),
                            })
                        ),
                        author: `${o.author}/${s.author}`,
                        guid: `${f}#${o.author}(${o.date})/${s.author}(${s.date})`,
                        pubDate: e(o.date),
                        updated: e(s.date),
                    };
                }),
            { data: g } = await t(f),
            _ = i(g),
            v = _(`meta[name="ColumnName"]`).prop(`content`),
            y = _(`meta[name="ColumnType"]`).prop(`content`),
            b = `safe/templateresource/372b1dfdab204181b9b4f943a8e926a6`,
            x = new URL(`${b}/logo_06.png`, o).href,
            S = new URL(`${b}/safe.ico`, o).href;
        return { item: h, title: `${v} - ${y}`, link: f, description: _(`meta[name="ColumnDescription"]`).prop(`content`), language: `zh`, image: x, icon: S, logo: S, subtitle: y, author: v, allowEmpty: !0 };
    };
export { c as t };
