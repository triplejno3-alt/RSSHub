import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
var a = {
    ProcessFeed: (e, a, o) =>
        Promise.all(
            e
                .filter((e) => i(e, null, !1)(`a`).length)
                .map((e) => {
                    let s = i(e, null, !1),
                        c = new URL(s(`a`).attr(`href`), o.url).href;
                    return a.tryGet(c, async () => {
                        let e = (await n(c)).data;
                        return (
                            (s = i(e)),
                            s(`${o.selector.content} img`).each((e, t) => {
                                let n = s(t),
                                    r = n.attr(`src`);
                                r && n.attr(`src`, new URL(r, o.url).href);
                            }),
                            s(`${o.selector.content} a, ul[style]`).each((e, t) => {
                                let n = s(t),
                                    r = n.attr(`href`);
                                r && n.attr(`href`, new URL(r, o.url).href);
                            }),
                            s(`img, div, span, p, table, td, tr, a`).removeAttr(`style`),
                            s(`style, script`).remove(),
                            {
                                title: s(`h2`).text(),
                                description: s(o.selector.content).html() + (s(`ul[style]`).length ? s(`ul[style]`).html() : ``),
                                link: c,
                                pubDate: r(
                                    t(
                                        s(`div.ny_fbt`)
                                            .text()
                                            .match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2})/)[0],
                                        `YYYY-MM-DD HH:mm`
                                    ),
                                    8
                                ),
                                author: `深圳大学研究生招生网`,
                            }
                        );
                    });
                })
        ),
};
const o = new Map([
        [1, { title: `硕士招生 - 深圳大学研究生招生网` }],
        [2, { title: `博士招生 - 深圳大学研究生招生网` }],
    ]),
    s = {
        path: `/yz/:type?`,
        categories: [`university`],
        example: `/szu/yz/1`,
        parameters: { type: '默认为 `1`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `研究生招生网`,
        maintainers: [`NagaruZ`],
        handler: c,
        description: `| 研究生 | 博士生 |
| ------ | ------ |
| 1      | 2      |`,
    };
async function c(t) {
    let r = Number.parseInt(t.req.param(`type`)),
        s = {
            1: { selector: { list: `.list`, item: `li`, content: `#vsb_content` }, url: `https://yz.szu.edu.cn/sszs/gg.htm` },
            2: { selector: { list: `.list`, item: `li`, content: `#vsb_content, #vsb_content_2` }, url: `https://yz.szu.edu.cn/bszs/gg.htm` },
        };
    r !== 1 && r !== 2 && (r = 1);
    let c = s[r].url,
        l = (await n(c)).data,
        u = i(l),
        d = u(s[r].selector.list).find(s[r].selector.item).toArray(),
        f = u(`title`).text(),
        p = await a.ProcessFeed(d, e, s[r]);
    return { title: o.get(r).title, link: c, description: f, item: p };
}
export { s as route };
