import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = {
    path: `/user/:id`,
    categories: [`social-media`],
    example: `/keep/user/556b02c1ab59390afea671ea`,
    parameters: { id: `Keep 用户 id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gotokeep.com/users/:id`] }],
    name: `运动日记`,
    maintainers: [`Dectinc`, `DIYgod`],
    handler: o,
};
async function o(t) {
    let n = t.req.param(`id`),
        r = await e(`https://api.gotokeep.com/social/v3/people/${n}/home`, { headers: { Referer: `https://show.gotokeep.com/users/${n}` } });
    if (r.data.entries.length === 0) throw Error(`该用户运动日记为空`);
    let i = r.data.entries.flatMap((e) =>
        e.entries.map((e) => {
            let t = [];
            e.images ? (t = e.meta.picture ? [e.meta.picture, ...e.images] : e.images) : e.meta.picture && (t = [e.meta.picture]);
            let n = Math.floor(e.meta.secondDuration / 60),
                r = e.meta.secondDuration - n * 60;
            return { title: e.meta.title.trim(), pubDate: e.created, link: `https://show.gotokeep.com/entries/${e.id}`, author: e.author.username, description: s(e, n, r, t) };
        })
    );
    return { title: `${i[0].author} 的 Keep 动态`, link: `https://show.gotokeep.com/users/${n}`, language: `zh-cn`, item: i };
}
const s = (e, t, r, a) => i(n(c, { item: e, minute: t, second: r, images: a })),
    c = ({ item: e, minute: i, second: a, images: o }) =>
        r(t, {
            children: [
                `项目：`,
                e.meta.name === e.meta.workoutName ? e.meta.name : `${e.meta.name} - ${e.meta.workoutName}`,
                n(`br`, {}),
                `时长：`,
                i,
                `分`,
                a,
                `秒`,
                e.content ? r(t, { children: [n(`br`, {}), `备注：`, e.content] }) : null,
                o ? r(t, { children: [n(`br`, {}), o.map((e) => n(`img`, { src: e }))] }) : null,
            ],
        });
export { a as route };
