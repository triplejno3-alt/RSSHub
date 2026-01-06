import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t as r } from './cookies-C-qW_A-K.mjs';
import i from 'query-string';
const a = {
    path: `/favorite/:id`,
    categories: [`finance`],
    example: `/xueqiu/favorite/8152922548`,
    parameters: { id: `用户 id, 可在用户主页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`xueqiu.com/u/:id`] }],
    name: `用户收藏动态`,
    maintainers: [`imlonghao`],
    handler: o,
};
async function o(a) {
    let o = a.req.param(`id`),
        s = `https://xueqiu.com/u/${o}`,
        c = await r(s),
        l = (await n({ method: `get`, url: `https://xueqiu.com/favorites.json`, searchParams: i.stringify({ userid: o }), headers: { Cookie: c, Referer: s } })).data.list,
        {
            user: { screen_name: u },
        } = await e(`https://xueqiu.com/statuses/original/show.json`, { query: { user_id: o }, headers: { Cookie: c, Referer: s } });
    return {
        title: `${u} 的雪球收藏动态`,
        link: s,
        description: `${u} 的雪球收藏动态`,
        item: l.map((e) => ({ title: e.title, description: e.description, pubDate: t(e.created_at), link: `https://xueqiu.com${e.target}` })),
        allowEmpty: !0,
    };
}
export { a as route };
