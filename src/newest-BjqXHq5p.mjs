import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as n } from './fetch-article-BZoaP0pr.mjs';
const r = {
    path: `/newest`,
    categories: [`new-media`],
    example: `/twreporter/newest`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`twreporter.org/`] }],
    name: `最新`,
    maintainers: [`emdoe`],
    handler: i,
    url: `twreporter.org/`,
};
async function i() {
    let r = (await e(`https://go-api.twreporter.org/v2/index_page`)).data.latest_section;
    return {
        title: `報導者 | 最新`,
        link: `https://www.twreporter.org`,
        item: await Promise.all(
            r.map((e) => {
                let r = e.title;
                return t.tryGet(e.slug, async () => {
                    let t = await n(e.slug);
                    return ((t.title = r), t);
                });
            })
        ),
    };
}
export { r as route };
