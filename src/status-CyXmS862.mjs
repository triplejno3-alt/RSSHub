import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/status`,
    categories: [`new-media`],
    example: `/pingwest/status`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`pingwest.com/status`, `pingwest.com/`] }],
    name: `实时要闻`,
    maintainers: [`sanmmm`],
    handler: i,
    url: `pingwest.com/status`,
};
async function i() {
    let r = `https://www.pingwest.com`,
        i = n((await t(`${r}/api/state/list`, { searchParams: { page: 1 }, headers: { Referer: r } })).data.data.list)(`section.item`)
            .toArray()
            .map((t) => {
                let r = t.attribs[`data-t`],
                    i = n(t),
                    a = i(`.news-info`),
                    o = a.find(`.item-tag-list`).text(),
                    s = a.find(`.title`).text(),
                    c = a.find(`a`).last().attr(`href`),
                    l = a.text(),
                    u = i(`.news-img img`);
                return (
                    u.length && (u.attr(`src`, u.attr(`src`).split(`?x-`)[0]), (l += `<br>${u.parent().html()}`)),
                    { title: s || o, link: c.startsWith(`http`) ? c : `https:${c}`, description: l, pubDate: e(r, `X`), category: o }
                );
            });
    return { title: `品玩 - 实时要闻`, description: `品玩 - 实时要闻`, link: `${r}/status`, item: i };
}
export { r as route };
