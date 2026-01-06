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
    path: `/cat/:cat`,
    categories: [`new-media`],
    example: `/niaogebiji/cat/103`,
    parameters: { cat: `如 https://www.niaogebiji.com/cat/103，最后的数字就是id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`niaogebiji.com/cat/:cat`] }],
    name: `分类目录`,
    maintainers: [`cKotoriKat`],
    handler: o,
    url: `niaogebiji.com/`,
};
async function o(a) {
    let o = `https://www.niaogebiji.com/cat/${a.req.param(`cat`)}`,
        s = i((await n(o)).data),
        c = s(`h1`).text(),
        l = s(`div.articleBox.clearfix`)
            .toArray()
            .map(
                (e) => (
                    (e = s(e)),
                    {
                        title: e.find(`.articleTitle`).text().trim(),
                        description: e.find(`.articleContentInner`).text().trim(),
                        author: e.find(`.author`).text().trim(),
                        link: new URL(e.find(`a`).first().attr(`href`), o).href,
                        category: [
                            ...e
                                .find(`.art_tag`)
                                .toArray()
                                .map((e) => s(e).text().trim()),
                            c,
                        ],
                    }
                )
            ),
        u = await Promise.all(
            l.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n(a.link)).data);
                    return ((a.pubDate = r(t(e(`.writeTime3`).text().trim()), 8)), (a.description = e(`.pc_content`).html()), a);
                })
            )
        );
    return { title: s(`head title`).text(), description: s(`head meta[name="description"]`).attr(`content`), link: o, item: u };
}
export { a as route };
