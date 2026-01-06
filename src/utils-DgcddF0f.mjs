import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { load as i } from 'cheerio';
const a = `https://cara.app`,
    o = `${a}/api`,
    s = `https://cdn.cara.app`;
function c(n, r) {
    return e(n, { ...r, headers: { 'user-agent': t.trueUA } });
}
async function l(e) {
    let r = await n.tryGet(
        `${a}:buildId`,
        async () => {
            let e = i(await c(`${a}/explore`));
            return JSON.parse(e(`#__NEXT_DATA__`)?.text() ?? `{}`).buildId;
        },
        t.cache.routeExpire,
        !1
    );
    return await n.tryGet(`${a}:${e}`, async () => (await c(`${a}/_next/data/${r}/${e}.json`)).pageProps.user);
}
async function u(e) {
    let t = await c(`${o}/posts/${e.postId}`),
        n = t.data.images
            .filter((e) => !e.isCoverImg)
            .map((e) => `<img src="${s}/${e.src}" />`)
            .join(`<br />`);
    return { title: t.data.title || t.data.content, pubDate: r(t.data.createdAt), link: `${a}/post/${e.postId}`, description: n };
}
export { s as a, o as i, u as n, a as o, l as r, c as t };
