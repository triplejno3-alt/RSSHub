import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import r from 'crypto-js';
const i = {
    path: `/daily-blog`,
    name: `值得一读技术博客`,
    maintainers: [`huyyi`],
    categories: [`programming`],
    example: `/chlinlearn/daily-blog`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`daily-blog.chlinlearn.top/blogs/*`], target: `/chlinlearn/daily-blog` }],
    handler: async () => {
        let i = r.lib.WordArray.random(8).toString(r.enc.Hex),
            a = Date.now(),
            o = r.SHA256(`pHVp671B0tLkW40KCwyPrb6W1GEMEGyT` + i + a).toString(r.enc.Hex);
        return {
            title: `值得一读技术博客`,
            link: `https://daily-blog.chlinlearn.top/blogs/1`,
            item: (
                await e(`https://daily-blog.chlinlearn.top/api/daily-blog/getBlogs/new?type=new&pageNum=1&pageSize=20`, {
                    headers: { Referer: `https://daily-blog.chlinlearn.top/blogs/1`, 'x-req-nonce': i, 'x-req-timestamp': a, 'x-req-key': o },
                })
            ).rows.map((e) => ({ title: e.title, link: e.url, author: e.author, img: e.icon, pubDate: n(t(e.publishTime), 8) })),
        };
    },
};
export { i as route };
