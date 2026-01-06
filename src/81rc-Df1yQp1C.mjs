import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = async (a) => {
        let { category: o = `sy/gzdt_210283` } = a.req.param(),
            s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 30,
            c = `https://81rc.81.cn`,
            l = new URL(o?.endsWith(`/`) ? `${o}/` : o, c).href,
            { data: u } = await n(l),
            d = i(u),
            f = d(`html`).prop(`lang`),
            p = d(`div.left-news ul li`)
                .slice(0, s)
                .toArray()
                .map((e) => ((e = d(e)), { title: e.find(`a`).text(), pubDate: r(t(e.find(`span`).text()), 8), link: e.find(`a`).prop(`href`), language: f }));
        p = await Promise.all(
            p.map((a) =>
                e.tryGet(a.link, async () => {
                    let { data: e } = await n(a.link),
                        o = i(e),
                        s = o(`div.txt`).html();
                    return (
                        (a.title = o(`h2`).text()),
                        (a.description = s),
                        (a.pubDate = r(t(o(`div.time span`).last().text()), 8)),
                        (a.author = o(`div.time span`).first().text()),
                        (a.content = { html: s, text: o(`div.txt`).text() }),
                        (a.language = f),
                        a
                    );
                })
            )
        );
        let m = d(`title`).text(),
            h = new URL(`template/tenant207/t582/new.jpg`, c).href;
        return { title: m, description: d(`div.time`).contents().first().text(), link: l, item: p, allowEmpty: !0, image: h, author: m.split(/-/).pop()?.trim(), language: f };
    },
    o = {
        path: `/81rc/:category{.+}?`,
        name: `中国人民解放军专业技术人才网`,
        url: `81rc.81.cn`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/81/81rc/sy/gzdt_210283`,
        parameters: { category: '分类，默认为 `sy/gzdt_210283`，即工作动态，可在对应分类页 URL 中找到' },
        description:
            '::: tip\n  若订阅 [工作动态](https://81rc.81.cn/sy/gzdt_210283)，网址为 `https://81rc.81.cn/sy/gzdt_210283`。截取 `https://81rc.81.cn/` 到末尾的部分 `sy/gzdt_210283` 作为参数填入，此时路由为 [`/81/81rc/sy/gzdt_210283`](https://rsshub.app/81/81rc/sy/gzdt_210283)。\n:::\n  ',
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`81rc.81.cn/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/81/81rc/${t ? `/${t}` : ``}`;
                },
            },
        ],
    };
export { a as handler, o as route };
