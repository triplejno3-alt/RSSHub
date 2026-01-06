import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:id?`,
    categories: [`study`],
    example: `/cste`,
    parameters: { id: `分类，见下表，默认为 16，即通知公告` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `栏目`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 通知公告 | 学会新闻 | 科协简讯 | 学科动态 | 往事钩沉 |
| -------- | -------- | -------- | -------- | -------- |
| 16       | 18       | 19       | 20       | 21       |`,
};
async function a(i) {
    let a = i.req.param(`id`) ?? `16`,
        o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 10,
        s = `https://www.cste.org.cn`,
        c = `${s}/site/term/${a}.html`,
        l = r((await n({ method: `get`, url: c })).data),
        u = l(`a.list-group-item`)
            .slice(0, o)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`h5`).text(), link: `${s}${e.attr(`href`)}`, pubDate: t(e.find(`small`).text()) }));
    return (
        (u = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ method: `get`, url: t.link })).data);
                    return (e(`.Next`).remove(), (t.description = e(`.article`).html()), t);
                })
            )
        )),
        { title: `中国技术经济学会 - ${l(`.leftTop`).text()}`, link: c, item: u }
    );
}
export { i as route };
