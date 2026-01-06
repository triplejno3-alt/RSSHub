import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = { path: `/trending/:filters?`, name: `Unknown`, maintainers: [`nczitzk`], handler: u };
async function u(l) {
    let u = l.req.param(`filters`),
        d = `https://pubmed.ncbi.nlm.nih.gov`,
        f = `${d}/trending${u ? `?filter=${u.replaceAll(`,`, `&filter=`)}` : ``}`,
        p = o((await n({ method: `get`, url: f })).data),
        m = p(`a[data-article-id]`)
            .toArray()
            .map((e) => ((e = p(e)), { title: e.text(), link: `${d}/${e.attr(`data-article-id`)}` }));
    return (
        (m = await Promise.all(
            m.map((l) =>
                e.tryGet(l.link, async () => {
                    let e = o((await n({ method: `get`, url: l.link })).data);
                    return (
                        (l.doi = e(`meta[name="citation_doi"]`).attr(`content`)),
                        (l.pubDate = t(e(`meta[name="citation_date"]`).attr(`content`))),
                        (l.description = s(a(r, { children: [e(`.authors-list`).html() ? c(e(`.authors-list`).html()) : null, i(`br`, {}), e(`#enc-abstract`).html() ? c(e(`#enc-abstract`).html()) : null] }))),
                        l
                    );
                })
            )
        )),
        { title: `Trending page - PubMed`, link: f, item: m }
    );
}
export { l as route };
