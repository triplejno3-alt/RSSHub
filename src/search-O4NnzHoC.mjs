import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
import r from 'node:querystring';
function i(r, i, a) {
    let o = r(`div.item-list ul li`)
        .toArray()
        .map((e) => {
            let t = r(e),
                n = t.find(`a`).first(),
                i = n.attr(`title`),
                o = a ? `${n.attr(`href`)}&adult_view=1` : n.attr(`href`),
                s = [t.find(`p.item-state`).text()],
                c = t.find(`div.item-image img`).attr(`data-src`);
            return { title: i, link: o, category: s, image: c, banner: c };
        });
    return Promise.all(
        o.map((r) =>
            t.tryGet(`${i}${r.link}`, async () => {
                let t = n(await e(`${i}${r.link}`)).html(`div.item-page`);
                return { ...r, description: t };
            })
        )
    );
}
const a = async (t) => {
        let a = `https://www.melonbooks.co.jp`,
            o = t.req.param(`query`) ?? ``,
            s = `${a}/search/search.php?${o}`,
            c = r.parse(o).adult_view === `1`;
        return { title: `搜索结果`, link: s, item: await i(n(await e(s)), a, c) };
    },
    o = {
        path: `/search/:query?`,
        categories: [`anime`],
        example: `/melonbooks/search/name=けいおん`,
        parameters: { category: `链接参数，对应网址问号后的内容，不携带问号` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        name: `搜索结果`,
        maintainers: [`cokemine`],
        description: `::: tip
如果你期望获取限制级内容，可以添加\`&adult_view=1\`参数
:::`,
        handler: a,
    };
export { a as handler, o as route };
