import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
        path: `/open/vip`,
        categories: [`study`],
        example: `/163/open/vip`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`vip.open.163.com/`] }],
        name: `精品课程`,
        maintainers: [`hoilc`],
        handler: d,
        url: `vip.open.163.com/`,
    },
    u = (e, t) => {
        let n = e.movieChapterList.length ? e.movieChapterList : e.audioChapterList;
        return s(
            a(r, {
                children: [
                    n?.length
                        ? i(`div`, { class: `toc`, children: n.map((e, t) => a(r, { children: [a(`h3`, { children: [`第`, t + 1, `章 `, e.title] }), e.contentList.map((e, t) => a(`h4`, { children: [t + 1, ` `, e.title] }))] })) })
                        : null,
                    t ? i(r, { children: c(t) }) : null,
                ],
            })
        );
    };
async function d() {
    let r = `https://vip.open.163.com`,
        i = o((await n(r)).data),
        a = JSON.parse(
            i(`script`)
                .text()
                .match(/window\.__INITIAL_STATE__=(.*);\(function\(\){var/)[1]
        ),
        s = Object.values(a.courseindex.myModules).flatMap((e) =>
            e.contents.map((n) => ({ title: `${n.title} - ${n.subtitle}`, author: n.authorName, pubDate: t(n.publishTime, `x`), link: `${r}/courses/${n.courseUid}/`, courseUid: n.courseUid, category: e.name }))
        );
    return {
        title: `网易公开课 - 精品课程`,
        link: r,
        item: await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    let {
                            data: { data: e },
                        } = await n.post(`${r}/open/trade/pc/course/getCourseInfo.do`, { form: { courseUid: t.courseUid, version: 1 } }),
                        i = o(e.courseInfo.description, null, !1);
                    return (
                        i(`img`).each((e, t) => {
                            ((t.attribs.src = t.attribs.src.split(`?`)[0]), delete t.attribs.width);
                        }),
                        (t.category = [t.category, e.courseInfo.firstClassifyName, e.courseInfo.secondClassifyName]),
                        (t.description = u(e, i.html())),
                        t
                    );
                })
            )
        ),
    };
}
export { l as route };
