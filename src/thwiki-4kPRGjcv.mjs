import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import t from 'dayjs';
const n = {
    path: `/calendar/:before?/:after?`,
    categories: [`anime`],
    example: `/thwiki/calendar`,
    parameters: { before: `From how many days ago (default 30)`, after: `To how many days after (default 30)` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`thwiki.cc/`, `thwiki.cc/日程表`], target: `/calendar` }],
    name: `Calendar`,
    maintainers: [`aether17`],
    handler: r,
    url: `thwiki.cc/`,
};
async function r(n) {
    let r = n.req.param(`before`) ? Number.parseInt(n.req.param(`before`)) : 30,
        i = n.req.param(`after`) ? Number.parseInt(n.req.param(`after`)) : 30;
    return {
        title: `Touhou events calendar (THBWiki)`,
        link: `https://calendar.thwiki.cc/`,
        description: `A Touhou related events calendar api from THBWiki`,
        item: (
            await e({ method: `get`, url: `https://calendar-serverless.thwiki.cc/api/events/${t().subtract(r, `day`).format(`YYYY-MM-DD`)}/${t().add(i, `day`).format(`YYYY-MM-DD`)}`, headers: { Origin: `https://thwiki.cc` } })
        ).data.results.map((e) => ({
            title: e.title,
            author: e.title,
            category: e.type ? e.type[0] : `活动`,
            description: `${e.desc}. 开始时间: ${e.startStr}. 结束时间: ${e.endStr}.${e.type ? ` 活动类型: ` + e.type[0] : ``}`,
            guid: e.id,
            link: e.url,
        })),
    };
}
export { n as route };
