import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './config-not-found-DGyG6Tbz.mjs';
import { a as n, t as r } from './parse-article-6F1NcDY2.mjs';
const i = {
    path: `/tag/:user/:tag`,
    categories: [`blog`],
    example: `/medium/tag/imsingee/cybersecurity`,
    parameters: { user: `Username`, tag: `Subscribed Tag` },
    features: { requireConfig: [{ name: `MEDIUM_COOKIE_*`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Personalized Recommendations - Tag`,
    maintainers: [`ImSingee`],
    handler: a,
    description: `There are many tags, which can be obtained by clicking on a tag from the homepage and looking at the URL. For example, if the URL is \`https://medium.com/?tag=web3\`, then the tag is \`web3\`.

::: warning
  Personalized recommendations require the cookie value after logging in, so only self-hosting is supported. See the configuration module on the deployment page for details.
:::`,
};
async function a(i) {
    let a = i.req.param(`user`),
        o = i.req.param(`tag`),
        s = e.medium.cookies[a];
    if (s === void 0) throw new t(`缺少 Medium 用户 ${a} 登录后的 Cookie 值`);
    let c = await n(a, o, s);
    if ((i.set(`json`, c), !c)) throw new t(`Medium 用户 ${a} 的 Cookie 无效或已过期`);
    let l = c.items.map((e) => e.post.mediumUrl),
        u = await Promise.all(l.map((e) => r(i, e)));
    return { title: `${a} Medium Following Tag ${o}`, link: `https://medium.com/?tag=${o}`, item: u };
}
export { i as route };
