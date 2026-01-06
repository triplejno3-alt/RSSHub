import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { n as r, r as i, t as a } from './utils-CAAmnNMo.mjs';
import { load as o } from 'cheerio';
const s = {
    path: `/posts/:usertype/:id`,
    categories: [`social-media`],
    example: `/zhihu/posts/people/frederchen`,
    parameters: { usertype: `作者 id，可在用户主页 URL 中找到`, id: `用户类型usertype，参考用户主页的URL。目前有两种，见下表` },
    features: { requireConfig: [{ name: `ZHIHU_COOKIES`, description: ``, optional: !0 }], requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.zhihu.com/:usertype/:id/posts`, `www.zhihu.com/:usertype/:id`] }],
    name: `用户文章`,
    maintainers: [`whtsky`, `Colin-XKL`],
    handler: c,
    description: `| 普通用户 | 机构用户 |
| -------- | -------- |
| people   | org      |`,
};
async function c(s) {
    let c = s.req.param(`id`),
        l = s.req.param(`usertype`),
        u = await t.tryGet(`zhihu:posts:profile:${c}`, async () => {
            let t = `/${l === `people` ? `people` : `org`}/${c}`,
                n = o(await e(`https://www.zhihu.com${t}`, { headers: { ...r, ...(await a(`https://www.zhihu.com/${l}/${c}/`, t)), Referer: `https://www.zhihu.com/${l}/${c}/` } }));
            return JSON.parse(n(`#js-initialData`).text())?.initialState?.entities?.users[c];
        }),
        d = `/api/v4/${l === `people` ? `members` : `org`}/${c}/articles?${new URLSearchParams({ include: `data[*].comment_count,suggest_edit,is_normal,thumbnail_extra_info,thumbnail,can_comment,comment_permission,admin_closed_comment,content,voteup_count,created,updated,upvoted_followees,voting,review_info,reaction_instruction,is_labeled,label_info;data[*].vessay_info;data[*].author.badge[?(type=best_answerer)].topics;data[*].author.vip_info;`, offset: `0`, limit: `20`, sort_by: `created` })}`,
        f = await a(`https://www.zhihu.com/${l}/${c}/posts`, d),
        p = (await e(`https://www.zhihu.com${d}`, { headers: { ...r, ...f, Referer: `https://www.zhihu.com/${l}/${c}/posts` } })).data.map((e) => ({
            title: e.title,
            description: i(e.content),
            link: `https://zhuanlan.zhihu.com/p/${e.id}`,
            pubDate: n(e.created, `X`),
            updated: n(e.updated, `X`),
            author: e.author.name,
        }));
    return { title: `${u.name} 的知乎文章`, link: `https://www.zhihu.com/${l}/${c}/posts`, description: u.headline, image: u.avatarUrl.split(`?`)[0], item: p };
}
export { s as route };
