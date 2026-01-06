import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './desc-Bm9AybIV.mjs';
import i from 'markdown-it';
const a = i({ html: !0, linkify: !0 }),
    o = {
        path: `/datasets`,
        categories: [`programming`],
        example: `/modelscope/datasets`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`modelscope.cn/datasets`] }],
        name: `数据集`,
        maintainers: [`TonyRL`],
        handler: s,
        url: `modelscope.cn/datasets`,
    };
async function s(i) {
    let o = `https://modelscope.cn`,
        s = `${o}/datasets`,
        { data: c } = await n(`${o}/api/v1/dolphin/datasets`, { searchParams: { PageSize: i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 36, PageNumber: 1, Target: ``, Sort: `gmt_modified` } }),
        l = c.Data.map((e) => ({
            title: e.ChineseName,
            description: e.Description,
            author: e.CreatedBy,
            link: `${s}/${e.Namespace}/${e.Name}`,
            pubDate: t(e.GmtCreate, `X`),
            category: e.UserDefineTags.split(`,`),
            slug: `/${e.Namespace}/${e.Name}`,
        }));
    return {
        title: `数据集首页 · 魔搭社区`,
        description: `ModelScope——汇聚各领域先进的机器学习模型，提供模型探索体验、推理、训练、部署和应用的一站式服务。在这里，共建模型开源社区，发现、学习、定制和分享心仪的模型。`,
        image: `https://g.alicdn.com/sail-web/maas/0.8.10/favicon/128.ico`,
        link: s,
        item: await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(`${o}/api/v1/datasets${t.slug}`),
                        i = e.Data.ReadmeContent.replaceAll(/img src="(?!http)(.*?)"/g, `img src="${o}/api/v1/datasets${t.slug}/repo?Revision=master&FilePath=$1&View=true"`);
                    return ((t.description = r({ description: t.description, md: a.render(i) })), t);
                })
            )
        ),
    };
}
export { o as route };
