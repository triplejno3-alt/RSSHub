import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './config-not-found-DGyG6Tbz.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = `https://zodgame.xyz`,
    u = {
        path: `/forum/:fid?`,
        categories: [`bbs`],
        example: `/zodgame/forum/13`,
        parameters: { fid: `forum id, can be found in URL` },
        features: { requireConfig: [{ name: `ZODGAME_COOKIE`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        name: `forum`,
        maintainers: [`FeCCC`],
        handler: d,
    };
async function d(a) {
    let o = a.req.param(`fid`),
        s = `${l}/api/mobile/index.php?version=4&module=forumdisplay&fid=${o}`,
        c = e.zodgame.cookie;
    if (c === void 0) throw new i(`Zodgame RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let u = (await r({ method: `get`, url: s, headers: { Cookie: c } })).data.Variables,
        d = u.forum_threadlist
            .map((e) => {
                if (!u.threadtypes.types[e.typeid]) return;
                let t = u.threadtypes.types[e.typeid];
                return { tid: e.tid, title: `[${t}] ${e.subject}`, author: e.author, link: `${l}/forum.php?mod=viewthread&tid=${e.tid}&extra=page%3D1`, category: t, pubDate: n(e.dbdateline * 1e3) };
            })
            .filter((e) => e !== void 0),
        p = await Promise.all(
            d.map((e) =>
                t.tryGet(e.tid, async () => {
                    let t = (await r({ method: `get`, url: `${l}/api/mobile/index.php?version=4&module=viewthread&tid=${e.tid}`, headers: { Cookie: c } })).data.Variables,
                        n = ``;
                    return (
                        t.thread.freemessage ? ((n += t.thread.freemessage), (n += f(t.postlist[0].message))) : (n += t.postlist[0].message),
                        {
                            title: e.title,
                            author: e.author,
                            link: e.link,
                            description: n,
                            category: e.category,
                            pubDate: e.pubDate,
                            guid: e.tid,
                            upvotes: Number.parseInt(t.thread.recommend_add, 10),
                            downvotes: Number.parseInt(t.thread.recommend_sub, 10),
                            comments: Number.parseInt(t.thread.replies, 10),
                        }
                    );
                })
            )
        );
    return { title: `${u.forum.name} - ZodGame论坛`, link: `${l}/forum.php?mod=forumdisplay&fid=${o}`, item: p };
}
const f = (e) => c(s(a, { children: [o(`br`, {}), o(`br`, {}), o(`span`, { children: e })] }));
export { u as route };
