import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
import r from 'markdown-it';
const i = r({ html: !0, breaks: !0 }),
    a = {
        path: `/weekly/:category?`,
        categories: [`programming`],
        example: `/docschina/weekly`,
        parameters: { category: `周刊分类，见下表，默认为js` },
        name: `周刊 - JavaScript`,
        maintainers: [`daijinru`, `hestudy`],
        handler: o,
        description: `| javascript | node | react |
| ---------- | ---- | ----- |
| js         | node | react |`,
        radar: [{ source: [`docschina.org/news/weekly/js/*`, `docschina.org/news/weekly/js`, `docschina.org/`], target: `/jsweekly` }],
    };
async function o(r) {
    let { category: a = `js` } = r.req.param(),
        o = `https://docschina.org`,
        s = `${o}${`/news/weekly/${a}`}`,
        { data: c } = await t(s),
        l = n(c),
        u = l(`head title`).text(),
        d = l(`#__NEXT_DATA__`).text(),
        f = JSON.parse(d);
    return {
        title: u,
        link: s,
        item: await Promise.all(
            f?.props?.pageProps?.data?.slice(0, 10).map((n) => {
                let r = `${s}/${n.issue}`;
                return e.tryGet(r, async () => {
                    let { data: e } = await t(`${o}/_next/data/${f.buildId}/news/weekly/js/${n.issue}.json`);
                    return { title: n.title, description: i.render(e.pageProps.content), link: r, author: n.editors?.join(`,`), itunes_item_image: n.imageUrl };
                });
            }) || {}
        ),
    };
}
export { a as route };
