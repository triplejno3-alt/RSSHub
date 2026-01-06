import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { a as r, i, n as a, r as o, t as s } from './utils-ZRidU4UZ.mjs';
const c = {
    path: `/bbs/board/:boardId`,
    categories: [`bbs`],
    example: `/dxy/bbs/board/46`,
    parameters: { specialId: `板块 ID，可在对应板块页 URL 中找到` },
    name: `板块`,
    maintainers: [`TonyRL`],
    radar: [
        { source: [`www.dxy.cn/bbs/newweb/pc/category/:boardIdId`], target: `/bbs/board/:boardIdId` },
        { source: [`3g.dxy.cn/bbs/board/:boardIdId`], target: `/bbs/board/:boardIdId` },
    ],
    handler: l,
};
async function l(c) {
    let { boardId: l } = c.req.param(),
        { limit: u = `20` } = c.req.query(),
        d = await n.tryGet(`dxy:board:detail:${l}`, async () => {
            let t = { boardId: l, timestamp: Date.now(), noncestr: s(8, `number`) },
                n = await e(`${o}/bbsapi/bbs/board/detail`, { query: { ...t, sign: i(t) } });
            if (n.code !== `success`) throw Error(n.message);
            return n.data;
        }),
        f = (
            await n.tryGet(
                `dxy:board:list:${l}`,
                async () => {
                    let t = { boardId: l, postType: `0`, orderType: `1`, pageNum: `1`, pageSize: u, timestamp: Date.now(), noncestr: s(8, `number`) },
                        n = await e(`${o}/bbsapi/bbs/board/post/list`, { query: { ...t, sign: i(t) } });
                    if (n.code !== `success`) throw Error(n.message);
                    return n.data;
                },
                t.cache.routeExpire,
                !1
            )
        ).result.map((e) => ({ title: e.subject, author: e.postUser.nickname, category: [d.title], link: `${r}/bbs/newweb/pc/post/${e.postId}`, postId: e.postId })),
        p = await Promise.all(f.map((e) => a(e, n.tryGet)));
    return { title: d.title, description: `${d.postCount} 內容 ${d.followCount} 关注`, link: `${r}/bbs/newweb/pc/category/${l}`, image: d.boardAvatar, item: p };
}
export { c as route };
