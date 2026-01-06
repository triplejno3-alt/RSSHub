import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.nowcoder.com`,
    o = {
        path: `/experience/:tagId`,
        categories: [`bbs`],
        example: `/nowcoder/experience/639?order=3&companyId=665&phaseId=0`,
        parameters: { tagId: `职位id [🔗查询链接](https://www.nowcoder.com/profile/all-jobs)复制打开` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`nowcoder.com/`], target: `/experience` }],
        name: `面经`,
        maintainers: [`huyyi`],
        handler: s,
        url: `nowcoder.com/`,
        description: `可选参数：

  -   companyId：公司 id，[🔗查询链接](https://www.nowcoder.com/discuss/tag/exp), 复制打开
  -   order：3 - 最新；1 - 最热
  -   phaseId：0 - 所有；1 - 校招；2 - 实习；3 - 社招`,
    };
async function s(o) {
    let s = new URLSearchParams(o.req.query());
    s.append(`tagId`, o.req.param(`tagId`));
    let c = new URL(`/discuss/experience/json`, a);
    c.search = s;
    let l = (await n.get(c.toString())).data.data.discussPosts.map((e) => ({ title: e.postTitle, link: new URL(`discuss/` + e.postId, a).href, author: e.author, pubDate: r(t(e.createTime), 8), category: e.postTypeName })),
        u = await Promise.all(l.map((t) => e.tryGet(t.link, async () => ((t.description = i((await n.get(t.link)).data)(`.nc-post-content`).html()), t))));
    return { title: `牛客面经Tag${o.req.param(`tagId`)}`, link: c.href, item: u };
}
export { o as route };
