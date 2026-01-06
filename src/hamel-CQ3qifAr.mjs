import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/blog`, categories: [`blog`], example: `/hamel/blog`, radar: [{ source: [`hamel.dev/`] }], url: `hamel.dev/`, name: `Blog`, maintainers: [`liyaozhong`], handler: a, description: `Hamel's Blog Posts` };
async function a() {
    let i = `https://hamel.dev`,
        a = r((await n(i)).data),
        o = a(`tr[data-index]`)
            .toArray()
            .map((e) => {
                let n = a(e),
                    r = n.find(`td a`).last(),
                    o = n.find(`.listing-date`),
                    s = r.attr(`href`),
                    c = r.text().trim(),
                    l = o.text().trim();
                return !s || !c || !l ? null : { title: c, link: new URL(s, i).href, pubDate: t(l, `M/D/YY`) };
            })
            .filter((e) => e !== null);
    return (
        (o = (
            await Promise.all(
                o.map((t) =>
                    e.tryGet(t.link, async () => {
                        try {
                            let e = r((await n(t.link)).data);
                            return { ...t, description: e(`.content`).html() || `` };
                        } catch {
                            return t;
                        }
                    })
                )
            )
        ).filter((e) => e !== null)),
        { title: `Hamel's Blog`, link: i, item: o }
    );
}
export { i as route };
