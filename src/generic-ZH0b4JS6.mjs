import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/sasac/:path{.+}`, name: `Unknown`, maintainers: [], handler: a };
async function a(i) {
    let a = `http://www.sasac.gov.cn/${i.req.param(`path`)}/index.html`,
        o = await n(a),
        s = r(o.data),
        c = s(`.zsy_conlist li`)
            .toArray()
            .filter((e) => !s(e).attr(`style`))
            .map((e) => ((e = s(e)), { title: e.find(`a`).attr(`title`), link: new URL(e.find(`a`).attr(`href`), o.url).href, pubDate: t(e.find(`span`).text().replace(`[`, ``).replace(`]`, ``)) })),
        l = await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return (e(`style, #qr_container, #div_div, [class^=jiathis]`).remove(), (t.description = e(`.zsy_comain`).html()), t);
                })
            )
        );
    return { title: s(`head title`).text().trim(), link: a, image: `http://www.sasac.gov.cn/dbsource/11869722/11869731.jpg`, item: l };
}
export { i as route };
