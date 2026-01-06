import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:id/discussion`,
    categories: [`social-media`],
    example: `/douban/36328704/discussion`,
    parameters: { id: `书本id;默认论坛文章使用"按回应时间排序",仅第一页文章` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`book.douban.com/:id/discussion`] }],
    name: `豆瓣读书论坛`,
    maintainers: [`nightmare-mio`],
    handler: a,
};
async function a(i) {
    let a = i.req.param(`id`),
        o = `https://book.douban.com/subject`,
        { data: s } = await n(`${o}/${a}/discussion/`),
        c = r(s),
        l = c(`#posts-table>tbody>tr`)
            .toArray()
            .slice(1)
            .map((e) => {
                e = c(e);
                let n = e.find(`a`).first();
                return { title: n.attr(`title`), link: n.attr(`href`), pubDate: t(e.find(`.time`).text()), author: e.find(`a`).eq(1).text() };
            }),
        u = c(`#content>h1`).text(),
        d = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        i = r(e),
                        a = i(`#comments>.comment-item`)
                            .toArray()
                            .map((e, t) => {
                                let n = i(e),
                                    r = n.find(`.content>p`).html(),
                                    a = n.find(`.author>a`).text();
                                return `<p><div>#${t + 1}: <i>${a}</i></div><div>${r}</div></p>`;
                            })
                            .join(``);
                    return ((t.description = `${i(`#link-report>div`).eq(1).html()}<div>${a}</div>`), t);
                })
            )
        );
    return { title: u, link: `${o}/${a}/discussion`, item: d };
}
export { i as route };
