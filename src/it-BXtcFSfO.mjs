import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
async function o(e) {
    let t;
    try {
        t = await n.get(e, { responseType: `buffer` });
    } catch {
        return { description: `` };
    }
    let r = t.data,
        o = i(a.decode(r, `utf-8`)),
        s = o(`meta[charset]`).attr(`charset`);
    return (s?.toLowerCase() !== `utf-8` && (o = i(a.decode(r, s ?? `utf-8`))), { description: (o(`.template-body`).length ? o(`.template-body`).html() : ``) + (o(`.template-tail`).length ? o(`.template-tail`).html() : ``) });
}
var s = {
    ProcessFeed: (e, n, a) =>
        Promise.all(
            n.map((n) => {
                let s = i(n),
                    c = s(`a`),
                    l = new URL(c.attr(`href`), e).href,
                    u = r(
                        t(
                            s(`span`)
                                .text()
                                .match(/\d{4}-\d{2}-\d{2}/)
                        ),
                        8
                    );
                return a.tryGet(l, async () => {
                    let { description: e } = await o(l);
                    return { title: c.text(), link: l, author: `北林信息`, description: e, pubDate: u };
                });
            })
        ),
};
const c = {
    path: `/it/:type`,
    categories: [`university`],
    example: `/bjfu/it/xyxw`,
    parameters: { type: `通知类别` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`it.bjfu.edu.cn/:type/index.html`] }],
    name: `信息学院通知`,
    maintainers: [`wzc-blog`],
    handler: l,
    description: `| 学院新闻 | 科研动态 | 本科生培养 | 研究生培养 |
| -------- | -------- | ---------- | ---------- |
| xyxw     | kydt     | pydt       | pydt2      |`,
};
async function l(t) {
    let r = t.req.param(`type`),
        o,
        c;
    switch (r) {
        case `kydt`:
            ((o = `科研动态`), (c = `kyxz/kydt/`));
            break;
        case `pydt`:
            ((o = `本科生培养`), (c = `bkspy/pydt/`));
            break;
        case `pydt2`:
            ((o = `研究生培养`), (c = `yjspy/pydt2/`));
            break;
        default:
            ((o = `学院新闻`), (c = `xyxw/`));
    }
    let l = `http://it.bjfu.edu.cn/` + c,
        u = (await n({ method: `get`, responseType: `buffer`, url: l })).data,
        d = i(a.decode(u, `utf-8`)),
        f = d(`meta[charset]`).attr(`charset`);
    f?.toLowerCase() !== `utf-8` && (d = i(a.decode(u, f ?? `utf-8`)));
    let p = d(`.item-content`).toArray(),
        m = await s.ProcessFeed(l, p, e);
    return { title: `北林信息 - ` + o, link: `http://it.bjfu.edu.cn/` + c, description: `北京林业大学信息学院 - ` + o, item: m };
}
export { c as route };
