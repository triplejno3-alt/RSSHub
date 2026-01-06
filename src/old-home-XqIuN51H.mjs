import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './utils-4pFOkevk.mjs';
const i = {
    path: `/old_home`,
    categories: [`game`],
    example: `/lfsyd/old_home`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.iyingdi.com/`] }],
    name: `首页（旧版）`,
    maintainers: [`auto-bot-ty`],
    handler: a,
    url: `www.iyingdi.com/`,
};
async function a(i) {
    let a = i.req.query(`limit`) ?? 10,
        o = `https://www.iyingdi.com`,
        { data: s } = await n(`${o}/feed/list/user/v3?feedIdUp=0&feedIdDown=0&hotfeed=1&system=web`);
    return {
        title: `旅法师营地 - 首页资讯（旧版）`,
        link: o,
        item: await r(
            e,
            s.feeds
                .slice(0, a)
                .map((e) => ({ title: e.feed.title, pubDate: t(e.feed.created * 1e3), link: `${o}/tz/post/${e.feed.sourceID}`, guid: e.feed.title, postId: e.feed.sourceID }))
                .filter((e) => e.title !== void 0)
        ),
    };
}
export { i as route };
