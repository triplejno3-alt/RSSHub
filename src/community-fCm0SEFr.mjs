import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/community/:communityUrl`,
    name: `Community Events`,
    url: `app.questn.com`,
    maintainers: [`cxheng315`],
    example: `/questn/community/gmnetwork`,
    parameters: { community_url: `Community URL` },
    categories: [`other`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`app.questn.com/:communityUrl`], target: `/community/:communityUrl` }],
    handler: r,
};
async function r(n) {
    let r = { count: n.req.query(`limit`) || `20`, page: `1`, community_url: n.req.param(`communityUrl`) || `questn` },
        i = await (await e(`https://api.questn.com/consumer/explore/entity_list/?${new URLSearchParams(r)}`, { method: `GET`, headers: { 'Content-Type': `application/json` } })).result.data,
        a = i.map((e) => ({
            title: e.title,
            link: `https://app.questn.com/quest/${e.id}`,
            author: e.community_info ? e.community_info.name : ``,
            guid: e.id,
            pubDate: t(e.start_time * 1e3),
            itunes_duration: e.end_time > 0 ? e.end_time - e.start_time : 0,
        }));
    return {
        title: `QuestN Community - ${i[0].community_info ? i[0].community_info.name : ``} Events`,
        link: `https://app.questn.com/${n.req.param(`community_url`)}`,
        description: i[0].community_info ? i[0].community_info.introduction : ``,
        image: i[0].community_info ? i[0].community_info.logo : ``,
        logo: i[0].community_info ? i[0].community_info.logo : ``,
        item: a && a.length > 0 ? a : [{ title: `No events found`, link: `https://app.questn.com/${n.req.param(`community_url`)}`, description: `No events found` }],
    };
}
export { n as route };
