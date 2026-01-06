import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/latest/:language?`,
    categories: [`new-media`],
    example: `/radio-canada/latest`,
    parameters: { language: `Language, see below, English by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ici.radio-canada.ca/rci/:lang`, `ici.radio-canada.ca/`] }],
    name: `Latest News`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| Français | English | Español | 简体中文 | 繁體中文 | العربية | ਪੰਜਾਬੀ | Tagalog |
| -------- | ------- | ------- | -------- | -------- | ------- | --- | ------- |
| fr       | en      | es      | zh-hans  | zh-hant  | ar      | pa  | tl      |`,
};
async function a(i) {
    let a = await e(`https://services.radio-canada.ca/neuro/sphere/v1/rci/${i.req.param(`language`) ?? `en`}/continuous-feed?pageSize=50`),
        s = a.data.lineup.items.map((e) => ({ title: e.title, category: e.kicker, link: `https://ici.radio-canada.ca${e.url}`, pubDate: n(e.date) })),
        c = await Promise.all(
            s.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link)),
                        i = t(`script:contains("window._rcState_ = ")`)
                            .text()
                            .match(/window\._rcState_ = (.*);/)?.[1];
                    return ((n.description = i ? o(i) : (t(`div[data-testid="newsStoryMedia"]`).html() ?? ``) + (t(`article > main`).html() ?? ``)), n);
                })
            )
        );
    return { title: a.meta.title, link: a.metric.metrikContent.omniture.url, item: c };
}
const o = (e) => {
    let t = JSON.parse(e),
        n = Object.values(t?.pages?.pages ?? {})[0],
        r = n?.data?.newsStory?.headerMultimediaItem?.picture,
        i = `<figure><picture><img src="${r?.pattern ? r?.pattern.replace(`/q_auto,w_{width}`, ``).replace(`{ratio}`, `16x9`) : ``}" alt="${r?.alt ?? ``}"></picture><figcaption>${r?.legend ?? ``}</figcaption></figure>`,
        a = n?.data?.newsStory?.primer?.replaceAll(String.raw`\n`, ``) ?? ``,
        o = n?.data?.newsStory?.body?.html?.replaceAll(String.raw`\n`, ``) ?? ``;
    for (let [e, t] of (n?.data?.newsStory?.body?.attachments ?? []).entries()) {
        let n = `<!--body:attachment:${e}-->`,
            r = t?.picture,
            i = r?.pattern ? r?.pattern.replace(`/q_auto,w_{width}`, ``).replace(`{ratio}`, t?.dimensionRatio ?? `16x9`) : ``;
        o = o.replace(n, `<figure><picture><img src="${i}" alt="${r?.alt ?? ``}"></picture><figcaption>${r?.legend ?? ``}</figcaption></figure>`);
    }
    return i + a + o;
};
export { i as route };
