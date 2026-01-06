import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { path: `/:id{.+}?`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let { id: o = `main/noticeannouncement/cfmmcnotice` } = a.req.param(),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 10,
        c = `http://www.cfmmc.com`,
        l = new URL(`servlet/json`, c).href,
        u = new URL(o.endsWith(`/`) ? o : `${o}/`, c).href,
        { data: d } = await n(u),
        f = i(d),
        p = f(`#catalogId`).prop(`value`),
        { data: m } = await n.post(l, { form: { funcNo: 741e3, catalog_id: p, branchNo: ``, curtPageNo: 1, numPerPage: s, key_word: ``, start_date: ``, end_date: `` }, headers: { referer: u } }),
        h = m.results?.[0].data.slice(0, s).map((e) => ({ title: e.title, link: new URL(e.url, c).href, pubDate: r(t(e.publish_date), 8) })) ?? [];
    h = await Promise.all(
        h.map((t) =>
            e.tryGet(t.link, async () => {
                let { data: e } = await n(t.link),
                    r = i(e);
                return ((t.title = r(`div.article_title h2`).text()), (t.description = r(`div.cont_txt`).html()), t);
            })
        )
    );
    let g = `中国期货市场监控中心`,
        _ = new URL(f(`a.logo img`).prop(`src`), c).href;
    return {
        item: h,
        title: `${g} - ${f(`h3.SubPage_t3`).text()}`,
        link: u,
        description: f(`meta[name="Description"]`).prop(`content`),
        language: `zh`,
        image: _,
        subtitle: f(`meta[name="Keywords"]`).prop(`content`),
        author: g,
        allowEmpty: !0,
    };
}
export { a as route };
