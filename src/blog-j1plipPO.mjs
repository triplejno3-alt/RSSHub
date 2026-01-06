import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = `https://www.uber.com`,
    a = {
        path: `/blog/:compat?`,
        categories: [`blog`],
        example: `/uber/blog`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.uber.com/:language/blog/engineering`], target: `/blog` }],
        name: `Engineering`,
        maintainers: [`hulb`],
        handler: o,
        url: `www.uber.com/en-HK/blog/engineering`,
        description: `The English blog on any of Uber's regional sites (e.g., www.uber.com/en-JP/blog) is the same engineering blog provided by this route, so language selection is not supported. This route is not for the public news blog on specific regional sites (e.g., www.uber.com/ja-JP/blog).`,
        zh: {
            description: `uber的任何区域站点的英文blog（例如www.uber.com/en-JP/blog）都是相同的内容，正是本路由提供的engineering blog，因此本路由不提供语言选择；本路由不是uber在特定区域站点的公开新闻blog（例如www.uber.com/ja-JP/blog)`,
        },
    };
async function o() {
    let a = r(await e(`${i}/en-HK/blog/engineering/rss/`, { headers: { accept: `text/html` }, parseResponse: (e) => e }), { xmlMode: !0 }),
        o = await Promise.all(
            a(`item`)
                .toArray()
                .map((i) =>
                    t.tryGet(a(i).find(`link`).text(), async () => {
                        let t = r(await e(a(i).find(`link`).text(), { headers: { accept: `text/html` } }))(`script#__REDUX_STATE__`)
                                .text()
                                .trim(),
                            o = decodeURIComponent(JSON.parse(`"${t}"`)),
                            c = s(JSON.parse(o), { idKey: `id`, idValue: `BlogArticleContent`, siblingKey: `props`, childKey: `content` }).replaceAll(String.raw`\n`, ``);
                        return {
                            link: a(i).find(`link`).text(),
                            title: a(i).find(`title`).text(),
                            description: c,
                            pubDate: n(a(i).find(`pubDate`).text()),
                            category: a(i)
                                .find(`category`)
                                .toArray()
                                .map((e) => a(e).text()),
                        };
                    })
                )
        );
    return { title: `Uber Engineering Blog`, link: i + `/blog/engineering`, description: `The technology behind Uber Engineering`, item: o };
}
function s(e, t) {
    let { idKey: n = `id`, idValue: r, siblingKey: i, childKey: a } = t;
    if (Array.isArray(e))
        for (let n of e) {
            let e = s(n, t);
            if (e !== void 0) return e;
        }
    else if (e && typeof e == `object`) {
        if (e[n] === r) return e[i]?.[a];
        for (let n in e) {
            let r = s(e[n], t);
            if (r !== void 0) return r;
        }
    }
}
export { a as route };
