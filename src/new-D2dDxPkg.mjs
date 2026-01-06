import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/new`,
    categories: [`reading`],
    example: `/literotica/new`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`literotica.com/`] }],
    name: `New Stories`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `literotica.com/`,
};
async function a() {
    let i = `https://www.literotica.com/stories/new_submissions.php`,
        a = r((await n({ method: `get`, url: i })).data),
        o = a(`.b-46t`)
            .toArray()
            .map((e) => {
                e = a(e);
                let n = e.find(`.p-48y`);
                return {
                    title: n.text(),
                    link: n.attr(`href`),
                    category: e.nextAll().eq(3).text().replaceAll(/\(|\)/g, ``).trim(),
                    pubDate: t(e.nextAll().eq(4).text().trim(), `MM/DD/YY`),
                    author: e
                        .nextAll()
                        .eq(2)
                        .text()
                        .replace(/Submitted by/, ``)
                        .trim(),
                };
            }),
        s = await Promise.all(o.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n({ method: `get`, url: t.link })).data)(`.aa_ht`).html()), t))));
    return { title: a(`title`).text(), link: i, item: s };
}
export { i as route };
