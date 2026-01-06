import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/`,
    categories: [`new-media`],
    example: `/my-formosa`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`my-formosa.com/`] }],
    name: `首页`,
    maintainers: [`dzx-dzx`],
    handler: s,
    url: `my-formosa.com`,
};
function o(t) {
    return e(t, { responseType: `arrayBuffer` }).then((e) => new TextDecoder(`big5`).decode(e));
}
async function s() {
    let e = `http://www.my-formosa.com/`,
        a = i(await o(e)),
        s = await Promise.all(
            a(`#featured-news h3 a`)
                .toArray()
                .map((s) => {
                    s = a(s);
                    let c = s.text(),
                        l = new URL(s.attr(`href`), e).href;
                    return t.tryGet(l, async () => {
                        let e = i(await o(l)),
                            t = /^\/TV/.test(new URL(l).pathname);
                        return {
                            title: c,
                            link: l,
                            author: e(`.page-header~#featured-news h4`).text(),
                            category: e(`meta[name='keywords']`).attr(`content`).split(`,`).filter(Boolean),
                            pubDate: r(n((t ? e(`.icon-calendar`)[0].next.data : e(`.date`).text()).trim()), 8),
                            description: (t ? e(`.post-item`).html() : e(`.body`).html()).replaceAll(/\/News.*?\.jpg/g, (e) => `http://my-formosa.com${e}`),
                        };
                    });
                })
        );
    return { title: a(`title`).text(), link: e, item: s };
}
export { a as route };
