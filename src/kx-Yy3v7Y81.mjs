import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
const r = {
    path: `/kx`,
    categories: [`new-media`],
    example: `/amz123/kx`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`amz123.com/kx`], target: `/kx` }],
    name: `AMZ123 快讯`,
    maintainers: [`defp`],
    handler: i,
    url: `amz123.com/kx`,
    view: n.Articles,
};
async function i() {
    let n = `https://www.amz123.com`,
        { data: r } = await t.post(`https://api.amz123.com/ugc/v1/user_content/forum_list`, { json: { page: 1, page_size: 12, tag_id: 0, fid: 4, ban: 0, is_new: 1 }, headers: { 'content-type': `application/json` } }),
        i = r.data.rows.map((t) => ({ title: t.title, description: t.description, pubDate: e(t.published_at * 1e3), link: `${n}/kx/${t.id}`, author: t.author?.username, category: t.tags.map((e) => e.name), guid: t.resource_id }));
    return { title: `AMZ123 快讯`, link: `${n}/kx`, item: i };
}
export { r as route };
