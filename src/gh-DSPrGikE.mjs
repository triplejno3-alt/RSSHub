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
    path: `/beijing/bjedu/gh/:urlPath?`,
    categories: [`government`],
    example: `/gov/beijing/bjedu/gh`,
    parameters: { urlPath: '路径，默认为 `zxtzgg`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gh.bjedu.gov.cn/ghsite/:urlPath/index.html`, `gh.bjedu.gov.cn/ghsite/:urlPath`], target: `/beijing/bjedu/gh/:urlPath` }],
    name: `通用`,
    maintainers: [`TonyRL`],
    handler: o,
    description:
        '::: tip\n  路径处填写对应页面 URL 中 `https://gh.bjedu.cn/ghsite/` 和 `/index.html` 之间的字段。下面是一个例子。\n\n  若订阅 [通知公告](https://gh.bjedu.cn/ghsite/zxtzgg/index.html) 则将对应页面 URL `https://gh.bjedu.cn/ghsite/zxtzgg/index.html` 中 `https://gh.bjedu.cn/ghsite/` 和 `/index.html` 之间的字段 `zxtzgg` 作为路径填入。此时路由为 [`/gov/beijing/bjedu/gh/zxtzgg`](https://rsshub.app/gov/beijing/bjedu/gh/zxtzgg)\n:::',
};
async function o(a) {
    let { urlPath: o = `zxtzgg` } = a.req.param(),
        { data: s, url: c } = await n(`https://gh.bjedu.cn/ghsite/${o}/index.html`),
        l = i(s),
        u = l(`.content li a`)
            .toArray()
            .map(
                (e) => (
                    (e = l(e)),
                    {
                        title: e.text().trim(),
                        link: e.attr(`href`).startsWith(`http`) ? e.attr(`href`).replace(/^http:/, `https:`) : new URL(e.attr(`href`), c).href,
                        pubDate: e.prev().length ? r(t(e.prev().text().trim(), `YYYY-MM-DD`), 8) : null,
                    }
                )
            ),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    if (!a.link.endsWith(`.html`)) return a;
                    let { data: e } = await n(a.link),
                        o = i(e);
                    return (
                        (a.title = a.title.endsWith(`...`) ? o(`.con-h h1`).text().trim() : a.title),
                        (a.pubDate = r(t(o(`.con-h span`).eq(0).text().trim(), `YYYY-MM-DD HH:mm:ss`), 8)),
                        (a.author = o(`.con-h span`).eq(1).text().trim()),
                        (a.description = o(`.content_font`).html()),
                        a
                    );
                })
            )
        );
    return { title: l(`head title`).text(), link: c, item: d };
}
export { a as route };
