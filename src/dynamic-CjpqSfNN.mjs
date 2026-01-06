import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/dynamic/:id`,
    categories: [`programming`],
    example: `/juejin/dynamic/3051900006845944`,
    parameters: { id: `用户 id, 可在用户页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`juejin.cn/user/:id`] }],
    name: `用户动态`,
    maintainers: [`CaoMeiYouRen`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`id`),
        i = (await e(`https://api.juejin.cn/user_api/v1/user/dynamic`, { query: { user_id: r, cursor: 0 } })).data.list,
        a = i[0].user,
        o = a.user_name,
        s = i.map((e) => {
            let { target_type: n, target_data: r, action: i, time: a } = e,
                s,
                c,
                l,
                u,
                d,
                f;
            switch (n) {
                case `short_msg`: {
                    let { msg_Info: e, author_user_info: n, msg_id: a, topic: p } = r,
                        { content: m, pic_list: h, ctime: g } = e;
                    s = m;
                    let _ = h.map((e) => `<img src="${e}"><br>`).join(``);
                    ((c = `${m.replaceAll(
                        `
`,
                        `<br>`
                    )}<br>${_}`),
                        (l = t(Number(g) * 1e3)),
                        (u = n.user_name),
                        (d = `https://juejin.cn/pin/${a}`),
                        (f = p.title),
                        i === 3 && ((s = `${o} 赞了这篇沸点//@${u}：${s}`), (c = `${o} 赞了这篇沸点//@${u}：${c}`)));
                    break;
                }
                case `article`: {
                    let { article_id: e, article_info: n, author_user_info: a, tags: p } = r,
                        { ctime: m, brief_content: h } = n;
                    ((s = n.title),
                        (c = h),
                        (l = t(Number(m) * 1e3)),
                        (u = a.user_name),
                        (d = `https://juejin.cn/post/${e}`),
                        (f = [...new Set([r.category.category_name, ...p.map((e) => e.tag_name)])]),
                        i === 1 && (s = `${o} 赞了这篇文章//@${u}：${s}`));
                    break;
                }
                case `user`: {
                    let { user_name: e, user_id: n } = r;
                    ((s = `${o} 关注了 ${e}`), (c = `${e}<br>简介：${r.description}`), (u = e), (d = `https://juejin.cn/user/${n}`), (l = t(a * 1e3)));
                    break;
                }
                case `tag`: {
                    let { tag_name: e } = r;
                    ((s = `${o} 关注了标签 ${e}`), (c = e), (f = [e]), (d = `https://juejin.cn/tag/${encodeURIComponent(e)}`), (l = t(a * 1e3)));
                    break;
                }
                default:
                    break;
            }
            return { title: s, description: c, pubDate: l, author: u, link: d, category: f, guid: d };
        });
    return { title: `掘金用户动态-${o}`, link: `https://juejin.cn/user/${r}/`, description: a.description || `掘金用户动态-${o}`, image: a.avatar_large, item: s, author: o };
}
export { n as route };
