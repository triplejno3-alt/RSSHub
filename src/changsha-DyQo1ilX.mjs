import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `http://www.supplywater.com`,
    i = {
        path: `/changsha/:channelId?`,
        categories: [`forecast`],
        example: `/tingshuitz/changsha/78`,
        parameters: { channelId: `N` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `长沙市`,
        maintainers: [`shansing`],
        handler: a,
        description: `可能仅限于中国大陆服务器访问，以实际情况为准。

| channelId | 分类     |
| --------- | -------- |
| 78        | 计划停水 |
| 157       | 抢修停水 |`,
    };
async function a(i) {
    let { channelId: a = 78 } = i.req.param(),
        o = n((await t(`http://www.supplywater.com/tstz-` + a + `.aspx`)).data),
        s = o(`.mainRightBox .news-title`).text(),
        c = o(`.mainRightBox .announcements-title a`)
            .toArray()
            .map((e) => ((e = o(e)), { title: e.text().trim(), link: r + e.attr(`href`).trim() })),
        l = await Promise.all(
            c.map(async (r) => {
                let i = n((await t(r.link)).data);
                return {
                    title: r.title,
                    description: i(`.mainRightBox div:last`).html().trim(),
                    pubDate: e(i(`.mainRightBox .gxsj span:first`).text() + ` +0800`, `YYYY/M/D H:m:s ZZ`),
                    link: r.link,
                    author: i(`.mainRightBox .gxsj span:last`).text(),
                };
            })
        );
    return { title: `${s}通知 - 长沙水业集团`, link: `${r}/fuwuzhinan.aspx`, item: l };
}
export { i as route };
