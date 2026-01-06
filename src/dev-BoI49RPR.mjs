import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/dev`,
    categories: [`program-update`],
    example: `/syosetu/dev`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `なろう小説 API の更新履歴`,
    url: `dev.syosetu.com`,
    maintainers: [`SnowAgar25`],
    handler: i,
    radar: [{ title: `なろう小説 API の更新履歴`, source: [`dev.syosetu.com`], target: `/dev` }],
};
async function i() {
    let r = `https://dev.syosetu.com`,
        i = n(await e(r)),
        a = i(`.c-log`),
        o = a
            .find(`dt`)
            .toArray()
            .map((e) => i(e).text().trim()),
        s = a
            .find(`dd`)
            .toArray()
            .map((e) => i(e).text().trim());
    return {
        title: `なろうデベロッパー - なろう小説 API の更新履歴`,
        link: r,
        language: `ja`,
        item: o
            .map((e, t) => ({
                date: e,
                content:
                    s[t]?.replaceAll(
                        `
`,
                        `<br>`
                    ) ?? ``,
            }))
            .filter((e) => e.content)
            .map((e) => ({ title: e.date, description: e.content, pubDate: t(e.date.replace(`/`, `-`)), guid: `syosetu:dev:${e.date}` })),
    };
}
export { r as route };
