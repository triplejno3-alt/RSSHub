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
    path: `/suzhou/doc`,
    categories: [`government`],
    example: `/gov/suzhou/doc`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.suzhou.gov.cn/szxxgk/front/xxgk_right.jsp`, `www.suzhou.gov.cn/`] }],
    name: `政府信息公开文件`,
    maintainers: [`EsuRt`],
    handler: o,
    url: `www.suzhou.gov.cn/szxxgk/front/xxgk_right.jsp`,
};
async function o() {
    let a = `https://www.suzhou.gov.cn/szxxgk/front/xxgk_right.jsp`,
        { data: o } = await n(a),
        s = i(o),
        c = s(`.tr_main_value_odd`)
            .toArray()
            .map((e) => {
                e = s(e);
                let n = e.find(`a`);
                return { title: n.attr(`title`), link: `https://www.suzhou.gov.cn${n.attr(`href`)}`, pubDate: r(t(e.find(`td:nth-child(3)`).text().trim()), 8) };
            });
    return {
        title: `苏州市政府 - 政策公开文件`,
        link: a,
        item: await Promise.all(
            c.map((a) =>
                e.tryGet(a.link, async () => {
                    let { data: e } = await n(a.link),
                        o = i(e);
                    return (
                        (a.description = o(`.article-content`).html()),
                        (a.author = o(`dd.addWidth:nth-child(3) div`).text().trim()),
                        (a.pubDate = o(`meta[name="PubDate"]`).length ? r(t(o(`meta[name="PubDate"]`).attr(`content`), `YYYY-MM-DD HH:mm:ss`), 8) : a.pubDate),
                        (a.category = o(`.OwnerDept font`)
                            .toArray()
                            .map((e) => o(e).text().trim())),
                        a
                    );
                })
            )
        ),
    };
}
export { a as route };
