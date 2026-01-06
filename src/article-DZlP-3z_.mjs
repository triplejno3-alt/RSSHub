import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = `https://www.dora-world.com`,
    s = {
        path: `/article/:topic/:topicId?`,
        categories: [`anime`],
        view: i.Articles,
        example: `/dora-world/article/contents`,
        parameters: {
            topic: 'Topic name, can be found in URL. For example: the topic name of [https://www.dora-world.com/movie](https://www.dora-world.com/movie) is `movie`',
            topicId: 'Topic id, can be found in URL. For example: the topic id of [https://www.dora-world.com/contents?t=197](https://www.dora-world.com/contents?t=197) is `197`',
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.dora-world.com/:topic`] }],
        name: `Article`,
        maintainers: [`AChangAZha`],
        handler: c,
    };
async function c(i) {
    let { topic: s, topicId: c = `` } = i.req.param(),
        u = c === `` ? `` : `?t=${c}`,
        d = `${o}/${s}${u}`,
        { data: f } = await n(o),
        p = a(f),
        m = JSON.parse(p(`script#__NEXT_DATA__`).text()).buildId,
        { data: h } = await n(`${o}/_next/data/${m}/${s}.json${u}`),
        g = `${h.pageProps.label_name} - ドラえもんチャンネル`,
        _ = h.pageProps.contents.map((e) => ({
            title: e.title,
            link: e.page_url.startsWith(`http`) ? e.page_url : `${o}${e.page_url}`,
            description: e.page_url.startsWith(`/contents/`) ? `` : `<p>${e.title}</p><img src="${e.image_url}" alt="">`,
            pubDate: r(t(e.publish_at), 9),
            category: e.tags.map((e) => e.name),
            guid: e.id,
        }));
    return {
        title: g,
        link: d,
        language: `ja`,
        image: `https://dora-world.com/assets/images/DORAch_web-touch-icon.png`,
        item: await Promise.all(_.map(async (t) => await e.tryGet(t.link, async () => (t.description === `` && (t.description = await l(m, t.guid)), t)))).then((e) => e.filter((e) => e !== null)),
    };
}
async function l(e, t) {
    let { data: r } = await n(`${o}/_next/data/${e}/contents/${t}.json`),
        i = a(r.pageProps.content.content)(`.main_unit`);
    return (
        i.find(`.tag`).remove(),
        i.find(`div[style="display:none"]`).remove(),
        i
            .html()
            ?.replaceAll(/<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/g, `$1（$2）`)
            ?.replaceAll(/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, ``) ?? ``
    );
}
export { s as route };
