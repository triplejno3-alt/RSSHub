import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/platform-tools-releases`,
    categories: [`program-update`],
    example: `/android/platform-tools-releases`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`developer.android.com/studio/releases/platform-tools`, `developer.android.com/`] }],
    name: `SDK Platform Tools release notes`,
    maintainers: [`nczitzk`],
    handler: i,
    url: `developer.android.com/studio/releases/platform-tools`,
};
async function i() {
    let r = `https://developer.android.com/studio/releases/platform-tools`,
        i = n((await t({ method: `get`, url: r, headers: { cookie: `signin=autosignin` } })).data);
    (i(`.hide-from-toc`).remove(), i(`.devsite-dialog, .devsite-badge-awarder, .devsite-hats-survey`).remove());
    let a = i(`h4`)
        .toArray()
        .map((t) => {
            t = i(t);
            let n = t.attr(`data-text`),
                a = ``;
            return (
                t.nextUntil(`h4`).each(function () {
                    a += i(this).html();
                }),
                { title: n, description: a, link: `${r}#${t.attr(`id`)}`, pubDate: e(n.match(/\((.*)\)/)[1], `MMMM YYYY`) }
            );
        });
    return { title: i(`title`).text(), link: r, item: a };
}
export { r as route };
