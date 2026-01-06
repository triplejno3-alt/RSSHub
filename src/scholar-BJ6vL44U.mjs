import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/scholar/:query`,
    categories: [`journal`],
    example: `/google/scholar/data+visualization`,
    parameters: { query: `query statement which supports「Basic」and「Advanced」modes` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Scholar Keywords Monitoring`,
    maintainers: [`HenryQW`],
    handler: r,
    description: `::: warning
  Google Scholar has strict anti-crawling mechanism implemented, the demo below doesn't guarantee availability. Please deploy your own instance as it might increase the stability.
:::

  1.  Basic mode, sample query is the keywords desired, eg.「data visualization」, [https://rsshub.app/google/scholar/data+visualization](https://rsshub.app/google/scholar/data+visualization).

  2.  Advanced mode, visit [Google Scholar](https://scholar.google.com/schhp?hl=en&as_sdt=0,5), click the top left corner and select「Advanced Search」, fill in your conditions and submit the search. The URL should look like this: [https://scholar.google.com/scholar?as_q=data+visualization&as_epq=&as_oq=&as_eq=&as_occt=any&as_sauthors=&as_publication=&as_ylo=2018&as_yhi=&hl=en&as_sdt=0%2C5](https://scholar.google.com/scholar?as_q=data+visualization&as_epq=&as_oq=&as_eq=&as_occt=any&as_sauthors=&as_publication=&as_ylo=2018&as_yhi=&hl=en&as_sdt=0%2C5), copy everything after \`https://scholar.google.com/scholar?\` from the URL and use it as the query for this route. The complete URL for the above example should look like this: [https://rsshub.app/google/scholar/as_q=data+visualization&as_epq=&as_oq=&as_eq=&as_occt=any&as_sauthors=&as_publication=&as_ylo=2018&as_yhi=&hl=en&as_sdt=0%2C5](https://rsshub.app/google/scholar/as_q=data+visualization&as_epq=&as_oq=&as_eq=&as_occt=any&as_sauthors=&as_publication=&as_ylo=2018&as_yhi=&hl=en&as_sdt=0%2C5).`,
};
async function r(n) {
    let r = n.req.param(`query`),
        i = r,
        a = `Google Scholar Monitor Query: ${i}`;
    r.includes(`as_q=`) ? ((i = /as_q=(.*?)&/g.exec(r)[1]), (a = `Google Scholar Monitor Advanced Query: ${i}`)) : (r = `q=` + r);
    let o = `https://scholar.google.com/scholar?${r}`,
        s = t((await e({ method: `get`, url: o })).data)(`#gs_res_ccl_mid .gs_r.gs_or.gs_scl .gs_ri`)
            .toArray()
            .map((e) => {
                let n = t(e),
                    r = n(`h3 a`).attr(`href`);
                return { title: n(`h3 a`).text(), author: n(`.gs_a`).text(), description: n(`.gs_rs`).text(), link: r, guid: r };
            });
    return { title: `Google Scholar Monitor: ${i}`, link: o, description: a, item: s };
}
export { n as route };
