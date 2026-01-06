import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './auth-CxuQ4hiC.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/xhu/zhuanlan/:id`,
    categories: [`social-media`],
    example: `/zhihu/xhu/zhuanlan/githubdaily`,
    parameters: { id: `专栏 id, 可在专栏主页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`zhuanlan.zhihu.com/:id`], target: `/zhuanlan/:id` }],
    name: `xhu- 专栏`,
    maintainers: [`JimenezLi`],
    handler: a,
};
async function a(i) {
    let a = await n.getCookie(i),
        o = i.req.param(`id`),
        s = `https://www.zhihu.com/column/${o}`,
        c = await t({ method: `get`, url: `https://api.zhihuvvv.workers.dev/columns/${o}`, headers: { Referer: `https://api.zhihuvvv.workers.dev`, Cookie: a } }),
        l = (await t({ method: `get`, url: `https://api.zhihuvvv.workers.dev/columns/${o}/articles?limit=20&offest=0`, headers: { Referer: `https://api.zhihuvvv.workers.dev`, Cookie: a } })).data.data;
    return {
        title: `知乎专栏-${c.data.title}`,
        description: c.data.description,
        link: s,
        item: l.map((t) => {
            let n = ``;
            if (t.content) {
                let e = r(t.content);
                (e(`img`).css(`max-width`, `100%`), (n = e.html()));
            }
            let i = ``,
                a = ``,
                o = ``,
                s;
            switch (t.type) {
                case `article`:
                    ((i = t.title), (a = t.url), (o = t.author.name), (s = e(t.created * 1e3)));
                    break;
                case `answer`:
                    ((i = t.question.title), (o = t.question.author ? t.question.author.name : ``), (a = `https://www.zhihu.com/question/${t.question.id}/answer/${t.id}`), (s = e(t.created_time * 1e3)));
                    break;
                case `zvideo`:
                    ((i = t.title),
                        (a = `https://www.zhihu.com/zvideo/${t.id}`),
                        (o = t.author.name),
                        (s = e(t.created_at * 1e3)),
                        (n = t.description ? `${t.description} <br> <br> <a href="${a}">视频内容请跳转至原页面观看</a>` : `<a href="${a}">视频内容请跳转至原页面观看</a>`));
                    break;
                default:
                    throw Error(`Unknown type: ${t.type}`);
            }
            return { title: i, description: n, author: o, pubDate: s, guid: a, link: a };
        }),
    };
}
export { i as route };
