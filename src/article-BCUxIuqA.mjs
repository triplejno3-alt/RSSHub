import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import './utils-Bu8-ZFdB.mjs';
import { t as r } from './cache-BV7o58Cb.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/user/article/:uid`,
    categories: [`social-media`],
    example: `/bilibili/user/article/334958638`,
    parameters: { uid: `用户 id, 可在 UP 主主页中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`space.bilibili.com/:uid`] }],
    name: `UP 主图文`,
    maintainers: [`lengthmin`, `Qixingchen`, `hyoban`],
    handler: o,
};
async function o(a) {
    let o = a.req.param(`uid`),
        s = await r.getUsernameFromUID(o),
        c = (await n({ method: `get`, url: `https://api.bilibili.com/x/polymer/web-dynamic/v1/opus/feed/space?host_mid=${o}`, headers: { Referer: `https://space.bilibili.com/${o}/article` } })).data.data,
        l = `${s} 的 bilibili 图文`,
        u = `https://space.bilibili.com/${o}/article`,
        d = `${s} 的 bilibili 图文`,
        f = await r.getCookie();
    return {
        title: l,
        link: u,
        description: d,
        item: await Promise.all(
            c.items.map(async (r) => {
                let a = `https:` + r.jump_url,
                    s = i(await e.tryGet(a, async () => (await n({ method: `get`, url: a, headers: { Referer: `https://space.bilibili.com/${o}/article`, Cookie: f } })).data)),
                    c = s(`.opus-module-content`).html(),
                    l = s(`.opus-module-author__pub__text`).text().replace(`编辑于 `, ``);
                return { title: r.content, link: a, description: c || r.content, pubDate: l ? t(l, `YYYY年MM月DD日 HH:mm`) : void 0 };
            })
        ),
    };
}
export { a as route };
