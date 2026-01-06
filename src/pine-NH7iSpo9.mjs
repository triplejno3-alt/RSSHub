import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { path: `/pine/:version?`, radar: [{ source: [`tradingview.com/pine-script-docs/en/:version/Release_notes.html`], target: `/pine/:version` }], name: `Unknown`, maintainers: [], handler: i };
async function i(r) {
    let { version: i = `v5` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 100,
        o = `https://www.tradingview.com`,
        s = new URL(`pine-script-docs/en/${i}/Release_notes.html`, o).href,
        { data: c } = await t(s),
        l = n(c),
        u = l(`div.section`)
            .toArray()
            .filter((e) => ((e = l(e)), /\w+-\d{4}/.test(e.prop(`id`))))
            .slice(0, a)
            .map((t) => {
                t = l(t);
                let n = t.prop(`id`),
                    r = t.find(`a.toc-backref`).first().text(),
                    i = new URL(t.find(`a.headerlink`).prop(`href`), s).href;
                return (t.children().first().remove(), { title: r, link: i, description: t.html(), pubDate: e(`${n.charAt(0).toUpperCase()}${n.slice(1)}`, `MMMM-YYYY`) });
            }),
        d = new URL(`_images/Pine_Script_logo.svg`, s).href,
        f = new URL(`favicon.ico`, o).href;
    return { item: u, title: l(`title`).text(), link: s, description: l(`div.text-logo`).text(), language: l(`html`).prop(`lang`), image: d, icon: f, logo: f };
}
export { r as route };
