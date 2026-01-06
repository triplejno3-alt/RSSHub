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
    path: `/rczp`,
    categories: [`university`],
    example: `/bupt/rczp`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bupt.edu.cn/`] }],
    name: `人才招聘`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `bupt.edu.cn/`,
};
async function o() {
    let a = `https://www.bupt.edu.cn`,
        o = `${a}/rczp.htm`,
        s = i((await n({ method: `get`, url: o })).data),
        c = s(`.date-block`)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.next().text(), link: `${a}/${e.next().attr(`href`)}` })),
        l = await Promise.all(
            c.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return ((a.description = e(`.v_news_content`).html()), (a.pubDate = r(t(e(`.info span`).first().text().replace(`发布时间 : `, ``)), 8)), a);
                })
            )
        );
    return { title: s(`title`).text(), link: o, item: l };
}
export { a as route };
