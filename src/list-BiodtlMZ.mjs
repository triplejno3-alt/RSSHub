import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.zju.edu.cn/`,
    a = {
        path: `/list/:type`,
        categories: [`university`],
        example: `/zju/list/xs`,
        parameters: { type: '`xs`为学术，`xw`为新闻，`5461`是图片新闻，`578`是浙大报道，具体参数参考左侧的菜单' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `普通栏目 如学术 / 图片 / 新闻等`,
        maintainers: [`Jeason0228`],
        handler: o,
    };
async function o(a) {
    let o = i + (a.req.param(`type`) ?? `xs`) + `/list.htm`,
        s = r((await n({ method: `get`, url: o, headers: { Referer: i } })).data);
    function c(e) {
        return e.search(`redirect`) === -1 ? e : o;
    }
    let l = s(`#wp_news_w7 ul.news li`)
            .toArray()
            .map((e) => ({
                title: s(e).find(`a`).attr(`title`),
                link: c(s(e).find(`a`).attr(`href`)),
                date: s(e)
                    .text()
                    .match(/\d{4}-\d{2}-\d{2}/)[0],
            })),
        u = await Promise.all(
            l.map((a) => {
                let s = a.title,
                    c = a.date,
                    l = new URL(a.link, i).href;
                return e.tryGet(l, async () => ({ title: s, link: l, description: r((await n({ method: `get`, url: l, headers: { Referer: o } })).data)(`.right_content`).html(), pubDate: t(c) }));
            })
        );
    return { title: `浙江大学` + s(`ul.submenu .selected`).text(), link: o, item: u };
}
export { a as route };
