import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import r from 'markdown-it';
const i = r({ html: !0, linkify: !0 }),
    a = {
        path: `/models`,
        categories: [`programming`],
        example: `/modelscope/models`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`modelscope.cn/models`] }],
        name: `模型库`,
        maintainers: [`TonyRL`],
        handler: o,
        url: `modelscope.cn/models`,
    };
async function o(r) {
    let a = `https://modelscope.cn`,
        o = `${a}/models`,
        { data: s } = await n.put(`${a}/api/v1/dolphin/models`, { json: { PageSize: r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 36, PageNumber: 1, SortBy: `GmtModified`, Target: ``, SingleCriterion: [] } }),
        c = s.Data.Model.Models.map((e) => ({
            title: e.ChineseName,
            description: e.Description,
            author: e.Organization.FullName,
            link: `${o}/${e.Path}/${e.Name}`,
            pubDate: t(e.CreatedTime, `X`),
            category: [...new Set([...e.Tasks.map((e) => e.ChineseName), ...e.Tags])],
            slug: `/${e.Path}/${e.Name}`,
        }));
    return {
        title: `模型库首页 · 魔搭社区`,
        description: `ModelScope——汇聚各领域先进的机器学习模型，提供模型探索体验、推理、训练、部署和应用的一站式服务。在这里，共建模型开源社区，发现、学习、定制和分享心仪的模型。`,
        image: `https://g.alicdn.com/sail-web/maas/0.8.10/favicon/128.ico`,
        link: o,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(`${a}/api/v1/models${t.slug}`),
                        r = e.Data.ReadMeContent.replaceAll(/img src="(?!http)(.*?)"/g, `img src="${a}/api/v1/models${t.slug}/repo?Revision=master&FilePath=$1&View=true"`);
                    return ((t.description = i.render(r)), t);
                })
            )
        ),
    };
}
export { a as route };
