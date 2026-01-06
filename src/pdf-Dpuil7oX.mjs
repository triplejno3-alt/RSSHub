import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = async (n) => {
        let { category: r = `stf/seisakunitsuite/bunya/houkokusuunosuii` } = n.req.param(),
            i = n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 30,
            a = `https://www.mhlw.go.jp`,
            o = new URL(r.endsWith(`.html`) ? r : `${r}.html`, a).href,
            { data: s } = await e(o),
            c = t(s),
            l = c(`html`).prop(`lang`),
            u = c(`a[data-icon="pdf"]`)
                .slice(0, i)
                .toArray()
                .map((e) => {
                    e = c(e);
                    let t = e.find(`font`).text() || e.text(),
                        n = new URL(e.prop(`href`), a).href;
                    return { title: t, link: n, language: l, enclosure_url: n, enclosure_type: n ? `application/pdf` : void 0, enclosure_title: t };
                }),
            d = new URL(c(`div.m-headerLogo img`).first().prop(`src`), a).href;
        return { title: c(`title`).text(), description: c(`meta[property="og:description"]`).prop(`content`), link: o, item: u, allowEmpty: !0, image: d, author: c(`meta[property="og:site_name"]`).prop(`content`), language: l };
    },
    r = {
        path: `/mhlw/pdf/:category{.+}?`,
        name: `PDF`,
        url: `www.mhlw.go.jp`,
        maintainers: [`nczitzk`],
        handler: n,
        example: `/go/mhlw/pdf/stf/seisakunitsuite/bunya/houkokusuunosuii`,
        parameters: { category: 'Category, `stf/seisakunitsuite/bunya/houkokusuunosuii` as 新型コロナウイルス感染症の定点当たり報告数の推移 by default' },
        description:
            '::: tip\n  Subscribing to this route will give you access to all PDF files on this page.\n\n  If you subscribe to [新型コロナウイルス感染症の定点当たり報告数の推移](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/houkokusuunosuii.html)，where the URL is `https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/houkokusuunosuii.html`, extract the part `https://www.mhlw.go.jp/` to the end, which is `.html`, and use it as the parameter to fill in. Therefore, the route will be [`/go/mhlw/stf/seisakunitsuite/bunya/houkokusuunosuii`](https://rsshub.app/go/mhlw/stf/seisakunitsuite/bunya/houkokusuunosuii).\n:::\n  ',
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.mhlw.go.jp`],
                target: (e, t) => {
                    let n = new URL(t).href.match(/mhlw\.go\.jp\/(.*)$/)?.[1] ?? void 0;
                    return `/mhlw/pdf${n ? `/${n}` : ``}`;
                },
            },
        ],
    };
export { n as handler, r as route };
