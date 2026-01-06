import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/news`,
    name: `公告`,
    url: `www.j-test.com`,
    maintainers: [`kuhahku`],
    example: `/j-test/news`,
    parameters: {},
    categories: [`study`],
    features: { supportRadar: !0 },
    radar: [{ source: [`www.j-test.com`], target: `/news` }],
    handler: o,
    description: ``,
};
async function o() {
    let a = `http://www.j-test.com`,
        o = i(await e(a)),
        s = o(`#content1 > .center > .col_box1 > .col_body1 > ul > li`)
            .toArray()
            .map((e) => {
                let [t, i] = o(e).text().trim().replaceAll(`]`, ``).split(` [`);
                return { title: t, link: new URL(o(e).children(`a`).attr(`href`), a).href, pubDate: r(n(i), 8), description: `` };
            });
    return { title: `实用日本语鉴定考试（J.TEST）公告`, link: a, item: await Promise.all(s.map((n) => t.tryGet(n.link, async () => ((n.description = i(await e(n.link))(`.content > table`).html() ?? ``), n)))) };
}
export { a as route };
