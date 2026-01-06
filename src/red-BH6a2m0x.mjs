import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
import i from 'p-map';
const a = { path: `/red`, categories: [`programming`], example: `/anthropic/red`, radar: [{ source: [`red.anthropic.com`] }], name: `Frontier Red Team`, maintainers: [`shoeper`], handler: o, url: `red.anthropic.com` };
async function o() {
    let a = `https://red.anthropic.com`,
        o = `${a}/red`,
        s = r(await e(o)),
        c = await i(
            s(`a[class^="note"]`)
                .toArray()
                .map((e) => {
                    let t = s(e);
                    return { title: t.find(`h2, h3`).text().trim(), link: `${a}/${t.attr(`href`)}` };
                }),
            (i) =>
                t.tryGet(i.link, async () => {
                    let t = r(await e(i.link));
                    ((i.pubDate = n(t(`d-article p`).first().text().trim())), t(`h3:contains("Subscribe")`).remove(), t(`d-article p`).first().remove());
                    let a = t(`d-article`);
                    return (
                        a.find(`img`).each((e, n) => {
                            let r = t(n);
                            r.removeAttr(`style srcset`);
                            let i = r.attr(`src`),
                                a = new URLSearchParams(i).get(`/_next/image?url`);
                            a && r.attr(`src`, a);
                        }),
                        (i.description = a.html()),
                        i
                    );
                }),
            { concurrency: 5 }
        );
    return { title: `Anthropic Frontier Red Team`, link: o, image: `${a}/anthropic-serve/favicon.ico`, item: c };
}
export { a as route };
