import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './utils-AQwzBfkP.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/subject/:id`,
    categories: [`finance`],
    view: r.Articles,
    example: `/gelonghui/subject/4`,
    parameters: { id: `主题编号，可在主题页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gelonghui.com/subject/:id`] }],
    name: `主题文章`,
    maintainers: [`nczitzk`],
    handler: s,
};
async function s(r) {
    let o = r.req.param(`id`),
        s = `https://www.gelonghui.com/api/subjects/${o}/contents`,
        { data: c } = await n(`https://www.gelonghui.com/subject/${o}`),
        { data: l } = await n(s, { searchParams: { isChoice: !1 } }),
        u = a(c),
        d = l.result.map((e) => ({ title: e.title, description: e.summary, link: e.link, author: e.source, pubDate: t(e.timestamp, `X`) })),
        f = await Promise.all(d.map((t) => i(t, e.tryGet)));
    return {
        title: `格隆汇 - 主题 ${u(`span.user-nick`).text()} 的文章`,
        description: u(`div.user-name`).parent().children(`p`).text(),
        image: u(`.subject-list-title`).find(`img`).attr(`data-src`),
        link: `https://www.gelonghui.com/subject/${o}`,
        item: f,
    };
}
export { o as route };
