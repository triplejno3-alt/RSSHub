import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `http://news.yxrb.net`,
    o = {
        path: `/:category?`,
        categories: [`game`],
        example: `/yxrb/info`,
        parameters: { category: '分类，见下表，预设为 `info`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`news.yxrb.net/:category`, `news.yxrb.net/`], target: `/:category` }],
        name: `分类`,
        maintainers: [`TonyRL`],
        handler: s,
        description: `| 资讯 | 访谈    | 服务    | 游理游据 |
| ---- | ------- | ------- | -------- |
| info | talking | service | comments |`,
    };
async function s(o) {
    let { category: s = `info` } = o.req.param(),
        c = `${a}/${s}/`,
        l = i((await n(c)).data),
        u = l(`.channel-news .item`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`.title a`).attr(`title`), link: `${a}${e.find(`.title a`).attr(`href`)}`, author: e.find(`.author a`).text().split(`作者 : `)[1] })),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n(a.link)).data);
                    return (
                        (a.author = a.author ?? e(`.author-info .name a`).text().split(`作者 : `)[1]),
                        (a.pubDate = r(
                            t(
                                e(`.publish-time`)
                                    .first()
                                    .contents()
                                    .filter((e, t) => t.nodeType === 3)
                                    .text()
                                    .trim(),
                                `YYYY-MM-DD HH:mm:ss`
                            ),
                            8
                        )),
                        (a.description = e(`article`).html()),
                        (a.category = e(`.tags a`)
                            .toArray()
                            .map((t) => e(t).text())),
                        a
                    );
                })
            )
        );
    return { title: l(`head title`).text(), description: l(`head meta[name=description]`).attr(`content`), link: c, image: l(`.channel-img img`).attr(`src`), item: d };
}
export { o as route };
