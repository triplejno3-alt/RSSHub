import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = async (r) => {
        let { category: a = `Industry/Comment` } = r.req.param(),
            o = Number.parseInt(r.req.query(`limit`) ?? `15`, 10),
            s = `https://www.chinaratings.com.cn`,
            c = new URL(`CreditResearch/${a.endsWith(`/`) ? a : `${a}/`}`, s).href,
            l = i(await e(c)),
            u = `zh-CN`,
            d = [];
        ((d = l(`div.contRight ul.list li`)
            .slice(0, o)
            .toArray()
            .map((e) => {
                let t = l(e),
                    r = t.find(`a`),
                    i = r.text(),
                    a = t.find(`span`).text(),
                    o = r.attr(`href`),
                    s = a;
                return { title: i, pubDate: a ? n(a) : void 0, link: o ? new URL(o, c).href : void 0, updated: s ? n(s) : void 0, language: u };
            })),
            (d = (
                await Promise.all(
                    d.map((r) =>
                        r.link
                            ? t.tryGet(r.link, async () => {
                                  let t = await e(r.link),
                                      a = i(t),
                                      o = a(`div.newshead h2, div.title h3`).text(),
                                      c = a(`div.news div.content`).html() ?? ``,
                                      l = a(`div.newshead p span, div.title p span`).text(),
                                      d = l?.match(/(\d{4}-\d{2}-\d{2})/)?.[1],
                                      f = l?.match(/来源：(.*?)/)?.[1],
                                      p = d,
                                      m = { title: o, description: c, pubDate: d ? n(d) : r.pubDate, author: f, content: { html: c, text: c }, updated: p ? n(p) : r.updated, language: u },
                                      h = t.match(/(\/upload\/docs\/\d{4}-\d{2}-\d{2}\/doc_\d+)"/)?.[1],
                                      g = h ? `${new URL(h, s).href}.pdf` : void 0;
                                  return (g && (m = { ...m, enclosure_url: g, enclosure_type: `application/pdf`, enclosure_title: o }), { ...r, ...m });
                              })
                            : r
                    )
                )
            ).filter((e) => !0)));
        let f = l(`title`).text();
        return { title: f, link: c, item: d, allowEmpty: !0, image: l(`a.logo_c`).attr(`href`) ? new URL(l(`a.logo_c`).attr(`href`), c).href : void 0, author: f.split(/-/).pop(), language: u, id: c };
    },
    o = {
        path: `/CreditResearch/:category{.+}?`,
        name: `中债研究`,
        url: `www.chinaratings.com.cn`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/chinaratings/CreditResearch`,
        parameters: { category: '分类，默认为 `Industry/Comment`，即行业评论，可在对应分类页 URL 中找到' },
        description:
            '::: tip\n若订阅 [行业评论](https://www.chinaratings.com.cn/CreditResearch/Industry/Comment/)，网址为 `https://www.chinaratings.com.cn/CreditResearch/Industry/Comment/`，请截取 `https://www.chinaratings.com.cn/CreditResearch/` 到末尾 `/` 的部分 `Industry/Comment` 作为 `category` 参数填入，此时目标路由为 [`/chinaratings/CreditResearch/Industry/Comment`](https://rsshub.app/chinaratings/CreditResearch/Industry/Comment)。\n:::\n',
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.chinaratings.com.cn/CreditResearch/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/chinaratings/CreditResearch${t ? `/${t}` : ``}`;
                },
            },
        ],
        view: r.Articles,
    };
export { a as handler, o as route };
