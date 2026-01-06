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
    let o = a.req.param(`id`),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 40,
        c = `http://www.chinawriter.com.cn`,
        l = `${new URL(o ?? ``, c).href}/`,
        { data: u } = await n(l),
        d = i(u),
        f = (d(`main div.inner`).find(`a`).length === 0 ? d(`body`) : d(`main div.inner`))
            .find(`a`)
            .toArray()
            .filter((e) => /(?:\/\d{4}){2}\/\w+-\w+\.html/.test(d(e).prop(`href`)))
            .slice(0, s)
            .map((e) => {
                e = d(e);
                let t = e.prop(`href`);
                return { title: e.text(), link: t.startsWith(`http`) ? t : new URL(e.prop(`href`), c).href };
            });
    f = await Promise.all(
        f.map((a) =>
            e.tryGet(a.link, async () => {
                try {
                    let { data: e } = await n(a.link),
                        o = i(e);
                    o(`div.end_shared`).remove();
                    let s = o(`div.end_info`).text().trim();
                    ((a.title = o(`#newstit`).text() || o(`h6.end_tit`).text()),
                        (a.description = o(`div.end_article`).html()),
                        (a.author = s ? s.match(/\|(.*)\d{4}/)[1].trim() : ``),
                        (a.category = [
                            ...new Set(
                                [
                                    ...o(`div.location a.clink`)
                                        .slice(1)
                                        .toArray()
                                        .map((e) => o(e).text()),
                                    s
                                        ? s
                                              .match(/^(.*)\|/)[1]
                                              .replaceAll(`来源：`, ``)
                                              .trim()
                                        : void 0,
                                ].filter(Boolean)
                            ),
                        ]),
                        (a.pubDate = o(`div.end_info em`).text() ? r(t(o(`div.end_info em`).text(), `YYYY年MM月DD日HH:mm`), 8) : t(o(`meta[name="publishdate"]`).prop(`content`))));
                } catch {}
                return a;
            })
        )
    );
    let p = new URL(d(`link[rel="icon"]`).prop(`href`), c);
    return {
        item: f,
        title: d(`title`).text().replaceAll(`--`, ` - `),
        link: l,
        description: d(`meta[name="description"]`).prop(`content`),
        language: `zh-cn`,
        image: new URL(d(`h1.logo a img`).prop(`src`), c).href,
        icon: p,
        logo: p,
        subtitle: d(`meta[name="keywords"]`).prop(`content`),
        allowEmpty: !0,
    };
}
export { a as route };
