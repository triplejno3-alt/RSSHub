import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { n as r, t as i } from './utils-L31uDd9Y.mjs';
function a(e) {
    return `url` in e && `isNews` in e;
}
const o = { nba: { title: `NBA`, data: `newsData` }, cba: { title: `CBA`, data: `newsData` }, soccer: { title: `足球`, data: `news` }, '': { title: `首页`, data: `res` } },
    s = {
        path: [`/dept/:category?`, `/:category?`],
        name: `手机虎扑网`,
        url: `m.hupu.com`,
        maintainers: [`nczitzk`, `hyoban`],
        example: `/hupu/nba`,
        parameters: { category: { description: `分类，可选值：nba、cba、soccer，默认为空（首页）`, default: ``, options: Object.entries(o).map(([e, t]) => ({ label: t.title, value: e })) } },
        description: `::: tip
电竞分类参见 [游戏热帖](https://bbs.hupu.com/all-gg) 的对应路由 [\`/hupu/all/all-gg\`](https://rsshub.app/hupu/all/all-gg)。
:::`,
        categories: [`bbs`],
        radar: [{ source: [`m.hupu.com/:category`, `m.hupu.com/`], target: `/:category` }],
        handler: async (s) => {
            let c = s.req.param(`category`) || ``;
            if (!(c in o)) throw Error(`Invalid category. Valid options are: ` + Object.keys(o).filter(Boolean).join(`, `));
            let l = c,
                u = `https://m.hupu.com/${l}`,
                { pageProps: d } = i((await t({ method: `get`, url: u })).data, u).props,
                f = o[l].data;
            if (!(f in d)) throw Error(`Expected '${f}' property not found in pageProps for category: ${l || `home`}`);
            let p = (() => {
                let e = d[f];
                return Array.isArray(e) ? e : [];
            })().map((t) =>
                a(t)
                    ? { title: t.title, link: t.url.replace(/bbs\.hupu.com/, `m.hupu.com/bbs`), guid: t.tid, category: t.label ? [t.label] : void 0 }
                    : { title: t.title, pubDate: n(e(t.publishTime), 8), link: t.link.replace(/bbs\.hupu.com/, `m.hupu.com/bbs`), guid: t.tid }
            );
            return ((p = await Promise.all(p.filter((e) => e.link && !/subject/.test(e.link)).map((e) => r(e)))), { title: `虎扑 - ${o[l].title}`, link: u, item: p });
        },
    };
export { s as route };
