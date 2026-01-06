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
    path: `/roll`,
    categories: [`finance`],
    example: `/caijing/roll`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`roll.caijing.com.cn/index1.html`, `roll.caijing.com.cn/`] }],
    name: `滚动新闻`,
    maintainers: [`TonyRL`],
    handler: o,
    url: `roll.caijing.com.cn/index1.html`,
};
async function o() {
    let a = await n(`https://roll.caijing.com.cn/ajax_lists.php`, { searchParams: { modelid: 0, time: Math.random() } }),
        o = a.data.map((e) => ({ title: e.title, link: e.url.replace(`http://`, `https://`), pubDate: r(t(e.published, `MM-DD HH:mm`), 8), category: e.cat })),
        s = await Promise.all(
            o.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n(t.link)).data);
                    return (
                        (t.author = e(`.editor`).text().trim() || e(`#editor_baidu`).text().trim().replaceAll(/[()]/g, ``)),
                        (t.description = e(`.article-content`).html()),
                        (t.category = [
                            t.category,
                            ...e(`.news_keywords span`)
                                .toArray()
                                .map((t) => e(t).text()),
                        ]),
                        t
                    );
                })
            )
        );
    return { title: `滚动新闻-财经网`, image: `https://www.caijing.com.cn/favicon.ico`, link: a.url, item: s };
}
export { a as route };
