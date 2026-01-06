import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './utils-DBCkFkfl.mjs';
const i = {
    path: `/:configId/notifications/:fulltext?`,
    categories: [`bbs`],
    example: `/discourse/0/notifications`,
    parameters: { configId: `Environment variable configuration id, see above`, fulltext: 'Fetch the content if the notification points to a post. This is disabled by default, set it to `1` to enable it.' },
    features: { requireConfig: [{ name: `DISCOURSE_CONFIG_*`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Notifications`,
    maintainers: [],
    handler: a,
    description: '::: warning\nIf you opt to enable `fulltext` feature, consider adding `limit` parameter to your query to avoid sending too many request.\n:::',
};
async function a(i) {
    let { link: a, key: o } = r(i),
        s = (await e(`${a}/notifications.json`, { headers: { 'User-Api-Key': o } })).notifications
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 10)
            .map((e) => ({
                title: e.fancy_title ?? e.data.badge_name,
                link: `${a}/${Object.hasOwn(e.data, `badge_id`) ? `badges/${e.data.badge_id}/${e.data.badge_slug}?username=${e.data.username}` : `t/topic/${e.topic_id}/${e.post_number}`}`,
                pubDate: new Date(e.created_at),
                author: e.data.display_username ?? e.data.username,
                category: [`notification_type:${e.notification_type}`, `read:${e.read}`, `high_priority:${e.high_priority}`],
                original_post_id: e.data.original_post_id,
            }));
    i.req.param(`fulltext`) === `1` &&
        (s = await Promise.all(
            s.map((t) => {
                if (t.original_post_id) {
                    let r = `${a}/posts/${t.original_post_id}.json`;
                    return n.tryGet(r, async () => {
                        let { cooked: n } = await e(r, { headers: { 'User-Api-Key': o } });
                        return { ...t, description: n };
                    });
                } else return t;
            })
        ));
    let { about: c } = await n.tryGet(a, async () => await e(`${a}/about.json`, { headers: { 'User-Api-Key': o } }), t.cache.routeExpire, !1);
    return { title: `${c.title} - Notifications`, description: c.description, item: s, allowEmpty: !0 };
}
export { i as route };
