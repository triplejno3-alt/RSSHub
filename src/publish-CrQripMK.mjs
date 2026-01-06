import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { jsx as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = { path: `/publish/:category{.+}?`, name: `Unknown`, maintainers: [], handler: s };
async function s(o) {
    let { category: s = `CRA-Reanalysis/2m-Temperature/6-hour/index.html` } = o.req.param(),
        c = new URL(`publish/${s}`, `http://www.wmc-bj.net`).href,
        { data: l } = await t(c),
        u = i(l),
        d = u(`title`).text(),
        f = u(`#imgpath`),
        p = f.prop(`data-time`),
        m = u(`ol.breadcrumb li`)
            .slice(2)
            .toArray()
            .map((e) => u(e).text()),
        h = [
            {
                title: `${p} ${d}`,
                link: c,
                description: a(f.prop(`src`) ? r(`figure`, { children: r(`img`, { src: f.prop(`src`).replace(/\/medium\//, `/`) }) }) : null),
                category: m,
                guid: `${c}#${p}`,
                pubDate: n(e(/^[A-Za-z]{3}/.test(p) ? p.replace(/^\w+/, ``) : p, [`DD MMM HH:mm`, `MM/DD HH:mm`]), 0),
            },
        ],
        g = u(`link[rel="shortcut icon"]`).prop(`href`);
    return { item: h, title: d, link: c, language: `en`, image: `http://image.nmc.cn/static/wmc/img/logo-cma.png`, icon: g, logo: g, subtitle: m.join(` > `), author: `World Meteorological Centre BeiJing`, allowEmpty: !0 };
}
export { o as route };
