import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/series`,
    categories: [`new-media`],
    example: `/sspai/series`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sspai.com/series`] }],
    name: `最新上架付费专栏`,
    maintainers: [`HenryQW`],
    handler: i,
    url: `sspai.com/series`,
    description: `> 少数派专栏需要付费订阅，RSS 仅做更新提醒，不含付费内容.`,
};
async function i() {
    let r = (await e(`https://sspai.com/api/v1/series/tag/all/get`, { parseResponse: JSON.parse })).data.flatMap((e) =>
        e.children
            .filter((e) => e.sell_status)
            .map((e) => {
                let t = e.price / 100;
                return { id: e.id, title: `￥${t} - ${e.title}`, link: `https://sspai.com/series/${e.id}`, author: e.author.nickname };
            })
    );
    return {
        title: `少数派 -- 最新上架付费专栏`,
        link: `https://sspai.com/series`,
        description: `少数派 -- 最新上架付费专栏`,
        item: await Promise.all(
            r.map((r) =>
                t.tryGet(r.link, async () => {
                    let t = (await e(`https://sspai.com/api/v1/series/info/get?id=${r.id}&view=second`)).data,
                        i = n(`<img src="https://cdn.sspai.com/${t.banner_web}" />` + t.intro);
                    return (i(`img`).css(`max-width`, `100%`), (r.description = i.html()), r);
                })
            )
        ),
    };
}
export { r as route };
