import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let { year: i = new Date().getFullYear() } = n.req.param(),
            a = Number.parseInt(n.req.query(`limit`) ?? `30`, 10),
            o = `https://id-info.jihs.go.jp`,
            s = new URL(`surveillance/idwr/jp/idwr/${i}/`, o).href,
            c = r(await e(s)),
            l = c(`html`).attr(`lang`) ?? `ja`,
            u = c(`span.drawer-branding__subtitle`).text(),
            d = c(`a.sizeview`)
                .slice(0, a)
                .toArray()
                .map((e) => {
                    let n = c(e),
                        r = n.parent(`p`),
                        i = r.prev(`h2`).text(),
                        a = r.html() ?? void 0,
                        o = r.text().match(/〔(\d{4}年\d{1,2}月\d{1,2}日)発行〕/)?.[1],
                        d = n.attr(`href`),
                        f = o,
                        p = {
                            title: i,
                            description: a,
                            pubDate: o ? t(o, `YYYY年M月D日`) : void 0,
                            link: d ? new URL(d, s).href : void 0,
                            author: u,
                            content: { html: a, text: a },
                            updated: f ? t(f, `YYYY年M月D日`) : void 0,
                            language: l,
                        },
                        m = n,
                        h = d ? new URL(d, s).href : void 0;
                    if (h) {
                        let e = `application/${h.split(/\./).pop()}`,
                            t = m.text();
                        p = { ...p, enclosure_url: h, enclosure_type: e, enclosure_title: t || i, enclosure_length: void 0 };
                    }
                    return p;
                });
        return {
            title: c(`title`).text(),
            description: c(`meta[name="keywords"]`).attr(`content`),
            link: s,
            item: d,
            allowEmpty: !0,
            image: c(`img.common-branding__logo-image`).attr(`src`) ? new URL(c(`img.common-branding__logo-image`).attr(`src`), o).href : void 0,
            author: u,
            language: l,
            id: s,
        };
    },
    a = {
        path: `/jihs/idwr/:year?`,
        name: `感染症発生動向調査週報`,
        url: `id-info.jihs.go.jp`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/go/jihs/idwr/2025`,
        parameters: { year: { description: `Year, current year by default` } },
        description:
            '::: tip\nTo subscribe to [感染症発生動向調査週報](https://id-info.jihs.go.jp/surveillance/idwr/jp/idwr/2025/), where the source URL is `https://id-info.jihs.go.jp/surveillance/idwr/jp/idwr/2025/`, extract the certain parts from this URL to be used as parameters, resulting in the route as [`/go/jihs/idwr/2025`](https://rsshub.app/go/jihs/idwr/2025).\n:::',
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`id-info.jihs.go.jp/surveillance/idwr/jp/idwr/:year`],
                target: (e) => {
                    let t = e.year;
                    return `/go/jihs/idwr${t ? `/${t}` : ``}`;
                },
            },
        ],
        view: n.Articles,
        zh: {
            path: `/jihs/idwr/:year?`,
            name: `传染病发生动向调查周报`,
            url: `id-info.jihs.go.jp`,
            maintainers: [`nczitzk`],
            handler: i,
            example: `/go/jihs/idwr/2025`,
            parameters: { year: { description: `年份，默认为当前年份，可在对应页 URL 中找到` } },
            description:
                '::: tip\n若订阅 [传染病发生动向调查周报](https://id-info.jihs.go.jp/surveillance/idwr/jp/idwr/2025/)，网址为 `https://id-info.jihs.go.jp/surveillance/idwr/jp/idwr/2025/`，请截取 `https://id-info.jihs.go.jp/surveillance/idwr/jp/idwr/` 到末尾 `/` 的部分 `2025` 作为 `year` 参数填入，此时目标路由为 [`/go/jihs/idwr/2025`](https://rsshub.app/go/jihs/idwr/2025)。\n:::\n',
        },
    };
export { i as handler, a as route };
