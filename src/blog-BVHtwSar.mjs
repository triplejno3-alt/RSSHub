import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import * as i from 'cheerio';
const a = {
    path: `/blog`,
    categories: [`social-media`],
    view: r.Articles,
    example: `/telegram/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`telegram.org/blog`] }],
    name: `Telegram Blog`,
    maintainers: [`fengkx`],
    handler: o,
    url: `telegram.org/blog`,
};
async function o() {
    let r = `https://telegram.org/blog`,
        a = await e(r),
        o = i.load(a),
        s = await Promise.all(
            o(`.dev_blog_card_link_wrap`)
                .toArray()
                .map((r) => {
                    let a = `https://telegram.org` + o(r).attr(`href`);
                    return t.tryGet(a, async () => {
                        let t = await e(a),
                            r = i.load(t);
                        return { title: r(`#dev_page_title`).text(), link: a, pubDate: n(r(`[property="article:published_time"]`).attr(`content`)), description: r(`#dev_page_content_wrap`).html() };
                    });
                })
        );
    return { title: o(`title`).text(), link: r, item: s };
}
export { a as route };
