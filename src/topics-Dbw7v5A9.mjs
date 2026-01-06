import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t, t as n } from './util-BzQaJ-Iy.mjs';
const r = async (e) => {
        let { id: r } = e.req.param(),
            i = Number.parseInt(e.req.query(`limit`) ?? `30`, 10),
            a = new URL(`topics/${r ?? `home`}`, n).href,
            o = new URL(`gapi/v1/${r ? `topics/${r}/recommend` : `talk-original-recommendations`}`, n).href;
        return await t(i, { 'page[limit]': i, include: `talk,talk.topic,talk.user`, 'talk-include': `topic,user` }, o, a);
    },
    i = {
        path: [`/topics/:id/recommend`, `/topics/recommend`],
        name: `机组推荐`,
        url: `www.gcores.com`,
        maintainers: [`nczitzk`],
        handler: r,
        example: `/gcores/topics/recommend`,
        parameters: { id: { description: `小组 ID，默认为空，即全部，可在对应小组页 URL 中找到` } },
        description:
            '::: tip\n若订阅 [我的年度总结](https://www.gcores.com/topics/581)，网址为 `https://www.gcores.com/topics/581`，请截取 `https://www.gcores.com/topics/` 到末尾的部分 `581` 作为 `id` 参数填入，此时目标路由为 [`/gcores/topics/581/recommend`](https://rsshub.app/gcores/topics/581/recommend)。\n:::\n',
        categories: [`game`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.gcores.com/topics/home`], target: `/gcores/topics/recommend` },
            { source: [`www.gcores.com/topics/:id`], target: `/gcores/topics/:id/recommend` },
        ],
        view: e.SocialMedia,
    };
export { r as handler, i as route };
