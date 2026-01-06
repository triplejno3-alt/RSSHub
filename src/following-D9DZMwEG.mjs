import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './config-not-found-DGyG6Tbz.mjs';
import { n, t as r } from './parse-article-6F1NcDY2.mjs';
const i = {
    path: `/following/:user`,
    categories: [`blog`],
    example: `/medium/following/imsingee`,
    parameters: { user: `Username` },
    features: { requireConfig: [{ name: `MEDIUM_COOKIE_*`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Personalized Recommendations - Following`,
    maintainers: [`ImSingee`],
    handler: a,
    description: `::: warning
  Personalized recommendations require the cookie value after logging in, so only self-hosting is supported. See the configuration module on the deployment page for details.
:::`,
};
async function a(i) {
    let a = i.req.param(`user`),
        o = e.medium.cookies[a];
    if (o === void 0) throw new t(`缺少 Medium 用户 ${a} 登录后的 Cookie 值`);
    let s = await n(a, o);
    if ((i.set(`json`, s), !s)) throw new t(`Medium 用户 ${a} 的 Cookie 无效或已过期`);
    let c = s.items.map((e) => e.post.mediumUrl),
        l = await Promise.all(c.map((e) => r(i, e)));
    return { title: `${a} Medium Following`, link: `https://medium.com/?feed=following`, item: l };
}
export { i as route };
