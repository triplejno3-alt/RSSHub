import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t, t as n } from './util-BzQaJ-Iy.mjs';
let r = e.Articles;
const i = async (i) => {
        let { id: a, tab: o } = i.req.param(),
            s = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            c = new URL(`tags/${a}/originals${o ? `?tab=${o}` : ``}`, n).href,
            l = new URL(`gapi/v1/tags/${a}/${o ?? `originals`}`, n).href,
            u = { 'page[limit]': s, sort: `-published-at`, include: `category,user,media`, 'filter[list-all]': 1, 'filter[is-news]': o === `news` ? 1 : 0 };
        return (o === `radios` ? (r = e.Audios) : o === `videos` && (r = e.Videos), await t(s, u, l, c));
    },
    a = {
        path: `/tags/:id/:tab?`,
        name: `标签`,
        url: `www.gcores.com`,
        maintainers: [`StevenRCE0`, `nczitzk`],
        handler: i,
        example: `/gcores/tags/1/articles`,
        parameters: {
            id: { description: `标签 ID，可在对应标签页 URL 中找到` },
            tab: {
                description: `类型，默认为空，即全部，可在对应标签页 URL 中找到`,
                options: [
                    { label: `全部`, value: `` },
                    { label: `播客`, value: `radios` },
                    { label: `文章`, value: `articles` },
                    { label: `资讯`, value: `news` },
                    { label: `视频`, value: `videos` },
                ],
            },
        },
        description:
            '::: tip\n若订阅 [美国 - 文章](https://www.gcores.com/tags/1/originals?tab=articles)，网址为 `https://www.gcores.com/tags/1/originals?tab=articles`，请截取 `https://www.gcores.com/tags/` 到末尾 `/originals` 的部分 `1` 作为 `id` 参数填入，截取 `articles` 作为 `tab` 参数填入，此时目标路由为 [`/gcores/tags/1/articles`](https://rsshub.app/gcores/tags/1/articles)。\n:::\n\n| 全部 | 播客   | 文章     | 资讯 | 视频   |\n| ---- | ------ | -------- | ---- | ------ |\n|      | radios | articles | news | videos |\n',
        categories: [`game`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.gcores.com/tags/:id/originals`],
                target: (e, t) => {
                    let n = new URL(t),
                        r = e.id,
                        i = n.searchParams.get(`tab`) ?? void 0;
                    return `/gcores/tags/${r}/${i ? `/${i}` : ``}`;
                },
            },
            { title: `全部`, source: [`www.gcores.com/tags/:id/originals`], target: `/gcores/tags/:id` },
            { title: `播客`, source: [`www.gcores.com/tags/:id/originals`], target: `/gcores/tags/:id/radios` },
            { title: `文章`, source: [`www.gcores.com/tags/:id/originals`], target: `/gcores/tags/:id/articles` },
            { title: `资讯`, source: [`www.gcores.com/tags/:id/originals`], target: `/gcores/tags/:id/news` },
            { title: `视频`, source: [`www.gcores.com/tags/:id/originals`], target: `/gcores/tags/:id/videos` },
        ],
        view: r,
    };
export { i as handler, a as route };
