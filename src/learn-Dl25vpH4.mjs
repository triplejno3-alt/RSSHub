import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
        path: `/learn`,
        categories: [`programming`],
        example: `/modelscope/learn`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.modelscope.cn/learn`] }],
        name: `研习社`,
        maintainers: [`TonyRL`],
        handler: a,
        url: `www.modelscope.cn/learn`,
    },
    r = new Set([`data-type`, `ind`, `jc`, `list`, `metadata`, `newcode`, `spacing`, `subtype`, `sz`, `szunit`, `uuid`]);
function i(e) {
    if (typeof e == `string`) return e;
    if (Array.isArray(e)) {
        let t = e[0],
            n = e[1] || {},
            a = e.slice(2);
        return `<${t} ${Object.keys(n)
            .filter((e) => !r.has(e))
            .map((e) => `${e}="${n[e]}"`)
            .join(` `)}>${a.map((e) => i(e)).join(``)}</${t}>`;
    }
    return ``;
}
async function a(n) {
    let r = `https://www.modelscope.cn`,
        a = (
            await e(`${r}/api/v1/dolphin/articles`, {
                method: `POST`,
                body: { PageNumber: 1, PageSize: n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`)) : 18, Type: 2, Sort: `gmt_modified`, Query: ``, ExcludeIds: [1558, 1436, 881, 399, 1129], IsCourse: [0, 1] },
            })
        ).Data.Articles.map((e) => ({
            title: e.Title,
            description:
                (e.Content
                    ? i(JSON.parse(e.Content))
                    : JSON.parse(e.CourseInfo)
                          .map((e) => e.Content && i(JSON.parse(e.Content)))
                          .join(``)) || e.Desc,
            author: e.CreatedBy,
            link: `${r}/learn/${e.Id}`,
            pubDate: t(e.GmtCreated, `X`),
            updated: t(e.GmtModified, `X`),
            category: [...new Set([...JSON.parse(e.Domains), ...JSON.parse(e.Subjects)])],
            image: e.ImageUrl,
        }));
    return {
        title: `研习社 · 魔搭社区`,
        description: `ModelScope——汇聚各领域先进的机器学习模型，提供模型探索体验、推理、训练、部署和应用的一站式服务。在这里，共建模型开源社区，发现、学习、定制和分享心仪的模型。`,
        image: `https://g.alicdn.com/sail-web/maas/0.8.10/favicon/128.ico`,
        link: `${r}/learn`,
        item: a,
    };
}
export { n as route };
