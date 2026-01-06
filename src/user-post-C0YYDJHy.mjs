import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import './description-ysUMLo8r.mjs';
import { t } from './utils-DTPoD2K3.mjs';
const n = {
    path: `/bbs/user-post/:uid`,
    categories: [`game`],
    example: `/mihoyo/bbs/user-post/77005350`,
    parameters: { uid: `用户uid` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `米游社 - 用户帖子`,
    maintainers: [`CaoMeiYouRen`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`uid`),
        i = { uid: r, size: n.req.query(`limit`) || `20` },
        a = `https://www.miyoushe.com/ys/accountCenter/postList?id=${r}`,
        o = (await e({ method: `get`, url: `https://bbs-api.miyoushe.com/post/wapi/userPost`, searchParams: i }))?.data?.data?.list;
    if (!o) throw Error(`未获取到数据！`);
    return { title: `米游社 - ${o[0]?.user.nickname} 的发帖`, link: a, item: o.map((e) => t(e)) };
}
export { n as route };
