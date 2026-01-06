import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/cxcy/:type?`,
    categories: [`university`],
    example: `/ecnu/cxcy`,
    parameters: { type: `默认为 announcement` },
    radar: [{ source: [`cxcy.ecnu.edu.cn`], target: `/cxcy` }],
    name: `本科创新创业教育网`,
    maintainers: [`FrozenStarrrr`, `ChiyoYuki`, `ECNU-minus`],
    description: `| 通知公告     | 新闻动态     | 学科竞赛     | 常用资源     |
| ------------ | ------------ | ------------ | ------------ |
| announcement | news         | contest      | resources    |`,
    handler: async (a) => {
        let o = { announcement: { session: `通知公告`, frag: `窗口121` }, news: { session: `新闻动态`, frag: `窗口123` }, contest: { session: `学科竞赛`, frag: `窗口124` }, resources: { session: `常用资源`, frag: `窗口125` } },
            s = a.req.param(`type`) ?? `announcement`,
            c = `http://www.cxcy.ecnu.edu.cn/`,
            l = i((await n(c)).data),
            u = l(`div.limit_style1[frag="${o[s].frag}"]`)
                .find(`table > tbody > tr > td`)
                .toArray()
                .map((e) => ({ pubDate: r(t(l(e).find(`.data`).text()), 8), link: new URL(l(e).find(`a`).attr(`href`), c).toString(), title: l(e).find(`.news_title`).text() })),
            d = await Promise.all(
                u.map((t) =>
                    e.tryGet(t.link, async () => {
                        if (t.link.split(`.`).pop() === `htm`) {
                            let { data: e } = await n(t.link),
                                r = i(e),
                                a = r(`div.wp_articlecontent`).length > 0 ? r(`div.wp_articlecontent`) : r(`div.m3nEditor`);
                            return (
                                a.find(`img[src], a[href]`).each((e, t) => {
                                    let n = r(t),
                                        i = t.tagName === `img` ? `src` : `href`,
                                        a = n.attr(i);
                                    a && n.attr(i, new URL(a, c).toString());
                                }),
                                (t.description = a.html()?.trim()),
                                t
                            );
                        } else return ((t.description = `请到原网页访问`), t);
                    })
                )
            );
        return { title: o[s].session, link: c, item: d };
    },
};
export { a as route };
