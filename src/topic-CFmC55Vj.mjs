import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r, r as i, t as a } from './utils-CAAmnNMo.mjs';
const o = {
    path: `/topic/:topicId/:isTop?`,
    categories: [`social-media`],
    example: `/zhihu/topic/19828946`,
    parameters: { topicId: `话题 id`, isTop: `仅精华，默认为否，其他值为是` },
    features: { requireConfig: [{ name: `ZHIHU_COOKIES`, description: `` }], requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.zhihu.com/topic/:topicId/:type`], target: `/topic/:topicId` }],
    name: `话题`,
    maintainers: [`xyqfer`],
    handler: s,
};
async function s(o) {
    let { topicId: s, isTop: c = !1 } = o.req.param(),
        l = `https://www.zhihu.com/topic/${s}/${c ? `top-answers` : `newest`}`,
        u = await e.tryGet(`zhihu:topic:${s}`, async () => {
            let e = `https://www.zhihu.com/topic/${s}`,
                t = `/api/v4/topics/${s}/intro?include=content.meta.content.photos`,
                r = await a(e, t),
                { data: i } = await n(`https://www.zhihu.com` + t, { headers: r });
            return i;
        }),
        d = `/api/v5.1/topics/${s}/feeds/${c ? `top_activity` : `timeline_activity`}`,
        f = await a(l, d),
        { data: p } = await n(`https://www.zhihu.com${d}`, { headers: { ...r, ...f, Referer: l } }),
        m = p.data.map(({ target: e }) => {
            let n = e.type,
                r = ``,
                a = ``,
                o = ``,
                s,
                c = ``;
            switch (n) {
                case `answer`:
                    ((r = `${e.question.title}-${e.author.name}的回答：${e.excerpt}`),
                        (a = `<strong>${e.question.title}</strong><br>${e.author.name}的回答<br/>${i(e.content)}`),
                        (o = `https://www.zhihu.com/question/${e.question.id}/answer/${e.id}`),
                        (s = t(e.updated_time * 1e3)),
                        (c = e.author.name));
                    break;
                case `question`:
                    ((r = e.title), (a = e.title), (o = `https://www.zhihu.com/question/${e.id}`), (s = t(e.created * 1e3)));
                    break;
                case `article`:
                    ((r = e.title), (a = i(e.content)), (o = e.url), (s = t(e.created * 1e3)));
                    break;
                case `zvideo`:
                    ((r = e.title),
                        (a = `${e.description}<br>
                <video controls poster="${e.video.thumbnail}" preload="metadata">
                    <source src="${e.video.playlist.fhd?.url ?? e.video.playlist.hd?.url ?? e.video.playlist.ld?.url ?? e.video.playlist.sd?.url}" type="video/mp4">
                </video>`),
                        (o = e.url),
                        (s = t(e.created_at * 1e3)));
                    break;
                default:
                    ((a = `未知类型，请点击<a href="https://github.com/DIYgod/RSSHub/issues">链接</a>提交issue`), (s = t(Date.now())));
            }
            return { title: r, description: a, author: c, pubDate: s, guid: e.id.toString(), link: o };
        });
    return { title: `知乎话题-${s}-${c ? `精华` : `讨论`}`, description: u.content.introduction, link: l, item: m };
}
export { o as route };
