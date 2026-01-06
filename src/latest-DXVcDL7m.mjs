import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/latest`,
    categories: [`new-media`],
    example: `/europechinese/latest`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`europechinese.blogspot.com`] }],
    name: `最新`,
    maintainers: [`emdoe`],
    handler: i,
    url: `europechinese.blogspot.com/`,
};
async function i() {
    let r = `https://europechinese.blogspot.com/`,
        { data: i } = await t(r),
        a = n(i),
        o = a(`h3.post-title`);
    return {
        title: `歐洲動態（國際）| 最新`,
        link: r,
        item: await Promise.all(
            o.map((r, i) => {
                let o = a(i).find(`a`).text(),
                    s = a(i).find(`a`).attr(`href`);
                return e.tryGet(s, async () => {
                    let { data: e } = await t(s),
                        r = n(e);
                    (r(`div.widget-content`).remove(), r(`div.byline`).remove(), r(`div.post-sidebar`).remove());
                    let i = r(`time.published`).attr(`datetime`);
                    return { title: o, link: s, guid: s, description: r(`div.post-body-container`).html(), pubDate: i };
                });
            })
        ),
    };
}
export { r as route };
