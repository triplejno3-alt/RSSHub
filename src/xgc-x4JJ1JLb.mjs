import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://xgc.nuist.edu.cn`,
    a = {
        path: `/xgc`,
        categories: [`university`],
        example: `/nuist/xgc`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`xgc.nuist.edu.cn/`, `xgc.nuist.edu.cn/419/list.htm`] }],
        name: `南信大学生工作处`,
        maintainers: [`gylidian`],
        handler: o,
        url: `xgc.nuist.edu.cn/`,
    };
async function o() {
    let a = i + `/419/list.htm`,
        o = r((await n(a)).data),
        s = o(`.wp_article_list .list_item`)
            .toArray()
            .map((e) => ((e = o(e)), { title: e.find(`a`).attr(`title`), link: new URL(e.find(`a`).attr(`href`), i).href, pubDate: t(e.find(`.Article_PublishDate`).text(), `YYYY-MM-DD`) }));
    return {
        title: `南信大学生工作处`,
        link: a,
        item: (
            await Promise.all(
                s.map((t) =>
                    e.tryGet(t.link, async () => {
                        let e;
                        try {
                            e = await n(t.link);
                            let i = r(e.data);
                            ((t.author = i(`.arti_metas`).find(`.arti_publisher`).text().replace(`作者：`, ``)), (t.description = i(`.entry`).html()));
                        } catch {}
                        return t;
                    })
                )
            )
        ).filter(Boolean),
    };
}
export { a as route };
