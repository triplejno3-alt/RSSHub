import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { load as i } from 'cheerio';
const a = { path: `/news`, categories: [`game`], example: `/gamekee/news`, radar: [{ source: [`gamekee.com`, `gamekee.com/news`], target: `/news` }], name: `游戏情报`, maintainers: [`ueiu`], handler: o, url: `gamekee.com/news` };
async function o() {
    let a = `https://www.gamekee.com`,
        { data: o } = await e(`${a}/v1/index/newsList`, { headers: { 'game-alias': `www`, 'device-num': `1`, 'User-Agent': t.ua }, query: { page_no: 1, limit: 20 } }),
        s = o.map((e) => ({ link: new URL(`${e.id}.html`, a).href, title: e.title, pubDate: r(e.created_at, `X`) })),
        c = await Promise.all(s.map((t) => n.tryGet(t.link, async () => ((t.description = i(await e(t.link))(`div.content`).html()), t))));
    return { link: `${a}/news`, title: `游戏情报|Gamekee`, item: c };
}
export { a as route };
