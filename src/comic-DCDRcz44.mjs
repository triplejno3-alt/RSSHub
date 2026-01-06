import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
import r from 'lz-string';
let i = ``;
const a = (e) => {
        let t = 100,
            n = 0,
            r = [];
        return (
            e(`h4`).each((a, o) => {
                let s = e(o).text(),
                    c = o.next;
                for (; c && !e(c).hasClass(`chapter-list`); ) c = c.next;
                if (c)
                    for (let a of e(c).children(`ul`).toArray().toReversed())
                        for (let o of e(a).children(`li`).toArray()) {
                            let a = e(o).children(`a`),
                                c = new Date(new Date(e.pubDate) - t++ * 1e3);
                            (a.find(`em`).length > 0 && ((c = new Date(new Date(e.pubDate) - n++ * 1e3)), e.newChapterCnt++),
                                r.push({ link: new URL(a.attr(`href`), i).href, title: a.attr(`title`), pub_date: c, num: a.find(`i`).text(), category: s }));
                        }
            }),
            r
        );
    },
    o = {
        path: [`/comic/:id/:chapterCnt?`, `/:domain?/comic/:id/:chapterCnt?`],
        categories: [`anime`],
        example: `/manhuagui/comic/22942/5`,
        parameters: { id: `漫画ID`, chapterCnt: `返回章节的数量，默认为0，返回所有章节` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        radar: [{ source: [`www.mhgui.com/comic/:id/`], target: `/comic/:id` }],
        name: `漫画更新`,
        maintainers: [`MegrezZhu`],
        handler: s,
    };
async function s(o) {
    let { id: s, domain: c } = o.req.param();
    i = c === `mhgui` ? `https://www.mhgui.com` : c === `twmanhuagui` ? `https://tw.manhuagui.com` : `https://www.manhuagui.com`;
    let l = Number(o.req.param(`chapterCnt`) || 0),
        { data: u } = await t(`${i}/comic/${s}/`),
        d = n(u);
    if (d(`#__VIEWSTATE`).length > 0) {
        let e = r.decompressFromBase64(d(`#__VIEWSTATE`).val());
        e && (d(`#erroraudit_show`).replaceWith(e), d(`#__VIEWSTATE`).remove());
    }
    let f = d(`.book-title > h1`).text(),
        p = d(`#intro-all`).text(),
        m = d(`.book-cover img`).attr(`src`),
        h = /最近[于於].+更新至/;
    if (d(`.status > span`).text().indexOf(`已下架`) > 0) return { title: `看漫画 - ${f} 已下架`, link: `${i}/comic/${s}/`, description: p, item: [{ link: `${i}/comic/${s}/`, title: f, description: `已下架` }] };
    {
        ((d.pubDate = e(
            d(`.status > span`)
                .text()
                .match(h)[0]
                .replace(/最近[于於] \[/, ``)
                .replace(`] 更新至`, ``)
        )),
            (d.newChapterCnt = 0));
        let t = a(d),
            n = (e) => ({
                link: e.link,
                title: e.title,
                pubDate: e.pub_date,
                category: e.category,
                description: `
            <h1>${e.num}</h1>
            <img src='${m}' />
        `.trim(),
            }),
            r = t.map((e) => n(e)),
            o = r.length;
        return (l > 0 && (o = Math.max(l, d.newChapterCnt)), { title: `看漫画 - ${f}`, link: `${i}/comic/${s}/`, description: p, item: r.slice(0, o) });
    }
}
export { o as route };
