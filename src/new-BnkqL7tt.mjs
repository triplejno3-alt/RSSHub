import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = { path: `/`, categories: [`other`], example: `/naturalism`, radar: [{ source: [`naturalism.org`] }], name: `What's New`, maintainers: [`TonyRL`], handler: i, url: `naturalism.org` };
async function i() {
    let r = `https://naturalism.org`,
        i = n(await e(r)),
        a = i(`.view-what-s-new .field-content a`)
            .toArray()
            .map((e) => {
                let t = i(e);
                return { title: t.text(), link: new URL(t.attr(`href`), r).href };
            }),
        o = await Promise.all(
            a.map((r) =>
                t.tryGet(r.link, async () => {
                    let t = n(await e(r.link));
                    return (t(`#content`).find(`h1`).remove(), (r.description = t(`#content`).html()), r);
                })
            )
        );
    return { title: i(`head title`).text(), link: r, image: `${r}/sites/naturalism.org/files/swirl-logo.png`, item: o };
}
export { r as route };
