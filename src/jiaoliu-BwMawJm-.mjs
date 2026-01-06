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
    path: `/jiaoliu`,
    categories: [`university`],
    example: `/ecnu/jiaoliu`,
    radar: [{ source: [`www.jiaoliu.ecnu.edu.cn`], target: `/jiaoliu` }],
    name: `本科生交流通知`,
    maintainers: [`FrozenStarrrr`, `ChiyoYuki`, `ECNU-minus`],
    handler: async () => {
        let a = `http://www.jiaoliu.ecnu.edu.cn/`,
            o = i((await n(`${a}11184/list.htm`)).data),
            s = o(`#wp_news_w3 > table > tbody > tr`)
                .toArray()
                .map((e) => ({ pubDate: r(t(o(e).find(`div[style="white-space:nowrap"]`).text()), 8), link: new URL(o(e).find(`a`).attr(`href`), a).toString(), title: o(e).find(`a`).text() }));
        return {
            title: `本科生交流通知`,
            link: a,
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
