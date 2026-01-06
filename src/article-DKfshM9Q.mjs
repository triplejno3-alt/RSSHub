import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/article/:id`,
    name: `章节`,
    url: `m.51read.org`,
    maintainers: [`lazwa34`],
    example: `/51read/article/152685`,
    parameters: { id: `小说 id, 可在对应小说页 URL 中找到` },
    categories: [`reading`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [
        { source: [`m.51read.org/xiaoshuo/:id`], target: `/article/:id` },
        { source: [`51read.org/xiaoshuo/:id`], target: `/article/:id` },
    ],
    handler: i,
};
async function i(t) {
    let { id: r } = t.req.param(),
        i = `https://m.51read.org/xiaoshuo/${r}`,
        o = n(await e(i)),
        s = `https://m.51read.org/zhangjiemulu/${r}`,
        c = n(await e(s))(`.ml-page select`)
            .find(`option`)
            .toArray()
            .map((e) => e.attribs.value).length,
        l = await a(s, c);
    return { title: o(`h1`).text(), description: o(`.bi-cot p`).text(), link: i, item: l, image: o(`.bi-img img`).attr(`src`), author: o(`.bi-wt a`).text(), language: `zh-cn` };
}
const a = async (t, r) => {
        let i = n(await e(`${t}/${r}`));
        return await Promise.all(
            i(`.kb-jp li>a`)
                .toArray()
                .map((e) => o(e.attribs.href))
                .toReversed()
        );
    },
    o = (r) =>
        t.tryGet(r, async () => {
            let t = n(await e(r));
            return { title: t(`h1`).text(), description: t(`.kb-cot`).html() || ``, link: r };
        });
export { r as route };
