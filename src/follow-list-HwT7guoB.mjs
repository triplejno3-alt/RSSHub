import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './description-ysUMLo8r.mjs';
import { t as n } from './cache-Cs0MoOSc.mjs';
const r = {
    path: `/bbs/follow-list/:uid`,
    categories: [`game`],
    example: `/mihoyo/bbs/follow-list/77005350`,
    parameters: { uid: `用户uid` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `米游社 - 用户关注`,
    maintainers: [`CaoMeiYouRen`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`uid`),
        a = { gids: 2, uid: i, page_size: r.req.query(`limit`) || `20` },
        o = `https://www.miyoushe.com/ys/accountCenter/followList?id=${i}`,
        s = (await e({ method: `get`, url: `https://bbs-api.miyoushe.com/user/wapi/following`, searchParams: a, headers: { Origin: `https://www.miyoushe.com`, Referer: o } }))?.data?.data?.result;
    if (!s) throw Error(`未获取到数据！`);
    let { nickname: c } = await n.getUserFullInfo(r, i);
    return {
        title: `米游社 - ${c} 的关注`,
        link: o,
        item: s.map((e) => ({
            title: e.user.nickname,
            link: `https://www.miyoushe.com/ys/accountCenter/postList?id=${e.user.uid}`,
            description: t(`${e.user.certification.label || ``}\n${e.user.introduce || ``}`.trim(), [e.user.avatar_url]),
        })),
    };
}
export { r as route };
