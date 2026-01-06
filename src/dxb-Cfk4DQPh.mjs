import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = (e) => e.split(`.`).pop(),
    o = {
        path: `/dxb`,
        categories: [`university`],
        example: `/ecnu/dxb`,
        radar: [{ source: [`dxb.ecnu.edu.cn`], target: `/dxb` }],
        name: `地球科学学部通知公告`,
        maintainers: [`FrozenStarrrr`, `ChiyoYuki`, `ECNU-minus`],
        handler: async () => {
            let o = `https://dxb.ecnu.edu.cn/`,
                s = i((await n(`${o}18277/list.htm`)).data),
                c = s(`ul.news_list > li`)
                    .toArray()
                    .map((e) => ({ pubDate: r(t(s(e).find(`.news_meta`).text()), 8), link: new URL(s(e).find(`a`).attr(`href`), o).toString(), title: s(e).find(`a`).text() }));
            return {
                title: `地球科学学部通知公告`,
                link: `https://dxb.ecnu.edu.cn/18277/list.htm`,
                item: await Promise.all(
                    c.map((t) =>
                        e.tryGet(t.link, async () => {
                            if (a(t.link) === `htm`) {
                                let { data: e } = await n(t.link),
                                    r = i(e),
                                    a = r(`div.read`);
                                return (
                                    a.find(`img[src], a[href]`).each((e, t) => {
                                        let n = r(t),
                                            i = t.tagName === `img` ? `src` : `href`,
                                            a = n.attr(i);
                                        a && n.attr(i, new URL(a, o).toString());
                                    }),
                                    (t.description = a.html()?.trim()),
                                    t
                                );
                            } else return ((t.description = `请到原网页访问`), t);
                        })
                    )
                ),
            };
        },
    };
export { o as route };
