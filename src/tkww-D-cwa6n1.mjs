import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
const i = {
    path: `/:column{.+}?`,
    categories: [`traditional-media`],
    example: `/tkww/hong_kong`,
    parameters: { column: `欄目，默認為 home (首頁)` },
    features: { requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `新聞`,
    maintainers: [`quiniapiezoelectricity`],
    radar: [{ source: [`www.tkww.hk/:column`], target: `/:column` }],
    handler: a,
    description: '\n::: tip\n欄目可用`名稱`或對應網頁的`path`，\n如 `https://www.tkww.hk/hong_kong` 的欄目可以填`香港`或是`hong_kong`\n而 `https://www.tkww.hk/china/shanghai` 的欄目則需填`china/shanghai`\n:::',
};
async function a(i) {
    let a = i.req.param(`column`) ?? `home`,
        o = await t.tryGet(`https://www.tkww.hk/columns.json`, async () => await n(`https://www.tkww.hk/columns.json`), e.cache.routeExpire, !1),
        s,
        c = o.data.data;
    for (let e of a.split(`/`).filter((e) => typeof e == `string`)) ((s = c.find((t) => t.name === e || t.dirname === e)), (c = s?.children ?? []));
    if (s === void 0) throw new r(`Invalid Column: ${a}`);
    let l = await n(`https://www.tkww.hk/columns/${s.uuid}/tkww/app/stories.json`),
        u = await Promise.all(
            l.data.data.stories.map((e) =>
                t.tryGet(
                    e.url,
                    async () => (
                        (e.link = e.url),
                        (e.description = e.summary),
                        (e.pubDate = e.publishTime),
                        (e.category = []),
                        e.keywords && (e.category = [...e.category, ...e.keywords]),
                        e.tags && (e.category = [...e.category, ...e.tags]),
                        (e.category = [...new Set(e.category)]),
                        (e.description = (await n(e.jsonUrl)).data.data.content),
                        e
                    )
                )
            )
        );
    return { title: s.seoTitle, description: s.seoDescription, link: s.url, item: u };
}
export { i as route };
