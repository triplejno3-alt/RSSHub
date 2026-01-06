import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = async (i) => {
        let { category: a = `index/tzgg` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 20,
            s = `https://www.hubu.edu.cn`,
            c = new URL(`${a}.htm`, s).href,
            { data: l } = await n(c),
            u = r(l),
            d = u(`html`).prop(`lang`),
            f = u(`div.list ul li`)
                .slice(0, o)
                .toArray()
                .map((e) => ((e = u(e)), { title: e.find(`a`).text(), pubDate: t(e.find(`span`).text()), link: new URL(e.find(`a`).prop(`href`), s).href, language: d }));
        f = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    try {
                        let { data: e } = await n(t.link),
                            i = r(e),
                            a = i(`div.con-tit h4`).text();
                        if (!a) return t;
                        let o = i(`div.v_news_content`).html();
                        ((t.title = a),
                            (t.description = o),
                            (t.category = i(`META[Name="keywords"]`)
                                .toArray()
                                .map((e) => i(e).text())),
                            (t.content = { html: o, text: i(`div.v_news_content`).text() }),
                            (t.language = d));
                    } catch {}
                    return t;
                })
            )
        );
        let p = u(`title`).text(),
            m = new URL(u(`div.logo a img`).prop(`src`), s).href;
        return { title: p, description: u(`META[Name="keywords"]`).prop(`content`), link: c, item: f, allowEmpty: !0, image: m, author: p.split(/-/).pop(), language: d };
    },
    a = {
        path: `/www/:category{.+}?`,
        name: `主页`,
        url: `hubu.edu.cn`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/hubu/www/index/tzgg`,
        parameters: { category: `分类，可在对应分类页 URL 中找到，默认为[通知公告](https://www.hubu.edu.cn/index/tzgg.htm)` },
        description:
            '::: tip\n  若订阅 [通知公告](https://www.hubu.edu.cn/index/tzgg.htm)，网址为 `https://www.hubu.edu.cn/index/tzgg.htm`。截取 `https://www.hubu.edu.cn/` 到末尾 `.htm` 的部分 `index/tzgg` 作为参数填入，此时路由为 [`/hubu/www/index/tzgg`](https://rsshub.app/hubu/www/index/tzgg)。\n:::\n\n| 通知公告   | 学术预告   |\n| ---------- | ---------- |\n| index/tzgg | index/xsyg |\n  ',
        categories: [`university`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { title: `通知公告`, source: [`hubu.edu.cn/index/tzgg.htm`], target: `/www/index/tzgg` },
            { title: `学术预告`, source: [`hubu.edu.cn/index/xsyg.htm`], target: `/www/index/xsyg` },
        ],
    };
export { i as handler, a as route };
