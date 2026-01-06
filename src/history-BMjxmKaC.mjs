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
    path: `/history`,
    categories: [`university`],
    example: `/ecnu/history`,
    radar: [{ source: [`history.ecnu.edu.cn`], target: `/history` }],
    name: `历史学系通知公告`,
    maintainers: [`FrozenStarrrr`, `ChiyoYuki`, `ECNU-minus`],
    handler: async () => {
        let a = `https://history.ecnu.edu.cn/`,
            o = i((await n(`${a}33433/list.htm`)).data),
            s = o(`ul.data-list2 > li`)
                .toArray()
                .map((e) => ({ pubDate: r(t(o(e).find(`span`).text()), 8), link: new URL(o(e).find(`a`).attr(`href`), a).toString(), title: o(e).find(`a`).text() }));
        return {
            title: `历史学系通知公告`,
            link: `https://history.ecnu.edu.cn/33433/list.htm`,
            item: await Promise.all(
                s.map((t) =>
                    e.tryGet(t.link, async () => {
                        let { data: e } = await n(t.link),
                            r = i(e),
                            o = r(`div.wp_articlecontent`);
                        return (
                            o.find(`img[src], a[href]`).each((e, t) => {
                                let n = r(t),
                                    i = t.tagName === `img` ? `src` : `href`,
                                    o = n.attr(i);
                                o && n.attr(i, new URL(o, a).toString());
                            }),
                            (t.description = o.html()?.trim()),
                            t
                        );
                    })
                )
            ),
        };
    },
};
export { a as route };
