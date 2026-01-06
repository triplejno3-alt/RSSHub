import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/today`,
    categories: [`new-media`],
    example: `/niaogebiji/today`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`niaogebiji.com/`, `niaogebiji.com/bulletin`], target: `` }],
    name: `今日事`,
    maintainers: [`KotoriK`],
    handler: r,
    url: `niaogebiji.com/`,
};
async function r() {
    let n = await t({ method: `post`, url: `https://www.niaogebiji.com/pc/bulletin/index`, form: { page: 1, pub_time: ``, isfromajax: 1 } });
    if (n.data.return_code !== `200`) throw Error(n.data.return_msg);
    return {
        title: `鸟哥笔记-今日事`,
        link: `https://www.niaogebiji.com/bulletin`,
        item: n.data.return_data.map((t) => ({ title: t.title, description: t.content, link: t.url, pubDate: e(t.pub_time, `X`), updated: e(t.updated_at, `X`), category: t.seo_keywords.split(`,`), author: t.user_info.nickname })),
    };
}
export { n as route };
