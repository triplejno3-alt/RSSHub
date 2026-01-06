import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/:section?/:type?/:user?`,
    categories: [`programming`],
    view: r.Articles,
    example: `/hackernews/threads/comments_list/dang`,
    parameters: { section: { description: 'Content section, default to `index`' }, type: { description: 'Link type, default to `sources`' }, user: { description: 'Set user, only valid in `threads` and `submitted` sections' } },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`news.ycombinator.com/:section`, `news.ycombinator.com/`] }],
    name: `User`,
    maintainers: [`nczitzk`, `xie-dongping`],
    handler: o,
    description: `Subscribe to the content of a specific user`,
};
async function o(r) {
    let a = r.req.param(`section`) ?? `index`,
        o = r.req.param(`type`) ?? `sources`,
        s = r.req.param(`user`) ?? ``,
        c = `https://news.ycombinator.com`,
        l = a === `index` ? `` : `/${a}`,
        u = s === `` ? `` : `?id=` + s;
    a === `over` && (u = s === `` ? `?points=100` : `?points=` + s);
    let d = `${c}${l}${u}`,
        f = i((await n(d)).data),
        p = f(`.athing`)
            .slice(0, r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 30)
            .toArray()
            .map((e) => {
                e = f(e);
                let n = {
                    guid: e.attr(`id`),
                    title: e.find(`.titleline`).children(`a`).text(),
                    category: e.find(`.sitestr`).text(),
                    author: e.next().find(`.hnuser`).text(),
                    pubDate: t(e.find(`.age`).attr(`title`) ?? e.next().find(`.age`).attr(`title`)),
                    link: ``,
                    origin: e.find(`.titleline`).children(`a`).attr(`href`),
                    onStory: e.find(`.onstory`).text().slice(2),
                    comments: e.next().find(`a`).last().text().split(`\xA0comment`)[0],
                    upvotes: e.next().find(`.score`).text().split(` point`)[0],
                    currentComment: e.find(`.comment`).text(),
                    description: ``,
                };
                return (
                    (n.link = `${c}/item?id=${n.guid}`),
                    (n.guid = o === `sources` ? n.guid : `${n.guid}${n.comments === `discuss` ? `` : `-${n.comments}`}`),
                    (n.description = `<a href="${n.link}">Comments on Hacker News</a> | <a href="${n.origin}">Source</a>`),
                    n
                );
            }),
        m = await Promise.all(
            p.map((t) =>
                e.tryGet(t.guid, async () => {
                    if (t.comments !== `discuss` && o === `comments`) {
                        let e = i((await n({ method: `get`, url: t.link })).data);
                        (e(`.reply`).remove(),
                            (t.description = ``),
                            e(`.comtr`).each(function () {
                                let n = e(this).find(`.hnuser`),
                                    r = e(this).find(`.commtext`);
                                t.description += `<div><div><small><a href="${c}/${n.attr(`href`)}">${n.text()}</a></small>&nbsp&nbsp<small><a href="${c}/item?id=${e(this).attr(`id`)}">${e(this).find(`.age`).attr(`title`)}</a></small></div>`;
                                let i = r.clone();
                                (i.find(`p`).remove(),
                                    i.html(`<p>${i.text()}</p>`),
                                    i.append(
                                        r
                                            .find(`p`)
                                            .toArray()
                                            .map((t) => `<p>${e(t).html()}</p>`)
                                    ),
                                    (t.description += `<div>${i.html()}</div></div>`));
                            }));
                    } else t.comments !== `discuss` && o === `comments_list` && ((t.title = t.onStory), (t.description = t.currentComment));
                    return (Number.isNaN(t.comments) && (t.comments = 0), (t.link = o === `sources` ? t.origin : t.link), delete t.origin, t);
                })
            )
        );
    return { title: f(`title`).text(), link: d, item: m };
}
export { a as route };
