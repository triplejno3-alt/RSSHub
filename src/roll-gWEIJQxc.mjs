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
const o = async (o) => {
        let { original: s = `false` } = o.req.param(),
            c = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`), 10) : 15,
            l = `https://www.c114.com.cn`,
            u = new URL(`news/roll.asp${s === `true` ? `?o=true` : ``}`, l).href,
            { data: d } = await n(u, { responseType: `buffer` }),
            f = i(a.decode(d, `gbk`)),
            p = f(`html`).prop(`lang`),
            m = f(`div.new_list_c`)
                .slice(0, c)
                .toArray()
                .map(
                    (e) => (
                        (e = f(e)),
                        {
                            title: e.find(`h6 a`).text(),
                            pubDate: r(t(e.find(`div.new_list_time`).text(), [`HH:mm`, `M/D`]), 8),
                            link: new URL(e.find(`h6 a`).prop(`href`), l).href,
                            author: e.find(`div.new_list_author`).text().trim(),
                            language: p,
                        }
                    )
                );
        m = await Promise.all(
            m.map((o) =>
                e.tryGet(o.link, async () => {
                    let { data: e } = await n(o.link, { responseType: `buffer` }),
                        s = i(a.decode(e, `gbk`)),
                        c = s(`h1`).text(),
                        l = s(`div.text`).html();
                    return (
                        (o.title = c),
                        (o.description = l),
                        (o.pubDate = r(t(s(`div.r_time`).text(), `YYYY/M/D HH:mm`), 8)),
                        (o.author = s(`div.author`).first().text().trim()),
                        (o.content = { html: l, text: s(`.text`).text() }),
                        (o.language = p),
                        o
                    );
                })
            )
        );
        let h = new URL(f(`div.top2-1 a img`).prop(`src`), l).href;
        return { title: f(`title`).text(), description: f(`meta[name="description"]`).prop(`content`), link: u, item: m, allowEmpty: !0, image: h, author: f(`p.top1-1-1 a`).first().text(), language: p };
    },
    s = {
        path: `/roll/:original?`,
        name: `滚动资讯`,
        url: `c114.com.cn`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/c114/roll`,
        parameters: { original: `只看原创，可选 true 和 false，默认为 false` },
        description: ``,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`c114.com.cn/news/roll.asp`],
                target: (e, t) => {
                    t = new URL(t);
                    let n = t.searchParams.get(`o`);
                    return `/roll${n ? `/${n}` : ``}`;
                },
            },
        ],
    };
export { o as handler, s as route };
