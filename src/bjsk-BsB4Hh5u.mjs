import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.bjsk.org.cn`,
    a = {
        path: `/:path?`,
        categories: [`government`],
        example: `/bjsk/newslist-1394-1474-0`,
        parameters: { path: '路径，默认为 `newslist-1486-0-0`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `通用`,
        maintainers: [`TonyRL`],
        handler: o,
        description:
            '::: tip\n  路径处填写对应页面 URL 中 `https://www.bjsk.org.cn/` 和 `.html` 之间的字段。下面是一个例子。\n\n  若订阅 [社科资讯 > 社科要闻](https://www.bjsk.org.cn/newslist-1394-1474-0.html) 则将对应页面 URL `https://www.bjsk.org.cn/newslist-1394-1474-0.html` 中 `https://www.bjsk.org.cn/` 和 `.html` 之间的字段 `newslist-1394-1474-0` 作为路径填入。此时路由为 [`/bjsk/newslist-1394-1474-0`](https://rsshub.app/bjsk/newslist-1394-1474-0)\n:::',
    };
async function o(a) {
    let { path: o = `newslist-1486-0-0` } = a.req.param(),
        s = `${i}/${o}.html`,
        { data: c } = await n(s, { https: { rejectUnauthorized: !1 } }),
        l = r(c),
        u = l(`.article-list a`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.attr(`title`), link: `${i}${e.attr(`href`)}`, pubDate: t(e.find(`.time`).text(), `YYYY.MM.DD`) })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link, { https: { rejectUnauthorized: !1 } }),
                        i = r(e);
                    return (
                        (t.description = i(`.article-main`).html()),
                        (t.author = i(`.info`)
                            .text()
                            .match(/作者：(.*)\s+来源/)[1]),
                        t
                    );
                })
            )
        );
    return { title: l(`head title`).text(), link: s, image: `https://www.bjsk.org.cn/favicon.ico`, item: d };
}
export { a as route };
