import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
const i = {
    path: `/channel/:id`,
    categories: [`multimedia`],
    example: `/qingting/channel/293411`,
    parameters: { id: `专辑id, 可在专辑页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `专辑`,
    maintainers: [`nczitzk`, `pseudoyu`],
    handler: a,
};
async function a(i) {
    let a = await e(`https://i.qingting.fm/capi/v3/channel/${i.req.param(`id`)}`),
        o = a.data.title;
    a = await e(`https://i.qingting.fm/capi/channel/${i.req.param(`id`)}/programs/${a.data.v}?curpage=1&order=asc`);
    let s = a.data.programs.map((e) => ({ title: e.title, link: `https://www.qingting.fm/channels/${i.req.param(`id`)}/programs/${e.id}/`, pubDate: r(n(e.update_time), 8) }));
    return {
        title: `${o} - 蜻蜓FM`,
        link: `https://www.qingting.fm/channels/${i.req.param(`id`)}`,
        item: await Promise.all(s.map((n) => t.tryGet(n.link, async () => ((a = await e(n.link)), (n.description = JSON.parse(a.match(/},"program":(.*?),"plist":/)[1]).richtext), n)))),
    };
}
export { i as route };
