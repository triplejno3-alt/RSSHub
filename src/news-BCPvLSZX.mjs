import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/news`,
    name: `News`,
    url: `www.last-origin.com`,
    maintainers: [`gudezhi`],
    example: `/last-origin/news`,
    parameters: {},
    categories: [`game`],
    features: { supportRadar: !0 },
    radar: [{ source: [`www.last-origin.com/news.html`, `www.last-origin.com`], target: `/news` }],
    handler: o,
    description: ``,
};
async function o() {
    let a = `https://www.last-origin.com/news.html`,
        o = i(await e(a)),
        s = o(`.contents .news_wrap`)
            .toArray()
            .map((e) => ({ title: o(e).find(`.news_title`).text().trim(), link: new URL(o(e).find(`a`).attr(`href`), a).href, pubDate: r(n(o(e).find(`time`).text().trim()), 9), description: `` }));
    return { title: `LastOrigin官网公告`, link: a, item: await Promise.all(s.map((n) => t.tryGet(n.link, async () => ((n.description = i(await e(n.link))(`.news_contents_editor`).html() ?? ``), n)))) };
}
export { a as route };
