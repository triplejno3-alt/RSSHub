import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/chapter/:id`,
    categories: [`reading`],
    example: `/ciweimao/chapter/100043404`,
    parameters: { id: `小说 id, 可在对应小说页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`wap.ciweimao.com/book/:id`] }],
    name: `章节`,
    maintainers: [`keocheung`],
    handler: o,
};
async function o(a) {
    let o = a.req.param(`id`),
        s = Number.parseInt(a.req.query(`limit`)) || 10,
        c = `https://wap.ciweimao.com`,
        { data: l } = await n(`${c}/book/${o}`),
        u = i(l),
        d = u(`ul.catalogue-list li a`).attr(`href`),
        { data: f } = await n(`https://mip.ciweimao.com/chapter/${o}/${d.slice(d.lastIndexOf(`/`) + 1)}`),
        p = i(f)(`ul.book-chapter li a`)
            .slice(-s)
            .toArray()
            .map((e) => ((e = u(e)), { chapterLocked: e.find(`h3 i.icon-lock`).length > 0, title: e.find(`h3`).text(), pubDate: r(t(e.find(`p`).text().replace(`发布于 `, ``)), 8), link: e.attr(`href`) })),
        m = await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    if (t.chapterLocked) return t;
                    let { data: e } = await n(t.link),
                        r = i(e)(`div.read-bd`);
                    return (r.find(`span, a`).remove(), r.find(`p`).removeAttr(`class`), (t.description = r.html()), t);
                })
            )
        );
    return { title: `刺猬猫 ${u(`.book-name`).text()}`, link: `${c}/book/${o}`, description: u(`.book-desc div p`).text(), image: u(`meta[name=image]`).attr(`content`), item: m };
}
export { a as route };
