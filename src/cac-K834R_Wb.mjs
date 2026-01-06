import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = { path: `/cac/*`, name: `Unknown`, maintainers: [], handler: s };
async function s(o) {
    let s = o.params[0],
        c = `http://www.cac.gov.cn`,
        l = `${c}/index.htm`,
        u = (
            await t.tryGet(
                `gov:cac:pathList`,
                async () => {
                    let { data: e } = await r(l),
                        t = a(e);
                    return t(`a`)
                        .toArray()
                        .map((e) => {
                            let n = t(e).attr(`href`);
                            if (n && /(?:http:)?\/\/www\.cac\.gov\.cn(.*?)\/(A.*?\.htm)/.test(n)) {
                                let e = n.match(/(?:http:)?\/\/www\.cac\.gov\.cn(.*?)\/(A.*?\.htm)/);
                                if (e && e.length > 2) {
                                    let t = e[1];
                                    return { path: t, completeUrl: `${c}${t}/${e[2]}` };
                                }
                            }
                            return null;
                        })
                        .filter(Boolean);
                },
                e.cache.routeExpire,
                !1
            )
        ).find((e) => e && e.path === s).completeUrl,
        { data: d } = await r(u),
        f = a(d),
        p = f(`div#loadingInfoPage li`)
            .toArray()
            .map((e) => {
                let t = f(e),
                    r = t.find(`a`),
                    a = r.attr(`href`),
                    o = r.text();
                return { link: a, pubDate: i(n(t.find(`.times`).text())), title: o, description: o };
            });
    return { title: f(`head title`).text(), link: u, item: p };
}
export { o as route };
